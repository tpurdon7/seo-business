import {
  consumeFreeAudit,
  createApiTokenAuditJob,
  createPersistedAudit,
  createPersistedJob,
  ensureUserRows,
  getApiTokenAuditJob,
  listPersistedJobAudits,
  updatePersistedAudit,
  updatePersistedJob,
} from "@/lib/audit/persistent-store";
import { generateAuditReport } from "@/lib/audit/generate-audit";
import { scorePage } from "@/lib/audit/score-page";
import type { AuditExtractedData } from "@/lib/audit/types";
import { makeAuditId } from "@/lib/audit/utils";
import { validatePublicAuditUrl } from "@/lib/audit/url-security";
import type { AuthenticatedActor } from "@/lib/auth/actor";

export class AuditQuotaError extends Error {
  constructor() {
    super("You have used your free audit. Request more audits and we will follow up.");
  }
}

function makeJobId() {
  return `job-${crypto.randomUUID()}`;
}

function uniqueValidUrls(rawUrls: string[]) {
  const urls: string[] = [];
  const seen = new Set<string>();

  for (const rawUrl of rawUrls) {
    const url = validatePublicAuditUrl(rawUrl);

    if (!seen.has(url)) {
      seen.add(url);
      urls.push(url);
    }
  }

  return urls;
}

function failedAuditData(url: string, message: string): AuditExtractedData {
  return {
    url,
    finalUrl: url,
    domain: new URL(url).hostname,
    statusCode: null,
    rendered: false,
    crawlError: message,
    title: null,
    metaDescription: null,
    canonicalUrl: null,
    robotsMeta: null,
    viewport: null,
    htmlLang: null,
    h1: null,
    h1s: [],
    h2s: [],
    h3s: [],
    visibleBodyText: "",
    approximateWordCount: 0,
    first100Words: "",
    ctas: [],
    contactDetails: [],
    trustSignals: [],
    internalLinks: [],
    externalLinks: [],
    imageCount: 0,
    imagesMissingAlt: [],
    jsonLd: [],
    robotsTxt: {
      status: "not_checked",
      url: `${new URL(url).origin}/robots.txt`,
      error: "Crawl failed before robots.txt could be checked.",
    },
    sitemapXml: {
      status: "not_checked",
      url: `${new URL(url).origin}/sitemap.xml`,
      error: "Crawl failed before sitemap.xml could be checked.",
    },
    noindex: false,
    canonicalConsistency: "not_checked",
    mobileViewport: "not_checked",
    speed: {
      status: "not_checked",
      error: "Crawl failed before PageSpeed could be checked.",
    },
    externalPresence: {
      googleBusinessProfile: {
        status: "not_checked",
        summary: "External presence was not checked because the crawl failed.",
        evidence: [],
      },
      directoryPresence: {
        status: "not_checked",
        summary: "Directory presence is not checked in this version.",
        evidence: [],
      },
      backlinks: {
        status: "not_checked",
        summary: "Backlinks are not checked in this version.",
        evidence: [],
      },
      redditForumMentions: {
        status: "not_checked",
        summary: "Reddit/forum mentions were not checked because the crawl failed.",
        evidence: [],
      },
      competitorComparison: {
        status: "not_checked",
        summary: "Competitor comparison is not checked in this version.",
        evidence: [],
      },
    },
  };
}

export async function runSingleAuditForActor(actor: AuthenticatedActor, rawUrl: string) {
  const url = validatePublicAuditUrl(rawUrl);
  const quota = await consumeFreeAudit(actor.id, actor.email);

  if (!quota.allowed) {
    console.warn("audit_quota_denied", { userId: actor.id, source: actor.source, url });
    throw new AuditQuotaError();
  }

  const jobId = makeJobId();
  const auditId = makeAuditId(url);

  await createPersistedJob({
    id: jobId,
    user_id: actor.id,
    status: "running",
    total: 1,
    completed: 0,
    failed: 0,
    created_at: new Date().toISOString(),
  });

  await createPersistedAudit({
    id: auditId,
    user_id: actor.id,
    job_id: jobId,
    input_url: url,
    final_url: null,
    status: "queued",
    score_total: null,
    report_json: null,
    extracted_json: null,
    error: null,
  });

  try {
    await updatePersistedAudit(auditId, { status: "crawling" });
    const { crawlUrl } = await import("@/lib/audit/crawl-url");
    const extractedData = await crawlUrl(url);

    await updatePersistedAudit(auditId, { status: "auditing" });
    const scores = scorePage(extractedData);
    const report = generateAuditReport(auditId, extractedData, scores);

    await updatePersistedAudit(auditId, {
      status: "complete",
      final_url: extractedData.finalUrl,
      score_total: report.overallScore,
      report_json: report,
      extracted_json: extractedData,
      error: null,
    });
    await updatePersistedJob(jobId, { status: "complete", completed: 1, failed: 0 });

    return {
      id: auditId,
      jobId,
      status: "complete" as const,
      reportUrl: `/audit/${auditId}`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed.";
    console.error("audit_run_failed", { auditId, jobId, userId: actor.id, url, error: message });

    await updatePersistedAudit(auditId, {
      status: "failed",
      final_url: url,
      extracted_json: failedAuditData(url, message),
      error: message,
    });
    await updatePersistedJob(jobId, { status: "failed", completed: 0, failed: 1 });

    return {
      id: auditId,
      jobId,
      status: "failed" as const,
      reportUrl: `/audit/${auditId}`,
      error: message,
    };
  }
}

async function runPersistedAuditInJob(actor: AuthenticatedActor, jobId: string, auditId: string, url: string) {
  try {
    await updatePersistedAudit(auditId, { status: "crawling" });
    const { crawlUrl } = await import("@/lib/audit/crawl-url");
    const extractedData = await crawlUrl(url);

    await updatePersistedAudit(auditId, { status: "auditing" });
    const scores = scorePage(extractedData);
    const report = generateAuditReport(auditId, extractedData, scores);

    await updatePersistedAudit(auditId, {
      status: "complete",
      final_url: extractedData.finalUrl,
      score_total: report.overallScore,
      report_json: report,
      extracted_json: extractedData,
      error: null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed.";
    console.error("batch_audit_run_failed", { auditId, jobId, userId: actor.id, url, error: message });

    await updatePersistedAudit(auditId, {
      status: "failed",
      final_url: url,
      extracted_json: failedAuditData(url, message),
      error: message,
    });
  }

  const audits = await listPersistedJobAudits(jobId, actor.id);
  const completed = audits.filter((audit) => audit.status === "complete").length;
  const failed = audits.filter((audit) => audit.status === "failed").length;
  const remaining = audits.some((audit) => ["queued", "crawling", "auditing"].includes(audit.status));

  await updatePersistedJob(jobId, {
    status: remaining ? "running" : failed === audits.length ? "failed" : "complete",
    completed,
    failed,
  });
}

export async function processClaimedAudit(
  actor: AuthenticatedActor,
  jobId: string,
  auditId: string,
  url: string,
) {
  return runPersistedAuditInJob(actor, jobId, auditId, url);
}

export async function createBatchAuditForActor(actor: AuthenticatedActor, rawUrls: string[]) {
  const urls = uniqueValidUrls(rawUrls).slice(0, 100);

  if (urls.length === 0) {
    throw new Error("Please provide at least one valid URL.");
  }

  await ensureUserRows(actor.id, actor.email);

  const jobId = makeJobId();
  await createPersistedJob({
    id: jobId,
    user_id: actor.id,
    status: "queued",
    total: urls.length,
    completed: 0,
    failed: 0,
    created_at: new Date().toISOString(),
  });

  const audits = [];

  for (const url of urls) {
    const auditId = makeAuditId(url);

    await createPersistedAudit({
      id: auditId,
      user_id: actor.id,
      job_id: jobId,
      input_url: url,
      final_url: null,
      status: "queued",
      score_total: null,
      report_json: null,
      extracted_json: null,
      error: null,
    });

    audits.push({
      url,
      auditId,
      status: "queued" as const,
      reportUrl: null,
      error: null,
    });
  }

  return {
    jobId,
    status: "queued" as const,
    audits,
  };
}

export async function createBatchAuditForApiToken(tokenHash: string, rawUrls: string[]) {
  const urls = uniqueValidUrls(rawUrls).slice(0, 100);

  if (urls.length === 0) {
    throw new Error("Please provide at least one valid URL.");
  }

  const jobId = makeJobId();
  const auditIds = urls.map((url) => makeAuditId(url));
  const job = await createApiTokenAuditJob(tokenHash, jobId, urls, auditIds);

  if (!job) {
    throw new Error("Audit job could not be created.");
  }

  return {
    jobId: job.job_id,
    status: job.status,
    audits: job.audits,
  };
}

export async function getBatchAuditForApiToken(tokenHash: string, jobId: string) {
  const job = await getApiTokenAuditJob(tokenHash, jobId);

  if (!job) {
    return null;
  }

  return {
    jobId: job.job_id,
    status: job.status,
    total: job.total,
    completed: job.completed,
    failed: job.failed,
    audits: job.audits,
  };
}

export async function createQueuedSingleAuditForActor(actor: AuthenticatedActor, rawUrl: string) {
  const url = validatePublicAuditUrl(rawUrl);
  const quota = await consumeFreeAudit(actor.id, actor.email);

  if (!quota.allowed) {
    console.warn("audit_quota_denied", { userId: actor.id, source: actor.source, url });
    throw new AuditQuotaError();
  }

  const job = await createBatchAuditForActor(actor, [url]);
  const audit = job.audits[0];

  return {
    id: audit.auditId,
    jobId: job.jobId,
    status: audit.status,
    reportUrl: audit.reportUrl ?? `/audit/${audit.auditId}`,
  };
}

export async function processNextQueuedAuditForActor(actor: AuthenticatedActor, jobId: string) {
  const audits = await listPersistedJobAudits(jobId, actor.id);
  const nextAudit = audits.find((audit) => audit.status === "queued");

  if (!nextAudit) {
    return;
  }

  await updatePersistedJob(jobId, {
    status: "running",
    completed: audits.filter((audit) => audit.status === "complete").length,
    failed: audits.filter((audit) => audit.status === "failed").length,
  });

  await runPersistedAuditInJob(actor, jobId, nextAudit.id, nextAudit.input_url);
}

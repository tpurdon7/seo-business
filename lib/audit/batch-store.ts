import { normalizeUrl } from "@/lib/audit/utils";

export type BatchAuditStatus = "queued" | "crawling" | "auditing" | "complete" | "failed";
export type BatchJobStatus = "queued" | "running" | "complete" | "failed";

export interface BatchAuditItem {
  url: string;
  auditId: string | null;
  status: BatchAuditStatus;
  reportUrl: string | null;
  error: string | null;
}

export interface BatchAuditJob {
  jobId: string;
  status: BatchJobStatus;
  total: number;
  completed: number;
  failed: number;
  audits: BatchAuditItem[];
  createdAt: string;
}

const globalForBatchAudits = globalThis as typeof globalThis & {
  betterSearchBatchAuditJobs?: Map<string, BatchAuditJob>;
};

const batchJobs = globalForBatchAudits.betterSearchBatchAuditJobs ?? new Map<string, BatchAuditJob>();

if (!globalForBatchAudits.betterSearchBatchAuditJobs) {
  globalForBatchAudits.betterSearchBatchAuditJobs = batchJobs;
}

function makeJobId() {
  return `job-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

export function createBatchAuditJob(urls: string[]) {
  const cleanedUrls = Array.from(new Set(urls.map((url) => normalizeUrl(url)))).slice(0, 100);
  const job: BatchAuditJob = {
    jobId: makeJobId(),
    status: "queued",
    total: cleanedUrls.length,
    completed: 0,
    failed: 0,
    audits: cleanedUrls.map((url) => ({
      url,
      auditId: null,
      status: "queued",
      reportUrl: null,
      error: null,
    })),
    createdAt: new Date().toISOString(),
  };

  batchJobs.set(job.jobId, job);
  return job;
}

export function getBatchAuditJob(jobId: string) {
  return batchJobs.get(jobId) ?? null;
}

export function updateBatchAuditItem(
  jobId: string,
  url: string,
  update: Partial<Pick<BatchAuditItem, "auditId" | "status" | "reportUrl" | "error">>,
) {
  const job = batchJobs.get(jobId);

  if (!job) {
    return null;
  }

  const updatedAudits = job.audits.map((audit) => (audit.url === url ? { ...audit, ...update } : audit));
  const completed = updatedAudits.filter((audit) => audit.status === "complete").length;
  const failed = updatedAudits.filter((audit) => audit.status === "failed").length;
  const running = updatedAudits.some((audit) => ["crawling", "auditing"].includes(audit.status));
  const queued = updatedAudits.some((audit) => audit.status === "queued");
  const status = failed === updatedAudits.length ? "failed" : completed === updatedAudits.length ? "complete" : running || queued ? "running" : "queued";

  const updatedJob: BatchAuditJob = {
    ...job,
    status,
    completed,
    failed,
    audits: updatedAudits,
  };

  batchJobs.set(jobId, updatedJob);
  return updatedJob;
}

export function reportPathForAudit(auditId: string) {
  return `/audit/${auditId}`;
}

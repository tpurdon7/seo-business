import { extractPageData } from "@/lib/audit/extract-page-data";
import type { AuditExtractedData, AvailabilityCheck } from "@/lib/audit/types";
import { normalizeUrl } from "@/lib/audit/utils";

const REQUEST_TIMEOUT_MS = 18_000;

async function checkAvailability(url: string): Promise<AvailabilityCheck> {
  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
      headers: {
        "user-agent": "Better Search Audit Bot/0.1",
      },
    });

    return {
      status: response.ok ? "found" : "not_found",
      url,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      status: "not_checked",
      url,
      error: error instanceof Error ? error.message : "Request failed",
    };
  }
}

async function crawlWithPuppeteer(url: string, robotsUrl: string, sitemapUrl: string): Promise<AuditExtractedData> {
  const sparticuzChromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.launch({
    args: sparticuzChromium.args,
    defaultViewport: { width: 1440, height: 1100 },
    executablePath: await sparticuzChromium.executablePath(),
    headless: true,
  });
  const page = await browser.newPage();

  try {
    await page.setUserAgent("Mozilla/5.0 (compatible; BetterSearchAuditBot/0.1; +https://bettersearch.dev)");

    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: REQUEST_TIMEOUT_MS,
    });

    await page.waitForNetworkIdle({ idleTime: 750, timeout: 5_000 }).catch(() => undefined);

    const extracted = await extractPageData(page);
    const finalUrl = page.url();
    const [robotsTxt, sitemapXml] = await Promise.all([
      checkAvailability(robotsUrl),
      checkAvailability(sitemapUrl),
    ]);

    return {
      url,
      finalUrl,
      domain: new URL(finalUrl).hostname,
      statusCode: response?.status() ?? null,
      rendered: true,
      ...extracted,
      robotsTxt,
      sitemapXml,
      canonicalConsistency: canonicalConsistency(finalUrl, extracted.canonicalUrl),
      mobileViewport: extracted.viewport ? "found" : "not_found",
      speed: {
        status: "not_checked",
        error: "PageSpeed and Lighthouse are reserved for the next integration.",
      },
    };
  } finally {
    await browser.close().catch(() => undefined);
  }
}

async function crawlWithPlaywright(url: string, robotsUrl: string, sitemapUrl: string): Promise<AuditExtractedData> {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (compatible; BetterSearchAuditBot/0.1; +https://bettersearch.dev)",
    viewport: { width: 1440, height: 1100 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: REQUEST_TIMEOUT_MS,
    });

    await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => undefined);

    const extracted = await extractPageData(page);
    const finalUrl = page.url();
    const [robotsTxt, sitemapXml] = await Promise.all([
      checkAvailability(robotsUrl),
      checkAvailability(sitemapUrl),
    ]);

    return {
      url,
      finalUrl,
      domain: new URL(finalUrl).hostname,
      statusCode: response?.status() ?? null,
      rendered: true,
      ...extracted,
      robotsTxt,
      sitemapXml,
      canonicalConsistency: canonicalConsistency(finalUrl, extracted.canonicalUrl),
      mobileViewport: extracted.viewport ? "found" : "not_found",
      speed: {
        status: "not_checked",
        error: "PageSpeed and Lighthouse are reserved for the next integration.",
      },
    };
  } finally {
    await context.close().catch(() => undefined);
    await browser.close().catch(() => undefined);
  }
}

function canonicalConsistency(finalUrl: string, canonicalUrl: string | null) {
  if (!canonicalUrl) return "not_found" as const;

  try {
    const final = new URL(finalUrl);
    const canonical = new URL(canonicalUrl, finalUrl);
    final.hash = "";
    canonical.hash = "";
    return final.toString().replace(/\/$/, "") === canonical.toString().replace(/\/$/, "")
      ? "found"
      : "not_found";
  } catch {
    return "not_checked" as const;
  }
}

export async function crawlUrl(rawUrl: string): Promise<AuditExtractedData> {
  const url = normalizeUrl(rawUrl);
  const parsed = new URL(url);
  const robotsUrl = `${parsed.origin}/robots.txt`;
  const sitemapUrl = `${parsed.origin}/sitemap.xml`;
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  return isServerless
    ? crawlWithPuppeteer(url, robotsUrl, sitemapUrl)
    : crawlWithPlaywright(url, robotsUrl, sitemapUrl);
}

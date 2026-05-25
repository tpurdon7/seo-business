import type { AvailabilityCheck } from "@/lib/audit/types";

interface PageSpeedAudit {
  displayValue?: string;
  title?: string;
  score?: number | null;
}

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: {
      performance?: {
        score?: number | null;
      };
    };
    audits?: Record<string, PageSpeedAudit>;
  };
}

function displayMetric(audits: Record<string, PageSpeedAudit> | undefined, key: string) {
  return audits?.[key]?.displayValue;
}

export async function checkPageSpeed(url: string): Promise<AvailabilityCheck> {
  const endpoint = new URL("https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.set("category", "performance");

  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(28_000),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "not_checked",
        url: endpoint.toString(),
        statusCode: response.status,
        error: `PageSpeed Insights returned ${response.status}.`,
      };
    }

    const payload = (await response.json()) as PageSpeedResponse;
    const performanceScore = payload.lighthouseResult?.categories?.performance?.score;

    if (typeof performanceScore !== "number") {
      return {
        status: "not_checked",
        url: endpoint.toString(),
        statusCode: response.status,
        error: "PageSpeed Insights did not return a performance score.",
      };
    }

    const audits = payload.lighthouseResult?.audits;
    const opportunities = Object.values(audits ?? {})
      .filter((audit) => typeof audit.score === "number" && audit.score < 0.9 && audit.title)
      .map((audit) => audit.title as string)
      .slice(0, 5);

    return {
      status: "found",
      url: endpoint.toString(),
      statusCode: response.status,
      strategy: "mobile",
      score: Math.round(performanceScore * 100),
      metrics: {
        largestContentfulPaint: displayMetric(audits, "largest-contentful-paint"),
        cumulativeLayoutShift: displayMetric(audits, "cumulative-layout-shift"),
        totalBlockingTime: displayMetric(audits, "total-blocking-time"),
        speedIndex: displayMetric(audits, "speed-index"),
      },
      opportunities,
    };
  } catch (error) {
    return {
      status: "not_checked",
      url: endpoint.toString(),
      error: error instanceof Error ? error.message : "PageSpeed Insights request failed.",
    };
  }
}

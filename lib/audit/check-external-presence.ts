import type { ExternalPresenceCheck, ExternalPresenceChecks } from "@/lib/audit/types";
import { cleanText, titleCaseFromDomain } from "@/lib/audit/utils";

interface RedditSearchResponse {
  data?: {
    children?: Array<{
      data?: {
        title?: string;
        subreddit_name_prefixed?: string;
        permalink?: string;
      };
    }>;
  };
}

interface GooglePlaceSearchResponse {
  status?: string;
  error_message?: string;
  results?: Array<{
    name?: string;
    formatted_address?: string;
    rating?: number;
    user_ratings_total?: number;
  }>;
}

function notChecked(summary: string, provider?: string): ExternalPresenceCheck {
  return {
    status: "not_checked",
    summary,
    provider,
    evidence: [],
  };
}

async function checkRedditMentions(domain: string): Promise<ExternalPresenceCheck> {
  const query = domain.replace(/^www\./, "");
  const endpoint = new URL("https://www.reddit.com/search.json");
  endpoint.searchParams.set("q", `"${query}"`);
  endpoint.searchParams.set("limit", "5");
  endpoint.searchParams.set("sort", "relevance");

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
      headers: {
        "user-agent": "BetterSearchAuditBot/0.1",
      },
    });

    if (!response.ok) {
      return {
        status: "not_checked",
        summary: `Reddit search returned ${response.status}.`,
        provider: "Reddit public search",
        evidence: [],
      };
    }

    const payload = (await response.json()) as RedditSearchResponse;
    const evidence = (payload.data?.children ?? [])
      .map((child) => {
        const data = child.data;
        if (!data?.title) return null;
        const source = data.subreddit_name_prefixed ? `${data.subreddit_name_prefixed}: ` : "";
        return `${source}${data.title}`;
      })
      .filter((value): value is string => Boolean(value))
      .slice(0, 5);

    return {
      status: evidence.length > 0 ? "found" : "not_found",
      summary: evidence.length > 0 ? `${evidence.length} Reddit mention(s) found for ${query}.` : `No Reddit mentions found for ${query}.`,
      provider: "Reddit public search",
      evidence,
    };
  } catch (error) {
    return {
      status: "not_checked",
      summary: "Reddit/forum mentions could not be checked.",
      provider: "Reddit public search",
      evidence: [],
      error: error instanceof Error ? error.message : "Reddit search failed.",
    };
  }
}

async function checkGoogleBusinessProfile(domain: string, businessName: string): Promise<ExternalPresenceCheck> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return notChecked("Google Business Profile requires GOOGLE_PLACES_API_KEY before it can be checked.", "Google Places API");
  }

  const query = cleanText(`${businessName} ${domain.replace(/^www\./, "")}`);
  const endpoint = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return {
        status: "not_checked",
        summary: `Google Places returned ${response.status}.`,
        provider: "Google Places API",
        evidence: [],
      };
    }

    const payload = (await response.json()) as GooglePlaceSearchResponse;

    if (payload.status && !["OK", "ZERO_RESULTS"].includes(payload.status)) {
      return {
        status: "not_checked",
        summary: payload.error_message || `Google Places status: ${payload.status}.`,
        provider: "Google Places API",
        evidence: [],
      };
    }

    const evidence = (payload.results ?? []).slice(0, 3).map((place) => {
      const rating = typeof place.rating === "number" ? `, ${place.rating}/5 from ${place.user_ratings_total ?? 0} reviews` : "";
      return `${place.name ?? "Unnamed listing"}${place.formatted_address ? `, ${place.formatted_address}` : ""}${rating}`;
    });

    return {
      status: evidence.length > 0 ? "found" : "not_found",
      summary: evidence.length > 0 ? `${evidence.length} possible Google Business Profile listing(s) found.` : "No Google Business Profile match found.",
      provider: "Google Places API",
      evidence,
    };
  } catch (error) {
    return {
      status: "not_checked",
      summary: "Google Business Profile could not be checked.",
      provider: "Google Places API",
      evidence: [],
      error: error instanceof Error ? error.message : "Google Places request failed.",
    };
  }
}

export async function checkExternalPresence(domain: string, businessName?: string | null): Promise<ExternalPresenceChecks> {
  const inferredBusinessName = cleanText(businessName) || titleCaseFromDomain(domain);
  const [googleBusinessProfile, redditForumMentions] = await Promise.all([
    checkGoogleBusinessProfile(domain, inferredBusinessName),
    checkRedditMentions(domain),
  ]);

  return {
    googleBusinessProfile,
    redditForumMentions,
    directoryPresence: notChecked(
      "Directory presence requires a listings data provider before it can be scored honestly.",
      "BrightLocal, Whitespark, Yext, or a SERP/listings API",
    ),
    backlinks: notChecked(
      "Backlinks require a backlink data provider before authority can be scored beyond on-page evidence.",
      "Ahrefs, Semrush, Moz, Majestic, or Google Search Console",
    ),
    competitorComparison: notChecked(
      "Competitor comparison requires target keyword, location, and SERP data before it can be scored honestly.",
      "DataForSEO, SerpApi, Google Search Console, or a rank tracking provider",
    ),
  };
}

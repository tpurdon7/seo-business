import type { AuditExtractedData, AuditScore, AuditScoreItem } from "@/lib/audit/types";
import { cleanText, clampScore, scoreStatus, shortEvidence } from "@/lib/audit/utils";

function item(label: string, points: number, max: number, evidence: string): AuditScoreItem {
  const clamped = clampScore(points, max);

  return {
    label,
    points: clamped,
    max,
    evidence,
    status: scoreStatus(clamped, max),
  };
}

function notChecked(label: string, max: number, evidence: string): AuditScoreItem {
  return {
    label,
    points: 0,
    max,
    evidence,
    status: "not_checked",
  };
}

function keyCopy(data: AuditExtractedData) {
  return cleanText(`${data.title ?? ""} ${data.metaDescription ?? ""} ${data.h1 ?? ""} ${data.first100Words}`);
}

function firstPageCopy(data: AuditExtractedData) {
  return cleanText(`${keyCopy(data)} ${data.visibleBodyText.slice(0, 3000)}`);
}

function hasServiceClarity(data: AuditExtractedData) {
  const text = keyCopy(data);
  return /\b(services?|agency|consultant|consultancy|clinic|law|legal|seo|marketing|search|accountant|advisor|provider|specialist|company|firm|practice|studio|software|platform|repairs?|installation|treatment|therapy|training|coaching|design|development|audit|strategy)\b/i.test(
    text,
  );
}

function hasLocationSignal(data: AuditExtractedData) {
  const text = firstPageCopy(data);
  return /\b(near me|local|service area|serving|based in|located in|uk|united kingdom|england|scotland|wales|ireland|london|surrey|cornwall|manchester|birmingham|bristol|dubai|uae|emirates|county|region)\b/i.test(
    text,
  );
}

function hasAudienceOrComparisonLanguage(data: AuditExtractedData) {
  return /\b(best for|ideal for|who this is for|for businesses|for companies|for homeowners|for patients|compare|comparison|alternative|alternatives|vs|versus|choose|right fit|suitable for)\b/i.test(
    firstPageCopy(data),
  );
}

function hasBuyerIntentLanguage(data: AuditExtractedData) {
  return /\b(book|call|contact|request|quote|consultation|audit|pricing|cost|enquiry|enquire|schedule|get started|next step)\b/i.test(
    firstPageCopy(data),
  );
}

function hasQuestionHeading(data: AuditExtractedData) {
  return [...data.h2s, ...data.h3s].some((heading) => /\?|\b(how|what|why|when|where|who|which|can|does|do)\b/i.test(heading));
}

function hasDefinitionOrPlainExplanation(data: AuditExtractedData) {
  return /\b(is a|is an|are a|means|refers to|helps|we help|provides|specialises|specializes|includes|designed for)\b/i.test(
    data.first100Words,
  );
}

function descriptiveHeadingCount(data: AuditExtractedData) {
  const vague = /^(services?|about|overview|welcome|learn more|contact|home)$/i;
  return data.h2s.filter((heading) => cleanText(heading).length >= 8 && !vague.test(cleanText(heading))).length;
}

function hasSuccessfulStatus(data: AuditExtractedData) {
  return data.statusCode !== null && data.statusCode >= 200 && data.statusCode < 400;
}

function usefulAltCoverage(data: AuditExtractedData) {
  if (data.imageCount === 0) return 1;
  return Math.max(0, (data.imageCount - data.imagesMissingAlt.length) / data.imageCount);
}

function schemaText(data: AuditExtractedData) {
  return JSON.stringify(data.jsonLd).toLowerCase();
}

function hasSchemaType(data: AuditExtractedData, type: string) {
  return schemaText(data).includes(`"${type.toLowerCase()}"`);
}

function schemaEvidence(data: AuditExtractedData) {
  if (!data.rendered) {
    return notChecked("Schema and answer readiness", 5, "The page did not render successfully, so rendered JSON-LD could not be checked.");
  }

  const hasEntitySchema =
    hasSchemaType(data, "organization") ||
    hasSchemaType(data, "localbusiness") ||
    hasSchemaType(data, "professionalservice");
  const hasServiceSchema = hasSchemaType(data, "service");
  const hasAnswerSchema = hasSchemaType(data, "faqpage") || hasSchemaType(data, "qaPage");
  const hasBreadcrumbSchema = hasSchemaType(data, "breadcrumblist");
  const schemaPoints = [hasEntitySchema, hasServiceSchema, hasAnswerSchema, hasBreadcrumbSchema].filter(Boolean).length;

  return item(
    "Schema and answer readiness",
    schemaPoints >= 4 ? 5 : schemaPoints === 3 ? 4 : schemaPoints === 2 ? 3 : schemaPoints === 1 ? 2 : 0,
    5,
    data.jsonLd.length > 0
      ? `${data.jsonLd.length} JSON-LD block(s) found. Entity: ${hasEntitySchema ? "yes" : "no"}. Service: ${hasServiceSchema ? "yes" : "no"}. FAQ/answer: ${hasAnswerSchema ? "yes" : "no"}. Breadcrumb: ${hasBreadcrumbSchema ? "yes" : "no"}.`
      : "No rendered JSON-LD schema found.",
  );
}

function findScoreItem(score: AuditScore, label: string) {
  return score.items.find((scoreItem) => scoreItem.label === label);
}

function applyHonestCategoryCap(score: AuditScore): AuditScore {
  let cappedScore = score.score;

  if (score.category === "SEO") {
    const title = findScoreItem(score, "Title tag quality");
    const meta = findScoreItem(score, "Meta description quality");
    const heading = findScoreItem(score, "Heading structure");
    const crawlability = findScoreItem(score, "Internal linking and crawlability basics");
    const indexability = findScoreItem(score, "Image, canonical, indexability basics");

    if ((title?.points ?? 0) === 0 || (meta?.points ?? 0) === 0 || (heading?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 15);
    }

    if ((crawlability?.points ?? 0) <= 2) {
      cappedScore = Math.min(cappedScore, 20);
    }

    if ((indexability?.points ?? 0) <= 1) {
      cappedScore = Math.min(cappedScore, 18);
    } else if ((indexability?.points ?? 0) <= 3) {
      cappedScore = Math.min(cappedScore, 24);
    }
  }

  if (score.category === "GEO") {
    const proof = findScoreItem(score, "Proof and authority signals");
    const location = findScoreItem(score, "Location and market relevance");
    const category = findScoreItem(score, "Service and category clarity");

    if ((category?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 10);
    }

    if ((location?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 16);
    }

    if ((proof?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 15);
    }
  }

  if (score.category === "AEO") {
    const faq = findScoreItem(score, "FAQ or question-answer structure");
    const schema = findScoreItem(score, "Schema and answer readiness");

    if ((faq?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 11);
    }

    if ((schema?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 12);
    }
  }

  if (score.category === "CRO") {
    const cta = findScoreItem(score, "CTA clarity");
    const trust = findScoreItem(score, "Trust and conversion proof");

    if ((cta?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 6);
    }

    if ((trust?.points ?? 0) === 0) {
      cappedScore = Math.min(cappedScore, 9);
    }
  }

  return {
    ...score,
    score: cappedScore,
  };
}

export function scorePage(data: AuditExtractedData): AuditScore[] {
  const titleLength = cleanText(data.title).length;
  const metaLength = cleanText(data.metaDescription).length;
  const h1Count = data.h1s.length || (data.h1 ? 1 : 0);
  const hasCta = data.ctas.length > 0;
  const hasTrust = data.trustSignals.length > 0;
  const hasContact = data.contactDetails.length > 0;
  const serviceClear = hasServiceClarity(data);
  const locationClear = hasLocationSignal(data);
  const statusOk = hasSuccessfulStatus(data);
  const altCoverage = usefulAltCoverage(data);
  const hasCanonical = data.canonicalConsistency === "found";
  const crawlChecksKnown = data.robotsTxt.status !== "not_checked" || data.sitemapXml.status !== "not_checked";
  const hasBuyerIntent = hasBuyerIntentLanguage(data);
  const hasQuestionStructure = hasQuestionHeading(data);
  const descriptiveH2s = descriptiveHeadingCount(data);

  const seo: AuditScore = {
    category: "SEO",
    max: 30,
    score: 0,
    items: [
      item(
        "Title tag quality",
        !titleLength
          ? 0
          : titleLength >= 35 && titleLength <= 65 && serviceClear && (locationClear || hasBuyerIntent)
            ? 5
            : titleLength >= 30 && titleLength <= 70 && serviceClear
              ? 3
              : titleLength > 0
                ? 1
                : 0,
        5,
        data.title ? `Title is ${titleLength} characters: ${data.title}` : "No page title found.",
      ),
      item(
        "Meta description quality",
        !metaLength
          ? 0
          : metaLength >= 120 && metaLength <= 170 && serviceClear && hasBuyerIntent
            ? 5
            : metaLength >= 90 && metaLength <= 180 && serviceClear
              ? 3
              : metaLength > 0
                ? 1
                : 0,
        5,
        data.metaDescription
          ? `Meta description is ${metaLength} characters: ${data.metaDescription}`
          : "No meta description found.",
      ),
      item(
        "Heading structure",
        h1Count === 1 && descriptiveH2s >= 5
          ? 5
          : h1Count === 1 && descriptiveH2s >= 3
            ? 3
            : h1Count > 1
              ? 1
              : 0,
        5,
        `H1 count: ${h1Count}. H1: ${shortEvidence(data.h1)}. H2 count: ${data.h2s.length}. Descriptive H2 count: ${descriptiveH2s}.`,
      ),
      item(
        "Keyword and search intent clarity",
        serviceClear && hasBuyerIntent && data.approximateWordCount >= 600
          ? 5
          : serviceClear && data.approximateWordCount >= 350
            ? 3
            : serviceClear
              ? 2
              : 0,
        5,
        `Service/category and buyer-intent terms checked in title, meta, H1, and opening copy. First 100 words: ${shortEvidence(data.first100Words)}`,
      ),
      crawlChecksKnown
        ? item(
            "Internal linking and crawlability basics",
            statusOk && data.internalLinks.length >= 8 && data.robotsTxt.status === "found" && data.sitemapXml.status === "found"
              ? 5
              : statusOk && data.internalLinks.length >= 3 && data.robotsTxt.status !== "not_found"
                ? 3
                : statusOk && data.internalLinks.length > 0
                  ? 2
                  : 0,
            5,
            `Status code: ${data.statusCode ?? "not checked"}. Internal links: ${data.internalLinks.length}. Robots.txt: ${data.robotsTxt.status}. Sitemap.xml: ${data.sitemapXml.status}.`,
          )
        : notChecked(
            "Internal linking and crawlability basics",
            5,
            `Internal links: ${data.internalLinks.length}. Robots.txt and sitemap.xml availability were not checked.`,
          ),
      item(
        "Image, canonical, indexability basics",
        !data.noindex && hasCanonical && data.mobileViewport === "found" && altCoverage === 1
          ? 5
          : !data.noindex && data.canonicalUrl && data.mobileViewport === "found" && altCoverage >= 0.8
            ? 3
            : !data.noindex && (data.canonicalUrl || data.mobileViewport === "found")
              ? 1
              : 0,
        5,
        `Canonical: ${shortEvidence(data.canonicalUrl)}. Canonical consistency: ${data.canonicalConsistency}. Mobile viewport: ${data.mobileViewport}. Missing image alt text: ${data.imagesMissingAlt.length}/${data.imageCount}. Noindex: ${data.noindex ? "yes" : "no"}.`,
      ),
    ],
  };

  const geo: AuditScore = {
    category: "GEO",
    max: 25,
    score: 0,
    items: [
      item(
        "Clear entity positioning",
        data.h1 && data.title && data.metaDescription && serviceClear && hasBuyerIntent
          ? 5
          : data.h1 && data.title && serviceClear
            ? 3
            : data.h1 || data.title
              ? 1
              : 0,
        5,
        `Title: ${shortEvidence(data.title)}. H1: ${shortEvidence(data.h1)}. Meta: ${shortEvidence(data.metaDescription)}.`,
      ),
      item(
        "Service and category clarity",
        serviceClear && descriptiveH2s >= 3 ? 5 : serviceClear ? 3 : 0,
        5,
        serviceClear
          ? "Service/category language found in title, meta, H1, or opening copy."
          : "No clear service/category language found in title, meta, H1, or opening copy.",
      ),
      item(
        "Location and market relevance",
        locationClear ? 5 : 0,
        5,
        locationClear ? "Location, market, or service-area language found." : "No strong location, market, or service-area signal found in key page copy.",
      ),
      item(
        "Proof and authority signals",
        data.trustSignals.length >= 3 && hasContact
          ? 5
          : data.trustSignals.length >= 2
            ? 3
            : hasTrust
              ? 2
              : hasContact
                ? 1
                : 0,
        5,
        hasTrust
          ? data.trustSignals.slice(0, 2).join(" ")
          : hasContact
            ? `Contact detail found: ${data.contactDetails.slice(0, 2).join(", ")}. No strong proof line found.`
            : "No visible reviews, testimonials, case studies, accreditations, client proof, or contact details found.",
      ),
      item(
        "Comparison and audience language",
        hasAudienceOrComparisonLanguage(data) && hasBuyerIntent ? 5 : hasAudienceOrComparisonLanguage(data) ? 3 : 0,
        5,
        hasAudienceOrComparisonLanguage(data)
          ? "Buyer-fit, audience, category, or comparison language found."
          : "No clear buyer-fit, audience, category, or comparison language found.",
      ),
    ],
  };

  const aeo: AuditScore = {
    category: "AEO",
    max: 20,
    score: 0,
    items: [
      item(
        "FAQ or question-answer structure",
        hasQuestionStructure && /\bfaq|frequently asked/i.test(data.visibleBodyText)
          ? 5
          : hasQuestionStructure
            ? 3
            : /\bfaq|frequently asked/i.test(data.visibleBodyText)
              ? 1
              : 0,
        5,
        hasQuestionHeading(data) ? "Question-style H2/H3 headings found." : "No question-style H2/H3 headings found.",
      ),
      item(
        "Clear definitions and concise explanations",
        hasDefinitionOrPlainExplanation(data) && data.first100Words.length > 180 && serviceClear
          ? 5
          : hasDefinitionOrPlainExplanation(data) && serviceClear
            ? 3
            : 0,
        5,
        `Opening copy: ${shortEvidence(data.first100Words)}`,
      ),
      item(
        "Structured sections with descriptive headings",
        descriptiveH2s >= 6 ? 5 : descriptiveH2s >= 4 ? 3 : descriptiveH2s >= 2 ? 1 : 0,
        5,
        `${data.h2s.length} H2 headings found. ${descriptiveH2s} appear descriptive enough for answer extraction.`,
      ),
      schemaEvidence(data),
    ],
  };

  const cro: AuditScore = {
    category: "CRO",
    max: 15,
    score: 0,
    items: [
      item(
        "Clear above-the-fold value proposition",
        data.h1 && serviceClear && hasBuyerIntent && data.first100Words.length > 180
          ? 5
          : data.h1 && serviceClear
            ? 3
            : data.h1
              ? 1
              : 0,
        5,
        `H1 and opening copy reviewed: ${shortEvidence(data.h1)}. First 100 words: ${shortEvidence(data.first100Words)}`,
      ),
      item(
        "CTA clarity",
        data.ctas.length >= 2 && hasBuyerIntent ? 5 : hasCta ? 3 : 0,
        5,
        hasCta ? `CTA text found: ${data.ctas.map((cta) => cta.text).slice(0, 6).join(", ")}.` : "No clear CTA text found.",
      ),
      item(
        "Trust and conversion proof",
        data.trustSignals.length >= 3 ? 5 : data.trustSignals.length >= 1 ? 3 : hasContact ? 1 : 0,
        5,
        hasTrust
          ? data.trustSignals.slice(0, 2).join(" ")
          : hasContact
            ? `Contact detail found: ${data.contactDetails.slice(0, 2).join(", ")}. No strong conversion proof found.`
            : "No visible testimonials, case studies, reviews, accreditations, or contact details found.",
      ),
    ],
  };

  const authority: AuditScore = {
    category: "Authority",
    max: 10,
    score: 0,
    items: [
      item(
        "Visible credibility indicators",
        Math.min(10, data.trustSignals.length * 2 + (data.trustSignals.length > 0 && hasContact ? 1 : 0)),
        10,
        `${data.trustSignals.length} trust signal line(s), ${data.contactDetails.length} contact detail(s), and ${data.externalLinks.length} external link(s) found.`,
      ),
    ],
  };

  return [seo, geo, aeo, cro, authority]
    .map((score) => ({
      ...score,
      score: score.items.reduce((sum, scoreItem) => sum + scoreItem.points, 0),
    }))
    .map(applyHonestCategoryCap);
}

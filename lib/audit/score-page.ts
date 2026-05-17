import type { AuditExtractedData, AuditScore, AuditScoreItem } from "@/lib/audit/types";
import { cleanText, clampScore, scoreStatus, shortEvidence } from "@/lib/audit/utils";

function item(label: string, points: number, max: number, evidence: string): AuditScoreItem {
  return {
    label,
    points: clampScore(points, max),
    max,
    evidence,
    status: scoreStatus(points, max),
  };
}

function hasQuestionHeading(data: AuditExtractedData) {
  return [...data.h2s, ...data.h3s].some((heading) => /\?|\b(how|what|why|when|where|who|which)\b/i.test(heading));
}

function hasServiceClarity(data: AuditExtractedData) {
  const text = `${data.title ?? ""} ${data.metaDescription ?? ""} ${data.h1 ?? ""} ${data.first100Words}`;
  return /\b(services?|agency|consultant|clinic|law|seo|marketing|search|accountant|advisor|provider|specialist|company|firm)\b/i.test(
    text,
  );
}

function hasLocationSignal(data: AuditExtractedData) {
  const text = `${data.title ?? ""} ${data.metaDescription ?? ""} ${data.h1 ?? ""} ${data.visibleBodyText.slice(0, 2500)}`;
  return /\b(near me|local|uk|england|surrey|cornwall|london|dubai|uae|city|county|area|region|serving|based in)\b/i.test(
    text,
  );
}

export function scorePage(data: AuditExtractedData): AuditScore[] {
  const titleLength = cleanText(data.title).length;
  const metaLength = cleanText(data.metaDescription).length;
  const h1Count = data.h1 ? 1 : 0;
  const hasJsonLd = data.jsonLd.length > 0;
  const hasCta = data.ctas.length > 0;
  const hasTrust = data.trustSignals.length > 0;
  const hasContact = data.contactDetails.length > 0;
  const hasDefinition = /\b(is|are|means|refers to|helps|provides)\b/i.test(data.first100Words);

  const seo: AuditScore = {
    category: "SEO",
    max: 30,
    score: 0,
    items: [
      item(
        "Title tag quality",
        titleLength >= 35 && titleLength <= 65 ? 5 : titleLength > 0 ? 3 : 0,
        5,
        data.title ? `Title is ${titleLength} characters: ${data.title}` : "No page title found.",
      ),
      item(
        "Meta description quality",
        metaLength >= 120 && metaLength <= 170 ? 5 : metaLength > 0 ? 3 : 0,
        5,
        data.metaDescription
          ? `Meta description is ${metaLength} characters: ${data.metaDescription}`
          : "No meta description found.",
      ),
      item(
        "Heading structure",
        h1Count === 1 && data.h2s.length >= 2 ? 5 : h1Count === 1 ? 3 : 0,
        5,
        `H1: ${shortEvidence(data.h1)}. H2 count: ${data.h2s.length}.`,
      ),
      item(
        "Keyword and search intent clarity",
        hasServiceClarity(data) && data.approximateWordCount >= 350 ? 5 : hasServiceClarity(data) ? 3 : 1,
        5,
        `First 100 words: ${shortEvidence(data.first100Words)}`,
      ),
      item(
        "Internal linking and crawlability basics",
        data.internalLinks.length >= 5 && data.robotsTxt.status === "found" ? 5 : data.internalLinks.length > 0 ? 3 : 1,
        5,
        `${data.internalLinks.length} internal links found. Robots.txt: ${data.robotsTxt.status}.`,
      ),
      item(
        "Image, canonical, indexability basics",
        !data.noindex && data.canonicalConsistency === "found" && data.imagesMissingAlt.length === 0
          ? 5
          : !data.noindex && data.canonicalUrl
            ? 3
            : 1,
        5,
        `Canonical: ${shortEvidence(data.canonicalUrl)}. Missing image alt text: ${data.imagesMissingAlt.length}. Noindex: ${data.noindex ? "yes" : "no"}.`,
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
        data.h1 && data.metaDescription ? 5 : data.h1 || data.metaDescription ? 3 : 1,
        5,
        `H1: ${shortEvidence(data.h1)}. Meta: ${shortEvidence(data.metaDescription)}.`,
      ),
      item(
        "Service and category clarity",
        hasServiceClarity(data) ? 5 : 2,
        5,
        `Title and opening copy checked for service/category terms.`,
      ),
      item(
        "Location and market relevance",
        hasLocationSignal(data) ? 5 : 1,
        5,
        `Location signal ${hasLocationSignal(data) ? "found" : "not found"} in key page copy.`,
      ),
      item(
        "Proof and authority signals",
        hasTrust || hasContact ? 5 : 1,
        5,
        data.trustSignals.length > 0 ? data.trustSignals.slice(0, 2).join(" ") : "No visible trust proof found.",
      ),
      item(
        "Comparison and audience language",
        /\b(for|best|compare|alternative|vs|versus|who|ideal|choose)\b/i.test(data.visibleBodyText) ? 5 : 2,
        5,
        "Checked page copy for audience, category, comparison, or buyer-fit language.",
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
        hasQuestionHeading(data) ? 5 : 1,
        5,
        hasQuestionHeading(data) ? "Question-style headings found." : "No question-style H2/H3 headings found.",
      ),
      item(
        "Clear definitions and concise explanations",
        hasDefinition ? 5 : 2,
        5,
        `Opening copy: ${shortEvidence(data.first100Words)}`,
      ),
      item(
        "Structured sections with descriptive headings",
        data.h2s.length >= 4 ? 5 : data.h2s.length >= 2 ? 3 : 1,
        5,
        `${data.h2s.length} H2 headings found.`,
      ),
      item(
        "Schema and answer readiness",
        hasJsonLd ? 5 : 1,
        5,
        hasJsonLd ? `${data.jsonLd.length} JSON-LD block(s) found in rendered DOM.` : "No rendered JSON-LD schema found.",
      ),
    ],
  };

  const cro: AuditScore = {
    category: "CRO",
    max: 15,
    score: 0,
    items: [
      item(
        "Clear above-the-fold value proposition",
        data.h1 && data.first100Words.length > 80 ? 5 : data.h1 ? 3 : 1,
        5,
        `H1 and opening copy reviewed: ${shortEvidence(data.h1)}.`,
      ),
      item(
        "CTA clarity",
        hasCta ? 5 : 1,
        5,
        hasCta ? `CTA text found: ${data.ctas.map((cta) => cta.text).slice(0, 6).join(", ")}.` : "No clear CTA text found.",
      ),
      item(
        "Trust and conversion proof",
        hasTrust ? 5 : hasContact ? 3 : 1,
        5,
        hasTrust ? data.trustSignals.slice(0, 2).join(" ") : "No visible testimonials, case studies, reviews, or accreditations found.",
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
        Math.min(8, data.trustSignals.length * 2) + (data.externalLinks.length > 0 ? 2 : 0),
        10,
        `${data.trustSignals.length} trust signal line(s) and ${data.externalLinks.length} external link(s) found.`,
      ),
    ],
  };

  return [seo, geo, aeo, cro, authority].map((score) => ({
    ...score,
    score: score.items.reduce((sum, scoreItem) => sum + scoreItem.points, 0),
  }));
}

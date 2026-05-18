export type CheckStatus = "found" | "not_found" | "not_checked";
export type Impact = "High" | "Medium" | "Low";
export type Effort = "Low" | "Medium" | "High";
export type AuditCategory = "SEO" | "GEO" | "AEO" | "CRO" | "Authority";
export type FixPriority = "Fix now" | "Improve next" | "Build over time";

export interface AuditInput {
  url: string;
}

export interface AuditLink {
  text: string;
  href: string;
  isInternal: boolean;
}

export interface AuditImage {
  src: string;
  alt: string | null;
  missingAlt: boolean;
}

export interface AuditCta {
  text: string;
  href?: string;
  source: "button" | "link" | "input";
}

export interface AvailabilityCheck {
  status: CheckStatus;
  url?: string;
  statusCode?: number;
  error?: string;
}

export interface AuditExtractedData {
  url: string;
  finalUrl: string;
  domain: string;
  statusCode: number | null;
  rendered: boolean;
  crawlError?: string;
  title: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  robotsMeta: string | null;
  viewport: string | null;
  htmlLang: string | null;
  h1: string | null;
  h1s: string[];
  h2s: string[];
  h3s: string[];
  visibleBodyText: string;
  approximateWordCount: number;
  first100Words: string;
  ctas: AuditCta[];
  contactDetails: string[];
  trustSignals: string[];
  internalLinks: AuditLink[];
  externalLinks: AuditLink[];
  imageCount: number;
  imagesMissingAlt: AuditImage[];
  jsonLd: unknown[];
  robotsTxt: AvailabilityCheck;
  sitemapXml: AvailabilityCheck;
  noindex: boolean;
  canonicalConsistency: CheckStatus;
  mobileViewport: CheckStatus;
  speed: AvailabilityCheck;
}

export interface AuditScoreItem {
  label: string;
  points: number;
  max: number;
  evidence: string;
  status: "pass" | "partial" | "fail" | "not_checked";
}

export interface AuditScore {
  category: AuditCategory;
  score: number;
  max: number;
  items: AuditScoreItem[];
}

export interface AuditFinding {
  priority: FixPriority;
  category: AuditCategory;
  issue: string;
  whyItMatters: string;
  evidence: string;
  recommendedFix: string;
  impact: Impact;
  effort: Effort;
}

export interface AuditRecommendation {
  type:
    | "meta_title"
    | "meta_description"
    | "h1"
    | "h2_structure"
    | "internal_links"
    | "schema"
    | "faq"
    | "geo_aeo"
    | "authority"
    | "llms_txt";
  title: string;
  recommendation: string | string[];
  evidence: string;
}

export interface RewrittenLandingSection {
  headline: string;
  subheadline: string;
  bullets: string[];
  cta: string;
  trustProofRow: string[];
}

export interface AuditReport {
  id: string;
  url: string;
  generatedAt: string;
  pageName: string;
  overallScore: number;
  verdict: string;
  biggestMissedOpportunity: string;
  scores: AuditScore[];
  evidenceSummary: {
    title: string;
    metaDescription: string;
    h1: string;
    h1Count: number;
    h2Count: number;
    wordCount: number;
    statusCode: string;
    canonicalUrl: string;
    canonicalConsistency: string;
    robotsMeta: string;
    viewport: string;
    htmlLang: string;
    schema: string;
    sitemap: string;
    robots: string;
    imagesMissingAlt: number;
    ctaTextFound: string[];
  };
  priorityFixes: Record<FixPriority, AuditFinding[]>;
  recommendations: AuditRecommendation[];
  rewrittenLandingSection: RewrittenLandingSection;
  actionPlan30Day: string[];
  placeholders: string[];
}

export interface StoredAudit {
  id: string;
  input: AuditInput;
  extractedData: AuditExtractedData;
  scores: AuditScore[];
  report: AuditReport;
  createdAt: string;
}

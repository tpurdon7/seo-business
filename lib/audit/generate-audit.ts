import type {
  AuditExtractedData,
  AuditFinding,
  AuditRecommendation,
  AuditReport,
  AuditScore,
  FixPriority,
} from "@/lib/audit/types";
import { shortEvidence, statusLabel, titleCaseFromDomain, totalScore } from "@/lib/audit/utils";

function groupFindings(findings: AuditFinding[]) {
  return findings.reduce<Record<FixPriority, AuditFinding[]>>(
    (groups, finding) => {
      groups[finding.priority].push(finding);
      return groups;
    },
    {
      "Fix now": [],
      "Improve next": [],
      "Build over time": [],
    },
  );
}

function scoreItemNeedsWork(score: AuditScore, label: string) {
  return score.items.find((item) => item.label === label && item.points < item.max);
}

function category(scores: AuditScore[], name: AuditScore["category"]) {
  const score = scores.find((current) => current.category === name);
  if (!score) throw new Error(`Missing ${name} score.`);
  return score;
}

function makeFindings(data: AuditExtractedData, scores: AuditScore[]): AuditFinding[] {
  const seo = category(scores, "SEO");
  const geo = category(scores, "GEO");
  const aeo = category(scores, "AEO");
  const cro = category(scores, "CRO");
  const authority = category(scores, "Authority");
  const findings: AuditFinding[] = [];

  if (scoreItemNeedsWork(seo, "Title tag quality")) {
    findings.push({
      priority: "Fix now",
      category: "SEO",
      issue: "The title tag is not doing enough search work.",
      whyItMatters: "The title is one of the strongest on-page signals and often becomes the search result headline.",
      evidence: shortEvidence(data.title, "No title tag was found."),
      recommendedFix: "Rewrite the title around the core service, location or market, and brand. Keep it close to 50 to 60 characters.",
      impact: "High",
      effort: "Low",
    });
  }

  if (scoreItemNeedsWork(seo, "Meta description quality")) {
    findings.push({
      priority: "Fix now",
      category: "SEO",
      issue: "The meta description is weak or missing.",
      whyItMatters: "A clear description improves click quality and helps searchers understand the offer before they visit.",
      evidence: shortEvidence(data.metaDescription, "No meta description was found."),
      recommendedFix: "Add a concise description with the service, buyer outcome, location if relevant, and a clear reason to contact the business.",
      impact: "Medium",
      effort: "Low",
    });
  }

  if (scoreItemNeedsWork(seo, "Heading structure")) {
    findings.push({
      priority: "Fix now",
      category: "SEO",
      issue: "The heading structure does not clearly map the page.",
      whyItMatters: "Good headings help Google, AI search tools, and users understand what the page covers.",
      evidence: `H1 count: ${data.h1s.length || (data.h1 ? 1 : 0)}. H1: ${shortEvidence(data.h1)}. H2 count: ${data.h2s.length}.`,
      recommendedFix: "Use one clear H1 and add descriptive H2s for service, proof, process, location, FAQs, and next steps.",
      impact: "High",
      effort: "Low",
    });
  }

  if (data.imagesMissingAlt.length > 0 || data.canonicalConsistency !== "found" || data.noindex) {
    findings.push({
      priority: "Fix now",
      category: "SEO",
      issue: "Indexability and page hygiene need attention.",
      whyItMatters: "Canonical, noindex, and image alt basics can affect how confidently search engines interpret the page.",
      evidence: `Canonical: ${shortEvidence(data.canonicalUrl)}. Canonical consistency: ${data.canonicalConsistency}. Missing image alt text: ${data.imagesMissingAlt.length}. Noindex: ${data.noindex ? "yes" : "no"}.`,
      recommendedFix: "Use a self-referencing canonical, remove accidental noindex tags, and add useful alt text to meaningful images.",
      impact: "High",
      effort: "Medium",
    });
  }

  if (data.statusCode && (data.statusCode < 200 || data.statusCode >= 400)) {
    findings.push({
      priority: "Fix now",
      category: "SEO",
      issue: "The page did not return a clean successful status.",
      whyItMatters: "Search engines need the final landing page to resolve reliably before they can index and rank it.",
      evidence: `Status code: ${data.statusCode}. Final URL: ${data.finalUrl}.`,
      recommendedFix: "Check redirects, server responses, blocking rules, and any authentication or bot protection affecting the page.",
      impact: "High",
      effort: "Medium",
    });
  }

  if (data.robotsTxt.status === "not_checked" || data.sitemapXml.status === "not_checked") {
    findings.push({
      priority: "Build over time",
      category: "SEO",
      issue: "Some crawlability checks could not be completed.",
      whyItMatters: "Robots.txt and sitemap.xml help confirm how search engines are allowed to discover and crawl the site.",
      evidence: `Robots.txt: ${data.robotsTxt.status}. Sitemap.xml: ${data.sitemapXml.status}.`,
      recommendedFix: "Re-run the audit when the site is reachable without blocking, then verify robots.txt and sitemap.xml directly.",
      impact: "Medium",
      effort: "Low",
    });
  }

  if (scoreItemNeedsWork(geo, "Location and market relevance")) {
    findings.push({
      priority: "Improve next",
      category: "GEO",
      issue: "The page gives weak location or market context.",
      whyItMatters: "AI search needs enough entity context to know where the business operates and who it is relevant for.",
      evidence: "No strong location, market, or service-area signal was found in the title, description, H1, or opening copy.",
      recommendedFix: "Add natural location and market phrasing near the top of the page, then support it with service-area copy and local proof.",
      impact: "High",
      effort: "Low",
    });
  }

  if (scoreItemNeedsWork(geo, "Proof and authority signals") || scoreItemNeedsWork(authority, "Visible credibility indicators")) {
    findings.push({
      priority: "Improve next",
      category: "Authority",
      issue: "The page lacks visible proof that the business is trusted.",
      whyItMatters: "Google and AI search both lean on evidence. Prospects also need proof before they enquire.",
      evidence: data.trustSignals.length > 0 ? data.trustSignals.slice(0, 3).join(" ") : "No visible reviews, testimonials, case studies, accreditations, press, or client proof found.",
      recommendedFix: "Add specific reviews, client names where permitted, case study outcomes, accreditations, awards, and third-party profile links.",
      impact: "High",
      effort: "Medium",
    });
  }

  if (scoreItemNeedsWork(aeo, "FAQ or question-answer structure")) {
    findings.push({
      priority: "Improve next",
      category: "AEO",
      issue: "The page is not structured to answer direct questions.",
      whyItMatters: "Answer engines extract concise question-led sections. Without them, the page is harder to quote or summarize.",
      evidence: `Question-style H2/H3 headings found: ${[...data.h2s, ...data.h3s].filter((heading) => /\?/.test(heading)).length}.`,
      recommendedFix: "Add a short FAQ section using real buyer questions, with direct 40 to 70 word answers.",
      impact: "Medium",
      effort: "Low",
    });
  }

  if (scoreItemNeedsWork(aeo, "Schema and answer readiness")) {
    findings.push({
      priority: "Build over time",
      category: "AEO",
      issue: "Rendered structured data is missing or thin.",
      whyItMatters: "Schema gives search systems a cleaner machine-readable summary of the page, business, and answers.",
      evidence: data.jsonLd.length > 0 ? `${data.jsonLd.length} JSON-LD block(s) found.` : "No rendered JSON-LD blocks were found.",
      recommendedFix: "Add Organization, LocalBusiness, Service, BreadcrumbList, and FAQPage schema where the page content supports it.",
      impact: "Medium",
      effort: "Medium",
    });
  }

  if (scoreItemNeedsWork(cro, "CTA clarity")) {
    findings.push({
      priority: "Fix now",
      category: "CRO",
      issue: "The page does not have a clear conversion action.",
      whyItMatters: "Visitors need one obvious next step when they are ready to enquire.",
      evidence: data.ctas.length > 0 ? data.ctas.map((cta) => cta.text).join(", ") : "No clear CTA text found.",
      recommendedFix: "Use a specific CTA such as 'Book a visibility review' or 'Request an SEO audit' in the hero and repeated after proof sections.",
      impact: "High",
      effort: "Low",
    });
  }

  return findings.slice(0, 10);
}

function makeRecommendations(data: AuditExtractedData): AuditRecommendation[] {
  const pageName = data.h1 || titleCaseFromDomain(data.domain);
  const servicePhrase = pageName.replace(/[|•].*$/, "").trim();

  return [
    {
      type: "meta_title",
      title: "Improved meta title",
      recommendation: `${servicePhrase} | Trusted ${data.domain.replace(/^www\./, "")}`,
      evidence: shortEvidence(data.title, "No title tag was found."),
    },
    {
      type: "meta_description",
      title: "Improved meta description",
      recommendation: `Find out how ${servicePhrase.toLowerCase()} can help you choose the right provider, see proof, compare services, and take the next step with confidence.`,
      evidence: shortEvidence(data.metaDescription, "No meta description was found."),
    },
    {
      type: "h1",
      title: "Improved H1",
      recommendation: `${servicePhrase} that makes the next step clear`,
      evidence: shortEvidence(data.h1, "No H1 was found."),
    },
    {
      type: "h2_structure",
      title: "Suggested H2 structure",
      recommendation: [
        `What ${servicePhrase} helps you do`,
        "Who this service is for",
        "Why customers choose us",
        "Proof, reviews, and results",
        "How the process works",
        "Common questions",
      ],
      evidence: data.h2s.length > 0 ? data.h2s.slice(0, 8).join(", ") : "No H2 headings found.",
    },
    {
      type: "internal_links",
      title: "Internal link suggestions",
      recommendation: [
        "Link from the homepage using descriptive service anchor text.",
        "Add links to relevant service, location, case study, and FAQ pages.",
        "Add a contextual link from related guide content to this landing page.",
      ],
      evidence: `${data.internalLinks.length} internal links found on the audited page.`,
    },
    {
      type: "schema",
      title: "Schema recommendations",
      recommendation: [
        "Organization or LocalBusiness schema for the business entity.",
        "Service schema for the core offer.",
        "FAQPage schema only for visible FAQ content.",
        "BreadcrumbList schema if the page sits in a wider site hierarchy.",
      ],
      evidence: data.jsonLd.length > 0 ? `${data.jsonLd.length} JSON-LD block(s) found.` : "No rendered JSON-LD schema found.",
    },
    {
      type: "faq",
      title: "FAQ questions to add",
      recommendation: [
        `What does ${servicePhrase.toLowerCase()} include?`,
        "How long does it take to see results?",
        "Who is this service best for?",
        "How much does it cost?",
        "What proof should I look for before choosing a provider?",
      ],
      evidence: `${[...data.h2s, ...data.h3s].filter((heading) => /\?/.test(heading)).length} question-style headings found.`,
    },
    {
      type: "geo_aeo",
      title: "GEO and AEO phrasing to add",
      recommendation: [
        "Add one sentence that plainly defines the business category.",
        "Name the market, location, or service area in natural language.",
        "Add a short 'best for' section so AI systems understand buyer fit.",
        "Use direct answer paragraphs under question-led headings.",
      ],
      evidence: shortEvidence(data.first100Words),
    },
    {
      type: "authority",
      title: "Third-party proof to pursue",
      recommendation: [
        "Google Business Profile reviews.",
        "Relevant trade directories and local business directories.",
        "Industry associations or accreditations.",
        "Client case studies and named testimonials where permission allows.",
        "Press, podcast, partner, or expert contribution mentions.",
      ],
      evidence: data.trustSignals.length > 0 ? data.trustSignals.slice(0, 3).join(" ") : "No strong visible trust proof found.",
    },
    {
      type: "llms_txt",
      title: "LLMs.txt recommendation",
      recommendation: "Add an llms.txt file once the site has a stable set of high-quality service, proof, FAQ, and guide pages worth pointing AI systems toward.",
      evidence: "LLMs.txt was not checked in this MVP.",
    },
  ];
}

function makeRewrittenSection(data: AuditExtractedData) {
  const pageName = data.h1 || titleCaseFromDomain(data.domain);
  const cta = data.ctas[0]?.text || "Book a visibility review";

  return {
    headline: `${pageName} for people ready to choose with confidence`,
    subheadline:
      "A clearer landing page should explain the service, show why the business can be trusted, and make the next step obvious within the first screen.",
    bullets: [
      "Say exactly who the service is for and what problem it solves.",
      "Add visible proof from reviews, results, accreditations, or client work.",
      "Answer the questions buyers ask before they enquire.",
    ],
    cta,
    trustProofRow:
      data.trustSignals.length > 0
        ? data.trustSignals.slice(0, 3)
        : ["Reviews", "Case studies", "Accreditations"],
  };
}

export function generateAuditReport(id: string, data: AuditExtractedData, scores: AuditScore[]): AuditReport {
  const overallScore = totalScore(scores);
  const pageName = data.h1 || data.title || titleCaseFromDomain(data.domain);
  const findings = makeFindings(data, scores);
  const weakProof = data.trustSignals.length === 0;
  const weakQuestions = ![...data.h2s, ...data.h3s].some((heading) => /\?/.test(heading));

  return {
    id,
    url: data.finalUrl,
    generatedAt: new Date().toISOString(),
    pageName,
    overallScore,
    verdict:
      overallScore >= 80
        ? "Strong foundations, with a few improvements that would make the page easier to cite and trust."
        : overallScore >= 60
          ? "Decent foundations, but the page needs clearer proof, structure, and answer-ready sections."
          : "The page is under-explaining the offer and giving search systems too little evidence to trust it.",
    biggestMissedOpportunity: weakProof
      ? "This page may explain the service, but it gives Google and AI search very little visible evidence that the business is trusted."
      : weakQuestions
        ? "This page has some proof, but it is not packaged into direct answers that AI search can easily extract."
        : "The page has useful ingredients, but they need sharper structure and clearer commercial prioritisation.",
    scores,
    evidenceSummary: {
      title: shortEvidence(data.title),
      metaDescription: shortEvidence(data.metaDescription),
      h1: shortEvidence(data.h1),
      h1Count: data.h1s.length || (data.h1 ? 1 : 0),
      h2Count: data.h2s.length,
      wordCount: data.approximateWordCount,
      statusCode: data.statusCode ? String(data.statusCode) : "Not checked",
      canonicalUrl: shortEvidence(data.canonicalUrl),
      canonicalConsistency: statusLabel(data.canonicalConsistency),
      robotsMeta: shortEvidence(data.robotsMeta),
      viewport: data.viewport ? "Found" : "Not found",
      htmlLang: shortEvidence(data.htmlLang),
      schema: data.jsonLd.length > 0 ? `Found ${data.jsonLd.length}` : "Not found",
      sitemap: statusLabel(data.sitemapXml.status),
      robots: statusLabel(data.robotsTxt.status),
      imagesMissingAlt: data.imagesMissingAlt.length,
      ctaTextFound: data.ctas.map((cta) => cta.text).slice(0, 8),
    },
    priorityFixes: groupFindings(findings),
    recommendations: makeRecommendations(data),
    rewrittenLandingSection: makeRewrittenSection(data),
    actionPlan30Day: [
      "Week 1: Fix title, meta description, H1, canonical, noindex risk, image alt text, and primary CTA.",
      "Week 2: Rebuild the page structure with clearer H2 sections, service/category language, and visible proof.",
      "Week 3: Add FAQ content, answer-ready sections, and schema that matches visible page content.",
      "Week 4: Add authority assets such as case studies, reviews, directory profiles, and internal links from relevant pages.",
    ],
    placeholders: [
      "Speed scoring is not checked yet. Add Lighthouse or PageSpeed Insights in the next pass.",
      "Directory presence, Google Business Profile checks, backlinks, Reddit/forum mentions, and competitor comparisons are placeholders for later prospecting modules.",
    ],
  };
}

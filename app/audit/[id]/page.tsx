import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleAlert, ExternalLink, Gauge, LineChart, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { crawlUrl } from "@/lib/audit/crawl-url";
import { generateAuditReport } from "@/lib/audit/generate-audit";
import { scorePage } from "@/lib/audit/score-page";
import { saveAudit } from "@/lib/audit/store";
import { getAudit } from "@/lib/audit/store";
import type { AuditFinding, AuditRecommendation, AuditScore } from "@/lib/audit/types";
import { urlFromAuditId } from "@/lib/audit/utils";
import { cn } from "@/lib/utils";

export const maxDuration = 60;

function scoreTone(score: number, max: number) {
  const percent = (score / max) * 100;
  if (percent >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (percent >= 60) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function ScoreCard({ score }: { score: AuditScore }) {
  const percent = Math.round((score.score / score.max) * 100);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">{score.category}</CardTitle>
          <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", scoreTone(score.score, score.max))}>
            {score.score}/{score.max}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-orange-600" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-4 space-y-3">
          {score.items.map((item) => (
            <div key={item.label} className="text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-800">{item.label}</span>
                <span className="text-slate-500">
                  {item.points}/{item.max}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.evidence}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FindingCard({ finding }: { finding: AuditFinding }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{finding.category}</span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1",
            finding.impact === "High" ? "bg-red-50 text-red-700" : finding.impact === "Medium" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700",
          )}
        >
          {finding.impact} impact
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{finding.effort} effort</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-950">{finding.issue}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{finding.whyItMatters}</p>
      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3">
          <p className="font-semibold text-slate-800">Evidence</p>
          <p className="mt-1 leading-6 text-slate-600">{finding.evidence}</p>
        </div>
        <div className="rounded-md bg-orange-50 p-3">
          <p className="font-semibold text-orange-950">Recommended fix</p>
          <p className="mt-1 leading-6 text-orange-900">{finding.recommendedFix}</p>
        </div>
      </div>
    </div>
  );
}

function RecommendationBlock({ recommendation }: { recommendation: AuditRecommendation }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-950">{recommendation.title}</h3>
      {Array.isArray(recommendation.recommendation) ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {recommendation.recommendation.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-700">{recommendation.recommendation}</p>
      )}
      <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">Evidence: {recommendation.evidence}</p>
    </div>
  );
}

export default async function AuditReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let audit = getAudit(id);

  if (!audit) {
    const url = urlFromAuditId(id);

    if (url) {
      const extractedData = await crawlUrl(url);
      const scores = scorePage(extractedData);
      const report = generateAuditReport(id, extractedData, scores);
      const createdAt = new Date().toISOString();

      audit = saveAudit({
        id,
        input: { url },
        extractedData,
        scores,
        report,
        createdAt,
      });
    }
  }

  if (!audit) {
    notFound();
  }

  const { report, extractedData } = audit;
  const scoreSummary = report.scores.map((score) => `${score.category} ${score.score}/${score.max}`).join(" | ");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
          <Link href="/audit" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Run another audit
          </Link>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Better Search audit report</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl">{report.pageName}</h1>
            <a href={report.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 break-all text-sm text-slate-300 transition hover:text-white">
              {report.url}
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{report.verdict}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <p className="text-sm text-slate-300">Overall score</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-7xl font-semibold tabular-nums text-white">{report.overallScore}</span>
              <span className="pb-3 text-xl text-slate-400">/100</span>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-orange-500" style={{ width: `${report.overallScore}%` }} />
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">{scoreSummary}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-5">
          {report.scores.map((score) => (
            <ScoreCard key={score.category} score={score} />
          ))}
        </div>

        <Card className="mt-8 border-orange-200 bg-orange-50 shadow-sm">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-600 text-white">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <CardTitle>Biggest missed opportunity</CardTitle>
              <p className="mt-2 text-sm leading-6 text-orange-950">{report.biggestMissedOpportunity}</p>
            </div>
          </CardHeader>
        </Card>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Evidence summary</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4 text-sm">
                {Object.entries({
                  Title: report.evidenceSummary.title,
                  "Meta description": report.evidenceSummary.metaDescription,
                  H1: report.evidenceSummary.h1,
                  "H1 count": report.evidenceSummary.h1Count,
                  "H2 count": report.evidenceSummary.h2Count,
                  "Word count": report.evidenceSummary.wordCount,
                  "Status code": report.evidenceSummary.statusCode,
                  Canonical: report.evidenceSummary.canonicalUrl,
                  "Canonical consistency": report.evidenceSummary.canonicalConsistency,
                  "Robots meta": report.evidenceSummary.robotsMeta,
                  Viewport: report.evidenceSummary.viewport,
                  "HTML lang": report.evidenceSummary.htmlLang,
                  Schema: report.evidenceSummary.schema,
                  Sitemap: report.evidenceSummary.sitemap,
                  Robots: report.evidenceSummary.robots,
                  "Images missing alt": report.evidenceSummary.imagesMissingAlt,
                  "CTA text found": report.evidenceSummary.ctaTextFound.join(", ") || "Not found",
                }).map(([label, value]) => (
                  <div key={label} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <dt className="font-semibold text-slate-800">{label}</dt>
                    <dd className="mt-1 break-words leading-6 text-slate-600">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-orange-600" aria-hidden="true" />
                <h2 className="text-xl font-semibold">Crawl notes</h2>
              </div>
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <p className="rounded-md bg-slate-50 p-3">Rendered: {extractedData.rendered ? "Yes" : "No"}</p>
                <p className="rounded-md bg-slate-50 p-3">Status code: {extractedData.statusCode ?? "Not checked"}</p>
                <p className="rounded-md bg-slate-50 p-3">Canonical consistency: {extractedData.canonicalConsistency}</p>
                <p className="rounded-md bg-slate-50 p-3">Mobile viewport: {extractedData.mobileViewport}</p>
              </div>
            </div>
            {report.placeholders.map((placeholder) => (
              <div key={placeholder} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                <span>{placeholder}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Priority fixes</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {Object.entries(report.priorityFixes).map(([priority, findings]) => (
              <div key={priority}>
                <h3 className="mb-4 text-lg font-semibold text-slate-950">{priority}</h3>
                <div className="space-y-4">
                  {findings.length > 0 ? (
                    findings.map((finding) => <FindingCard key={`${finding.category}-${finding.issue}`} finding={finding} />)
                  ) : (
                    <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">No evidence-backed fixes in this bucket yet.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <LineChart className="h-6 w-6 text-orange-600" aria-hidden="true" />
            <h2 className="text-2xl font-semibold">Suggested SEO improvements</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {report.recommendations.slice(0, 6).map((recommendation) => (
              <RecommendationBlock key={recommendation.title} recommendation={recommendation} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Suggested GEO/AEO improvements</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {report.recommendations.slice(6).map((recommendation) => (
              <RecommendationBlock key={recommendation.title} recommendation={recommendation} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.72fr]">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Rewritten landing page section</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-slate-950 p-6 text-white">
                <h2 className="text-3xl font-semibold leading-tight">{report.rewrittenLandingSection.headline}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{report.rewrittenLandingSection.subheadline}</p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-200">
                  {report.rewrittenLandingSection.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white">
                  {report.rewrittenLandingSection.cta}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {report.rewrittenLandingSection.trustProofRow.map((proof) => (
                    <span key={proof} className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-200">
                      {proof}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>30-day action plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {report.actionPlan30Day.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-700">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}

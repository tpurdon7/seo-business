import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, CircleAlert, ExternalLink, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandableEvidence } from "@/components/audit/expandable-evidence";
import { getSharedPersistedAudit } from "@/lib/audit/persistent-store";
import type { AuditFinding, AuditRecommendation, AuditScore } from "@/lib/audit/types";
import { totalScore } from "@/lib/audit/utils";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

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
              <ExpandableEvidence>{item.evidence}</ExpandableEvidence>
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
      <div className="mt-4 rounded-md bg-orange-50 p-3 text-sm">
        <p className="font-semibold text-orange-950">Recommended fix</p>
        <p className="mt-1 leading-6 text-orange-900">{finding.recommendedFix}</p>
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
    </div>
  );
}

export default async function SharedAuditReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;
  const audit = token ? await getSharedPersistedAudit(id, token) : null;

  if (!audit || audit.status === "failed" || !audit.report_json) {
    notFound();
  }

  const report = audit.report_json;
  const overallScore = totalScore(report.scores);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="text-sm font-semibold text-slate-950">
            Better Search
          </Link>
          <a href={report.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
            Audited page
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Better Search visibility audit</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl">{report.pageName}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{report.verdict}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <p className="text-sm text-slate-300">Overall score</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-7xl font-semibold tabular-nums text-white">{overallScore}</span>
              <span className="pb-3 text-xl text-slate-400">/100</span>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-orange-500" style={{ width: `${overallScore}%` }} />
            </div>
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
          <h2 className="text-2xl font-semibold">Suggested improvements</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {report.recommendations.slice(0, 8).map((recommendation) => (
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

        <div className="mt-12 flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span>This automated audit is a directional review of one page. It should be paired with human review before making strategic SEO decisions.</span>
        </div>
      </section>
    </main>
  );
}

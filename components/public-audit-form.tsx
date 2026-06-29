"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuditFinding, AuditReport, AuditScore } from "@/lib/audit/types";
import { bookingLink } from "@/lib/site";
import { cn } from "@/lib/utils";

function normalizeUrlInput(value: string) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function scoreTone(score: number, max: number) {
  const percent = (score / max) * 100;
  if (percent >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (percent >= 60) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function ScorePill({ score }: { score: AuditScore }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-950">{score.category}</p>
        <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", scoreTone(score.score, score.max))}>
          {score.score}/{score.max}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-orange-600" style={{ width: `${Math.round((score.score / score.max) * 100)}%` }} />
      </div>
    </div>
  );
}

function FindingSummary({ finding }: { finding: AuditFinding }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{finding.category}</span>
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-700">{finding.priority}</span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-slate-950">{finding.issue}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{finding.recommendedFix}</p>
    </div>
  );
}

function AuditReportPreview({ report }: { report: AuditReport }) {
  const priorityFindings = [
    ...report.priorityFixes["Fix now"],
    ...report.priorityFixes["Improve next"],
  ].slice(0, 4);

  return (
    <section ref={undefined} className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8" id="free-audit-report">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
        <div className="grid gap-6 bg-slate-950 p-6 text-white sm:p-8">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">Generated audit report</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{report.pageName}</h2>
            <a href={report.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 break-all text-sm text-slate-300 hover:text-white">
              {report.url}
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">{report.verdict}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-300">Overall score</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-6xl font-semibold tabular-nums">{report.overallScore}</span>
              <span className="pb-2 text-lg text-slate-400">/100</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-orange-500" style={{ width: `${report.overallScore}%` }} />
            </div>
            <a
              href={bookingLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 block rounded-lg border border-orange-300/25 bg-orange-500/10 p-4 text-sm font-semibold leading-6 text-orange-100 transition hover:border-orange-300/50 hover:bg-orange-500/15 hover:text-white"
            >
              There&apos;s a lot of work to do - book a free consultation here
            </a>
          </div>
        </div>

        <div className="grid gap-4 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-5">
          {report.scores.map((score) => (
            <ScorePill key={score.category} score={score} />
          ))}
        </div>

        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-orange-200 bg-orange-50 shadow-sm">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-600 text-white">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <CardTitle>Biggest missed opportunity</CardTitle>
                <p className="mt-2 text-sm leading-6 text-orange-950">{report.biggestMissedOpportunity}</p>
              </div>
            </CardHeader>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>30-day action plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {report.actionPlan30Day.slice(0, 4).map((step, index) => (
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
        </div>

        <div className="grid gap-4 px-5 pb-8 sm:px-8 lg:grid-cols-4">
          {priorityFindings.map((finding) => (
            <FindingSummary key={`${finding.category}-${finding.issue}`} finding={finding} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PublicAuditForm({ compact = false }: { compact?: boolean }) {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  async function runAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReport(null);
    setLoading(true);

    try {
      const response = await fetch("/api/public-audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: normalizeUrlInput(url), email, niche, marketingOptIn }),
      });
      const payload = (await response.json()) as { report?: AuditReport; error?: string };

      if (!response.ok || !payload.report) {
        throw new Error(payload.error || "The audit could not be generated.");
      }

      setReport(payload.report);
      window.setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The audit could not be generated.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={cn("rounded-lg border border-slate-200 bg-white p-4 shadow-[0_28px_80px_rgba(15,23,42,0.16)] sm:p-5", compact && "shadow-none")}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">Free audit generator</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950">Generate your report now</h2>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <form onSubmit={runAudit} className="space-y-4">
          <div>
            <label htmlFor={compact ? "footer-audit-url" : "audit-url"} className="text-sm font-semibold text-slate-800">
              Website URL
            </label>
            <input
              id={compact ? "footer-audit-url" : "audit-url"}
              required
              type="text"
              inputMode="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="www.example.com"
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              disabled={loading}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={compact ? "footer-audit-email" : "audit-email"} className="text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                id={compact ? "footer-audit-email" : "audit-email"}
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor={compact ? "footer-audit-niche" : "audit-niche"} className="text-sm font-semibold text-slate-800">
                Niche
              </label>
              <input
                id={compact ? "footer-audit-niche" : "audit-niche"}
                required
                type="text"
                value={niche}
                onChange={(event) => setNiche(event.target.value)}
                placeholder="Private clinic, law firm..."
                className="mt-2 min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                disabled={loading}
              />
            </div>
          </div>

          <label className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(event) => setMarketingOptIn(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              disabled={loading}
            />
            <span>
              I agree to receive occasional Better Search emails about SEO, AI search visibility, and audit follow-ups. I can unsubscribe at any time.
            </span>
          </label>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Generating report
              </>
            ) : (
              <>
                Generate free audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 flex gap-2 text-sm leading-6 text-slate-500">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>Your report appears on this page as soon as the crawl finishes. Marketing emails are optional.</span>
        </div>

        {error ? (
          <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : null}
      </div>

      <div ref={reportRef}>{report ? <AuditReportPreview report={report} /> : null}</div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, BarChart3, BrainCircuit, FileSearch, Loader2, SearchCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const capabilities = [
  {
    title: "Rendered extraction",
    description: "Uses Playwright so injected JSON-LD and client-rendered page content can be checked.",
    icon: SearchCheck,
  },
  {
    title: "Evidence-based scoring",
    description: "Scores SEO, GEO, AEO, CRO, and authority from extracted page data.",
    icon: BarChart3,
  },
  {
    title: "Prospect-ready report",
    description: "Creates a polished audit page with fixes, suggested copy, and a 30-day action plan.",
    icon: FileSearch,
  },
];

export default function AuditPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function runAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const payload = (await response.json()) as { id?: string; error?: string };

      if (!response.ok || !payload.id) {
        throw new Error(payload.error || "The audit could not be created.");
      }

      router.push(`/audit/${payload.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The audit could not be created.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(234,88,12,0.22),transparent_36%),linear-gradient(135deg,#020617,#0f172a_62%,#111827)]">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="text-sm font-semibold text-white">
              Better Search
            </Link>
            <Link href="/" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Back to site
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                Internal SEO/GEO/AEO audit machine
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Audit any landing page for Google and AI search visibility.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Paste a URL and get a structured report that scores SEO, GEO, AEO, CRO, and authority strength with evidence-backed fixes.
              </p>

              <form onSubmit={runAudit} className="mt-10 max-w-2xl rounded-lg border border-white/10 bg-white p-2 shadow-2xl shadow-black/30 sm:flex">
                <label htmlFor="audit-url" className="sr-only">
                  Landing page URL
                </label>
                <input
                  id="audit-url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com/landing-page"
                  className="min-h-14 flex-1 rounded-md px-4 text-base text-slate-950 outline-none placeholder:text-slate-400"
                  disabled={loading}
                />
                <Button type="submit" size="lg" className="mt-2 w-full sm:mt-0 sm:w-auto" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Running audit
                    </>
                  ) : (
                    <>
                      Run audit
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>

              {error ? (
                <div className="mt-4 max-w-2xl rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              ) : null}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="rounded-lg border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500 text-white">
                    <BrainCircuit className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-400">Report model</p>
                    <p className="font-semibold text-white">SEO + GEO + AEO + CRO + authority</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-5 gap-2">
                  {[72, 58, 44, 68, 35].map((height, index) => (
                    <div key={index} className="flex h-40 items-end rounded-md bg-white/5 p-2">
                      <div className="w-full rounded-sm bg-orange-500" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="rounded-md bg-white/5 p-3">Rendered DOM</div>
                  <div className="rounded-md bg-white/5 p-3">Schema check</div>
                  <div className="rounded-md bg-white/5 p-3">Evidence map</div>
                  <div className="rounded-md bg-white/5 p-3">Copy rewrite</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 pb-10 md:grid-cols-3">
            {capabilities.map((item) => (
              <Card key={item.title} className="border-white/10 bg-white/[0.06] text-white shadow-none">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-orange-300">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

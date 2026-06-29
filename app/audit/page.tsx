import Link from "next/link";
import { BarChart3, BrainCircuit, FileSearch, SearchCheck } from "lucide-react";

import { AuditRunner } from "@/app/audit/audit-runner";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsageState } from "@/lib/audit/persistent-store";
import { getCurrentUserFromCookies } from "@/lib/auth/actor";

export const dynamic = "force-dynamic";

const capabilities = [
  {
    title: "Rendered extraction",
    description: "Uses browser rendering so injected JSON-LD and client-rendered content can be checked.",
    icon: SearchCheck,
  },
  {
    title: "Evidence-based scoring",
    description: "Scores SEO, GEO, AEO, CRO, and authority from extracted page data.",
    icon: BarChart3,
  },
  {
    title: "Shareable report",
    description: "Creates a report page you can revisit and share without requiring viewers to log in.",
    icon: FileSearch,
  },
];

export default async function AuditPage() {
  const user = await getCurrentUserFromCookies();
  const usage = user ? await getUsageState(user.id, user.email) : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(234,88,12,0.22),transparent_36%),linear-gradient(135deg,#020617,#0f172a_62%,#111827)]">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="text-sm font-semibold text-white">
              Better Search
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/account" className="text-sm font-medium text-slate-300 transition hover:text-white">
                    Account
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button type="submit" className="text-sm font-medium text-slate-300 transition hover:text-white">
                      Sign out
                    </button>
                  </form>
                </>
              ) : null}
              <Link href="/" className="text-sm font-medium text-slate-300 transition hover:text-white">
                Back to site
              </Link>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                Public SEO/GEO/AEO audit
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Audit one landing page for Google and AI search visibility.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Sign in with email, run your launch audit, and get a shareable report with evidence-backed fixes.
              </p>

              {user && usage ? (
                <AuditRunner
                  email={user.email ?? "your account"}
                  freeAuditsUsed={usage.free_audits_used}
                  freeAuditLimit={usage.free_audit_limit}
                />
              ) : (
                <LoginForm />
              )}
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
                  <div className="rounded-md bg-white/5 p-3">Shareable report</div>
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

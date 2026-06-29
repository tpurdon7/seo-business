import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LeadsDashboard, type LeadRecord } from "@/app/leads/leads-dashboard";
import { isConfiguredAdmin } from "@/lib/auth/admin";
import { getCurrentUserFromCookies } from "@/lib/auth/actor";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads CRM | Better Search",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LeadsPage() {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect("/login?next=/leads");
  }

  if (!isConfiguredAdmin(user.email)) {
    redirect("/account");
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("waitlist_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center" aria-label="Better Search home">
            <Image
              src="/better-search-logo.png"
              alt="Better Search"
              width={1774}
              height={887}
              priority
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/account" className="text-slate-600 transition hover:text-slate-950">
              Account
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-slate-600 transition hover:text-slate-950">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
            Better Search CRM
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Lead dashboard</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                View free audit leads, waitlist requests, consent status, niches, URLs, and report scores in one simple workspace.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-300">
              Signed in as <span className="font-semibold text-white">{user.email}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <LeadsDashboard leads={(data ?? []) as LeadRecord[]} />
      </section>
    </main>
  );
}

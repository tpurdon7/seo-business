import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountClient } from "@/app/account/account-client";
import { getUsageState } from "@/lib/audit/persistent-store";
import { isConfiguredAdmin } from "@/lib/auth/admin";
import { getCurrentUserFromCookies } from "@/lib/auth/actor";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Account | Better Search",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect("/login?next=/account");
  }

  const usage = await getUsageState(user.id, user.email);
  const supabase = createSupabaseAdminClient();
  const { data: tokens } = await supabase
    .from("api_tokens")
    .select("id, name, created_at, last_used_at")
    .eq("user_id", user.id)
    .is("revoked_at", null)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-8 lg:px-10">
          <Link href="/audit" className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">
            Back to audit
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">
              Sign out
            </button>
          </form>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">Account</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">{user.email}</h1>
        <p className="mt-3 text-sm text-slate-600">
          Free audits used: {usage.free_audits_used}/{usage.free_audit_limit}
        </p>
        {isConfiguredAdmin(user.email) ? (
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/leads" className="rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-orange-300 hover:text-orange-700">
              Leads
            </Link>
            <Link href="/analytics" className="rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-orange-300 hover:text-orange-700">
              Analytics
            </Link>
          </div>
        ) : null}
        <div className="mt-8">
          <AccountClient tokens={(tokens ?? []) as never} canCreateToken={isConfiguredAdmin(user.email)} />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, ArrowUpRight, Clock, MousePointerClick, Users, Waypoints } from "lucide-react";

import { isConfiguredAdmin } from "@/lib/auth/admin";
import { getCurrentUserFromCookies } from "@/lib/auth/actor";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website Analytics | Better Search",
  robots: {
    index: false,
    follow: false,
  },
};

interface AnalyticsSummary {
  sessions: number;
  visitors: number;
  pageViews: number;
  avgActiveSeconds: number;
  errors: number;
  outboundClicks: number;
}

interface PageStat {
  path: string;
  views: number;
  sessions: number;
  active_ms: number;
  avg_active_ms: number;
}

interface SourceStat {
  source: string;
  medium: string;
  sessions: number;
  visitors: number;
}

interface ReferrerStat {
  referrer: string;
  sessions: number;
}

interface TimelinePoint {
  day: string;
  sessions: number;
  visitors: number;
}

interface RecentEvent {
  created_at: string;
  path: string | null;
  event_name: string | null;
  event_data: Record<string, unknown>;
}

interface AnalyticsData {
  rangeDays: number;
  summary: AnalyticsSummary;
  topPages: PageStat[];
  sources: SourceStat[];
  referrers: ReferrerStat[];
  recentErrors: RecentEvent[];
  recentClicks: RecentEvent[];
  daily: TimelinePoint[];
}

const emptyAnalytics: AnalyticsData = {
  rangeDays: 30,
  summary: {
    sessions: 0,
    visitors: 0,
    pageViews: 0,
    avgActiveSeconds: 0,
    errors: 0,
    outboundClicks: 0,
  },
  topPages: [],
  sources: [],
  referrers: [],
  recentErrors: [],
  recentClicks: [],
  daily: [],
};

function seconds(value: number) {
  if (value < 60) return `${value}s`;
  const minutes = Math.floor(value / 60);
  const remainder = value % 60;
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function eventLabel(event: RecentEvent) {
  const label = typeof event.event_data?.label === "string" ? event.event_data.label : event.event_name;
  return label || "Tracked event";
}

function eventHref(event: RecentEvent) {
  return typeof event.event_data?.href === "string" ? event.event_data.href : "";
}

function message(event: RecentEvent) {
  return typeof event.event_data?.message === "string" ? event.event_data.message : "No message captured.";
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 tabular-nums">{value}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">{children}</div>;
}

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect("/login?next=/analytics");
  }

  if (!isConfiguredAdmin(user.email)) {
    redirect("/account");
  }

  const { days: rawDays } = await searchParams;
  const days = Math.min(Math.max(Number(rawDays || 30) || 30, 1), 365);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_site_analytics", { p_days: days });

  if (error && !error.message.includes("Not allowed")) {
    throw new Error(error.message);
  }

  const analytics = (data as AnalyticsData | null) ?? emptyAnalytics;
  const summary = analytics.summary;

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center" aria-label="Better Search home">
            <Image src="/better-search-logo.png" alt="Better Search" width={1774} height={887} priority className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/leads" className="text-slate-600 transition hover:text-slate-950">
              Leads
            </Link>
            <Link href="/account" className="text-slate-600 transition hover:text-slate-950">
              Account
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Better Search analytics</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Website data tracker</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Track where visitors came from, what they looked at, how long they stayed active, and where the site had issues.
              </p>
            </div>
            <form className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] p-2">
              {[7, 30, 90].map((option) => (
                <Link
                  key={option}
                  href={`/analytics?days=${option}`}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                    days === option ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {option}d
                </Link>
              ))}
            </form>
          </div>
        </div>
      </section>

      {error?.message.includes("Not allowed") ? (
        <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <EmptyState>Your account is signed in, but it is not on the analytics admin list.</EmptyState>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl space-y-6 px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <MetricCard label="Sessions" value={summary.sessions.toString()} detail={`Last ${analytics.rangeDays} days`} icon={Waypoints} />
            <MetricCard label="Visitors" value={summary.visitors.toString()} detail="Unique browser visitors" icon={Users} />
            <MetricCard label="Pageviews" value={summary.pageViews.toString()} detail="Total viewed pages" icon={ArrowUpRight} />
            <MetricCard label="Avg active time" value={seconds(summary.avgActiveSeconds)} detail="Per session" icon={Clock} />
            <MetricCard label="Outbound clicks" value={summary.outboundClicks.toString()} detail="External and Calendly clicks" icon={MousePointerClick} />
            <MetricCard label="Issues" value={summary.errors.toString()} detail="Browser errors captured" icon={AlertTriangle} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Pages with the most attention</h2>
              <div className="mt-5 space-y-3">
                {analytics.topPages.length ? (
                  analytics.topPages.map((page) => (
                    <div key={page.path} className="grid gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:items-center">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-950">{page.path}</p>
                        <p className="mt-1 text-sm text-slate-500">{page.views} pageviews · {page.sessions} sessions</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{seconds(Math.round(page.active_ms / 1000))} active</p>
                      <p className="text-sm text-slate-500">{seconds(Math.round(page.avg_active_ms / 1000))} avg</p>
                    </div>
                  ))
                ) : (
                  <EmptyState>No page engagement recorded yet.</EmptyState>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Traffic sources</h2>
              <div className="mt-5 space-y-3">
                {analytics.sources.length ? (
                  analytics.sources.map((source) => (
                    <div key={`${source.source}-${source.medium}`} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <div>
                        <p className="font-semibold capitalize text-slate-950">{source.source}</p>
                        <p className="mt-1 text-sm text-slate-500">{source.medium}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold tabular-nums text-slate-950">{source.sessions}</p>
                        <p className="text-xs text-slate-500">{source.visitors} visitors</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState>No sources recorded yet.</EmptyState>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Referrers</h2>
              <div className="mt-5 space-y-3">
                {analytics.referrers.length ? (
                  analytics.referrers.map((referrer) => (
                    <div key={referrer.referrer} className="rounded-lg bg-slate-50 p-4">
                      <p className="truncate text-sm font-semibold text-slate-950">{referrer.referrer}</p>
                      <p className="mt-1 text-xs text-slate-500">{referrer.sessions} sessions</p>
                    </div>
                  ))
                ) : (
                  <EmptyState>No external referrers yet.</EmptyState>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Recent clicks</h2>
              <div className="mt-5 space-y-3">
                {analytics.recentClicks.length ? (
                  analytics.recentClicks.map((event) => {
                    const href = eventHref(event);
                    return (
                      <div key={`${event.created_at}-${event.path}-${eventLabel(event)}`} className="rounded-lg bg-slate-50 p-4">
                        <p className="font-semibold text-slate-950">{eventLabel(event)}</p>
                        <p className="mt-1 text-xs text-slate-500">{formatDate(event.created_at)} · {event.path}</p>
                        {href ? <p className="mt-2 truncate text-xs text-orange-700">{href}</p> : null}
                      </div>
                    );
                  })
                ) : (
                  <EmptyState>No clicks recorded yet.</EmptyState>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Site issues</h2>
              <div className="mt-5 space-y-3">
                {analytics.recentErrors.length ? (
                  analytics.recentErrors.map((event) => (
                    <div key={`${event.created_at}-${event.path}-${message(event)}`} className="rounded-lg border border-red-100 bg-red-50 p-4">
                      <p className="font-semibold text-red-900">{message(event)}</p>
                      <p className="mt-1 text-xs text-red-700">{formatDate(event.created_at)} · {event.path}</p>
                    </div>
                  ))
                ) : (
                  <EmptyState>No browser errors recorded.</EmptyState>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Daily trend</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {analytics.daily.length ? (
                analytics.daily.slice(-14).map((day) => (
                  <div key={day.day} className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(day.day))}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 tabular-nums">{day.sessions}</p>
                    <p className="text-xs text-slate-500">{day.visitors} visitors</p>
                  </div>
                ))
              ) : (
                <EmptyState>No trend data yet.</EmptyState>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

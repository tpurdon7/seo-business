"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Mail,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface LeadRecord {
  id: string;
  email: string;
  message: string | null;
  created_at: string;
  niche?: string | null;
  website_url?: string | null;
  marketing_opt_in?: boolean | null;
  source?: string | null;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function sourceLabel(source?: string | null) {
  if (source === "public_free_audit") return "Free audit";
  if (source === "waitlist") return "Waitlist";
  return source ? source.replace(/_/g, " ") : "Request";
}

function scoreFromMessage(message?: string | null) {
  const match = message?.match(/Score:\s*(\d+)\/100/i);
  return match?.[1] ? Number(match[1]) : null;
}

function auditIdFromMessage(message?: string | null) {
  return message?.match(/Audit ID:\s*([a-z0-9-]+)/i)?.[1] ?? null;
}

function cleanMessage(message?: string | null) {
  if (!message) return "No notes captured yet.";
  return message
    .replace(/Public free audit generated for .*?\.\s*/i, "")
    .replace(/Niche: .*?\.\s*/i, "")
    .replace(/Marketing opt-in: .*?\.\s*/i, "")
    .replace(/Audit ID: .*?\.\s*/i, "")
    .replace(/Score: \d+\/100\.\s*/i, "")
    .trim() || "Generated from the free audit form.";
}

function scoreTone(score: number | null) {
  if (score === null) return "bg-slate-100 text-slate-600";
  if (score >= 75) return "bg-emerald-50 text-emerald-700";
  if (score >= 55) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

export function LeadsDashboard({ leads }: { leads: LeadRecord[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [consent, setConsent] = useState("all");

  const filteredLeads = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesQuery =
        !needle ||
        [lead.email, lead.niche, lead.website_url, lead.message, lead.source]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(needle));
      const matchesSource = source === "all" || (lead.source || "waitlist") === source;
      const matchesConsent =
        consent === "all" ||
        (consent === "opted-in" && lead.marketing_opt_in === true) ||
        (consent === "not-opted-in" && lead.marketing_opt_in !== true);

      return matchesQuery && matchesSource && matchesConsent;
    });
  }, [consent, leads, query, source]);

  const auditLeads = leads.filter((lead) => lead.source === "public_free_audit").length;
  const optedIn = leads.filter((lead) => lead.marketing_opt_in === true).length;
  const averageScore = Math.round(
    leads.reduce((sum, lead) => sum + (scoreFromMessage(lead.message) ?? 0), 0) /
      Math.max(1, leads.filter((lead) => scoreFromMessage(lead.message) !== null).length),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total leads", leads.length.toString(), "All captured requests"],
          ["Audit leads", auditLeads.toString(), "From the homepage form"],
          ["Marketing opt-ins", optedIn.toString(), "Explicit consent only"],
          ["Avg audit score", averageScore ? `${averageScore}/100` : "None", "Generated reports"],
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950 tabular-nums">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                Better Search CRM
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Lead inbox</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(240px,1fr)_160px_170px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search email, niche, URL"
                  className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </label>
              <label className="relative block">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <select
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="all">All sources</option>
                  <option value="public_free_audit">Free audit</option>
                  <option value="waitlist">Waitlist</option>
                </select>
              </label>
              <select
                value={consent}
                onChange={(event) => setConsent(event.target.value)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              >
                <option value="all">All consent</option>
                <option value="opted-in">Opted in</option>
                <option value="not-opted-in">Not opted in</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLeads.map((lead) => {
            const score = scoreFromMessage(lead.message);
            const auditId = auditIdFromMessage(lead.message);

            return (
              <article key={lead.id} className="grid gap-4 p-5 transition hover:bg-slate-50 lg:grid-cols-[minmax(0,1fr)_180px_190px] lg:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-semibold text-white">
                      {sourceLabel(lead.source)}
                    </span>
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", scoreTone(score))}>
                      {score === null ? "No score" : `${score}/100`}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        lead.marketing_opt_in === true
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600",
                      )}
                    >
                      {lead.marketing_opt_in === true ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {lead.marketing_opt_in === true ? "Marketing yes" : "No marketing"}
                    </span>
                  </div>
                  <h3 className="mt-3 truncate text-lg font-semibold text-slate-950">{lead.email}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    <span>{lead.niche || "Niche not captured"}</span>
                    {lead.website_url ? (
                      <a href={lead.website_url} target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center gap-1 font-medium text-orange-700 hover:text-orange-600">
                        <span className="truncate">{lead.website_url}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{cleanMessage(lead.message)}</p>
                  {auditId ? (
                    <p className="mt-2 text-xs font-medium text-slate-400">Audit ID: {auditId}</p>
                  ) : null}
                </div>

                <div className="text-sm text-slate-600">
                  <p className="font-semibold text-slate-950">{formatDate(lead.created_at)}</p>
                  <p className="mt-1 text-slate-500">Captured date</p>
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:text-orange-700"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email
                  </a>
                </div>
              </article>
            );
          })}

          {filteredLeads.length === 0 ? (
            <div className="flex gap-3 p-8 text-sm leading-6 text-slate-600">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
              <span>No leads match those filters yet.</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

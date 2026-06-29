import { NextResponse } from "next/server";

import { crawlUrl } from "@/lib/audit/crawl-url";
import { generateAuditReport } from "@/lib/audit/generate-audit";
import { claimPublicAuditCapacity } from "@/lib/audit/public-rate-limit";
import { scorePage } from "@/lib/audit/score-page";
import type { AuditReport } from "@/lib/audit/types";
import { makeAuditId } from "@/lib/audit/utils";
import { validatePublicAuditUrl } from "@/lib/audit/url-security";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const maxDuration = 60;

interface PublicAuditBody {
  url?: unknown;
  email?: unknown;
  niche?: unknown;
  marketingOptIn?: unknown;
}

function cleanEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function cleanNiche(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, 140);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function saveLead({
  email,
  niche,
  url,
  marketingOptIn,
  report,
}: {
  email: string;
  niche: string;
  url: string;
  marketingOptIn: boolean;
  report: AuditReport;
}) {
  try {
    const supabase = createSupabaseAdminClient();
    const message = [
      `Public free audit generated for ${url}.`,
      `Niche: ${niche}.`,
      `Marketing opt-in: ${marketingOptIn ? "yes" : "no"}.`,
      `Audit ID: ${report.id}.`,
      `Score: ${report.overallScore}/100.`,
    ].join(" ");

    const leadPayload = {
      email,
      message,
      niche,
      website_url: url,
      marketing_opt_in: marketingOptIn,
      source: "public_free_audit",
    };

    const { error } = await supabase.from("waitlist_requests").insert(leadPayload);

    if (error) {
      const { error: fallbackError } = await supabase.from("waitlist_requests").insert({
        email,
        message,
      });

      if (fallbackError) {
        throw fallbackError;
      }
    }
  } catch (error) {
    console.error("public_audit_lead_save_failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      email,
      url,
    });
  }
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 10_000) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }

    const body = (await request.json()) as PublicAuditBody;
    const email = cleanEmail(body.email);
    const niche = cleanNiche(body.niche);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!niche) {
      return NextResponse.json({ error: "Please tell us your niche or industry." }, { status: 400 });
    }

    if (typeof body.url !== "string" || !body.url.trim()) {
      return NextResponse.json({ error: "Please enter the URL you want audited." }, { status: 400 });
    }

    const url = validatePublicAuditUrl(body.url);
    const hasCapacity = await claimPublicAuditCapacity(request, email, new URL(url).hostname);

    if (!hasCapacity) {
      return NextResponse.json(
        { error: "Too many free audits have been requested. Please try again later or contact Better Search." },
        { status: 429, headers: { "Retry-After": "3600" } },
      );
    }

    const extractedData = await crawlUrl(url);
    const scores = scorePage(extractedData);
    const report = generateAuditReport(makeAuditId(url), extractedData, scores);
    const marketingOptIn = body.marketingOptIn === true;

    await saveLead({ email, niche, url, marketingOptIn, report });

    return NextResponse.json({
      ok: true,
      report,
      lead: {
        email,
        niche,
        marketingOptIn,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The audit could not be generated.";
    const status = message.includes("URL") || message.includes("Private") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

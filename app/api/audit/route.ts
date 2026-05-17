import { NextResponse } from "next/server";

import { crawlUrl } from "@/lib/audit/crawl-url";
import { generateAuditReport } from "@/lib/audit/generate-audit";
import { scorePage } from "@/lib/audit/score-page";
import { saveAudit } from "@/lib/audit/store";
import type { AuditInput } from "@/lib/audit/types";
import { makeAuditId, normalizeUrl } from "@/lib/audit/utils";

export const runtime = "nodejs";
export const maxDuration = 45;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AuditInput>;

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "Please provide a URL to audit." }, { status: 400 });
    }

    const url = normalizeUrl(body.url);
    const id = makeAuditId(url);
    const extractedData = await crawlUrl(url);
    const scores = scorePage(extractedData);
    const report = generateAuditReport(id, extractedData, scores);
    const createdAt = new Date().toISOString();

    const stored = saveAudit({
      id,
      input: { url },
      extractedData,
      scores,
      report,
      createdAt,
    });

    return NextResponse.json({
      id: stored.id,
      url: stored.input.url,
      scores: stored.scores,
      report: stored.report,
      extractedData: stored.extractedData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed.";
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}

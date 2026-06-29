import { NextResponse } from "next/server";

import { auditCorsHeaders } from "@/lib/audit/api-headers";
import { AuditQuotaError, createQueuedSingleAuditForActor } from "@/lib/audit/audit-service";
import { triggerAuditWorker } from "@/lib/audit/trigger-worker";
import type { AuditInput } from "@/lib/audit/types";
import { authenticateRequest } from "@/lib/auth/actor";

export const runtime = "nodejs";
export const maxDuration = 45;

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: auditCorsHeaders(request),
  });
}

export async function POST(request: Request) {
  const headers = auditCorsHeaders(request);

  try {
    const actor = await authenticateRequest(request);

    if (!actor) {
      return NextResponse.json({ error: "Please sign in before running an audit." }, { status: 401, headers });
    }

    const body = (await request.json()) as Partial<AuditInput>;

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "Please provide a URL to audit." }, { status: 400, headers });
    }

    const result = await createQueuedSingleAuditForActor(actor, body.url);
    await triggerAuditWorker();

    return NextResponse.json({
      id: result.id,
      jobId: result.jobId,
      status: result.status,
      reportUrl: result.reportUrl,
    }, { headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed.";
    const status = error instanceof AuditQuotaError ? 402 : message.includes("URL") ? 400 : 500;

    return NextResponse.json(
      {
        error: message,
      },
      { status, headers },
    );
  }
}

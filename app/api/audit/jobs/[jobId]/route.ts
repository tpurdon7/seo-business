import { NextResponse } from "next/server";

import { auditCorsHeaders } from "@/lib/audit/api-headers";
import { getBatchAuditForApiToken } from "@/lib/audit/audit-service";
import { getPersistedJobForUser, listPersistedJobAudits } from "@/lib/audit/persistent-store";
import { isConfiguredAdmin } from "@/lib/auth/admin";
import { authenticateRequest } from "@/lib/auth/actor";
import { hashApiToken } from "@/lib/auth/tokens";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: auditCorsHeaders(request),
  });
}

export async function GET(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const headers = auditCorsHeaders(request);
  const { jobId } = await params;
  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.toLowerCase().startsWith("bearer ") ? authorization.slice("bearer ".length).trim() : "";

  if (bearerToken.startsWith("bsa_")) {
    try {
      const job = await getBatchAuditForApiToken(hashApiToken(bearerToken), jobId);

      if (!job) {
        return NextResponse.json({ error: "Audit job not found." }, { status: 404, headers });
      }

      return NextResponse.json(job, { headers });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Audit job could not be loaded.";
      const status = message.includes("Invalid or revoked") ? 401 : 500;
      return NextResponse.json({ error: message }, { status, headers });
    }
  }

  const actor = await authenticateRequest(request);

  if (!actor) {
    return NextResponse.json({ error: "Please sign in before viewing an audit job." }, { status: 401, headers });
  }

  if (!isConfiguredAdmin(actor.email)) {
    return NextResponse.json({ error: "Batch audit jobs are restricted to Better Search administrators." }, { status: 403, headers });
  }

  const job = await getPersistedJobForUser(jobId, actor.id);

  if (!job) {
    return NextResponse.json({ error: "Audit job not found." }, { status: 404, headers });
  }

  const audits = await listPersistedJobAudits(job.id, actor.id);

  return NextResponse.json(
    {
      jobId: job.id,
      status: job.status,
      total: job.total,
      completed: job.completed,
      failed: job.failed,
      audits: audits.map((audit) => ({
        url: audit.input_url,
        auditId: audit.id,
        status: audit.status,
        reportUrl: audit.status === "complete" || audit.status === "failed" ? `/audit/${audit.id}` : null,
        error: audit.error,
      })),
    },
    { headers },
  );
}

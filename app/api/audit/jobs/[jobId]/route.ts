import { NextResponse } from "next/server";

import { auditApiCorsHeaders } from "@/lib/audit/api-headers";
import { getBatchAuditJob } from "@/lib/audit/batch-store";
import { processNextQueuedBatchAudit } from "@/lib/audit/process-batch-job";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: auditApiCorsHeaders,
  });
}

export async function GET(_request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  let job = getBatchAuditJob(jobId);

  if (!job) {
    return NextResponse.json({ error: "Audit job not found." }, { status: 404, headers: auditApiCorsHeaders });
  }

  if (job.status === "running" && job.audits.some((audit) => audit.status === "queued")) {
    job = await processNextQueuedBatchAudit(jobId);
  }

  if (!job) {
    return NextResponse.json({ error: "Audit job not found." }, { status: 404, headers: auditApiCorsHeaders });
  }

  return NextResponse.json(
    {
      jobId: job.jobId,
      status: job.status,
      total: job.total,
      completed: job.completed,
      failed: job.failed,
      audits: job.audits,
    },
    { headers: auditApiCorsHeaders },
  );
}

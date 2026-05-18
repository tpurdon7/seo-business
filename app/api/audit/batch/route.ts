import { NextResponse } from "next/server";

import { auditApiCorsHeaders } from "@/lib/audit/api-headers";
import { createBatchAuditJob, getBatchAuditJob } from "@/lib/audit/batch-store";
import { processNextQueuedBatchAudit } from "@/lib/audit/process-batch-job";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: auditApiCorsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      urls?: unknown;
      source?: unknown;
    };

    if (!Array.isArray(body.urls) || body.urls.length === 0) {
      return NextResponse.json({ error: "Please provide at least one URL." }, { status: 400, headers: auditApiCorsHeaders });
    }

    const urls = body.urls.filter((url): url is string => typeof url === "string" && url.trim().length > 0);

    if (urls.length === 0) {
      return NextResponse.json({ error: "Please provide at least one valid URL." }, { status: 400, headers: auditApiCorsHeaders });
    }

    const job = createBatchAuditJob(urls);

    await processNextQueuedBatchAudit(job.jobId);

    const responseJob = getBatchAuditJob(job.jobId) ?? job;

    return NextResponse.json(
      {
        jobId: responseJob.jobId,
        status: responseJob.status,
        audits: responseJob.audits,
      },
      { headers: auditApiCorsHeaders },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Batch audit could not be created.";
    return NextResponse.json({ error: message }, { status: 500, headers: auditApiCorsHeaders });
  }
}

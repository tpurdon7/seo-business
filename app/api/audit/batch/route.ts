import { after, NextResponse } from "next/server";

import { auditCorsHeaders } from "@/lib/audit/api-headers";
import { createBatchAuditForActor, createBatchAuditForApiToken } from "@/lib/audit/audit-service";
import { isConfiguredAdmin } from "@/lib/auth/admin";
import { authenticateRequest } from "@/lib/auth/actor";
import { hashApiToken } from "@/lib/auth/tokens";
import { triggerAuditWorker } from "@/lib/audit/trigger-worker";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: auditCorsHeaders(request),
  });
}

export async function POST(request: Request) {
  const headers = auditCorsHeaders(request);

  try {
    const body = (await request.json()) as {
      urls?: unknown;
      source?: unknown;
    };

    if (!Array.isArray(body.urls) || body.urls.length === 0) {
      return NextResponse.json({ error: "Please provide at least one URL." }, { status: 400, headers });
    }

    const urls = body.urls.filter((url): url is string => typeof url === "string" && url.trim().length > 0);

    if (urls.length === 0) {
      return NextResponse.json({ error: "Please provide at least one valid URL." }, { status: 400, headers });
    }

    const authorization = request.headers.get("authorization");
    const bearerToken = authorization?.toLowerCase().startsWith("bearer ") ? authorization.slice("bearer ".length).trim() : "";
    const job = bearerToken.startsWith("bsa_")
      ? await createBatchAuditForApiToken(hashApiToken(bearerToken), urls)
      : await (async () => {
          const actor = await authenticateRequest(request);

          if (!actor) {
            return null;
          }

          if (!isConfiguredAdmin(actor.email)) {
            throw new Error("Batch audits are restricted to Better Search administrators.");
          }

          return createBatchAuditForActor(actor, urls);
        })();

    if (!job) {
      return NextResponse.json({ error: "Please sign in before running an audit." }, { status: 401, headers });
    }

    after(triggerAuditWorker);
    return NextResponse.json(job, { headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Batch audit could not be created.";
    const status = message.includes("Invalid or revoked") ? 401 : message.includes("restricted") ? 403 : message.includes("URL") ? 400 : 500;
    return NextResponse.json({ error: message }, { status, headers });
  }
}

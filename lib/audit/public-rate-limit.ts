import "server-only";

import { createHmac } from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseSecretKey } from "@/lib/supabase/env";

function rateLimitSecret() {
  const secret = process.env.AUDIT_RATE_LIMIT_SECRET || getSupabaseSecretKey();

  if (!secret) {
    throw new Error("Public audit rate limiting is not configured.");
  }

  return secret;
}

function keyHash(kind: string, value: string) {
  return createHmac("sha256", rateLimitSecret())
    .update(`${kind}:${value.trim().toLowerCase()}`)
    .digest("hex");
}

async function claim(kind: string, value: string, limit: number, windowSeconds: number) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("claim_public_audit_rate_limit", {
    p_key_hash: keyHash(kind, value),
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) throw new Error(error.message);
  return data === true;
}

function requestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function claimPublicAuditCapacity(request: Request, email: string, hostname: string) {
  const checks = [
    await claim("ip", requestIp(request), 5, 60 * 60),
    await claim("email", email, 3, 24 * 60 * 60),
    await claim("domain", hostname, 3, 24 * 60 * 60),
  ];

  return checks.every(Boolean);
}

export async function claimPasswordRecoveryCapacity(request: Request, email: string) {
  const checks = [
    await claim("password-recovery-ip", requestIp(request), 5, 60 * 60),
    await claim("password-recovery-email", email, 3, 60 * 60),
  ];

  return checks.every(Boolean);
}

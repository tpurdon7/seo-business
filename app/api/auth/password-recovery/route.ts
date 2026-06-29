import { NextResponse } from "next/server";

import { claimPasswordRecoveryCapacity } from "@/lib/audit/public-rate-limit";
import { sendRecoveryEmail } from "@/lib/auth/recovery-email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function cleanEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase().slice(0, 320) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function siteOrigin(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = new URL(request.url).origin;
  const url = new URL(configured || fallback);

  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
  }

  return url.origin;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = cleanEmail(body.email);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!(await claimPasswordRecoveryCapacity(request, email))) {
      return NextResponse.json(
        { error: "Too many reset requests. Wait an hour before trying again." },
        { status: 429 },
      );
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email,
    });

    // Do not reveal whether an account exists.
    if (error || !data.properties?.hashed_token) {
      return NextResponse.json({ ok: true });
    }

    const recoveryUrl = new URL("/auth/confirm", siteOrigin(request));
    recoveryUrl.searchParams.set("token_hash", data.properties.hashed_token);
    recoveryUrl.searchParams.set("type", "recovery");
    recoveryUrl.searchParams.set("next", "/reset-password");

    await sendRecoveryEmail({ email, recoveryUrl: recoveryUrl.toString() });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("password_recovery_failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Password recovery email is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }
}

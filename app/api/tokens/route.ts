import { NextResponse } from "next/server";

import { createPlainApiToken, hashApiToken } from "@/lib/auth/tokens";
import { isConfiguredAdmin } from "@/lib/auth/admin";
import { getCurrentUserFromCookies } from "@/lib/auth/actor";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "Please sign in before creating an API token." }, { status: 401 });
  }

  if (!isConfiguredAdmin(user.email)) {
    return NextResponse.json({ error: "Batch audit tokens are restricted to Better Search administrators." }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as { name?: unknown };
  const token = createPlainApiToken();
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("api_tokens")
    .insert({
      user_id: user.id,
      name: typeof body.name === "string" && body.name.trim() ? body.name.trim() : "Mac app",
      token_hash: hashApiToken(token),
    })
    .select("id, name, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ token, tokenRecord: data });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "Please sign in before revoking an API token." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { id?: unknown };

  if (typeof body.id !== "string") {
    return NextResponse.json({ error: "Please provide a token id." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("api_tokens")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", body.id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

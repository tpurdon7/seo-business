import { NextResponse } from "next/server";

import { getCurrentUserFromCookies } from "@/lib/auth/actor";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "Please sign in before requesting more audits." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("waitlist_requests").insert({
    user_id: user.id,
    email: user.email ?? "unknown@example.com",
    message: typeof body.message === "string" ? body.message.slice(0, 1000) : null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}


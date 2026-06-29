import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const rawNext = requestUrl.searchParams.get("next") || "/audit";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/audit";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const loginUrl = new URL("/login", requestUrl.origin);
      loginUrl.searchParams.set("recovery", "invalid");
      return NextResponse.redirect(loginUrl);
    }
  } else if (next === "/reset-password") {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set("recovery", "invalid");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

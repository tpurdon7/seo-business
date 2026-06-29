import type { User } from "@supabase/supabase-js";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

import { hashApiToken } from "@/lib/auth/tokens";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AuthenticatedActor {
  id: string;
  email: string | null;
  source: "cookie" | "api_token" | "bearer_jwt";
}

function actorFromUser(user: User, source: AuthenticatedActor["source"]): AuthenticatedActor {
  return {
    id: user.id,
    email: user.email ?? null,
    source,
  };
}

export async function getCurrentUserFromCookies() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireCurrentUserFromCookies() {
  const user = await getCurrentUserFromCookies();
  if (!user) return null;
  return actorFromUser(user, "cookie");
}

export async function authenticateRequest(request: Request): Promise<AuthenticatedActor | null> {
  const authorization = request.headers.get("authorization");

  if (authorization?.toLowerCase().startsWith("bearer ")) {
    const token = authorization.slice("bearer ".length).trim();

    if (token.startsWith("bsa_")) {
      const supabase = createSupabaseAdminClient();
      const tokenHash = hashApiToken(token);
      const { data, error } = await supabase
        .from("api_tokens")
        .select("id, user_id, profiles(email)")
        .eq("token_hash", tokenHash)
        .is("revoked_at", null)
        .maybeSingle();

      if (error) {
        console.error("api_token_lookup_failed", { error: error.message });
        return null;
      }

      if (!data) {
        return null;
      }

      await supabase.from("api_tokens").update({ last_used_at: new Date().toISOString() }).eq("id", data.id);

      const profile = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;
      return {
        id: data.user_id,
        email: profile?.email ?? null,
        source: "api_token",
      };
    }

    const supabase = createSupabaseAdminClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    return user ? actorFromUser(user, "bearer_jwt") : null;
  }

  return requireCurrentUserFromCookies();
}

export function requestCookieHeader(cookies: RequestCookies) {
  return cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}


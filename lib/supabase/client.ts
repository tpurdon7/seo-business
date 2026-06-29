"use client";

import { createBrowserClient } from "@supabase/ssr";

import { assertSupabasePublicEnv } from "@/lib/supabase/env";

export function createSupabaseBrowserClient() {
  const { url, key } = assertSupabasePublicEnv();
  return createBrowserClient(url, key);
}


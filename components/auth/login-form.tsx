"use client";

import { useState } from "react";
import { KeyRound, Loader2, LockKeyhole, LogIn, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({
  compact = false,
  nextPath = "/audit",
  initialMessage = "",
}: {
  compact?: boolean;
  nextPath?: string;
  initialMessage?: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState<"signin" | "signup" | "reset" | null>(null);

  function goToNext() {
    window.location.assign(nextPath);
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingAction("signin");
    setError("");
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      goToNext();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not sign in.");
    } finally {
      setLoadingAction(null);
    }
  }

  async function createAccount() {
    setLoadingAction("signup");
    setError("");
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        goToNext();
        return;
      }

      setMessage("Account created. Check your email and confirm your address, then return here to sign in.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create an account.");
    } finally {
      setLoadingAction(null);
    }
  }

  async function requestPasswordReset() {
    setLoadingAction("reset");
    setError("");
    setMessage("");

    try {
      if (!email.trim()) {
        throw new Error("Enter your email address first.");
      }

      const response = await fetch("/api/auth/password-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not send the password reset email.");
      }

      setMessage("If that account exists, a password reset email has been sent. Check your inbox and junk folder.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not send the password reset email.");
    } finally {
      setLoadingAction(null);
    }
  }

  const loading = loadingAction !== null;

  return (
    <form onSubmit={signIn} className={compact ? "space-y-3" : "mt-8 max-w-xl space-y-4"}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <div className="space-y-2 rounded-lg border border-white/10 bg-white p-2 shadow-2xl shadow-black/20">
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-h-14 flex-1 rounded-md px-4 text-base text-slate-950 outline-none placeholder:text-slate-400"
          disabled={loading}
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="min-h-14 w-full rounded-md px-4 text-base text-slate-950 outline-none placeholder:text-slate-400"
          disabled={loading}
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="submit" size="lg" disabled={loading}>
            {loadingAction === "signin" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <LogIn className="h-5 w-5" aria-hidden="true" />}
            Sign in
          </Button>
          <Button type="button" size="lg" variant="secondary" disabled={loading || !email || password.length < 8} onClick={createAccount}>
            {loadingAction === "signup" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <UserPlus className="h-5 w-5" aria-hidden="true" />}
            Create account
          </Button>
        </div>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="w-full"
          disabled={loading || !email.trim()}
          onClick={requestPasswordReset}
        >
          {loadingAction === "reset" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <KeyRound className="h-5 w-5" aria-hidden="true" />}
          Forgot password?
        </Button>
      </div>
      <p className="flex items-center gap-2 text-sm text-slate-300">
        <LockKeyhole className="h-4 w-4" aria-hidden="true" />
        Password login with secure email recovery.
      </p>
      {message ? <p className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{message}</p> : null}
      {error ? <p className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
    </form>
  );
}

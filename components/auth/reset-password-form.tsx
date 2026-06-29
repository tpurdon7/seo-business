"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    void supabase.auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session));
      setCheckingSession(false);
    });
  }, []);

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }

    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) throw updateError;
      window.location.assign("/account?password=updated");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not update your password. Request a new reset email and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={updatePassword} className="mt-8 max-w-xl space-y-4">
      <div className="space-y-3 rounded-lg border border-white/10 bg-white p-2 shadow-2xl shadow-black/20">
        <label htmlFor="new-password" className="sr-only">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
          className="min-h-14 w-full rounded-md px-4 text-base text-slate-950 outline-none placeholder:text-slate-400"
          disabled={loading}
        />
        <label htmlFor="confirm-password" className="sr-only">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          placeholder="Confirm new password"
          className="min-h-14 w-full rounded-md px-4 text-base text-slate-950 outline-none placeholder:text-slate-400"
          disabled={loading}
        />
        <Button type="submit" size="lg" className="w-full" disabled={loading || checkingSession || !hasSession}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <KeyRound className="h-5 w-5" aria-hidden="true" />}
          {checkingSession ? "Checking recovery link" : "Set new password"}
        </Button>
      </div>
      {!checkingSession && !hasSession ? (
        <p className="rounded-lg border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          This recovery link is invalid or expired. Return to sign in and request a new one.
        </p>
      ) : null}
      <p className="flex items-center gap-2 text-sm text-slate-300">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
        Your new password must contain at least 8 characters.
      </p>
      {error ? <p className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
    </form>
  );
}

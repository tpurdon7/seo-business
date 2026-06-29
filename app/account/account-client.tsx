"use client";

import { useState } from "react";
import { KeyRound, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TokenRecord {
  id: string;
  name: string;
  created_at: string;
  last_used_at: string | null;
}

export function AccountClient({ tokens, canCreateToken }: { tokens: TokenRecord[]; canCreateToken: boolean }) {
  const [currentTokens, setCurrentTokens] = useState(tokens);
  const [newToken, setNewToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<"token" | "waitlist" | "">("");

  async function createToken() {
    setLoading("token");
    setMessage("");

    try {
      const response = await fetch("/api/tokens", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Mac app" }),
      });
      const payload = (await response.json()) as { token?: string; tokenRecord?: TokenRecord; error?: string };
      if (!response.ok || !payload.token || !payload.tokenRecord) throw new Error(payload.error || "Could not create token.");
      setNewToken(payload.token);
      setCurrentTokens((existing) => [payload.tokenRecord as TokenRecord, ...existing]);
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Could not create token.");
    } finally {
      setLoading("");
    }
  }

  async function requestMoreAudits() {
    setLoading("waitlist");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Please contact me about more Better Search audits." }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not send request.");
      setMessage("Request sent. We will follow up about more audits.");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Could not send request.");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <KeyRound className="h-5 w-5 text-orange-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-slate-950">Mac app API token</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Create a personal token, paste it into the Mac app settings, and the desktop app can run audits against your account.
          The full token is shown once.
        </p>
        {canCreateToken ? (
          <Button type="button" className="mt-5" onClick={createToken} disabled={loading === "token"}>
            {loading === "token" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <KeyRound className="h-4 w-4" aria-hidden="true" />}
            Create Mac token
          </Button>
        ) : (
          <p className="mt-5 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
            Batch and Mac app tokens are available to Better Search administrators.
          </p>
        )}
        {newToken ? (
          <div className="mt-5 rounded-md border border-orange-200 bg-orange-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">Copy this token now</p>
            <code className="mt-2 block break-all text-sm text-orange-950">{newToken}</code>
          </div>
        ) : null}
        <div className="mt-6 space-y-2">
          {currentTokens.map((token) => (
            <div key={token.id} className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
              <strong className="text-slate-900">{token.name}</strong>
              <span className="block">Created {new Date(token.created_at).toLocaleDateString()}</span>
              <span className="block">Last used {token.last_used_at ? new Date(token.last_used_at).toLocaleDateString() : "never"}</span>
            </div>
          ))}
          {currentTokens.length === 0 ? <p className="text-sm text-slate-500">No active tokens yet.</p> : null}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Send className="h-5 w-5 text-orange-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-slate-950">Request more audits</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Public launch accounts include one audit. Send a request when you want batch access, paid plans, or agency support.
        </p>
        <Button type="button" className="mt-5" onClick={requestMoreAudits} disabled={loading === "waitlist"}>
          {loading === "waitlist" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          Request more audits
        </Button>
        {message ? <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{message}</p> : null}
      </section>
    </div>
  );
}

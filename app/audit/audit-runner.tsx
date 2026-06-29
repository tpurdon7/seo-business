"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AuditRunnerProps {
  email: string;
  freeAuditsUsed: number;
  freeAuditLimit: number;
}

export function AuditRunner({ email, freeAuditsUsed, freeAuditLimit }: AuditRunnerProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const quotaRemaining = Math.max(0, freeAuditLimit - freeAuditsUsed);

  async function runAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const payload = (await response.json()) as { id?: string; reportUrl?: string; error?: string };

      if (!response.ok || !payload.id) {
        throw new Error(payload.error || "The audit could not be created.");
      }

      router.push(payload.reportUrl || `/audit/${payload.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The audit could not be created.");
    } finally {
      setLoading(false);
    }
  }

  if (quotaRemaining <= 0) {
    return (
      <div className="mt-10 max-w-2xl rounded-lg border border-orange-300/30 bg-orange-500/10 p-5 text-orange-50">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">Free audit used</p>
        <h2 className="mt-3 text-2xl font-semibold">Want more audits?</h2>
        <p className="mt-3 text-sm leading-6 text-orange-100">
          {email} has used the launch quota. Join the waitlist and we will follow up with batch access.
        </p>
        <Link href="/account" className="mt-5 inline-flex rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-slate-950">
          Request more audits
        </Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={runAudit} className="mt-10 max-w-2xl rounded-lg border border-white/10 bg-white p-2 shadow-2xl shadow-black/30 sm:flex">
        <label htmlFor="audit-url" className="sr-only">
          Landing page URL
        </label>
        <input
          id="audit-url"
          required
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com/landing-page"
          className="min-h-14 flex-1 rounded-md px-4 text-base text-slate-950 outline-none placeholder:text-slate-400"
          disabled={loading}
        />
        <Button type="submit" size="lg" className="mt-2 w-full sm:mt-0 sm:w-auto" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Queueing audit
            </>
          ) : (
            <>
              Queue free audit
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
      <p className="mt-3 text-sm text-slate-400">
        Signed in as {email}. {quotaRemaining} free audit remaining. Reports are processed by the Better Search audit worker.
      </p>
      {error ? <div className="mt-4 max-w-2xl rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div> : null}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Apple, Download, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Better Search Audit",
  description: "Download the Better Search Audit Mac app and connect it to your Better Search account.",
};

export default function DownloadPage() {
  const downloadUrl = process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10">
        <div>
          <Link href="/" className="text-sm font-semibold text-orange-300">
            Better Search
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Mac app</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Download the Better Search Audit app.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Drop a prospect list into the desktop app, run audits with an administrator token, and open shareable reports in the browser.
          </p>
          {downloadUrl ? (
            <a href={downloadUrl} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400">
              <Download className="h-5 w-5" aria-hidden="true" />
              Download for macOS
            </a>
          ) : (
            <div className="mt-8 rounded-lg border border-orange-300/30 bg-orange-500/10 p-5 text-sm leading-6 text-orange-100">
              The Mac app is currently available to Better Search administrators. Public downloads are not open yet.
            </div>
          )}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <Apple className="h-6 w-6 text-orange-300" aria-hidden="true" />
            <h2 className="text-xl font-semibold">Release requirements</h2>
          </div>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
              Signed and notarized with an Apple Developer account before public download.
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
              Requires an approved administrator account and a Mac app token from the Account page.
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
              v1 is manually downloadable; auto-update is deferred.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Sign in | Better Search",
  robots: { index: false, follow: false },
};

function safeNextPath(value: string | undefined) {
  return value?.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/audit";
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; recovery?: string }> }) {
  const { next, recovery } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <Link href="/" className="text-sm font-semibold text-orange-300">
          Better Search
        </Link>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Sign in to run your audit.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Use your email and password to go straight into Better Search. Every account gets one free Better Search audit.
        </p>
        <LoginForm
          nextPath={safeNextPath(next)}
          initialMessage={recovery === "invalid" ? "That recovery link is invalid or expired. Request a new password reset email." : ""}
        />
      </section>
    </main>
  );
}

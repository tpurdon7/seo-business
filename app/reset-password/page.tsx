import Link from "next/link";
import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Reset password | Better Search",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <Link href="/" className="text-sm font-semibold text-orange-300">
          Better Search
        </Link>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          Choose a new password.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Enter a new password for your Better Search account. This page only works after opening
          the secure recovery link sent to your email.
        </p>
        <ResetPasswordForm />
      </section>
    </main>
  );
}

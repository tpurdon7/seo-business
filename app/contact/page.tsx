import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, MessageSquareText } from "lucide-react";

import {
  ContactAction,
  buttonVariants,
} from "@/components/public-trust-layout";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { bookingLink } from "@/lib/site";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@bettersearch.dev";

export const metadata: Metadata = {
  title: "Contact Better Search",
  description:
    "Contact Better Search about SEO, AI search visibility, website audits and support for UK service businesses.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative border-b border-slate-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_16%,rgba(251,146,60,0.2),transparent_28%),linear-gradient(145deg,#fff7ed_0%,#ffffff_48%,#eef5f8_100%)]" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
          <nav className="mb-9 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link className="transition hover:text-slate-950" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-700">Contact</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_25rem] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                Contact Better Search
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Let&apos;s make your business easier to find.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Tell us what you are trying to improve, where you are getting stuck, or which
                website you want us to look at. You will get a straightforward reply from a real person.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a className={buttonVariants({ size: "lg" })} href={`mailto:${contactEmail}`}>
                  Email {contactEmail}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  className={buttonVariants({ variant: "secondary", size: "lg" })}
                  href={bookingLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Book a free call
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-950 p-7 text-white shadow-[0_32px_90px_rgba(15,23,42,0.22)] sm:p-8">
              <MessageSquareText className="h-7 w-7 text-orange-300" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold">Helpful things to include</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
                <li className="border-b border-white/10 pb-4">Your website address</li>
                <li className="border-b border-white/10 pb-4">The service and locations you want to grow</li>
                <li className="border-b border-white/10 pb-4">What you have already tried</li>
                <li>Any deadline or commercial priority we should know about</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <ContactAction
              action={`Email ${contactEmail}`}
              description="Best for questions, support, partnerships, or sharing a little context before we speak."
              href={`mailto:${contactEmail}`}
              icon="mail"
              title="Send an email"
            />
            <ContactAction
              action="Choose a time"
              description="Best if you want to talk through your current visibility and leave with a clearer next step."
              external
              href={bookingLink}
              icon="calendar"
              title="Book a conversation"
            />
            <ContactAction
              action="Generate your audit"
              description="Get an immediate website report before deciding whether you need any hands-on support."
              href="/audit"
              icon="document"
              title="Start with a free audit"
            />
          </div>

          <div className="mt-10 grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] sm:grid-cols-3 sm:p-8">
            <div className="flex gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-950">Response time</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We aim to reply within two UK working days.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-950">Where we work</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Remote support for service businesses across the UK.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-950">No hard sell</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  If we are not the right fit, we will say so plainly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, MapPin, Search, ShieldCheck } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingLink, type LocationPage as LocationPageContent } from "@/lib/site";

export function LocationPage({ page }: { page: LocationPageContent }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#eef5f8_100%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-18 lg:px-8 lg:pb-24 lg:pt-20">
          <nav className="mb-10 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link className="hover:text-slate-950" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-700">{page.eyebrow}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.65fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase text-orange-700">
                {page.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] text-slate-950 sm:text-5xl">
                {page.h1}
              </h1>
              <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-slate-600">
                {page.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a className={buttonVariants({ size: "lg" })} href={bookingLink}>
                  Book a free visibility audit
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/#services">
                  View services
                </Link>
              </div>
            </div>

            <Card className="p-6 shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-950">
                Serving businesses across {page.title.replace("SEO for service businesses in ", "")}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Local relevance matters when customers compare providers close to them. We help
                make your service areas, expertise, and enquiry routes easier to understand.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-500">{page.towns}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-orange-700">
              Who it helps
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Built for service businesses where trust matters.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-600">
            {page.whoItHelps.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="services">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase text-orange-700">
              What we improve
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Clearer pages, stronger signals, better enquiry paths.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.improvements.map((item) => (
              <Card className="flex gap-4 p-5" key={item}>
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                <p className="leading-7 text-slate-600">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.06] p-6 text-white">
            <Search className="h-7 w-7 text-orange-300" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">Google search visibility</h2>
            <p className="mt-4 leading-8 text-slate-300">{page.googleVisibility}</p>
          </Card>
          <Card className="border-white/10 bg-white/[0.06] p-6 text-white">
            <BrainCircuit className="h-7 w-7 text-orange-300" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">AI search and GEO visibility</h2>
            <p className="mt-4 leading-8 text-slate-300">{page.aiVisibility}</p>
          </Card>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <ShieldCheck className="h-8 w-8 text-orange-600" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Local trust signals
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-600">
            {page.trustSignals.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              You can also review the{" "}
              <Link className="font-semibold text-orange-700 hover:text-orange-600" href="/#pricing">
                pricing options
              </Link>{" "}
              before booking a free audit.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="faq">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-sm font-semibold uppercase text-orange-700">
            FAQ
          </p>
          <h2 className="text-center text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Straight answers before the audit.
          </h2>
          <div className="mt-12 space-y-3">
            {page.faqs.map((faq) => (
              <details
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                key={faq.question}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-slate-950">
                  {faq.question}
                  <span className="text-slate-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-8 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-950 p-8 text-white shadow-[0_32px_90px_rgba(15,23,42,0.22)] sm:p-12 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase text-orange-300">
                Free visibility audit
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                Want to see what is stopping your business from being found?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                We will review your Google visibility, AI search presence, website health, and
                the clearest opportunities to improve.
              </p>
            </div>
            <a className={buttonVariants({ size: "lg" })} href={bookingLink}>
              Book a free visibility audit
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

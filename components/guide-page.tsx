import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingLink, type GuidePage as GuidePageContent } from "@/lib/site";

export function GuidePage({ page }: { page: GuidePageContent }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#eef5f8_100%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-18 pt-14 sm:px-6 sm:pt-18 lg:px-8 lg:pb-22 lg:pt-20">
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link className="hover:text-slate-950" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link className="hover:text-slate-950" href={page.supportingLocationPath}>
              {page.supportingLocationAnchor}
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
                <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href={page.supportingLocationPath}>
                  View {page.supportingLocationAnchor}
                </Link>
              </div>
            </div>

            <Card className="p-6 shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-950">
                Useful for businesses across {page.localAreas.join(", ")}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                This guide is written for high-trust local service businesses that want clearer
                visibility on Google, in local search, and in AI tools.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.78fr]">
          <div className="space-y-6">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-lg leading-8 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <div className="mt-6 space-y-3">
                    {section.bullets.map((bullet) => (
                      <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4" key={bullet}>
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                        <p className="leading-7 text-slate-600">{bullet}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="space-y-5 lg:sticky lg:top-24">
            <Card className="p-6">
              <p className="text-sm font-semibold uppercase text-orange-700">Related page</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                Need a more focused local SEO plan?
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Our location page explains how Better Search supports service businesses that want
                stronger local relevance, clearer service pages, and better trust signals.
              </p>
              <Link
                className="mt-6 inline-flex font-semibold text-orange-700 hover:text-orange-600"
                href={page.supportingLocationPath}
              >
                Explore {page.supportingLocationAnchor}
              </Link>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold uppercase text-orange-700">Free visibility audit</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                Want clear next steps for your website?
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                We review your Google visibility, AI search presence, trust signals, and the pages
                most likely to affect enquiries.
              </p>
              <a className={buttonVariants({ size: "lg" })} href={bookingLink}>
                Book a free visibility audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold uppercase text-orange-700">Quick links</p>
              <div className="mt-4 space-y-3 text-sm">
                <Link className="block font-medium text-slate-700 hover:text-slate-950" href="/">
                  Back to the homepage
                </Link>
                <Link
                  className="block font-medium text-slate-700 hover:text-slate-950"
                  href="/#pricing"
                >
                  See pricing
                </Link>
                <Link
                  className="block font-medium text-slate-700 hover:text-slate-950"
                  href={page.supportingLocationPath}
                >
                  Read more about {page.supportingLocationAnchor.toLowerCase()}
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="faq">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-sm font-semibold uppercase text-orange-700">
            FAQ
          </p>
          <h2 className="text-center text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Common questions
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

      <SiteFooter />
    </main>
  );
}

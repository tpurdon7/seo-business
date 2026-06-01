import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingLink, type CornerstonePage as CornerstonePageContent } from "@/lib/site";

export function CornerstonePage({
  page,
}: {
  page: CornerstonePageContent;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_46%,#eef5f8_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_84%)]" />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-18 lg:px-8 lg:pb-24 lg:pt-20">
          <nav
            className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <Link className="hover:text-slate-950" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-700">{page.eyebrow}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10 lg:p-12">
              <p className="mb-4 text-sm font-semibold uppercase text-orange-700">
                {page.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] text-slate-950 sm:text-5xl lg:text-[3.45rem]">
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
                <Link
                  className={buttonVariants({ variant: "secondary", size: "lg" })}
                  href="/methodology"
                >
                  Read the methodology
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <Card className="rounded-[1.75rem] border-white/80 bg-white/88 p-7 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                  Best fit
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  Businesses where credibility shapes the enquiry
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {page.audiences.map((audience) => (
                    <span
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                      key={audience}
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[1.75rem] bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
                  What matters most
                </p>
                <div className="mt-6 space-y-3">
                  {page.keyPoints.map((item) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                      key={item.title}
                    >
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-2 leading-7 text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
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
                      <div
                        className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                        key={bullet}
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-orange-600"
                          aria-hidden="true"
                        />
                        <p className="leading-7 text-slate-600">{bullet}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="space-y-5 lg:sticky lg:top-24">
            <Card className="rounded-[1.75rem] border-orange-200 bg-orange-50/70 p-6">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-700 shadow-sm">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-slate-950">Evidence-led pages win here</p>
                  <p className="mt-2 leading-7 text-slate-700">
                    For high-trust businesses, page clarity and honest proof usually do more than
                    publishing lots of thin content.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold uppercase text-orange-700">
                Related pages
              </p>
              <div className="mt-5 space-y-4">
                {page.relatedLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      className="font-semibold text-slate-950 hover:text-orange-700"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {link.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm font-semibold uppercase text-orange-700">
                Next step
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                Need a clearer SEO priority list?
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Better Search reviews the pages, trust signals, and technical basics most likely
                to affect how your business is found and compared.
              </p>
              <a className={buttonVariants({ size: "lg" })} href={bookingLink}>
                Book a free visibility audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
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

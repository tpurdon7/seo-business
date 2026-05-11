import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingLink, type LocationPage as LocationPageContent } from "@/lib/site";
import { cn } from "@/lib/utils";

const themes = {
  "seo-cornwall": {
    glow: "from-orange-200 via-white to-teal-100",
    panel: "from-orange-500/14 via-white to-teal-500/10",
    accent: "bg-teal-500",
    badge: "border-teal-200 bg-teal-50 text-teal-700",
    darkGlow: "from-orange-500/18 via-transparent to-teal-400/18",
  },
  "seo-surrey": {
    glow: "from-orange-200 via-white to-sky-100",
    panel: "from-orange-500/14 via-white to-sky-500/10",
    accent: "bg-sky-500",
    badge: "border-sky-200 bg-sky-50 text-sky-700",
    darkGlow: "from-orange-500/18 via-transparent to-sky-400/18",
  },
} as const;

export function LocationPage({ page }: { page: LocationPageContent }) {
  const theme = themes[page.slug];
  const keyFocus = [
    {
      label: "Service clarity",
      copy: "Make the right pages easy to scan and easy to trust.",
    },
    {
      label: "Local relevance",
      copy: `Strengthen the local signals that support ${page.shortName.toLowerCase()} searches.`,
    },
    {
      label: "AI visibility",
      copy: "Help AI tools interpret the business more clearly.",
    },
  ];
  const auditDeliverables = [
    "A plain-English visibility audit",
    "A shortlist of the pages and signals to fix first",
    "A clearer route to better enquiries",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#eef5f8_100%)]",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-br opacity-90",
            theme.glow,
          )}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

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

          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.72fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_35px_120px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10 lg:p-12">
              <div className={cn("absolute inset-x-0 top-0 h-1.5", theme.accent)} />
              <div className="absolute -right-24 top-10 h-48 w-48 rounded-full bg-orange-200/30 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-slate-100/60 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                    {page.eyebrow}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]",
                      theme.badge,
                    )}
                  >
                    <span className={cn("h-2.5 w-2.5 rounded-full", theme.accent)} />
                    Serving {page.shortName}
                  </span>
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-slate-950 sm:text-5xl lg:text-[3.6rem]">
                  {page.h1}
                </h1>

                <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-slate-600">
                  {page.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                    Clinics and consultants
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                    Local SEO and GEO
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                    Clear next steps
                  </span>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a className={buttonVariants({ size: "lg" })} href={bookingLink}>
                    Book a free visibility audit
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <Link
                    className={buttonVariants({ variant: "secondary", size: "lg" })}
                    href={page.supportingGuidePath}
                  >
                    Read the guide
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {keyFocus.map((item) => (
                    <div
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-5"
                      key={item.label}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-3 leading-7 text-slate-600">{item.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <Card className="overflow-hidden rounded-[1.75rem] border-white/80 bg-white/88 p-7 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                <div
                  className={cn(
                    "mb-6 rounded-[1.5rem] bg-gradient-to-br p-6",
                    theme.panel,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-sm">
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Coverage
                      </p>
                      <p className="text-2xl font-semibold text-slate-950">
                        {page.shortName} service areas
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 leading-7 text-slate-600">
                    We help make the service areas, topics, and trust signals on your website feel
                    much easier to understand.
                  </p>
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Towns we mention
                </p>
                <p className="mt-3 text-lg leading-8 text-slate-700">{page.towns}</p>
              </Card>

              <Card className="rounded-[1.75rem] bg-slate-950 p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
                  Free audit
                </p>
                <h2 className="mt-4 text-2xl font-semibold">What clients usually want first</h2>
                <div className="mt-6 space-y-3">
                  {auditDeliverables.map((item) => (
                    <div
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                      key={item}
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-orange-300"
                        aria-hidden="true"
                      />
                      <p className="leading-7 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[1.75rem] border-dashed border-slate-300 bg-white/85 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Quick routes
                </p>
                <div className="mt-5 space-y-4 text-sm font-medium">
                  <Link className="flex items-center justify-between text-slate-700 hover:text-slate-950" href="/">
                    Back to homepage
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    className="flex items-center justify-between text-slate-700 hover:text-slate-950"
                    href="/#pricing"
                  >
                    See pricing
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    className="flex items-center justify-between text-slate-700 hover:text-slate-950"
                    href={page.supportingGuidePath}
                  >
                    Read the supporting guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-22 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1fr]">
          <div className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.16)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
              Who it helps
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
              Built for service businesses where trust matters before contact.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              These pages now lead with clarity instead of noise. The aim is to make Better Search
              feel calm, useful, and credible for businesses making careful buying decisions.
            </p>
          </div>

          <div className="grid gap-4">
            {page.whoItHelps.map((paragraph, index) => (
              <Card
                className={cn(
                  "rounded-[1.5rem] p-6",
                  index === 1 && "bg-slate-50",
                )}
                key={paragraph}
              >
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="leading-8 text-slate-600">{paragraph}</p>
                </div>
              </Card>
            ))}

            <Card className="rounded-[1.5rem] border-orange-200 bg-orange-50/70 p-6">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-700 shadow-sm">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="leading-8 text-slate-700">
                  For a practical overview, start with our{" "}
                  <Link
                    className="font-semibold text-orange-700 hover:text-orange-600"
                    href={page.supportingGuidePath}
                  >
                    {page.supportingGuideTitle.toLowerCase()}
                  </Link>
                  .
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-22 sm:px-6 lg:px-8" id="services">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
              What we improve
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Clearer pages, stronger signals, better enquiry paths.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
            {page.improvements.map((item, index) => (
              <Card
                className={cn(
                  "rounded-[1.5rem] p-6 xl:col-span-4",
                  index === 0 && "xl:col-span-6 bg-white",
                  index === 1 && "xl:col-span-6 bg-slate-950 text-white",
                  index > 1 && "bg-white/92",
                )}
                key={item}
              >
                <div className="flex gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                      index === 1
                        ? "bg-white/10 text-orange-300"
                        : "bg-orange-50 text-orange-700",
                    )}
                  >
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-semibold uppercase tracking-[0.16em]",
                        index === 1 ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      Focus area {index + 1}
                    </p>
                    <p
                      className={cn(
                        "mt-3 leading-7",
                        index === 1 ? "text-slate-200" : "text-slate-600",
                      )}
                    >
                      {item}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 px-4 py-22 text-white sm:px-6 lg:px-8">
        <div className={cn("absolute inset-0 bg-gradient-to-br", theme.darkGlow)} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:84px_84px] opacity-35" />

        <div className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <Card className="rounded-[1.75rem] border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur">
            <Search className="h-7 w-7 text-orange-300" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">Google search visibility</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{page.googleVisibility}</p>
          </Card>

          <Card className="rounded-[1.75rem] border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur">
            <BrainCircuit className="h-7 w-7 text-orange-300" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">AI search and GEO visibility</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{page.aiVisibility}</p>
          </Card>
        </div>
      </section>

      <section className="bg-white px-4 py-22 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 sm:p-10">
            <ShieldCheck className="h-8 w-8 text-orange-600" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Local trust signals
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Trust needs to feel close to the decision. These sections now read more like a calm
              advisory page and less like a generic agency template.
            </p>
          </div>

          <div className="grid gap-4">
            {page.trustSignals.map((paragraph) => (
              <Card className="rounded-[1.5rem] p-6" key={paragraph}>
                <p className="leading-8 text-slate-600">{paragraph}</p>
              </Card>
            ))}

            <Card className="rounded-[1.5rem] border-orange-200 bg-orange-50/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                Before you book
              </p>
              <p className="mt-4 leading-8 text-slate-700">
                You can review the{" "}
                <Link className="font-semibold text-orange-700 hover:text-orange-600" href="/#pricing">
                  pricing options
                </Link>{" "}
                or go back to the{" "}
                <Link className="font-semibold text-orange-700 hover:text-orange-600" href="/">
                  homepage
                </Link>{" "}
                before booking a free audit.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-22 sm:px-6 lg:px-8" id="faq">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
            FAQ
          </p>
          <h2 className="text-center text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Straight answers before the audit.
          </h2>
          <div className="mt-12 space-y-3">
            {page.faqs.map((faq) => (
              <details
                className="group rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
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
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_36px_100px_rgba(15,23,42,0.22)] sm:p-12 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
                Free visibility audit
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                Want to see what is stopping your business from being found?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                We review Google visibility, AI search presence, website health, and the clearest
                next steps for stronger enquiries.
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

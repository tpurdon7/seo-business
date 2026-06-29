import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { bookingLink } from "@/lib/site";

type TrustSection = {
  id: string;
  title: string;
  paragraphs?: React.ReactNode[];
  bullets?: React.ReactNode[];
};

export function PublicTrustLayout({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  notice,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: TrustSection[];
  notice?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative border-b border-slate-200">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(145deg,#fff7ed_0%,#ffffff_42%,#eef5f8_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <nav className="mb-9 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link className="transition hover:text-slate-950" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-700">{eyebrow}</span>
          </nav>

          <div className="grid gap-9 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                {eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] backdrop-blur">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-950">Clear, plain-English information</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Written to explain how Better Search works and what you can expect.
                  </p>
                </div>
              </div>
              <p className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-500">
                Last updated {updated}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              On this page
            </p>
            <nav className="mt-4 border-l border-slate-200" aria-label={`${eyebrow} sections`}>
              {sections.map((section) => (
                <a
                  className="block border-l-2 border-transparent py-2 pl-4 text-sm leading-6 text-slate-600 transition hover:border-orange-500 hover:text-slate-950"
                  href={`#${section.id}`}
                  key={section.id}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            {notice ? (
              <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-950">
                {notice}
              </div>
            ) : null}

            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_26px_80px_rgba(15,23,42,0.08)]">
              {sections.map((section, index) => (
                <section
                  className={`scroll-mt-28 p-6 sm:p-8 lg:p-10 ${
                    index ? "border-t border-slate-200" : ""
                  }`}
                  id={section.id}
                  key={section.id}
                >
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-3xl">
                    {section.title}
                  </h2>
                  {section.paragraphs ? (
                    <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li
                          className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-600"
                          key={bulletIndex}
                        >
                          <CheckCircle2
                            className="mt-1 h-5 w-5 shrink-0 text-orange-600"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                href="/contact"
              >
                <Mail className="h-5 w-5 text-orange-600" aria-hidden="true" />
                <p className="mt-4 font-semibold text-slate-950">Ask a question</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Contact us if anything on this page is unclear.
                </p>
              </Link>
              <a
                className="group rounded-2xl bg-slate-950 p-6 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                href={bookingLink}
              >
                <CalendarDays className="h-5 w-5 text-orange-300" aria-hidden="true" />
                <p className="mt-4 font-semibold">Discuss your visibility</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Book a free conversation about your website and next steps.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export function ContactAction({
  href,
  icon,
  title,
  description,
  action,
  external = false,
}: {
  href: string;
  icon: "mail" | "calendar" | "document";
  title: string;
  description: string;
  action: string;
  external?: boolean;
}) {
  const Icon = icon === "mail" ? Mail : icon === "calendar" ? CalendarDays : FileText;

  return (
    <a
      className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-6 text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 flex-1 leading-7 text-slate-600">{description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
        {action}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </a>
  );
}

export { buttonVariants };

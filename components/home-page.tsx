"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileSearch,
  Gauge,
  Link2,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicAuditForm } from "@/components/public-audit-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingLink, homeFaqs, industryPageLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const services: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  signal: string;
}> = [
  {
    title: "SEO Strategy",
    description:
      "We create a clear plan for how your business can appear higher on Google for the searches that matter most.",
    icon: Compass,
    signal: "Google plan",
  },
  {
    title: "Website SEO Check",
    description:
      "We review your website and find anything that may be stopping Google or AI tools from understanding what you do.",
    icon: Gauge,
    signal: "Clear fixes",
  },
  {
    title: "Keyword Research",
    description:
      "We find the exact words and questions your customers are typing into Google before they contact a business like yours.",
    icon: Search,
    signal: "Real searches",
  },
  {
    title: "Content SEO",
    description:
      "We help you create website pages, articles, and guides that answer customer questions and make your business easier to trust.",
    icon: FileSearch,
    signal: "Useful content",
  },
  {
    title: "Trust & Authority Building",
    description:
      "We help your business build credibility online through strong content, useful mentions, links, and proof points.",
    icon: Link2,
    signal: "More trust",
  },
  {
    title: "GEO / AI Search Visibility",
    description:
      "We make your business easier for AI tools to understand when people ask for recommendations, comparisons, and answers in your industry.",
    icon: BrainCircuit,
    signal: "AI visibility",
  },
];

const industries = [
  "Private clinics",
  "Dentists",
  "Aesthetics clinics",
  "Physiotherapists",
  "Therapists",
  "Consultants",
  "Legal firms",
  "Accountants",
  "Financial advisers",
  "Specialist local services",
];

const whyUs = [
  {
    title: "Built for Google and AI",
    description:
      "We help your website make sense to both traditional search engines and modern AI tools.",
  },
  {
    title: "Simple reporting",
    description:
      "You will always know what we are working on, why it matters, and what changed.",
  },
  {
    title: "Clear priorities",
    description:
      "We focus on the work most likely to improve visibility, trust, traffic, and enquiries.",
  },
  {
    title: "Content people actually search for",
    description:
      "We create pages around the real questions your customers are asking before they choose a provider.",
  },
  {
    title: "More trust online",
    description:
      "We help your business look more credible across your website, Google, AI tools, and the wider web.",
  },
];

const auditStandards = [
  {
    title: "Evidence-led reviews",
    description:
      "We separate checked findings from assumptions so the plan stays defensible.",
  },
  {
    title: "Commercial pages first",
    description:
      "Service, location, and trust pages usually matter more than thin content expansion.",
  },
  {
    title: "Built for Google and AI search",
    description:
      "Clear headings, useful answers, internal links, and matching schema help both.",
  },
];

const resourceLinks = [
  {
    href: "/about",
    title: "About Better Search",
    description:
      "Positioning, who the work is for, and the standards behind the site.",
  },
  {
    href: "/methodology",
    title: "SEO and GEO methodology",
    description:
      "How audits, page priorities, internal links, and answer-ready structure fit together.",
  },
  {
    href: "/seo-for-high-trust-service-businesses",
    title: "SEO for high-trust service businesses",
    description:
      "Cornerstone guide covering service pages, trust signals, local intent, and AI search visibility.",
  },
  {
    href: "/seo-surrey",
    title: "SEO in Surrey",
    description:
      "Commercial local page for Guildford, Woking, Farnham, and nearby high-trust searches.",
  },
  {
    href: "/seo-cornwall",
    title: "SEO in Cornwall",
    description:
      "Commercial local page for Truro, Newquay, Falmouth, and surrounding service areas.",
  },
];

const outcomes = [
  {
    value: "Clearer",
    label: "service and location pages",
    detail:
      "People should understand what you do, where you work, and why they should keep reading.",
  },
  {
    value: "Stronger",
    label: "trust signals",
    detail:
      "Qualifications, FAQs, process notes, and honest proof should support the enquiry decision.",
  },
  {
    value: "Better",
    label: "internal link paths",
    detail:
      "Homepage, service, guide, and location pages should reinforce each other instead of sitting apart.",
  },
  {
    value: "More usable",
    label: "AI-ready answers",
    detail:
      "Pages should be easier for AI tools to summarise and easier for buyers to compare.",
  },
];

const pricing = [
  {
    name: "Visibility Sprint",
    price: "£1,000",
    cadence: "one-time",
    description:
      "A focused diagnosis and 90-day plan before you commit to ongoing work.",
    features: [
      "Review of up to 30 indexable pages",
      "Google and AI-search visibility review",
      "Technical, service-page, local and trust checks",
      "Opportunity map for up to 3 competitors",
      "Prioritised report, 90-day plan and findings call",
    ],
  },
  {
    name: "Growth Visibility",
    price: "£1,100",
    cadence: "per month",
    description: "Focused monthly implementation for an established service-business website.",
    features: [
      "Month-one baseline and 90-day strategy",
      "Up to 2 substantive work items each month",
      "Google and AI-search visibility tracking",
      "Technical, page and content-priority monitoring",
      "Monthly report and 45-minute review call",
    ],
    featured: true,
  },
  {
    name: "Authority Growth",
    price: "£1,600",
    cadence: "per month",
    description: "A broader programme for competitive markets where authority and proof matter.",
    features: [
      "Up to 3 substantive work items each month",
      "Website and content architecture planning",
      "Authority opportunities and expert-proof planning",
      "Deeper AI-search and competitor review",
      "Monthly strategy call and quarterly roadmap",
    ],
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 1, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p
        className={cn(
          "mb-4 text-sm font-semibold uppercase",
          dark ? "text-orange-300" : "text-orange-700",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-3xl font-semibold leading-tight sm:text-4xl",
          dark ? "text-white" : "text-slate-950",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 text-base leading-8 sm:text-lg",
          dark ? "text-slate-300" : "text-slate-600",
        )}
      >
        {description}
      </p>
    </Reveal>
  );
}

function MiniMetric({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {change}
        </span>
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950 tabular-nums">{value}</p>
    </div>
  );
}

function AnalyticsDashboard() {
  const reduceMotion = useReducedMotion();
  const priorities = [
    {
      title: "Crawlability and indexation",
      detail: "Confirm important pages are indexable, canonicalised, and discoverable.",
      status: "Check first",
    },
    {
      title: "Service and location pages",
      detail: "Tighten the pages that explain the service and route users to an enquiry.",
      status: "Strengthen",
    },
    {
      title: "Trust and answer structure",
      detail: "Use FAQs, process notes, credentials, and clear headings where they help buyers.",
      status: "Support",
    },
    {
      title: "Schema and internal links",
      detail: "Make the page relationships and entity signals easier to interpret.",
      status: "Expand",
    },
  ];

  return (
    <Reveal className="mx-auto mt-14 max-w-7xl">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.13)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">Visibility Dashboard</p>
              <p className="text-sm text-slate-400">How Better Search prioritises the work</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="rounded-full bg-white/10 px-3 py-2">Crawlability</span>
            <span className="rounded-full bg-orange-500 px-3 py-2 text-white">Trust signals</span>
            <span className="rounded-full bg-white/10 px-3 py-2">AI readiness</span>
          </div>
        </div>
        <div className="grid bg-slate-100 lg:grid-cols-[240px_1fr]">
          <aside className="hidden border-r border-slate-200 bg-white p-5 lg:block">
            <p className="mb-4 text-xs font-semibold uppercase text-slate-400">Workspace</p>
            {[
              "Crawlability",
              "Core pages",
              "Internal links",
              "Trust signals",
              "Schema fit",
              "Supporting guides",
            ].map(
              (item, index) => (
                <div
                  className={cn(
                    "mb-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                    index === 0
                      ? "bg-orange-50 text-orange-700"
                      : "text-slate-600 hover:bg-slate-50",
                  )}
                  key={item}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {item}
                </div>
              ),
            )}
          </aside>
          <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[1.5fr_.9fr]">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Where work usually starts</p>
                    <p className="mt-1 text-3xl font-semibold text-slate-950">
                      Fix the pages buyers actually use
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                    Evidence-led
                  </span>
                </div>
                <div className="grid gap-3">
                  {[
                    [
                      "Service pages",
                      "Clarify what you offer, who it is for, and what someone should do next.",
                    ],
                    [
                      "Location pages",
                      "Show where you work without stretching beyond the areas you genuinely serve.",
                    ],
                    [
                      "Trust pages",
                      "About, methodology, and proof structure help buyers and AI tools interpret the business.",
                    ],
                    [
                      "Supporting guides",
                      "Useful explainer pages help internal links and answer common comparison questions.",
                    ],
                  ].map(([title, copy], index) => (
                    <motion.div
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                      key={title}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.08, duration: 0.45 }}
                    >
                      <p className="font-semibold text-slate-950">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Homepage links", "Tighten", "Guide users to the next useful page"],
                  ["FAQ structure", "Add", "Support direct answers and buyer questions"],
                  ["Schema fit", "Match", "Use page-level schema that reflects the topic"],
                ].map(([label, value, detail], index) => (
                  <motion.div
                    className="rounded-lg bg-white p-5 shadow-sm"
                    key={label}
                    initial={reduceMotion ? false : { opacity: 1, y: 14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                  >
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 tabular-nums">
                      {value}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">Audit checks</p>
                    <p className="text-sm text-slate-500">Priority order, not fake scoring</p>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="space-y-4">
                  {priorities.map((item, index) => (
                    <motion.div
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                      key={item.title}
                      initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: index * 0.08, duration: 0.35 }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-950">{item.title}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 p-5 text-white shadow-sm">
                <p className="font-semibold">What strong pages do</p>
                <div className="mt-4 space-y-2">
                  {[
                    "Define the service clearly",
                    "Cover the right towns or service areas",
                    "Answer the questions people ask before they enquire",
                    "Give real reasons to trust the business",
                  ].map((item) => (
                    <div
                      className="grid grid-cols-[1fr_44px_54px] items-center gap-3 rounded-lg bg-white/[0.08] px-3 py-3 text-sm"
                      key={item}
                    >
                      <span className="col-span-2 min-w-0 text-slate-300">{item}</span>
                      <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-center text-xs font-semibold text-emerald-300">
                        useful
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-orange-600 p-5 text-white shadow-sm">
                <p className="text-sm font-medium text-orange-100">Next best action</p>
                <p className="mt-2 text-2xl font-semibold">Strengthen 1 to 3 core pages first</p>
                <p className="mt-3 text-sm leading-6 text-orange-50">
                  It is usually better to improve a small set of important pages well than publish
                  a long list of thin pages that add little trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <SiteHeader />

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_46%,#eef5f8_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24 lg:pt-24">
          <Reveal>
            <div className="mb-4 text-sm font-medium text-slate-950 sm:text-base">
              Free SEO + AI search audit generator
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl">
              Generate a free visibility audit for your website.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Enter your URL, email, and niche. Better Search will crawl the page and generate a
              practical SEO, GEO, and AEO report you can read straight away.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Built for clinics, consultants, professional firms, and specialist local businesses
              that need clearer visibility on Google and in AI search.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className={buttonVariants({ size: "lg" })} href="#free-audit">
                Generate my audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a className={buttonVariants({ variant: "secondary", size: "lg" })} href="#process">
                See how it works
              </a>
            </div>
            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              <MiniMetric
                icon={Compass}
                label="Priority order"
                value="4-step"
                change="Evidence-first"
              />
              <MiniMetric
                icon={BrainCircuit}
                label="AI readiness"
                value="Clear answers"
                change="Answer-ready"
              />
              <MiniMetric
                icon={Gauge}
                label="Main focus"
                value="Core pages"
                change="Enquiry-led"
              />
            </div>
          </Reveal>
          <div id="free-audit">
            <PublicAuditForm />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {auditStandards.map((item) => (
              <div
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                key={item.title}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                  Trust base
                </p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8" id="services">
        <SectionIntro
          eyebrow="Services"
          title="Everything you need to get found and trusted online."
          description="We help people discover your business through Google, AI search tools, and the content they read before deciding who to trust."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal delay={index * 0.04} key={service.title}>
              <Card className="h-full transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                      <service.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {service.signal}
                    </span>
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-slate-600">{service.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8" id="industries">
        <SectionIntro
          eyebrow="Built for high-trust decisions"
          title="Perfect for businesses where trust matters before someone gets in touch."
          description="If your customers compare options, read reviews, check credibility, or ask AI tools for recommendations before contacting you, your online visibility matters. That includes service businesses in Cornwall, Surrey, and across the UK."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry, index) => (
            <Reveal delay={index * 0.03} key={industry}>
              <div className="flex h-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-semibold text-slate-950">{industry}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-orange-700">
              Local SEO
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Local visibility matters
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-slate-600">
              Most service businesses do not need random traffic. They need to be found by the
              right people nearby. We help local and UK service businesses show up more clearly
              on Google, in local searches, and in AI tools.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/seo-cornwall">
                SEO in Cornwall
              </Link>
              <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/seo-surrey">
                SEO in Surrey
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Industry pages"
          title="Specific pages for the businesses that compare carefully."
          description="These niche pages support clinics, consultants, and dentists with clearer search intent coverage and stronger internal links back into the main site."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-3">
          {industryPageLinks.map((item, index) => (
            <Reveal delay={index * 0.04} key={item.href}>
              <Link
                className="group block h-full rounded-lg border border-slate-200 bg-slate-50 p-6 transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
                href={item.href}
              >
                <p className="text-lg font-semibold text-slate-950 group-hover:text-orange-700">
                  {item.title}
                </p>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-700">
                  View page
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Internal links"
          title="Start with the pages that explain the business best."
          description="A stronger homepage should help visitors and search engines reach the most useful commercial, trust, and local pages quickly."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
          {resourceLinks.map((item, index) => (
            <Reveal delay={index * 0.04} key={item.href}>
              <Link
                className="group block h-full rounded-lg border border-slate-200 bg-slate-50 p-6 transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
                href={item.href}
              >
                <p className="text-lg font-semibold text-slate-950 group-hover:text-orange-700">
                  {item.title}
                </p>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-700">
                  View page
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,115,22,0.24),transparent_36%),linear-gradient(45deg,transparent_58%,rgba(20,184,166,0.14))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="mb-4 text-sm font-semibold uppercase text-orange-300">Why us</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Search is changing. Trust still wins.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              People are no longer only searching on Google. They are also asking AI tools who to
              trust, what to choose, and which providers to compare. We help your business show up
              clearly in both places.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              AI search tools work best when a business is easy to understand. Clear service pages,
              consistent information, useful answers, and strong trust signals make it easier for
              Google and AI tools to recognise what you do.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.08] p-4">
                <p className="text-3xl font-semibold tabular-nums">2</p>
                <p className="mt-2 text-sm text-slate-300">places customers now search</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.08] p-4">
                <p className="text-3xl font-semibold tabular-nums">Clear</p>
                <p className="mt-2 text-sm text-slate-300">plans without confusing jargon</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-3">
              {whyUs.map((item, index) => (
                <motion.div
                  className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                  key={item.title}
                  initial={{ opacity: 1, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.07, duration: 0.45 }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8" id="dashboard">
        <SectionIntro
          eyebrow="Visibility dashboard"
          title="A simple view of where your business can be found."
          description="We show you how visible your business is on Google, how likely AI tools are to mention you, what your website needs, and where the biggest growth opportunities are."
        />
        <AnalyticsDashboard />
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8" id="process">
        <SectionIntro
          eyebrow="Process"
          title="A clear process with no confusing jargon."
          description="You get a practical plan, plain-English updates, and a clear view of what changed, what improved, and what comes next."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["Audit", "We check your website, Google visibility, competitors, and AI search presence."],
            ["Plan", "We show you the biggest opportunities and what to fix first."],
            ["Improve", "We update your website, content, pages, and online presence."],
            ["Track", "We report what changed, what improved, and what to do next."],
          ].map(([title, copy], index) => (
            <Reveal delay={index * 0.05} key={title}>
              <div className="relative h-full rounded-lg border border-slate-200 bg-slate-50 p-6">
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-lg font-semibold text-white tabular-nums">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="What improves"
          title="What good SEO work should make easier."
          description="The right package should improve clarity, trust, and discovery without inventing proof or overpromising results."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((result, index) => (
            <Reveal delay={index * 0.05} key={result.label}>
              <Card className="h-full p-6">
                <p className="text-4xl font-semibold text-orange-600 tabular-nums">{result.value}</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{result.label}</p>
                <p className="mt-3 leading-7 text-slate-600">{result.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8" id="pricing">
        <SectionIntro
          eyebrow="Pricing"
          title="Simple packages for businesses that want to be found."
          description="Start with a one-off visibility audit or bring us in for ongoing SEO and GEO support. Each package is clear, practical, and built around better enquiries."
          dark
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-3">
          {pricing.map((tier, index) => (
            <Reveal delay={index * 0.05} key={tier.name}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-lg border p-6",
                  tier.featured
                    ? "border-orange-400 bg-white text-slate-950 shadow-[0_30px_90px_rgba(249,115,22,0.2)]"
                    : "border-white/10 bg-white/[0.06] text-white",
                )}
              >
                <div className="mb-5 min-h-7">
                  {tier.featured ? (
                    <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-semibold">{tier.name}</h3>
                <p
                  className={cn(
                    "mt-3 leading-7",
                    tier.featured ? "text-slate-600" : "text-slate-300",
                  )}
                >
                  {tier.description}
                </p>
                <div className="mt-7 flex items-end gap-2">
                  <p className="text-4xl font-semibold tabular-nums">{tier.price}</p>
                  <p className={cn("pb-1 text-sm", tier.featured ? "text-slate-500" : "text-slate-400")}>
                    {tier.cadence}
                  </p>
                </div>
                <div className="mt-7 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <div className="flex gap-3" key={feature}>
                      <CheckCircle2
                        className={cn(
                          "mt-0.5 h-5 w-5 shrink-0",
                          tier.featured ? "text-orange-600" : "text-orange-300",
                        )}
                        aria-hidden="true"
                      />
                      <span className={tier.featured ? "text-slate-700" : "text-slate-200"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  className={cn(
                    buttonVariants({
                      variant: tier.featured ? "default" : "secondary",
                      size: "lg",
                    }),
                    "mt-8 w-full self-start",
                    !tier.featured && "border-white/20 bg-white text-slate-950 hover:bg-slate-100",
                  )}
                  href={bookingLink}
                >
                  Start with {tier.name}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18}>
          <div className="mx-auto mt-8 max-w-7xl rounded-lg border border-white/10 bg-white/[0.06] p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase text-orange-300">
                  Website Redesign + CRO
                </p>
                <h3 className="text-3xl font-semibold leading-tight">
                  A full website redesign built to help more visitors become enquiries.
                </h3>
                <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                  We can fully redesign your website so it looks more credible, feels easier to
                  use, and gives people clearer reasons to get in touch.
                </p>
                <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                  CRO means conversion rate optimisation. In simple terms, it is the work that
                  helps more of the right visitors take action, whether that is calling, booking,
                  or sending an enquiry.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Full website redesign",
                    "Clearer page structure and messaging",
                    "Better enquiry flow and calls to action",
                    "CRO improvements to help more visitors convert",
                  ].map((feature) => (
                    <div className="flex gap-3 rounded-lg bg-white/[0.05] p-4" key={feature}>
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" aria-hidden="true" />
                      <span className="text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-orange-400/30 bg-white p-6 text-slate-950 shadow-[0_24px_70px_rgba(249,115,22,0.16)]">
                <p className="text-sm font-semibold uppercase text-orange-700">One-time project</p>
                <div className="mt-4 flex items-end gap-2">
                  <p className="text-5xl font-semibold tabular-nums">£1,250</p>
                  <p className="pb-1 text-sm text-slate-500">one-time</p>
                </div>
                <p className="mt-4 leading-7 text-slate-600">
                  A practical redesign for businesses that want a stronger website before pushing
                  harder on traffic and visibility.
                </p>
                <a
                  className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
                  href={bookingLink}
                >
                  Ask about a redesign
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8" id="faq">
        <SectionIntro
          eyebrow="FAQ"
          title="Straight answers before the audit."
          description="A few simple answers for business owners and teams who want to be easier to find on Google and in AI search."
        />
        <div className="mx-auto mt-14 max-w-4xl space-y-3">
          {homeFaqs.map((faq) => (
            <details
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              key={faq.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-slate-950">
                {faq.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-4 leading-8 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-950 p-8 text-white shadow-[0_32px_90px_rgba(15,23,42,0.22)] sm:p-12 lg:p-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase text-orange-300">
                  Free visibility audit
                </p>
                <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Want to know if your business is showing up where customers are searching?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  We will review your Google visibility, AI search presence, website, and biggest
                  missed opportunities.
                </p>
              </div>
              <div className="w-full max-w-xl lg:max-w-lg">
                <PublicAuditForm compact />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

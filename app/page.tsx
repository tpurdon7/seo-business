"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileSearch,
  Gauge,
  LineChart,
  Link2,
  Search,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const bookingLink = "https://calendly.com/tom-purdon/partnerships-discussion-clone";

const logos = ["eDentist", "Sentinel HVAC", "Nicegram", "Legal Circle"];

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
      "We help your business show up when people ask AI tools for recommendations, comparisons, and answers in your industry.",
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

const results = [
  { value: "+148%", label: "more organic traffic", detail: "from people finding the business through search" },
  { value: "+72%", label: "more qualified enquiries", detail: "from people ready to compare and contact providers" },
  { value: "41", label: "important searches on page one", detail: "across local, service, and comparison searches" },
  { value: "Stronger", label: "visibility in Google and AI search", detail: "with clearer pages, proof, and online trust signals" },
];

const pricing = [
  {
    name: "Visibility Sprint",
    price: "£2,000",
    cadence: "one-time",
    description:
      "For businesses that want to understand what is stopping them from being found online.",
    features: [
      "Google visibility audit",
      "AI search visibility check",
      "Website SEO review",
      "Competitor opportunity map",
      "Clear action plan",
    ],
  },
  {
    name: "Growth Visibility",
    price: "£2,200",
    cadence: "per month",
    description: "For businesses that want ongoing SEO and GEO support.",
    features: [
      "Monthly SEO and GEO strategy",
      "Website improvements",
      "Content planning",
      "Google ranking tracking",
      "AI search visibility tracking",
    ],
    featured: true,
  },
  {
    name: "Authority Growth",
    price: "£3,200",
    cadence: "per month",
    description: "For businesses in competitive, trust-led markets.",
    features: [
      "Full SEO and GEO growth program",
      "Website and content strategy",
      "Online authority building",
      "AI search positioning",
      "Clear monthly reporting",
    ],
  },
];

const faqs = [
  {
    question: "What is SEO?",
    answer:
      "SEO helps your business show up on Google when people search for what you offer.",
  },
  {
    question: "What is GEO?",
    answer:
      "GEO helps your business show up when people ask AI tools like ChatGPT, Gemini, or Perplexity for answers, comparisons, or recommendations.",
  },
  {
    question: "Do I need both SEO and GEO?",
    answer:
      "Yes. People now search in more than one place. Google is still important, but more customers are also using AI tools to research businesses before they make a decision.",
  },
  {
    question: "Is this only for medical businesses?",
    answer:
      "No. We work with high-trust service businesses across the UK, including clinics, consultants, professional firms, and specialist local providers.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Some improvements can happen quickly, especially website fixes. Bigger visibility gains usually take a few months.",
  },
  {
    question: "Do you write the content?",
    answer:
      "Yes. We can help plan, write, improve, and structure content so it is easier for people, Google, and AI tools to understand.",
  },
  {
    question: "Is this suitable if I am not technical?",
    answer:
      "Yes. Everything is explained clearly, and we focus on practical steps that help your business become easier to find and trust.",
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

function HeroDashboard() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <motion.div
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-[0_28px_80px_rgba(15,23,42,0.18)]"
        initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 1, 0.22, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-orange-100/70 to-transparent" />
        <div className="relative rounded-lg border border-slate-200 bg-slate-950 p-3 text-white">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Visibility Dashboard</p>
              <p className="text-xs text-slate-400">Google + AI search overview</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Visibility updated
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 text-slate-950 sm:col-span-2">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Google Visibility</p>
                  <p className="text-3xl font-semibold tabular-nums">84,920</p>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  +31.4%
                </span>
              </div>
              <svg
                className="h-36 w-full overflow-visible"
                viewBox="0 0 420 160"
                role="img"
                aria-label="Google visibility chart trending upward"
              >
                <defs>
                  <linearGradient id="traffic-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 136 C58 122 72 90 122 96 C184 104 185 55 244 61 C305 67 305 28 420 22 L420 160 L0 160 Z"
                  fill="url(#traffic-fill)"
                />
                <motion.path
                  d="M0 136 C58 122 72 90 122 96 C184 104 185 55 244 61 C305 67 305 28 420 22"
                  fill="none"
                  stroke="#ea580c"
                  strokeLinecap="round"
                  strokeWidth="6"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={reduceMotion ? undefined : { pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.25, ease: "easeOut" }}
                />
                {[22, 68, 116, 164, 212, 260, 308, 356, 404].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    x2={x}
                    y1="0"
                    y2="160"
                    stroke="#e2e8f0"
                    strokeDasharray="4 10"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>
            <div className="grid gap-3">
              <MiniStat label="Keyword Growth" value="+246" tone="orange" />
              <MiniStat label="Website Health" value="89%" tone="green" />
              <MiniStat label="Lead Opportunities" value="1.8k" tone="blue" />
            </div>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-slate-300">Lead opportunities</p>
                <LineChart className="h-4 w-4 text-orange-300" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                {["comparison pages", "service pages", "AI search gaps"].map(
                  (item, index) => (
                    <div
                      className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 text-xs"
                      key={item}
                    >
                      <span className="text-slate-300">{item}</span>
                      <span className="font-semibold text-white">+{18 + index * 11}%</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-white/10 p-4">
              <div className="absolute inset-x-0 top-0 h-16 animate-[scan_5s_ease-in-out_infinite] bg-gradient-to-b from-white/20 to-transparent" />
              <p className="text-sm text-slate-300">AI Search Visibility</p>
              <div className="mt-4 flex items-end gap-2">
                {[34, 48, 44, 62, 72, 86].map((height, index) => (
                  <motion.span
                    key={height}
                    className="w-full rounded-t-sm bg-orange-300"
                    initial={reduceMotion ? false : { height: 12 }}
                    animate={reduceMotion ? undefined : { height }}
                    transition={{ duration: 0.7, delay: 0.1 * index, ease: "easeOut" }}
                  />
                ))}
              </div>
              <p className="mt-4 text-2xl font-semibold tabular-nums">64%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "orange" | "green" | "blue";
}) {
  const tones = {
    orange: "bg-orange-100 text-orange-700",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-sky-100 text-sky-700",
  };

  return (
    <div className="rounded-lg bg-white p-4 text-slate-950">
      <p className="text-xs text-slate-500">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xl font-semibold tabular-nums">{value}</p>
        <span className={cn("h-2.5 w-2.5 rounded-full", tones[tone])} />
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  const reduceMotion = useReducedMotion();
  const health = [
    ["Clear service pages", 92],
    ["Local trust signals", 76],
    ["Reviews and proof", 68],
    ["Speed and usability", 84],
  ];
  const keywords = [
    ["private clinic near me", "4", "+9"],
    ["best dental practice", "7", "+13"],
    ["aesthetics clinic reviews", "11", "+28"],
    ["local accountant advice", "6", "+5"],
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
              <p className="text-sm text-slate-400">Google, AI search, and enquiry opportunities</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="rounded-full bg-white/10 px-3 py-2">Google rankings</span>
            <span className="rounded-full bg-orange-500 px-3 py-2 text-white">AI search mentions</span>
            <span className="rounded-full bg-white/10 px-3 py-2">Lead opportunities</span>
          </div>
        </div>
        <div className="grid bg-slate-100 lg:grid-cols-[240px_1fr]">
          <aside className="hidden border-r border-slate-200 bg-white p-5 lg:block">
            <p className="mb-4 text-xs font-semibold uppercase text-slate-400">Workspace</p>
            {[
              "Google rankings",
              "AI search mentions",
              "Website health",
              "Content gaps",
              "Lead opportunities",
              "Competitor visibility",
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
                    <p className="text-sm font-medium text-slate-500">Potential enquiry value</p>
                    <p className="mt-1 text-3xl font-semibold text-slate-950 tabular-nums">
                      £428k
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                    +18.6% projected
                  </span>
                </div>
                <svg
                  className="h-64 w-full overflow-visible"
                  viewBox="0 0 720 260"
                  role="img"
                  aria-label="Potential enquiry value chart"
                >
                  <defs>
                    <linearGradient id="enquiry-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="orange-line" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  {[40, 90, 140, 190, 240].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="720"
                      y1={y}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="7 12"
                    />
                  ))}
                  <path
                    d="M0 222 C80 214 100 172 178 178 C258 184 270 118 350 124 C432 130 448 74 532 80 C612 85 628 42 720 30 L720 260 L0 260 Z"
                    fill="url(#enquiry-fill)"
                  />
                  <motion.path
                    d="M0 222 C80 214 100 172 178 178 C258 184 270 118 350 124 C432 130 448 74 532 80 C612 85 628 42 720 30"
                    fill="none"
                    stroke="url(#orange-line)"
                    strokeLinecap="round"
                    strokeWidth="7"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    whileInView={reduceMotion ? undefined : { pathLength: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                  />
                  {[178, 350, 532, 720].map((x, index) => (
                    <motion.circle
                      key={x}
                      cx={x}
                      cy={[178, 124, 80, 30][index]}
                      r="7"
                      fill="#fff"
                      stroke="#f97316"
                      strokeWidth="4"
                      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                      whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: 0.5 + index * 0.12, duration: 0.35 }}
                    />
                  ))}
                </svg>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Content gaps", "28 pages", "linked to enquiries"],
                  ["Website fixes", "43 issues", "ready to improve"],
                  ["Websites that could mention you", "67 domains", "relevant places online"],
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
                    <p className="font-semibold text-slate-950">Website health</p>
                    <p className="text-sm text-slate-500">What needs attention first</p>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="space-y-4">
                  {health.map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-600">{label}</span>
                        <span className="font-semibold text-slate-950 tabular-nums">{value}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-teal-500"
                          initial={reduceMotion ? false : { width: "0%" }}
                          whileInView={reduceMotion ? undefined : { width: `${value}%` }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 p-5 text-white shadow-sm">
                <p className="font-semibold">Google rankings</p>
                <div className="mt-4 space-y-2">
                  {keywords.map(([keyword, position, lift]) => (
                    <div
                      className="grid grid-cols-[1fr_44px_54px] items-center gap-3 rounded-lg bg-white/[0.08] px-3 py-3 text-sm"
                      key={keyword}
                    >
                      <span className="min-w-0 truncate text-slate-300">{keyword}</span>
                      <span className="font-semibold text-white tabular-nums">#{position}</span>
                      <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-center text-xs font-semibold text-emerald-300">
                        {lift}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-orange-600 p-5 text-white shadow-sm">
                <p className="text-sm font-medium text-orange-100">Next best action</p>
                <p className="mt-2 text-2xl font-semibold">Improve 9 service pages</p>
                <p className="mt-3 text-sm leading-6 text-orange-50">
                  Competitors are being found for useful local searches. Clearer service pages
                  could help more of the right people find and trust you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a className="flex items-center" href="#" aria-label="Better Search home">
            <Image
              src="/better-search-logo.png"
              alt="Better Search"
              width={1774}
              height={887}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            <a className="hover:text-slate-950" href="#services">
              Services
            </a>
            <a className="hover:text-slate-950" href="#industries">
              Who it helps
            </a>
            <a className="hover:text-slate-950" href="#dashboard">
              Dashboard
            </a>
            <a className="hover:text-slate-950" href="#process">
              Process
            </a>
            <a className="hover:text-slate-950" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-slate-950" href="#faq">
              FAQ
            </a>
          </nav>
          <a className={buttonVariants({ size: "sm" })} href={bookingLink}>
            Free audit
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_46%,#eef5f8_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24 lg:pt-24">
          <Reveal>
            <div className="mb-4 text-sm font-medium text-slate-950 sm:text-base">
              SEO + GEO for UK service businesses
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-slate-950 sm:text-5xl lg:text-6xl">
              Get found on Google and in AI search.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              We help high-trust service businesses appear when people search for what they do,
              whether they are using Google, ChatGPT, Gemini, Perplexity, or other AI tools.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Built for clinics, consultants, professional firms, and specialist local businesses
              that need to be visible, credible, and easy to choose.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className={buttonVariants({ size: "lg" })} href={bookingLink}>
                Book a free visibility audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a className={buttonVariants({ variant: "secondary", size: "lg" })} href="#process">
                See how it works
              </a>
            </div>
            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              <MiniMetric
                icon={TrendingUp}
                label="Google Visibility"
                value="+148%"
                change="+31%"
              />
              <MiniMetric icon={BrainCircuit} label="AI Search Visibility" value="+36%" change="+14" />
              <MiniMetric icon={Gauge} label="Website Health" value="89%" change="+22" />
            </div>
          </Reveal>
          <HeroDashboard />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-slate-500">
            Trusted by service businesses where reputation matters
          </p>
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-5">
            {logos.map((logo) => (
              <div
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-600"
                key={logo}
              >
                {logo}
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
          description="If your customers compare options, read reviews, check credibility, or ask AI tools for recommendations before contacting you, your online visibility matters."
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
          eyebrow="Results"
          title="Measured by visibility, trust, and real enquiries."
          description="We focus on the signs that matter: more people finding you, clearer reasons to trust you, and more of the right enquiries from Google and AI search."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {results.map((result, index) => (
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
                  <p className="text-5xl font-semibold tabular-nums">£2,500</p>
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
          {faqs.map((faq) => (
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
              <a
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
                href={bookingLink}
              >
                Book a free visibility audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>SearchRevenue SEO + GEO Visibility Agency</p>
          <div className="flex gap-5">
            <a className="hover:text-slate-950" href="#services">
              Services
            </a>
            <a className="hover:text-slate-950" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-slate-950" href={bookingLink}>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

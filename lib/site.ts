export const siteUrl = "https://bettersearch.dev";
export const siteName = "Better Search";
export const bookingLink =
  "https://calendly.com/tom-purdon/partnerships-discussion-clone";

export const logo = {
  url: "/better-search-logo.png",
  width: 1774,
  height: 887,
  alt: "Better Search logo",
};

export const homeSeo = {
  title: "Better Search | SEO & GEO for UK Service Businesses",
  description:
    "SEO and AI search visibility for high-trust service businesses in Cornwall, Surrey and across the UK. Get found on Google, ChatGPT and AI search tools.",
  path: "/",
  h1: "Get found on Google and in AI search.",
};

export const homeFaqs = [
  {
    question: "What is SEO?",
    answer:
      "SEO helps your business show up on Google when people search for what you offer.",
  },
  {
    question: "What is GEO?",
    answer:
      "GEO means generative engine optimisation. It helps Google and AI tools understand who you help, what you do, where you work, and why your business can be trusted.",
  },
  {
    question: "Do I need SEO and GEO?",
    answer:
      "Usually, yes. Google is still important, but more people now use AI tools to research providers, compare options, and ask for recommendations.",
  },
  {
    question: "Can you help with local SEO?",
    answer:
      "Yes. We help service businesses improve how they appear in local searches, including service pages, website structure, Google Business Profile signals, and local trust signals.",
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

export type FaqItem = (typeof homeFaqs)[number];

export type LocationPage = {
  slug: "seo-cornwall" | "seo-surrey";
  path: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  towns: string;
  whoItHelps: string[];
  improvements: string[];
  googleVisibility: string;
  aiVisibility: string;
  trustSignals: string[];
  faqs: FaqItem[];
};

export const locationPages: Record<LocationPage["slug"], LocationPage> = {
  "seo-cornwall": {
    slug: "seo-cornwall",
    path: "/seo-cornwall",
    eyebrow: "SEO Cornwall",
    title: "SEO for service businesses in Cornwall",
    metaTitle: "SEO Cornwall | Google & AI Search Visibility | Better Search",
    metaDescription:
      "SEO and AI search visibility for service businesses in Cornwall. Better Search helps clinics, consultants and local firms get found online.",
    h1: "SEO for service businesses in Cornwall",
    intro: [
      "If you run a service business in Cornwall, your customers are already searching. They may be looking on Google, checking reviews, comparing local providers, or asking AI tools for recommendations.",
      "The businesses that show up clearly, explain what they do, and give people reasons to trust them are more likely to get the enquiry.",
      "We help service businesses across Cornwall, including Truro, Newquay, and Falmouth, improve how they appear on Google and in AI search tools.",
    ],
    towns: "Truro, Newquay, Falmouth, St Ives, and Penzance",
    whoItHelps: [
      "Better Search works with high-trust service businesses where people need confidence before they enquire. That includes private clinics, dental practices, aesthetics clinics, physiotherapists, therapists, consultants, legal firms, accountants, financial advisers, property businesses, and specialist local services.",
      "For many of these businesses, the decision starts before someone fills in a form or picks up the phone. A potential customer might search for a provider near them, read Google reviews, compare service pages, or ask an AI tool which local options are worth considering.",
      "Cornwall has a spread-out local market, so clarity matters. Your website should make it obvious what you do, who you help, where you work, and how someone can take the next step.",
    ],
    improvements: [
      "Clearer service pages that match real customer searches",
      "Local search visibility across relevant towns and service areas",
      "Website SEO health, including titles, headings, structure, and crawlability",
      "Content around practical customer questions",
      "Trust signals such as proof, credentials, useful mentions, and clear contact paths",
      "AI search visibility through better entity clarity and stronger answers",
      "Enquiry paths that make it easier for the right people to contact you",
    ],
    googleVisibility:
      "Google needs to understand the services you offer, the places you serve, and the reasons people should trust your business. We review the structure of your website, the strength of your service pages, the way pages link together, and the local signals that help search engines connect your business with relevant searches in Cornwall.",
    aiVisibility:
      "GEO means generative engine optimisation. In plain English, it is the work that helps AI search tools understand your business. Clear service pages, consistent information, useful answers, and strong trust signals can increase the chances that your business is discovered when people ask AI tools for help choosing a provider.",
    trustSignals: [
      "Local trust signals help both people and search engines connect the dots. We look for ways to make credentials, reviews, locations served, service detail, team expertise, and contact information easier to find and understand.",
      "We do not invent proof or make claims your business cannot support. The aim is to bring the real reasons to trust you closer to the parts of the website where people are deciding whether to enquire.",
    ],
    faqs: [
      {
        question: "How do I get my business found on Google in Cornwall?",
        answer:
          "Start with clear service pages, strong page titles, useful local content, a healthy website, and consistent trust signals. We help identify the gaps and fix the work that is most likely to improve visibility.",
      },
      {
        question: "Is SEO worth it for small businesses in Cornwall?",
        answer:
          "It can be, especially if people already search for your service before choosing a provider. SEO helps make your business easier to find and compare when that demand already exists.",
      },
      {
        question: 'Can Better Search help with "near me" searches in Cornwall?',
        answer:
          "Yes. We improve the website and local signals that support nearby searches, including service clarity, location relevance, internal links, and Google Business Profile signals.",
      },
    ],
  },
  "seo-surrey": {
    slug: "seo-surrey",
    path: "/seo-surrey",
    eyebrow: "SEO Surrey",
    title: "SEO for service businesses in Surrey",
    metaTitle: "SEO Surrey | Google & AI Search Visibility | Better Search",
    metaDescription:
      "SEO and AI search visibility for service businesses in Surrey. Better Search helps clinics, consultants and professional firms get found online.",
    h1: "SEO for service businesses in Surrey",
    intro: [
      "Surrey is a competitive market for service businesses. When someone searches for a clinic, consultant, legal firm, accountant, or local specialist, they often compare several options before getting in touch.",
      "Your website needs to make the choice easier. It should be clear what you do, where you work, why people should trust you, and how to contact you.",
      "We help service businesses across Surrey, including Guildford, Woking, and Farnham, improve how they appear on Google and in AI search tools.",
    ],
    towns: "Guildford, Woking, Farnham, Epsom, and Reigate",
    whoItHelps: [
      "Better Search is for high-trust service businesses that depend on being understood before they are contacted. That includes private clinics, dentists, aesthetics clinics, physiotherapists, therapists, consultants, legal firms, accountants, financial advisers, property businesses, and specialist local providers.",
      "In Surrey, many customers have several credible options close by. They compare websites, read reviews, check credentials, and look for signs that a provider understands their need. Search visibility is part of that trust-building process.",
      "We help make your website clearer for people, Google, and AI tools, so your business has a better chance of appearing when someone is actively looking for the service you provide.",
    ],
    improvements: [
      "Local search visibility for relevant Surrey service searches",
      "Service page clarity, including headings, page titles, and plain-English copy",
      "Google ranking opportunities based on real search demand",
      "AI search visibility through clearer answers and better business information",
      "Content gaps around customer questions and comparison searches",
      "Trust and proof, including credentials, reviews, useful mentions, and service detail",
      "Conversion paths that make enquiries simple and obvious",
    ],
    googleVisibility:
      "Good SEO in Surrey starts with making your business easy for Google to understand. We look at your page structure, service coverage, internal links, technical SEO health, local relevance, and the searches people use when they are ready to compare providers.",
    aiVisibility:
      "AI search tools work best when a business is easy to understand. We improve the information, answer structure, service clarity, and trust signals that help Google and AI tools recognise what you do and when your business may be relevant.",
    trustSignals: [
      "Local trust signals matter in competitive service markets. We help surface the real proof your business already has, such as qualifications, reviews, useful content, location coverage, team expertise, and clear contact options.",
      "The goal is not to make exaggerated claims. It is to make your website easier to understand and easier to choose for someone comparing providers in Surrey.",
    ],
    faqs: [
      {
        question: "How competitive is SEO in Surrey?",
        answer:
          "It can be competitive because many service businesses are close to busy towns and affluent local markets. Clear pages, local relevance, and strong trust signals can make a real difference over time.",
      },
      {
        question: "Can SEO help clinics and consultants in Surrey get more enquiries?",
        answer:
          "Yes, when people are already searching for those services. SEO helps your website appear for relevant searches and gives visitors clearer reasons to make an enquiry.",
      },
      {
        question: "Can Better Search help my business appear in AI search tools?",
        answer:
          "We can improve the chances of being discovered by making your business easier for AI tools to understand. That includes clearer service pages, useful answers, consistent information, and stronger trust signals.",
      },
    ],
  },
};

export const sitemapPages = [homeSeo.path, "/seo-cornwall", "/seo-surrey"] as const;

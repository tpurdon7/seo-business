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
    "SEO and AI search visibility for high-trust service businesses in Cornwall, Surrey and across the UK. Get found on Google and AI search tools.",
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
      "GEO means making your business easier for AI search tools to understand, trust, and mention. That usually means clearer service pages, useful answers, consistent business information, stronger proof, and better online trust signals.",
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
  shortName: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  supportingGuidePath: string;
  supportingGuideTitle: string;
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
    shortName: "Cornwall",
    eyebrow: "SEO Cornwall",
    title: "SEO for service businesses in Cornwall",
    metaTitle: "SEO Cornwall | Google & AI Search Visibility | Better Search",
    metaDescription:
      "SEO and AI search visibility for service businesses in Cornwall. Better Search helps clinics, consultants and local firms get found online.",
    h1: "SEO for service businesses in Cornwall",
    supportingGuidePath: "/how-to-get-found-on-google-in-cornwall",
    supportingGuideTitle: "How to get found on Google in Cornwall",
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
        question: "Is local SEO worth it for Cornwall service businesses?",
        answer:
          "Yes, if people search before they choose a provider. Local SEO helps your business appear more clearly when that demand already exists.",
      },
      {
        question: 'Can Better Search help with "near me" searches in Cornwall?',
        answer:
          "Yes. We improve the website and local signals that support nearby searches, including service clarity, location relevance, internal links, and Google Business Profile signals.",
      },
      {
        question: "How long does SEO take?",
        answer:
          "Some fixes can help quickly, especially technical and page clarity improvements. Stronger local visibility usually builds over a few months.",
      },
    ],
  },
  "seo-surrey": {
    slug: "seo-surrey",
    path: "/seo-surrey",
    shortName: "Surrey",
    eyebrow: "SEO Surrey",
    title: "SEO for service businesses in Surrey",
    metaTitle: "SEO Surrey | Google & AI Search Visibility | Better Search",
    metaDescription:
      "SEO and AI search visibility for service businesses in Surrey. Better Search helps clinics, consultants and professional firms get found online.",
    h1: "SEO for service businesses in Surrey",
    supportingGuidePath: "/seo-for-service-businesses-in-surrey",
    supportingGuideTitle: "SEO for service businesses in Surrey",
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
      {
        question: "How long does SEO take?",
        answer:
          "Some improvements can land quickly, especially page and technical fixes. Stronger visibility in Surrey usually takes a few months of steady work.",
      },
    ],
  },
};

export type GuidePage = {
  slug:
    | "how-to-get-found-on-google-in-cornwall"
    | "seo-for-service-businesses-in-surrey";
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  localAreas: string[];
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: FaqItem[];
  supportingLocationPath: string;
  supportingLocationAnchor: string;
};

export const guidePages: Record<GuidePage["slug"], GuidePage> = {
  "how-to-get-found-on-google-in-cornwall": {
    slug: "how-to-get-found-on-google-in-cornwall",
    path: "/how-to-get-found-on-google-in-cornwall",
    metaTitle: "How to Get Found on Google in Cornwall | Better Search",
    metaDescription:
      "A simple guide for Cornwall service businesses that want to appear more clearly on Google, local search, and AI search tools.",
    h1: "How to get found on Google in Cornwall",
    eyebrow: "Cornwall guide",
    intro: [
      "If you run a service business in Cornwall, local visibility often decides who gets the first enquiry. People may search for a clinic in Truro, a consultant in Newquay, or a therapist near Falmouth before they ever ask for a recommendation.",
      "The goal is not to appear for every search. It is to appear clearly when the right customer is already looking for the kind of service you provide.",
    ],
    localAreas: ["Cornwall", "Truro", "Newquay", "Falmouth"],
    sections: [
      {
        title: "Why local visibility matters in Cornwall",
        paragraphs: [
          "Cornwall service businesses often serve a spread-out local area, so customers want reassurance that you cover their town and understand their needs. When your website is vague about services, locations, or next steps, people often move on.",
          "Google and AI search tools both look for clear signals. They need to understand what you do, who you help, where you work, and why someone should trust you over another local option.",
        ],
      },
      {
        title: "How customers search before they enquire",
        paragraphs: [
          "Most people do not search once and book straight away. They search, compare, read, and come back. A local service business in Cornwall might be judged on its service page, Google Business Profile, reviews, and how clearly the website answers basic questions.",
        ],
        bullets: [
          "Searches for the service itself, such as dentist, physio, therapist, accountant, or solicitor",
          "Place-based searches that mention Cornwall, Truro, Newquay, or Falmouth",
          "Comparison searches where people want the best fit, not just the closest option",
          "AI search questions where someone asks for help choosing a provider",
        ],
      },
      {
        title: "Start with your Google Business Profile",
        paragraphs: [
          "Your Google Business Profile is often the first thing people see. Make sure the business category is accurate, the contact details match your website, the service description is clear, and the profile is kept up to date.",
          "Photos, opening details, service areas, and thoughtful review replies all help. The aim is not to make it look busy. The aim is to make it look reliable.",
        ],
      },
      {
        title: "Build service pages that make sense to real customers",
        paragraphs: [
          "A strong service page should explain the service in plain English, say who it is for, and make the next step obvious. It should also make it easy for Google to understand the topic without stuffing in awkward phrases.",
          "If you cover different towns or service types, the page should reflect that naturally. Clear titles, headings, internal links, and a short section on areas served can do a lot of the work.",
        ],
      },
      {
        title: "Reviews and trust signals matter",
        paragraphs: [
          "High-trust businesses need stronger proof than low-risk purchases. Reviews help, but so do qualifications, associations, experience, policies, named services, and clear contact routes.",
          "Keep trust signals close to the service pages where people are deciding. That makes the website easier to trust and easier for AI tools to interpret.",
        ],
      },
      {
        title: "Create useful local content",
        paragraphs: [
          "Local content works best when it answers a real question. A Cornwall clinic might explain what to expect before an appointment. A consultant might answer common pricing or process questions. A legal or financial firm might explain how they help local clients with a specific problem.",
          "This kind of content supports service pages, gives you more internal linking opportunities, and helps Google connect your business with the places and topics that matter.",
        ],
      },
      {
        title: "Keep the technical basics tidy",
        paragraphs: [
          "Technical SEO does not need to be complicated. Make sure your important pages can be crawled, have clear titles and descriptions, use one main heading, load properly on mobile, and link sensibly to related pages.",
          "A clean sitemap, correct canonicals, sensible image alt text, and no accidental noindex tags make it easier for search engines to trust what they are seeing.",
        ],
      },
      {
        title: "Do not ignore AI search visibility",
        paragraphs: [
          "More people now ask AI search tools for help comparing providers. GEO means making your business easier for AI search tools to understand, trust, and mention. That usually means clearer service pages, useful answers, consistent business information, stronger proof, and better online trust signals.",
          "You do not need to chase gimmicks. You need a website that explains the business clearly and answers the questions customers already ask.",
        ],
      },
      {
        title: "Clear next steps for a Cornwall service business",
        paragraphs: [
          "Start by tightening the pages that already matter most. Update your service pages, review your Google Business Profile, surface trust signals, and publish useful local content that supports the way people actually search.",
          "If you want a more focused plan, our SEO in Cornwall page explains how Better Search approaches local visibility for high-trust businesses.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I get my business found on Google in Cornwall?",
        answer:
          "Start with clear service pages, a complete Google Business Profile, strong trust signals, and useful local content. Then make sure the site is technically easy for Google to crawl and understand.",
      },
      {
        question: "Is local SEO worth it for Cornwall service businesses?",
        answer:
          "Yes, when customers already search before they choose a provider. It helps your business appear more clearly when that local demand already exists.",
      },
      {
        question: 'Can Better Search help with "near me" searches in Cornwall?',
        answer:
          "Yes. We improve the page structure, local relevance, internal links, and profile signals that support nearby searches.",
      },
      {
        question: "How long does SEO take?",
        answer:
          "Some fixes can help quickly, especially technical and page clarity work. Stronger local visibility usually builds over a few months.",
      },
    ],
    supportingLocationPath: "/seo-cornwall",
    supportingLocationAnchor: "SEO in Cornwall",
  },
  "seo-for-service-businesses-in-surrey": {
    slug: "seo-for-service-businesses-in-surrey",
    path: "/seo-for-service-businesses-in-surrey",
    metaTitle: "SEO for Service Businesses in Surrey | Better Search",
    metaDescription:
      "A simple guide to SEO for Surrey clinics, consultants, professional firms, and local service businesses.",
    h1: "SEO for service businesses in Surrey",
    eyebrow: "Surrey guide",
    intro: [
      "Surrey can be a competitive place to win new business online. Clinics, consultants, professional firms, and specialist local services often sit side by side with strong local competitors, which means customers compare carefully before they enquire.",
      "Good SEO in Surrey is less about chasing volume and more about clarity. The business that explains itself better often has the advantage.",
    ],
    localAreas: ["Surrey", "Guildford", "Woking", "Farnham"],
    sections: [
      {
        title: "Why Surrey is competitive",
        paragraphs: [
          "Many Surrey businesses serve customers with high expectations and plenty of choice. If someone is comparing clinics in Guildford, consultants in Woking, or a professional firm in Farnham, they are likely to look at several providers before making contact.",
          "That means your website needs to feel clear, trustworthy, and easy to compare. SEO supports that by making the right pages easier to find and easier to understand.",
        ],
      },
      {
        title: "How customers compare providers",
        paragraphs: [
          "Searchers in Surrey are often not just asking who is nearby. They want to know who looks credible, who seems experienced, and who offers the most relevant service for their situation.",
        ],
        bullets: [
          "They compare service pages side by side",
          "They check reviews and other trust signals",
          "They look for named services, specialisms, and clear next steps",
          "They ask AI tools questions before narrowing down their shortlist",
        ],
      },
      {
        title: "Service page clarity comes first",
        paragraphs: [
          "Your main service pages should say exactly what you offer, who it is for, and what happens next. If the page is vague, over-polished, or hard to scan, it will struggle to convert even if it gets traffic.",
          "Titles, headings, internal links, and supporting FAQs help both people and search engines understand the page. Clear copy usually outperforms clever wording here.",
        ],
      },
      {
        title: "Local SEO still matters",
        paragraphs: [
          "Even when your business works across Surrey, local intent matters. Customers often search by town, area, or service type. Google also looks for consistency between your site, your Google Business Profile, and other references online.",
          "Your website should make it easy to see where you work, while staying honest about service area coverage.",
        ],
      },
      {
        title: "Reviews and trust do a lot of the heavy lifting",
        paragraphs: [
          "For clinics, consultants, and professional firms, trust signals often decide whether someone takes the next step. Reviews help, but so do qualifications, process clarity, privacy information, and straightforward contact routes.",
          "Keep the strongest proof close to the pages where customers are making a decision.",
        ],
      },
      {
        title: "Content should answer real questions",
        paragraphs: [
          "Useful content is often the difference between being indexed and being chosen. Think about the questions people ask before booking, buying, or comparing providers. Then answer them clearly.",
          "That might include cost questions, process questions, location questions, or practical concerns that stop people from enquiring.",
        ],
      },
      {
        title: "Google Business Profile basics",
        paragraphs: [
          "A well-maintained Google Business Profile supports local visibility and trust. Keep categories, contact details, service descriptions, and service areas accurate, and make sure the website link points to the most relevant page.",
          "Use review replies and updates to reinforce clarity, not to force keywords into the profile.",
        ],
      },
      {
        title: "AI search visibility is becoming part of local SEO",
        paragraphs: [
          "Customers increasingly ask AI tools who to compare, what to look for, and which providers seem credible. GEO means making your business easier for AI search tools to understand, trust, and mention. That usually means clearer service pages, useful answers, consistent business information, stronger proof, and better online trust signals.",
          "You cannot force an AI mention, but you can make your business easier to interpret.",
        ],
      },
      {
        title: "Next steps for Surrey service businesses",
        paragraphs: [
          "Start with the pages that drive enquiries. Tighten your service copy, improve local signals, add FAQs, strengthen trust signals, and make sure your internal links connect the right pages together.",
          "If you want help shaping that into a plan, our SEO in Surrey page explains how Better Search supports high-trust local businesses.",
        ],
      },
    ],
    faqs: [
      {
        question: "How competitive is SEO in Surrey?",
        answer:
          "It can be competitive because many providers are close together and customers compare carefully. Clearer pages and stronger trust signals can make a real difference.",
      },
      {
        question: "Can SEO help clinics and consultants in Surrey get more enquiries?",
        answer:
          "Yes, if people already search for those services. Better visibility and clearer pages can lead to more relevant enquiries.",
      },
      {
        question: "Can Better Search help my business appear in AI search tools?",
        answer:
          "We can improve AI search visibility by making your business easier to understand. That includes service clarity, useful answers, and stronger trust signals.",
      },
      {
        question: "How long does SEO take?",
        answer:
          "Some fixes can help quickly, especially on-page and technical work. Stronger visibility usually builds over a few months.",
      },
    ],
    supportingLocationPath: "/seo-surrey",
    supportingLocationAnchor: "SEO in Surrey",
  },
};

export const sitemapPages = [
  homeSeo.path,
  "/seo-cornwall",
  "/seo-surrey",
  "/how-to-get-found-on-google-in-cornwall",
  "/seo-for-service-businesses-in-surrey",
] as const;

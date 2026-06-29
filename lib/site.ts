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

export type CornerstonePage = {
  slug: "seo-for-high-trust-service-businesses";
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  audiences: string[];
  keyPoints: Array<{
    title: string;
    description: string;
  }>;
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: FaqItem[];
  relatedLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export const cornerstonePages: Record<CornerstonePage["slug"], CornerstonePage> = {
  "seo-for-high-trust-service-businesses": {
    slug: "seo-for-high-trust-service-businesses",
    path: "/seo-for-high-trust-service-businesses",
    metaTitle:
      "SEO for High-Trust Service Businesses | Better Search",
    metaDescription:
      "A practical guide to SEO for high-trust UK service businesses such as clinics, consultants, dentists, therapists, accountants, and legal firms.",
    h1: "SEO for high-trust service businesses",
    eyebrow: "Cornerstone guide",
    intro: [
      "SEO works differently when a customer needs confidence before they enquire. Clinics, consultants, dentists, therapists, accountants, legal firms, and similar businesses are rarely chosen on visibility alone.",
      "People compare carefully. They read service pages, look for qualifications, check reviews, ask practical questions, and often use AI tools to narrow down who looks credible.",
      "That means the job is not just ranking a page. The job is making the business easy to understand, easy to trust, and easy to choose when the right person is already searching.",
    ],
    audiences: [
      "Private clinics",
      "Dentists",
      "Therapists",
      "Consultants",
      "Accountants",
      "Legal firms",
      "Financial advisers",
      "Specialist local services",
    ],
    keyPoints: [
      {
        title: "Commercial pages first",
        description:
          "Home, service, location, and trust pages usually deserve attention before wider content expansion.",
      },
      {
        title: "Trust close to the decision",
        description:
          "Reviews, qualifications, process detail, FAQs, and policies should sit near the pages that drive enquiries.",
      },
      {
        title: "Google and AI both matter",
        description:
          "The same clarity that supports rankings also helps AI tools summarise and compare the business accurately.",
      },
    ],
    sections: [
      {
        title: "What makes high-trust SEO different",
        paragraphs: [
          "High-trust searches usually sit closer to a decision with more perceived risk. Someone looking for a therapist, clinic, consultant, accountant, or legal provider often wants reassurance before they want a call.",
          "That changes the brief. The site needs stronger service explanation, cleaner buying signals, clearer next steps, and better trust support than a lower-stakes service might need.",
        ],
        bullets: [
          "Customers compare several providers before making contact",
          "The strongest page is often the clearest page, not the busiest one",
          "Thin content and vague claims usually damage trust more than they help reach",
        ],
      },
      {
        title: "The pages that usually matter most",
        paragraphs: [
          "Most high-trust businesses do not need a sprawling content plan on day one. They need the pages tied closest to enquiries to become much clearer.",
          "That normally means the homepage, core service pages, location pages where local intent exists, an about page, a methodology or process page, and a small number of useful guides that answer pre-enquiry questions.",
        ],
      },
      {
        title: "Service pages should reduce uncertainty",
        paragraphs: [
          "A strong service page should explain what the service is, who it is for, what problem it solves, how the process works, and what happens next. In high-trust markets, vague copy is expensive because it creates hesitation.",
          "Good titles, useful headings, concise definitions, FAQs, and visible trust detail make those pages easier for both buyers and search engines to interpret.",
        ],
      },
      {
        title: "Trust signals should support the choice, not decorate the page",
        paragraphs: [
          "Trust signals are only useful when they help someone judge whether your business looks credible. That can include qualifications, professional memberships, reviews, process notes, locations served, pricing context, or simple clarity about how to get started.",
          "Unsupported claims, fake proof, and recycled jargon are a bad fit for this kind of SEO because they undermine the very signal the page needs to send.",
        ],
      },
      {
        title: "Location pages only help when the local intent is real",
        paragraphs: [
          "Many high-trust service businesses need both a UK-wide positioning page and selected local pages for areas they genuinely serve. The local page should add context, not just swap in place names.",
          "If your business competes in places like Surrey or Cornwall, local pages can support nearby searches while the main cornerstone page explains the broader offer and search strategy.",
        ],
      },
      {
        title: "AI search visibility now sits inside the same brief",
        paragraphs: [
          "Buyers increasingly ask AI tools who to compare, what to look for, or which providers seem suitable. That means high-trust SEO now overlaps with GEO and AEO.",
          "Pages that define the service clearly, answer practical questions directly, and keep business information consistent are easier for AI systems to extract and describe without distortion.",
        ],
        bullets: [
          "Use clear section headings that match real buyer questions",
          "Keep important answers short enough to quote or summarise cleanly",
          "Match schema, page topic, and on-page copy so the page says one consistent thing",
        ],
      },
      {
        title: "Common mistakes on high-trust websites",
        paragraphs: [
          "The most common issue is not a missing SEO trick. It is usually a site that looks polished but leaves too much unsaid about services, fit, proof, or next steps.",
        ],
        bullets: [
          "Generic homepage copy with weak service detail",
          "No supporting trust pages explaining approach or process",
          "Local pages that are too thin to deserve ranking",
          "FAQs buried away from the commercial pages they should support",
          "Canonical, sitemap, or internal-link gaps that make good pages harder to discover",
        ],
      },
      {
        title: "A sensible order of work",
        paragraphs: [
          "For most businesses, the right order is to fix crawlability and metadata basics, strengthen the main commercial pages, add or improve trust pages, build a cornerstone guide, and then expand into local or niche supporting pages where demand exists.",
          "That keeps the site focused, easier to review, and better aligned with how high-trust buyers actually search.",
        ],
      },
    ],
    faqs: [
      {
        question: "What counts as a high-trust service business?",
        answer:
          "Usually a business where customers compare carefully before enquiring, such as clinics, dentists, therapists, consultants, accountants, legal firms, and similar providers.",
      },
      {
        question: "Is SEO different for clinics and professional firms?",
        answer:
          "Yes. The SEO still needs technical basics, but the page quality, trust support, and decision-stage content usually matter more than broad traffic alone.",
      },
      {
        question: "Do high-trust businesses still need local SEO?",
        answer:
          "Often, yes. If people search by town, county, or nearby provider terms, local pages and local signals still matter alongside the wider service positioning.",
      },
      {
        question: "How does AI search affect this kind of SEO?",
        answer:
          "AI search increases the value of clear answers, consistent business information, and well-structured trust signals because those elements are easier for AI tools to interpret and cite.",
      },
    ],
    relatedLinks: [
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See the audit and prioritisation process behind this type of work.",
      },
      {
        href: "/about",
        label: "About Better Search",
        description:
          "See who Better Search is built for and what the work focuses on.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local page for high-trust service businesses across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local page for high-trust service businesses across Truro, Newquay, and Falmouth.",
      },
    ],
  },
};

export type IndustryPage = {
  slug:
    | "seo-for-clinics"
    | "seo-for-consultants"
    | "seo-for-dentists"
    | "seo-for-therapists"
    | "seo-for-accountants"
    | "seo-for-legal-firms";
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  idealFor: string[];
  decisionFactors: Array<{
    title: string;
    description: string;
  }>;
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: FaqItem[];
  relatedLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export const industryPages: Record<IndustryPage["slug"], IndustryPage> = {
  "seo-for-clinics": {
    slug: "seo-for-clinics",
    path: "/seo-for-clinics",
    metaTitle: "SEO for Clinics | Better Search",
    metaDescription:
      "SEO for private clinics and specialist healthcare providers that need stronger local visibility, clearer treatment pages, and better patient trust signals.",
    h1: "SEO for clinics that need patient trust before enquiry",
    eyebrow: "Clinic SEO",
    intro: [
      "Clinic SEO is rarely a traffic problem on its own. Patients compare carefully, check reviews, look for named treatments, and want to feel confident before they call or book.",
      "That means the strongest clinic SEO work usually starts with treatment-page clarity, local relevance, clinician trust signals, and practical answers that reduce hesitation.",
      "Better Search helps private clinics and other high-trust healthcare providers make those signals easier for Google, AI tools, and patients to understand.",
    ],
    idealFor: [
      "Private clinics",
      "Specialist practices",
      "Physiotherapy clinics",
      "Aesthetics clinics",
      "Therapy clinics",
    ],
    decisionFactors: [
      {
        title: "Treatment clarity",
        description:
          "Patients should be able to see exactly what the clinic helps with, who a treatment is for, and what the next step looks like.",
      },
      {
        title: "Clinician credibility",
        description:
          "Named practitioners, qualifications, process detail, and practical trust signals matter more than polished copy on their own.",
      },
      {
        title: "Local intent",
        description:
          "Many clinic searches include town, area, or nearby intent, so local relevance still matters even when the service is specialist.",
      },
    ],
    sections: [
      {
        title: "Why clinic SEO is different",
        paragraphs: [
          "Patients do not choose a clinic the same way they choose a low-risk purchase. They want reassurance about the treatment, the practitioner, the process, and whether the clinic feels credible.",
          "That makes trust and clarity part of the SEO brief. If the page ranks but leaves too many questions unanswered, it still underperforms.",
        ],
      },
      {
        title: "Treatment pages should answer decision-stage questions",
        paragraphs: [
          "A clinic website usually needs more than one broad services page. Each core treatment or service line should have its own useful page with plain-English explanations, expected fit, process notes, and clear next steps.",
          "These pages help with both rankings and conversion because they line up better with the searches patients actually make before contacting a clinic.",
        ],
        bullets: [
          "What the treatment is and who it is for",
          "Common concerns or eligibility questions",
          "What a consultation or appointment involves",
          "What someone should do next if they are considering it",
        ],
      },
      {
        title: "Trust signals need to sit close to the booking decision",
        paragraphs: [
          "For clinics, trust signals are part of the page quality, not decoration. Reviews, practitioner bios, qualifications, memberships, and process detail all help reduce uncertainty when they are easy to find.",
          "The aim is not to force proof everywhere. The aim is to place real, relevant trust signals near the pages where someone is deciding whether to enquire.",
        ],
      },
      {
        title: "Local search still matters for clinics",
        paragraphs: [
          "Even specialist clinics usually depend on local or regional searches. People often search by treatment plus town, compare nearby options, or use maps and reviews as part of the shortlist.",
          "Your site should make locations served, contact routes, and booking options obvious without creating thin local pages that add no value.",
        ],
      },
      {
        title: "AI search is becoming part of patient research",
        paragraphs: [
          "Patients increasingly ask AI tools for help comparing treatments, understanding the process, or narrowing down providers. That makes concise answers, clean headings, and consistent clinic information more valuable.",
          "Good GEO for clinics usually looks like better service definition, stronger entity clarity, and pages that answer sensible pre-enquiry questions directly.",
        ],
      },
      {
        title: "What to fix first on a clinic website",
        paragraphs: [
          "Start with the pages most closely tied to bookings. Tighten treatment pages, surface clinician trust signals, make local relevance obvious, and add practical FAQs that reduce hesitation before contact.",
          "That usually gives a clinic a better base than jumping straight into a wide content calendar.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should a clinic website prioritise for SEO first?",
        answer:
          "Usually the treatment pages, practitioner trust signals, local relevance, and clear booking routes. Those pages tend to affect both visibility and enquiries first.",
      },
      {
        question: "Does local SEO still matter for specialist clinics?",
        answer:
          "Yes. Even specialist clinics are often compared locally or regionally, so clear location signals and nearby intent still matter.",
      },
      {
        question: "Can Better Search help clinics with AI search visibility?",
        answer:
          "Yes. The work focuses on clearer treatment pages, stronger trust signals, consistent clinic information, and answer-ready content that AI tools can interpret more accurately.",
      },
      {
        question: "Do clinics need separate pages for each treatment?",
        answer:
          "Usually for the main treatments, yes. Separate pages make it easier to match real search intent and answer specific patient questions.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the high-trust SEO guide",
        description:
          "Broader guidance on trust-led SEO for clinics, consultants, and other careful-buying markets.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See how Better Search audits, prioritises, and improves the pages that matter most first.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local commercial page for clinics and service businesses across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local commercial page for clinics and service businesses across Truro, Newquay, and Falmouth.",
      },
      {
        href: "/seo-for-dentists",
        label: "SEO for dentists",
        description:
          "Related industry page for dental practices with stronger treatment and local intent needs.",
      },
    ],
  },
  "seo-for-consultants": {
    slug: "seo-for-consultants",
    path: "/seo-for-consultants",
    metaTitle: "SEO for Consultants | Better Search",
    metaDescription:
      "SEO for consultants and boutique advisory firms that need clearer positioning, stronger expert trust signals, and pages built for comparison searches.",
    h1: "SEO for consultants who need to look credible before the first call",
    eyebrow: "Consultant SEO",
    intro: [
      "Consultant SEO works best when the website explains a clear commercial offer, not just broad expertise. Buyers compare carefully, look for specialism, and want confidence that you understand their problem.",
      "That means positioning, service clarity, and practical proof usually matter more than publishing generic thought-leadership content at volume.",
      "Better Search helps consultants and boutique advisory firms make those signals easier to find on Google and easier for AI tools to summarise accurately.",
    ],
    idealFor: [
      "Independent consultants",
      "Boutique consultancies",
      "Fractional specialists",
      "Advisory firms",
      "Sector experts",
    ],
    decisionFactors: [
      {
        title: "Positioning clarity",
        description:
          "The site should make it obvious what problem the consultant solves, who the work is for, and where the offer is strongest.",
      },
      {
        title: "Expert proof",
        description:
          "Specific experience, process clarity, and useful examples usually build more trust than vague authority language.",
      },
      {
        title: "Commercial next steps",
        description:
          "Prospects need to see how to start, what type of engagement fits, and whether the offer suits their situation.",
      },
    ],
    sections: [
      {
        title: "Consultant SEO starts with positioning",
        paragraphs: [
          "Many consultant websites are too broad. They say a lot about experience but too little about the exact business problem they solve, the audience they help, or the shape of the engagement.",
          "Clear positioning helps rankings because it creates more focused pages. It also helps conversion because a buyer can see faster whether the consultant is relevant.",
        ],
      },
      {
        title: "Service pages should match problem-led searches",
        paragraphs: [
          "Consulting buyers often search by outcome, challenge, or specialist area rather than the word consultant on its own. Your main pages should reflect those searches in a natural way.",
          "A strong consultant page usually explains the problem, the approach, the fit, and the next step without hiding behind vague strategic language.",
        ],
        bullets: [
          "Describe the service in plain English",
          "Name the audiences or sectors you help most",
          "Explain the delivery model or engagement shape",
          "Add FAQs around fit, timing, and process",
        ],
      },
      {
        title: "Credibility should come from specifics",
        paragraphs: [
          "Consulting SEO often improves when the site gets more concrete. Clear founder or expert bios, sector experience, practical process notes, and useful examples help people trust the offer more quickly.",
          "You do not need inflated case studies to do this well. Often an anonymised example, a methodology page, or clearer service definition is enough to improve the page.",
        ],
      },
      {
        title: "Comparison content can support consultant SEO",
        paragraphs: [
          "Prospects compare providers carefully. That creates useful search intents around service fit, process questions, pricing context, timelines, and what a consultant actually does.",
          "Supporting guides or FAQs around those questions can strengthen both internal links and conversion readiness when they point back to the commercial pages.",
        ],
      },
      {
        title: "Local and sector relevance still matter",
        paragraphs: [
          "Some consultants win nationally, some regionally, and many do both. If buyers search by location, the site should support that honestly. If the main buying signal is sector or specialism, the content structure should make that clearer than geography.",
          "The right balance depends on the searches that already match how you sell.",
        ],
      },
      {
        title: "What to fix first on a consultant site",
        paragraphs: [
          "Start with the homepage, core service pages, and about or methodology pages. Tighten the positioning, make expertise specific, and add the proof and FAQs that help a prospect decide whether to book a call.",
          "Once those pages are clearer, supporting content has a much stronger foundation.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should consultants focus on for SEO first?",
        answer:
          "Usually the homepage, core service pages, positioning, and expert trust signals. Those assets shape both relevance and conversion quality.",
      },
      {
        question: "Do consultants need blog content to rank?",
        answer:
          "Sometimes, but not first. Most consultant sites benefit more from clearer commercial pages and better internal links before broad content expansion.",
      },
      {
        question: "Can consultant SEO help with AI search visibility too?",
        answer:
          "Yes. Clear service definitions, direct answers, and consistent expertise signals make consultant websites easier for AI tools to interpret and compare.",
      },
      {
        question: "Should consultants create pages by sector or by service?",
        answer:
          "It depends on how prospects search and how the offer is sold. Often the best structure is a small number of strong service pages supported by sector-specific context where demand is real.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the high-trust SEO guide",
        description:
          "Broader guidance on trust-led SEO for consultants, clinics, and professional services.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See how Better Search prioritises commercial pages, internal links, and trust signals first.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local commercial page for consultants and professional firms across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local commercial page for consultants and service businesses across Truro, Newquay, and Falmouth.",
      },
      {
        href: "/seo-for-clinics",
        label: "SEO for clinics",
        description:
          "Related industry page covering trust-led SEO for private clinics and specialist healthcare providers.",
      },
    ],
  },
  "seo-for-dentists": {
    slug: "seo-for-dentists",
    path: "/seo-for-dentists",
    metaTitle: "SEO for Dentists | Better Search",
    metaDescription:
      "SEO for dental practices that need stronger treatment pages, clearer local trust signals, and better paths from search to appointment.",
    h1: "SEO for dentists who need stronger treatment and local search visibility",
    eyebrow: "Dental SEO",
    intro: [
      "Dental SEO sits close to an enquiry or booking decision. Patients compare treatments, reviews, clinicians, location, and practical details before they choose a practice.",
      "That makes treatment-page quality, local visibility, and trust signals central to the SEO work. Generic page copy usually loses to clearer, more specific competitor pages.",
      "Better Search helps dental practices make those decision-stage pages easier to understand for Google, AI tools, and prospective patients.",
    ],
    idealFor: [
      "Private dental practices",
      "Mixed NHS and private practices",
      "Cosmetic dentistry providers",
      "Implant clinics",
      "Family dental practices",
    ],
    decisionFactors: [
      {
        title: "Treatment intent",
        description:
          "Patients often search for specific treatments, not dentistry in general, so the site should reflect the real treatment mix clearly.",
      },
      {
        title: "Practice trust signals",
        description:
          "Clinician detail, reviews, finance or pricing context, and clear booking routes help reduce hesitation before contact.",
      },
      {
        title: "Local competition",
        description:
          "Dental searches are often highly local, which means local relevance and internal links need to support the treatment pages properly.",
      },
    ],
    sections: [
      {
        title: "Dental SEO is highly local and treatment-led",
        paragraphs: [
          "Most dental searches happen with a treatment or local angle. Someone might search for Invisalign in Guildford, emergency dentist in Truro, or dental implants near them before ever looking at a general practice page.",
          "That means a dental site needs both local relevance and treatment clarity. Broad service summaries are rarely enough on their own.",
        ],
      },
      {
        title: "Each core treatment deserves its own useful page",
        paragraphs: [
          "The main treatments should usually have dedicated pages with clear explanations, fit, next steps, and answers to common patient questions. That helps the page match search intent more closely and gives patients more confidence.",
          "The best pages feel practical, not sales-heavy. They explain the treatment and make the route to an appointment obvious.",
        ],
        bullets: [
          "Name the treatment clearly in the title and heading structure",
          "Explain who the treatment suits and what the process involves",
          "Answer the common practical objections or uncertainties",
          "Show the next step for booking or making contact",
        ],
      },
      {
        title: "Trust signals should remove uncertainty",
        paragraphs: [
          "Dental patients want reassurance. Reviews, clinician bios, qualifications, process notes, and clear information about the practice can all help when they are easy to find.",
          "This is especially important for high-consideration treatments where patients compare several providers before making contact.",
        ],
      },
      {
        title: "Google Business Profile and local pages support the main treatment pages",
        paragraphs: [
          "Maps, reviews, and local intent often play a big part in dental discovery. The site should reinforce the same core information as the Google Business Profile and make the practice location obvious.",
          "If the practice serves multiple real local areas, supporting location content can help, but it should still add useful context rather than repeating the same template everywhere.",
        ],
      },
      {
        title: "AI search is becoming part of treatment comparison",
        paragraphs: [
          "Patients increasingly use AI tools to compare treatments, understand costs, or ask what questions they should ask a provider. Clear treatment definitions, concise answers, and consistent clinic information make it easier for AI systems to summarise the practice accurately.",
          "That is usually a by-product of better treatment pages, not a separate gimmick.",
        ],
      },
      {
        title: "What to fix first on a dental site",
        paragraphs: [
          "Start with the treatment pages that matter commercially, then tighten local signals, clinician trust pages, and FAQs that reduce uncertainty before an appointment request.",
          "That gives the site a stronger base than expanding into thin content too early.",
        ],
      },
    ],
    faqs: [
      {
        question: "What matters most for dental SEO?",
        answer:
          "Usually treatment-page quality, local visibility, reviews and trust signals, and clear routes to an appointment or enquiry.",
      },
      {
        question: "Do dentists need separate pages for treatments like implants or Invisalign?",
        answer:
          "Usually, yes. Dedicated pages make it easier to match treatment-led searches and answer the patient questions tied to each service.",
      },
      {
        question: "Is local SEO especially important for dental practices?",
        answer:
          "Yes. Dental searches are often highly local, so town, area, map visibility, and location trust signals typically matter a lot.",
      },
      {
        question: "Can Better Search help dentists with AI search visibility?",
        answer:
          "Yes. The work focuses on clearer treatment pages, stronger trust signals, and answer-ready content that helps AI tools interpret the practice more accurately.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the high-trust SEO guide",
        description:
          "Broader guidance on trust-led SEO for dentists, clinics, and other careful-buying services.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See how Better Search approaches treatment pages, trust signals, local relevance, and priority fixes.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local commercial page for dental practices and service businesses across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local commercial page for dental practices and service businesses across Truro, Newquay, and Falmouth.",
      },
      {
        href: "/seo-for-clinics",
        label: "SEO for clinics",
        description:
          "Related industry page for private clinics that also need trust-led treatment and local visibility work.",
      },
    ],
  },
  "seo-for-therapists": {
    slug: "seo-for-therapists",
    path: "/seo-for-therapists",
    metaTitle: "SEO for Therapists | Better Search",
    metaDescription:
      "SEO for therapists, counsellors, and private therapy practices that need clearer service pages, stronger local trust signals, and better enquiry-ready content.",
    h1: "SEO for therapists who need to look safe, clear, and credible before the first enquiry",
    eyebrow: "Therapist SEO",
    intro: [
      "Therapist SEO is shaped by trust, fit, and sensitivity. People often arrive with a specific concern, compare carefully, and want to feel safe before they contact a private practice.",
      "That means strong therapy SEO usually starts with clearer service pages, better modality and issue definitions, local relevance, and thoughtful answers to the questions people ask before reaching out.",
      "Better Search helps therapists and counselling practices make those signals easier for Google, AI tools, and prospective clients to understand.",
    ],
    idealFor: [
      "Private therapists",
      "Counsellors",
      "Psychotherapists",
      "Group therapy practices",
      "Specialist mental health providers",
    ],
    decisionFactors: [
      {
        title: "Service clarity",
        description:
          "People need to understand what type of therapy you offer, what issues you help with, and whether the practice feels relevant to their situation.",
      },
      {
        title: "Trust and safety signals",
        description:
          "Accreditations, therapist bios, process detail, and clear boundaries often matter more than persuasive sales copy.",
      },
      {
        title: "Local and format relevance",
        description:
          "Many searches include town, nearby intent, or a preference for online versus in-person therapy, so the page structure should support that honestly.",
      },
    ],
    sections: [
      {
        title: "Why therapist SEO needs a different tone",
        paragraphs: [
          "Therapy buyers are not just comparing availability. They are looking for signs that the therapist understands the issue, works in a way that feels safe, and is clear about what the next step looks like.",
          "That means the strongest pages usually feel calm, specific, and practical. Over-polished copy can reduce trust if it makes the service sound vague or generic.",
        ],
      },
      {
        title: "Service pages should reflect real therapy search intent",
        paragraphs: [
          "Many therapy websites rely on one broad services page, but people often search by issue, modality, audience, or location. The website should make that structure clearer without producing thin pages for every possible variation.",
          "A strong therapy page explains what support is offered, who it may suit, and what happens if someone makes contact.",
        ],
        bullets: [
          "Name the therapy type or issue clearly",
          "Explain who the support is for and when it may help",
          "Set out practical next steps for contacting the practice",
          "Answer common questions about sessions, fit, or format",
        ],
      },
      {
        title: "Trust signals should reduce hesitation",
        paragraphs: [
          "For therapists, trust often comes from clarity rather than volume. Registration or accreditation, therapist experience, confidentiality notes, and a clear explanation of how sessions work all help.",
          "The aim is not to oversell. It is to remove avoidable uncertainty for someone who may already feel cautious about making contact.",
        ],
      },
      {
        title: "Local relevance still matters for private therapy",
        paragraphs: [
          "Even when sessions are offered online, many people still search by town or nearby area first. Others want reassurance about in-person access, catchment, or whether the therapist serves a specific part of Surrey, Cornwall, or another UK area.",
          "The site should make those details visible where they genuinely apply, without padding the site with weak local pages.",
        ],
      },
      {
        title: "AI search will surface the clearest therapy pages",
        paragraphs: [
          "People increasingly ask AI tools for help comparing therapy options, understanding modalities, or deciding what kind of support to look for. That makes direct explanations, descriptive headings, and concise FAQs more valuable.",
          "Good GEO for therapists is usually just better clarity: defined services, honest fit guidance, and stronger trust signals around the therapy process.",
        ],
      },
      {
        title: "What to fix first on a therapy website",
        paragraphs: [
          "Start with the homepage, core therapy pages, therapist bios, and contact path. Make the offer clearer, surface trust and accreditation, and answer the questions that stop the right people from getting in touch.",
          "That usually gives a stronger base than expanding into broad mental health content too early.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should therapists prioritise for SEO first?",
        answer:
          "Usually the homepage, core therapy pages, local relevance, therapist bios, and the trust signals that help a prospective client feel safe enough to enquire.",
      },
      {
        question: "Do therapists need separate pages for issues or therapy types?",
        answer:
          "Often for the main services, yes. Separate pages can help match real search intent if each page adds clear, useful guidance rather than repeating the same copy.",
      },
      {
        question: "Does local SEO matter if sessions are online?",
        answer:
          "Usually, yes. Many people still search by town or area first, and local relevance can support trust even when online sessions are available.",
      },
      {
        question: "Can Better Search help therapists with AI search visibility?",
        answer:
          "Yes. The work focuses on clearer service definitions, stronger trust signals, and answer-ready content that helps AI tools interpret the practice more accurately.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the high-trust SEO guide",
        description:
          "Broader guidance on trust-led SEO for therapists, clinics, and other careful-buying services.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See how Better Search prioritises service pages, trust signals, and the enquiry path first.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local commercial page for therapists and service businesses across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local commercial page for therapists and service businesses across Truro, Newquay, and Falmouth.",
      },
      {
        href: "/seo-for-clinics",
        label: "SEO for clinics",
        description:
          "Related industry page for clinic businesses that also need trust-led service and treatment pages.",
      },
    ],
  },
  "seo-for-accountants": {
    slug: "seo-for-accountants",
    path: "/seo-for-accountants",
    metaTitle: "SEO for Accountants | Better Search",
    metaDescription:
      "SEO for accountants and accountancy firms that need clearer service pages, stronger local or sector trust signals, and better enquiry-led search visibility.",
    h1: "SEO for accountants who need to look credible before a prospect books a call",
    eyebrow: "Accountant SEO",
    intro: [
      "Accountant SEO works best when the website makes the offer easy to understand. Prospects compare carefully, look for the right specialism, and want confidence that the firm understands their stage, sector, or financial need.",
      "That means stronger accountancy SEO usually starts with clearer service pages, better specialism signals, practical FAQs, and trust cues that reduce uncertainty before contact.",
      "Better Search helps accountants and accountancy firms make those signals easier for Google, AI tools, and buyers to interpret.",
    ],
    idealFor: [
      "Accountancy firms",
      "Tax advisers",
      "Bookkeeping firms",
      "Fractional finance providers",
      "Sector-specialist accountants",
    ],
    decisionFactors: [
      {
        title: "Service and specialism clarity",
        description:
          "Prospects should be able to see whether you help with tax, bookkeeping, year-end accounts, advisory work, or a more specific type of need.",
      },
      {
        title: "Commercial trust signals",
        description:
          "Credentials, sector fit, process clarity, and straightforward explanations often do more than generic authority copy.",
      },
      {
        title: "Local or audience relevance",
        description:
          "Some accountancy firms win on local intent, others on niche audience fit. The site should support the way people actually search for the firm.",
      },
    ],
    sections: [
      {
        title: "Why accountant SEO often underperforms",
        paragraphs: [
          "Many accountancy websites sound credible but stay too broad. They mention experience and support, but do not clearly show what services the firm offers, who it is best for, or why a prospect should take the next step.",
          "That weakens both rankings and conversion because the page does not line up well with the practical searches buyers make when they compare firms.",
        ],
      },
      {
        title: "Service pages should match real financial questions",
        paragraphs: [
          "Prospects rarely search for accountant in isolation. They often search by service, business stage, company type, or a specific problem. The main pages should reflect those search patterns naturally.",
          "A strong accountancy page explains the service, the fit, the likely process, and the route to a conversation in plain English.",
        ],
        bullets: [
          "Make the core service lines clear",
          "Explain who the service is for",
          "Answer practical questions around process, timing, or fit",
          "Show the next step for speaking to the firm",
        ],
      },
      {
        title: "Trust comes from clarity and specificity",
        paragraphs: [
          "Accountant SEO improves when the site gets more specific. Named expertise, software familiarity where relevant, sector fit, and honest process detail can all help a prospect trust the page faster.",
          "You do not need inflated claims or fake case studies. Often the better move is a clearer service structure and more direct answers to common buyer questions.",
        ],
      },
      {
        title: "Local SEO and niche SEO should not compete with each other",
        paragraphs: [
          "Some firms need local visibility for nearby searches. Others win more from industry niches, startup work, contractor services, or specialist tax support. Many need a blend of both.",
          "The website structure should make the main commercial angle obvious rather than trying to force every page to do every job.",
        ],
      },
      {
        title: "AI search rewards cleaner explanations",
        paragraphs: [
          "Prospects increasingly ask AI tools questions about tax support, bookkeeping, small business accounting, or what kind of accountant they need. Clear service definitions, direct FAQs, and consistent business information make it easier for those tools to summarise the firm accurately.",
          "That usually comes from better commercial pages, not from trying to write for robots.",
        ],
      },
      {
        title: "What to fix first on an accountancy website",
        paragraphs: [
          "Start with the homepage, core service pages, sector or audience pages where demand is real, and the trust content that helps someone decide whether to book a call.",
          "Once those pages are clearer, supporting guides and FAQs become much more useful.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should accountants focus on for SEO first?",
        answer:
          "Usually the homepage, core service pages, any real niche or sector pages, and the trust signals that help a buyer understand the fit quickly.",
      },
      {
        question: "Do accountancy firms need pages for each service?",
        answer:
          "Usually for the main service lines, yes. Separate pages help match search intent and give prospects a clearer route to the service they actually need.",
      },
      {
        question: "Should accountants target local SEO or niche SEO?",
        answer:
          "It depends on how the firm wins work. Some firms need strong local visibility, while others benefit more from pages built around audience or service specialisms.",
      },
      {
        question: "Can Better Search help accountants with AI search visibility?",
        answer:
          "Yes. The work focuses on clearer service pages, better answer structure, and stronger trust signals so the firm is easier for AI tools to interpret and compare.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the high-trust SEO guide",
        description:
          "Broader guidance on trust-led SEO for accountants, consultants, and other professional services.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See how Better Search prioritises commercial pages, internal links, and proof structure first.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local commercial page for accountants and professional firms across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local commercial page for accountants and service businesses across Truro, Newquay, and Falmouth.",
      },
      {
        href: "/seo-for-consultants",
        label: "SEO for consultants",
        description:
          "Related industry page for advisory-led businesses that also need clearer positioning and stronger proof.",
      },
    ],
  },
  "seo-for-legal-firms": {
    slug: "seo-for-legal-firms",
    path: "/seo-for-legal-firms",
    metaTitle: "SEO for Legal Firms | Better Search",
    metaDescription:
      "SEO for solicitors and legal firms that need stronger service pages, better local or practice-area visibility, and clearer trust signals before enquiry.",
    h1: "SEO for legal firms that need clearer practice pages and stronger trust before enquiry",
    eyebrow: "Legal SEO",
    intro: [
      "Legal SEO is shaped by trust, clarity, and service fit. Prospective clients often compare firms carefully, look for the right practice area, and want reassurance that the firm understands the issue before they make contact.",
      "That means the strongest legal SEO work usually starts with clearer practice-area pages, better trust signals, sensible local relevance, and answers to the practical questions clients ask before instructing a firm.",
      "Better Search helps solicitors and legal firms make those signals easier for Google, AI tools, and prospective clients to understand.",
    ],
    idealFor: [
      "Solicitors",
      "Boutique legal firms",
      "Specialist practice-area teams",
      "Regional law firms",
      "Private client legal services",
    ],
    decisionFactors: [
      {
        title: "Practice-area clarity",
        description:
          "Prospective clients should be able to see quickly whether the firm handles the specific legal issue they need help with.",
      },
      {
        title: "Credibility and professionalism",
        description:
          "Solicitor profiles, regulatory clarity, process notes, and straightforward guidance usually build more trust than polished but vague copy.",
      },
      {
        title: "Location and jurisdiction signals",
        description:
          "Many legal searches include a town or region, while others depend more on specialist practice area fit. The site should support both where they are real.",
      },
    ],
    sections: [
      {
        title: "Why legal SEO needs stronger page structure",
        paragraphs: [
          "Legal buyers often arrive with a specific issue and little patience for vague language. They want to know whether the firm handles the matter, what the next step looks like, and whether the team feels credible.",
          "That makes structure important. A page that ranks but does not make the service clear still leaves too much friction before enquiry.",
        ],
      },
      {
        title: "Practice-area pages should match the way clients search",
        paragraphs: [
          "Most firms need more than a broad services page. Core practice areas should usually have their own useful pages with plain-English explanations, fit guidance, and clear next steps.",
          "Those pages help Google and AI tools understand the service mix, and they help prospective clients decide whether to keep reading.",
        ],
        bullets: [
          "Name the legal service clearly",
          "Explain the type of issue the page covers",
          "Outline what happens if someone gets in touch",
          "Answer practical questions around fit, timing, or process",
        ],
      },
      {
        title: "Trust signals should sit close to the service decision",
        paragraphs: [
          "In legal markets, credibility comes from the right details being easy to find. Team profiles, regulatory information, process clarity, and straightforward guidance can all reduce hesitation before contact.",
          "The goal is not to overload every page. It is to support the moment where a prospective client is deciding whether the firm looks right for the matter.",
        ],
      },
      {
        title: "Local and specialist intent both matter",
        paragraphs: [
          "Some legal searches are highly local, especially when someone wants a nearby firm. Others are driven more by specialist need than geography. Many firms need both signals, but the balance should reflect the real commercial focus.",
          "The site structure should make that balance clear instead of forcing the same message across every page.",
        ],
      },
      {
        title: "AI search will favour clearer legal explanations",
        paragraphs: [
          "Prospective clients increasingly ask AI tools to compare firms, explain legal processes, or identify what type of legal help they may need. Pages with direct explanations, descriptive headings, and accurate service definitions are easier for those tools to summarise.",
          "That is usually a by-product of better service pages and clearer trust information, not a separate SEO trick.",
        ],
      },
      {
        title: "What to fix first on a legal website",
        paragraphs: [
          "Start with the homepage, core practice-area pages, lawyer or team profiles, and the trust content that helps a prospective client decide whether to get in touch.",
          "That usually creates a stronger commercial base than expanding into broad generic content too early.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should legal firms focus on for SEO first?",
        answer:
          "Usually the homepage, core practice-area pages, lawyer profiles, local relevance where it matters, and the trust signals that reduce hesitation before enquiry.",
      },
      {
        question: "Do law firms need separate pages for each practice area?",
        answer:
          "Usually for the main areas, yes. Separate pages help match real search intent and make it clearer whether the firm handles the issue in question.",
      },
      {
        question: "Is local SEO important for solicitors?",
        answer:
          "Often, yes. Many legal searches include town or nearby intent, although some firms also benefit from pages built around specialist practice areas.",
      },
      {
        question: "Can Better Search help legal firms with AI search visibility?",
        answer:
          "Yes. The work focuses on clearer service definitions, better answer structure, and stronger trust signals so the firm is easier for AI tools to interpret.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the high-trust SEO guide",
        description:
          "Broader guidance on trust-led SEO for legal firms, accountants, and other professional services.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See how Better Search audits commercial pages, trust signals, and internal link structure first.",
      },
      {
        href: "/seo-surrey",
        label: "SEO in Surrey",
        description:
          "Local commercial page for legal firms and professional services across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "SEO in Cornwall",
        description:
          "Local commercial page for legal firms and service businesses across Truro, Newquay, and Falmouth.",
      },
      {
        href: "/seo-for-accountants",
        label: "SEO for accountants",
        description:
          "Related industry page for accountancy firms that also need clearer services, proof, and enquiry paths.",
      },
    ],
  },
};

export const industryPageLinks = [
  {
    href: "/seo-for-clinics",
    title: "SEO for clinics",
    description:
      "For private clinics and specialist healthcare providers that need stronger treatment pages and patient trust signals.",
  },
  {
    href: "/seo-for-consultants",
    title: "SEO for consultants",
    description:
      "For consultants and advisory firms that need clearer positioning, expert proof, and stronger comparison pages.",
  },
  {
    href: "/seo-for-dentists",
    title: "SEO for dentists",
    description:
      "For dental practices that need treatment-led pages, local visibility, and clearer routes to appointment enquiries.",
  },
  {
    href: "/seo-for-therapists",
    title: "SEO for therapists",
    description:
      "For therapists and counselling practices that need clearer service pages, stronger trust signals, and better local fit.",
  },
  {
    href: "/seo-for-accountants",
    title: "SEO for accountants",
    description:
      "For accountants and finance firms that need clearer service lines, specialism signals, and stronger enquiry pages.",
  },
  {
    href: "/seo-for-legal-firms",
    title: "SEO for legal firms",
    description:
      "For solicitors and legal firms that need stronger practice pages, trust cues, and local or specialist visibility.",
  },
] as const;

export type TrustPage = {
  slug: "about" | "methodology";
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  principles: Array<{
    title: string;
    description: string;
  }>;
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: FaqItem[];
  relatedLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export const trustPages: Record<TrustPage["slug"], TrustPage> = {
  about: {
    slug: "about",
    path: "/about",
    metaTitle:
      "About Better Search | SEO & GEO for High-Trust UK Service Businesses",
    metaDescription:
      "Learn how Better Search helps high-trust UK service businesses improve Google visibility, AI search clarity, and website trust signals.",
    h1: "SEO and AI search support for businesses that need to be trusted first",
    eyebrow: "About Better Search",
    intro: [
      "Better Search helps high-trust UK service businesses become easier to find on Google and easier to understand in AI search tools.",
      "We focus on businesses where someone usually compares carefully before making contact. That includes clinics, consultants, accountants, legal firms, dentists, therapists, and specialist local providers.",
      "The aim is not broad traffic for its own sake. The aim is clearer visibility for the services, locations, and questions that lead to better enquiries.",
    ],
    principles: [
      {
        title: "Evidence first",
        description:
          "We do not use fake testimonials, inflated case studies, or made-up performance numbers. If something cannot be checked, we say so.",
      },
      {
        title: "Built for high-trust services",
        description:
          "We work on websites where clarity, credibility, and decision support matter before someone calls or books.",
      },
      {
        title: "Google and AI search",
        description:
          "Search now includes classic rankings, local search, AI summaries, and answer-driven discovery. The site needs to make sense in all of them.",
      },
    ],
    sections: [
      {
        title: "Who Better Search is for",
        paragraphs: [
          "Better Search is for service businesses that need to look credible before the first conversation happens. In these markets, people compare carefully, read reviews, check qualifications, and look for signs that a provider understands their need.",
          "That usually means your website has to do more than attract a click. It has to explain the service clearly, show where you work, answer practical questions, and make the next step feel low-friction.",
        ],
      },
      {
        title: "What we mean by high-trust visibility",
        paragraphs: [
          "High-trust visibility means showing up clearly for the right searches and giving people enough confidence to keep reading, compare you fairly, and enquire.",
          "For Better Search, that usually means stronger service pages, better internal linking, clearer local relevance, FAQ structure, useful supporting content, and trust signals that are already true.",
        ],
      },
      {
        title: "What we actually work on",
        paragraphs: [
          "The work is practical. We audit the site, find the pages most likely to affect enquiries, and improve the areas that help both Google and AI tools understand the business.",
        ],
        bullets: [
          "Technical checks around crawlability, indexation, canonicals, and metadata",
          "Service page rewrites and structure improvements",
          "Internal links between homepage, services, locations, guides, and FAQs",
          "Location relevance for the towns and areas you genuinely serve",
          "Structured data and answer-ready page sections",
          "Trust signals such as qualifications, process clarity, policies, and review handling",
        ],
      },
      {
        title: "What we do not do",
        paragraphs: [
          "We are deliberately conservative about claims because credibility matters.",
        ],
        bullets: [
          "No fake reviews, fake clients, fake metrics, or unsupported ranking promises",
          "No thin page sprawl built only to capture keywords",
          "No jargon-heavy reporting that hides what changed",
          "No pressure to chase irrelevant traffic when the enquiry path is still weak",
        ],
      },
      {
        title: "How we work with clients",
        paragraphs: [
          "Most work starts with an audit and a clear set of priorities. From there, we either improve the key pages directly or build a content and implementation plan around them.",
          "The reporting style is simple: what we checked, what changed, why it matters, and what should happen next.",
        ],
      },
      {
        title: "Why this approach matters",
        paragraphs: [
          "Many SEO sites try to sell confidence with exaggerated proof. That can work in the short term, but it is a poor fit for trust-led businesses that need careful positioning.",
          "A better starting point is a site that is easier to understand, easier to compare, and easier to trust. That is the standard Better Search is built around.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is Better Search best suited to?",
        answer:
          "Better Search is best suited to high-trust UK service businesses such as clinics, consultants, dentists, therapists, accountants, legal firms, and specialist local providers.",
      },
      {
        question: "Do you only work with businesses in Cornwall and Surrey?",
        answer:
          "No. Cornwall and Surrey are active location pages on the site, but Better Search supports high-trust service businesses across the UK.",
      },
      {
        question: "Do you help with AI search visibility as well as Google SEO?",
        answer:
          "Yes. The work includes making a business easier for AI search systems to understand through clearer service pages, better answers, stronger trust signals, and consistent business information.",
      },
      {
        question: "Do you guarantee rankings or traffic growth?",
        answer:
          "No. We focus on improving the conditions that support better visibility and enquiries, but we do not make unsupported guarantees.",
      },
    ],
    relatedLinks: [
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the cornerstone SEO guide",
        description:
          "A broader guide to SEO for clinics, consultants, and other high-trust businesses.",
      },
      {
        href: "/methodology",
        label: "Read the methodology",
        description:
          "See the audit and implementation process Better Search uses first.",
      },
      {
        href: "/seo-surrey",
        label: "Explore SEO in Surrey",
        description:
          "Commercial local page for high-trust businesses across Guildford, Woking, and Farnham.",
      },
      {
        href: "/seo-cornwall",
        label: "Explore SEO in Cornwall",
        description:
          "Commercial local page for service businesses across Truro, Newquay, and Falmouth.",
      },
    ],
  },
  methodology: {
    slug: "methodology",
    path: "/methodology",
    metaTitle:
      "SEO & GEO Methodology for High-Trust Service Businesses | Better Search",
    metaDescription:
      "See how Better Search audits, prioritises, and improves SEO and AI search visibility for high-trust UK service businesses.",
    h1: "How Better Search approaches SEO and AI search visibility",
    eyebrow: "Methodology",
    intro: [
      "Better Search uses a practical SEO and GEO process designed for high-trust service businesses.",
      "The focus is simple: make the business easier to crawl, easier to understand, easier to trust, and easier to choose when the right customer is already searching.",
      "That usually means fixing core pages before scaling content, and using evidence rather than guesses when deciding what to improve next.",
    ],
    principles: [
      {
        title: "Audit before advice",
        description:
          "We start with crawlability, indexation, page quality, and trust signals before proposing bigger content work.",
      },
      {
        title: "Commercial pages first",
        description:
          "The pages closest to enquiries usually deserve the first round of improvements, not the easiest blog ideas.",
      },
      {
        title: "Answer-ready structure",
        description:
          "Pages should work for Google rankings, AI summaries, and real people scanning for confidence.",
      },
    ],
    sections: [
      {
        title: "1. Check crawlability and indexation first",
        paragraphs: [
          "If a page is blocked, duplicated, weakly canonicalised, or badly linked, content improvements will have less effect. That is why the first layer of work is technical clarity.",
          "We check robots, sitemap coverage, canonicals, titles, descriptions, headings, indexability, and internal discovery paths before moving deeper into content decisions.",
        ],
      },
      {
        title: "2. Prioritise the pages that drive enquiries",
        paragraphs: [
          "Service pages, location pages, core about pages, and strong guides usually deserve attention before wider content expansion.",
          "For high-trust businesses, these pages often do the real conversion work. They need clear copy, accurate service positioning, useful FAQs, honest trust signals, and obvious next steps.",
        ],
      },
      {
        title: "3. Build supporting content around real questions",
        paragraphs: [
          "Once the main pages are clearer, supporting guides and FAQs help cover the questions people ask before choosing a provider.",
          "The aim is not volume publishing. The aim is to create supporting content that strengthens internal linking, topical coverage, and answer readiness.",
        ],
        bullets: [
          "Category and service explainers",
          "Location-specific guidance for areas you genuinely serve",
          "Comparison and buyer-fit questions",
          "Practical FAQs that reduce hesitation before contact",
        ],
      },
      {
        title: "4. Strengthen trust and entity clarity",
        paragraphs: [
          "AI search systems and traditional search engines both respond better when a business is easy to identify and verify.",
          "That means consistent business information, real credentials, clear service descriptions, transparent process notes, and structured data that matches the page topic.",
        ],
      },
      {
        title: "5. Improve answer extraction for AI search",
        paragraphs: [
          "GEO and AEO are mostly about clarity. The best pages answer specific questions directly, define terms plainly, use descriptive headings, and keep important points easy to extract.",
          "FAQ blocks, concise definitions, internal links, and topic-relevant schema help support that without turning the copy into robotic SEO text.",
        ],
      },
      {
        title: "6. Measure what changed and what still needs work",
        paragraphs: [
          "The final step is not vanity reporting. It is a short record of what was fixed, which pages were improved, what new internal links were added, and which checks still need evidence.",
          "When external proof is unavailable, the correct status is not checked, not a guess. That keeps decisions grounded and reviewable.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you always start with an audit?",
        answer:
          "Usually, yes. The audit helps confirm what is indexable, which pages matter most, where trust is weak, and which fixes should come first.",
      },
      {
        question: "How do you prioritise SEO work?",
        answer:
          "Better Search prioritises crawlability, key commercial pages, internal links, trust signals, and supporting content in that order unless the evidence suggests otherwise.",
      },
      {
        question: "What does GEO mean in practice?",
        answer:
          "In practice, GEO means making a business easier for AI tools to understand, summarise, compare, and recommend through clearer structure, stronger answers, and better trust signals.",
      },
      {
        question: "Do you only advise, or do you make the changes too?",
        answer:
          "Better Search can both identify the work and implement the page, content, and structural improvements needed on the site.",
      },
    ],
    relatedLinks: [
      {
        href: "/about",
        label: "About Better Search",
        description:
          "See who Better Search is built for and how it positions the work.",
      },
      {
        href: "/seo-for-high-trust-service-businesses",
        label: "Read the cornerstone SEO guide",
        description:
          "UK-wide guide covering the pages, trust signals, and structure that matter most.",
      },
      {
        href: "/seo-for-service-businesses-in-surrey",
        label: "Read the Surrey guide",
        description:
          "Supporting guide covering SEO for clinics, consultants, and service firms in Surrey.",
      },
      {
        href: "/how-to-get-found-on-google-in-cornwall",
        label: "Read the Cornwall guide",
        description:
          "Supporting guide covering local search behaviour and trust signals in Cornwall.",
      },
    ],
  },
};

export const sitemapPages = [
  homeSeo.path,
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/methodology",
  "/seo-for-high-trust-service-businesses",
  "/seo-for-clinics",
  "/seo-for-consultants",
  "/seo-for-dentists",
  "/seo-for-therapists",
  "/seo-for-accountants",
  "/seo-for-legal-firms",
  "/seo-cornwall",
  "/seo-surrey",
  "/how-to-get-found-on-google-in-cornwall",
  "/seo-for-service-businesses-in-surrey",
] as const;

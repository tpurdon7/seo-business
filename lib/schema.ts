import {
  guidePages,
  homeFaqs,
  homeSeo,
  locationPages,
  logo,
  siteName,
  siteUrl,
  type FaqItem,
  type GuidePage,
  type LocationPage,
} from "@/lib/site";

const absoluteLogoUrl = `${siteUrl}${logo.url}`;

const areaServed = [
  { "@type": "AdministrativeArea", name: "Cornwall" },
  { "@type": "AdministrativeArea", name: "Surrey" },
  { "@type": "Country", name: "United Kingdom" },
];

const audienceTypes = [
  "service businesses",
  "clinics",
  "consultants",
  "professional firms",
  "specialist local services",
];

function faqSchema(path: string, faqs: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteLogoUrl,
      width: logo.width,
      height: logo.height,
    },
    description:
      "Better Search is an SEO and GEO agency helping high-trust UK service businesses get found on Google and in AI search tools.",
    areaServed,
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-GB",
  };
}

function professionalServiceSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#professionalservice`,
    name: siteName,
    url: siteUrl,
    image: absoluteLogoUrl,
    serviceType: ["SEO", "GEO", "AI search optimisation", "Local SEO"],
    areaServed,
    serviceArea: areaServed,
    audience: audienceTypes.map((audienceType) => ({
      "@type": "Audience",
      audienceType,
    })),
    knowsAbout: ["SEO", "GEO", "AI search optimisation", "Local SEO"],
    provider: { "@id": `${siteUrl}/#organization` },
    description:
      "SEO, GEO, AI search optimisation, and local SEO support for high-trust service businesses in Cornwall, Surrey, and across the UK.",
  };
}

function serviceSchema(path = "/") {
  return {
    "@type": "Service",
    "@id": `${siteUrl}${path}#seo-geo-service`,
    name: "SEO and GEO services for service businesses",
    serviceType: ["SEO", "Local SEO", "GEO", "AI search optimisation"],
    provider: { "@id": `${siteUrl}/#organization` },
    audience: audienceTypes.map((audienceType) => ({
      "@type": "Audience",
      audienceType,
    })),
    areaServed,
    serviceArea: areaServed,
    description:
      "SEO, local SEO, and GEO support for high-trust service businesses that want to improve visibility on Google and in AI search tools.",
  };
}

function webPageSchema(path: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#professionalservice` },
    inLanguage: "en-GB",
  };
}

function breadcrumbSchema({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${path}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${siteUrl}${path}`,
      },
    ],
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      professionalServiceSchema(),
      serviceSchema(),
      webPageSchema(homeSeo.path, homeSeo.title, homeSeo.description),
      faqSchema(homeSeo.path, homeFaqs),
    ],
  };
}

export function locationJsonLd(slug: LocationPage["slug"]) {
  const page = locationPages[slug];

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      professionalServiceSchema(),
      serviceSchema(page.path),
      webPageSchema(page.path, page.metaTitle, page.metaDescription),
      faqSchema(page.path, page.faqs),
      breadcrumbSchema({ path: page.path, name: page.h1 }),
    ],
  };
}

export function guideJsonLd(slug: GuidePage["slug"]) {
  const page = guidePages[slug];

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      professionalServiceSchema(),
      serviceSchema(page.path),
      webPageSchema(page.path, page.metaTitle, page.metaDescription),
      faqSchema(page.path, page.faqs),
      breadcrumbSchema({ path: page.path, name: page.h1 }),
    ],
  };
}

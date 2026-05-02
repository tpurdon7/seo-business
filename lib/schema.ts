import {
  homeFaqs,
  homeSeo,
  locationPages,
  logo,
  siteName,
  siteUrl,
  type FaqItem,
  type LocationPage,
} from "@/lib/site";

const absoluteLogoUrl = `${siteUrl}${logo.url}`;

const areaServed = [
  { "@type": "AdministrativeArea", name: "Cornwall" },
  { "@type": "AdministrativeArea", name: "Surrey" },
  { "@type": "Country", name: "United Kingdom" },
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
    audience: {
      "@type": "Audience",
      audienceType: "High-trust UK service businesses",
    },
    provider: { "@id": `${siteUrl}/#organization` },
  };
}

function serviceSchema(path = "/") {
  return {
    "@type": "Service",
    "@id": `${siteUrl}${path}#seo-geo-service`,
    name: "SEO and GEO services for service businesses",
    serviceType: ["SEO", "Local SEO", "GEO", "AI search optimisation"],
    provider: { "@id": `${siteUrl}/#organization` },
    audience: {
      "@type": "Audience",
      audienceType: "Service businesses",
    },
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

function breadcrumbSchema(page: LocationPage) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${page.path}#breadcrumb`,
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
        name: page.h1,
        item: `${siteUrl}${page.path}`,
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
      breadcrumbSchema(page),
    ],
  };
}

import type { Metadata } from "next";

import { IndustryPage } from "@/components/industry-page";
import { JsonLd } from "@/components/json-ld";
import { industryPageJsonLd } from "@/lib/schema";
import { industryPages, logo } from "@/lib/site";

const page = industryPages["seo-for-legal-firms"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: {
    canonical: page.path,
  },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: page.path,
    type: "article",
    images: [logo],
  },
  twitter: {
    card: "summary_large_image",
    title: page.metaTitle,
    description: page.metaDescription,
    images: [logo.url],
  },
};

export default function LegalFirmsSeoPage() {
  return (
    <>
      <JsonLd id="legal-firms-seo-json-ld" data={industryPageJsonLd("seo-for-legal-firms")} />
      <IndustryPage page={page} />
    </>
  );
}

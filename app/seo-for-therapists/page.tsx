import type { Metadata } from "next";

import { IndustryPage } from "@/components/industry-page";
import { JsonLd } from "@/components/json-ld";
import { industryPageJsonLd } from "@/lib/schema";
import { industryPages, logo } from "@/lib/site";

const page = industryPages["seo-for-therapists"];

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

export default function TherapistsSeoPage() {
  return (
    <>
      <JsonLd id="therapists-seo-json-ld" data={industryPageJsonLd("seo-for-therapists")} />
      <IndustryPage page={page} />
    </>
  );
}

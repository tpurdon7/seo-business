import type { Metadata } from "next";

import { GuidePage } from "@/components/guide-page";
import { JsonLd } from "@/components/json-ld";
import { guideJsonLd } from "@/lib/schema";
import { guidePages, logo } from "@/lib/site";

const page = guidePages["seo-for-service-businesses-in-surrey"];

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

export default function SurreyGuidePage() {
  return (
    <>
      <JsonLd id="surrey-guide-json-ld" data={guideJsonLd("seo-for-service-businesses-in-surrey")} />
      <GuidePage page={page} />
    </>
  );
}

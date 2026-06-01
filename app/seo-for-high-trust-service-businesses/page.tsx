import type { Metadata } from "next";

import { CornerstonePage } from "@/components/cornerstone-page";
import { JsonLd } from "@/components/json-ld";
import { cornerstonePageJsonLd } from "@/lib/schema";
import { cornerstonePages, logo } from "@/lib/site";

const page = cornerstonePages["seo-for-high-trust-service-businesses"];

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

export default function HighTrustSeoPage() {
  return (
    <>
      <JsonLd
        id="high-trust-seo-json-ld"
        data={cornerstonePageJsonLd("seo-for-high-trust-service-businesses")}
      />
      <CornerstonePage page={page} />
    </>
  );
}

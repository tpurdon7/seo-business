import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { TrustPage } from "@/components/trust-page";
import { trustPageJsonLd } from "@/lib/schema";
import { logo, trustPages } from "@/lib/site";

const page = trustPages.methodology;

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

export default function MethodologyPage() {
  return (
    <>
      <JsonLd id="methodology-json-ld" data={trustPageJsonLd("methodology")} />
      <TrustPage page={page} />
    </>
  );
}

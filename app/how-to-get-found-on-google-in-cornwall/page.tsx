import type { Metadata } from "next";

import { GuidePage } from "@/components/guide-page";
import { JsonLd } from "@/components/json-ld";
import { guideJsonLd } from "@/lib/schema";
import { guidePages, logo } from "@/lib/site";

const page = guidePages["how-to-get-found-on-google-in-cornwall"];

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

export default function CornwallGuidePage() {
  return (
    <>
      <JsonLd id="cornwall-guide-json-ld" data={guideJsonLd("how-to-get-found-on-google-in-cornwall")} />
      <GuidePage page={page} />
    </>
  );
}

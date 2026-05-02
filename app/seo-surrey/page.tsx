import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { LocationPage } from "@/components/location-page";
import { locationJsonLd } from "@/lib/schema";
import { locationPages, logo } from "@/lib/site";

const page = locationPages["seo-surrey"];

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
    type: "website",
    images: [logo],
  },
  twitter: {
    card: "summary_large_image",
    title: page.metaTitle,
    description: page.metaDescription,
    images: [logo.url],
  },
};

export default function SeoSurreyPage() {
  return (
    <>
      <JsonLd id="seo-surrey-json-ld" data={locationJsonLd("seo-surrey")} />
      <LocationPage page={page} />
    </>
  );
}

import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { LocationPage } from "@/components/location-page";
import { locationJsonLd } from "@/lib/schema";
import { locationPages, logo } from "@/lib/site";

const page = locationPages["seo-cornwall"];

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

export default function SeoCornwallPage() {
  return (
    <>
      <JsonLd id="seo-cornwall-json-ld" data={locationJsonLd("seo-cornwall")} />
      <LocationPage page={page} />
    </>
  );
}

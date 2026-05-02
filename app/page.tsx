import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";
import { homeJsonLd } from "@/lib/schema";
import { homeSeo, logo } from "@/lib/site";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: {
    canonical: homeSeo.path,
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: homeSeo.path,
    type: "website",
    images: [logo],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
    images: [logo.url],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd id="home-json-ld" data={homeJsonLd()} />
      <HomePage />
    </>
  );
}

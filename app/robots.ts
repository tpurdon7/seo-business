import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/analytics",
        "/api/",
        "/audit/",
        "/auth/",
        "/leads",
        "/login",
        "/reset-password",
        "/share/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

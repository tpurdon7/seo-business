import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

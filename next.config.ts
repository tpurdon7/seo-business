import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/audit": ["./node_modules/@sparticuz/chromium/bin/**/*"],
    "/api/audit/batch": ["./node_modules/@sparticuz/chromium/bin/**/*"],
    "/api/audit/jobs/[jobId]": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
  serverExternalPackages: ["@sparticuz/chromium"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

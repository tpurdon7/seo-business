const configuredOrigins = (process.env.AUDIT_ALLOWED_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export function auditCorsHeaders(request?: Request) {
  const origin = request?.headers.get("origin");
  const allowedOrigin =
    !origin || origin.startsWith("tauri://") || configuredOrigins.includes(origin)
      ? (origin ?? configuredOrigins[0] ?? "https://bettersearch.dev")
      : configuredOrigins[0] ?? "https://bettersearch.dev";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization",
    Vary: "Origin",
  };
}

export const auditApiCorsHeaders = {
  "Access-Control-Allow-Origin": configuredOrigins[0] ?? "https://bettersearch.dev",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization",
};

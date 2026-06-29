import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

import { normalizeUrl } from "@/lib/audit/utils";

function isPrivateIpv4(hostname: string) {
  const parts = hostname.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) return false;

  const [first, second] = parts;
  return (
    first === 10 ||
    first === 127 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 169 && second === 254) ||
    (first === 192 && second === 0) ||
    (first === 198 && (second === 18 || second === 19)) ||
    (first === 198 && second === 51) ||
    (first === 203 && second === 0) ||
    first === 0 ||
    first >= 224
  );
}

function isPrivateIpv6(hostname: string) {
  const normalized = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb") ||
    normalized.startsWith("2001:db8:") ||
    normalized.startsWith("::ffff:")
  );
}

function isBlockedAddress(address: string) {
  const version = isIP(address);
  return (version === 4 && isPrivateIpv4(address)) || (version === 6 && isPrivateIpv6(address));
}

export function validatePublicAuditUrl(rawUrl: string) {
  const url = normalizeUrl(rawUrl);
  const parsed = new URL(url);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs can be audited.");
  }

  if (process.env.NODE_ENV === "production") {
    const hostname = parsed.hostname.toLowerCase();
    const ipVersion = isIP(hostname);
    const blockedHostnames = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

    if (
      blockedHostnames.has(hostname) ||
      hostname.endsWith(".local") ||
      (ipVersion === 4 && isPrivateIpv4(hostname)) ||
      (ipVersion === 6 && isPrivateIpv6(hostname))
    ) {
      throw new Error("Private, localhost, and internal network URLs cannot be audited.");
    }
  }

  return url;
}

export async function assertPublicNetworkUrl(rawUrl: string) {
  const url = validatePublicAuditUrl(rawUrl);

  if (process.env.NODE_ENV !== "production") {
    return url;
  }

  const hostname = new URL(url).hostname;
  const literalVersion = isIP(hostname);

  if (literalVersion && isBlockedAddress(hostname)) {
    throw new Error("Private, localhost, and internal network URLs cannot be audited.");
  }

  if (!literalVersion) {
    const addresses = await lookup(hostname, { all: true, verbatim: true });

    if (addresses.length === 0 || addresses.some(({ address }) => isBlockedAddress(address))) {
      throw new Error("The hostname resolves to a private or reserved network address.");
    }
  }

  return url;
}

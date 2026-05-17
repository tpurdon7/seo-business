import type { AuditScore, CheckStatus } from "@/lib/audit/types";

const ctaWords = [
  "book",
  "call",
  "contact",
  "demo",
  "quote",
  "enquire",
  "inquire",
  "consultation",
  "start",
  "get",
  "buy",
  "request",
  "schedule",
];

const trustWords = [
  "reviews",
  "testimonial",
  "testimonials",
  "case study",
  "case studies",
  "accredited",
  "certified",
  "award",
  "featured",
  "trusted by",
  "clients",
  "partners",
  "press",
  "years",
  "rating",
  "stars",
];

export function normalizeUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Please enter a valid http or https URL.");
  }

  return parsed.toString();
}

export function cleanText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

export function getWords(text: string) {
  return cleanText(text).split(/\s+/).filter(Boolean);
}

export function wordCount(text: string) {
  return getWords(text).length;
}

export function firstWords(text: string, count: number) {
  return getWords(text).slice(0, count).join(" ");
}

export function statusLabel(status: CheckStatus) {
  if (status === "found") return "Found";
  if (status === "not_found") return "Not found";
  return "Not checked";
}

export function totalScore(scores: AuditScore[]) {
  const earned = scores.reduce((sum, score) => sum + score.score, 0);
  const max = scores.reduce((sum, score) => sum + score.max, 0);
  return max > 0 ? Math.round((earned / max) * 100) : 0;
}

export function isLikelyCta(text: string) {
  const normal = cleanText(text).toLowerCase();
  return normal.length > 1 && normal.length <= 80 && ctaWords.some((word) => normal.includes(word));
}

export function findTrustSignalLines(text: string) {
  const lines = cleanText(text)
    .split(/(?<=[.!?])\s+|\n+/)
    .map(cleanText)
    .filter((line) => line.length > 12 && line.length < 220);

  const matches = lines.filter((line) => {
    const normal = line.toLowerCase();
    return trustWords.some((word) => normal.includes(word));
  });

  return Array.from(new Set(matches)).slice(0, 12);
}

export function findContactDetails(text: string) {
  const matches = new Set<string>();
  const emailMatches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  const phoneMatches = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/g) ?? [];

  for (const match of [...emailMatches, ...phoneMatches]) {
    matches.add(cleanText(match));
  }

  return Array.from(matches).slice(0, 8);
}

export function clampScore(value: number, max: number) {
  return Math.max(0, Math.min(max, Math.round(value)));
}

export function scoreStatus(points: number, max: number) {
  if (points <= 0) return "fail";
  if (points >= max) return "pass";
  return "partial";
}

export function titleCaseFromDomain(domain: string) {
  return domain
    .replace(/^www\./, "")
    .split(".")[0]
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function shortEvidence(value: string | null | undefined, fallback = "Not found") {
  const cleaned = cleanText(value);
  if (!cleaned) return fallback;
  return cleaned.length > 180 ? `${cleaned.slice(0, 177)}...` : cleaned;
}

export function makeAuditId(url: string) {
  const input = `${url}:${Date.now()}:${Math.random().toString(36).slice(2)}`;
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return `audit-${Math.abs(hash).toString(36)}`;
}

export function makeUrlAuditId(url: string) {
  return `url-${Buffer.from(url, "utf8").toString("base64url")}`;
}

export function urlFromAuditId(id: string) {
  if (!id.startsWith("url-")) {
    return null;
  }

  try {
    return normalizeUrl(Buffer.from(id.slice(4), "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

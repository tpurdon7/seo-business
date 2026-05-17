import type { StoredAudit } from "@/lib/audit/types";

const globalForAudits = globalThis as typeof globalThis & {
  betterSearchAudits?: Map<string, StoredAudit>;
};

const audits = globalForAudits.betterSearchAudits ?? new Map<string, StoredAudit>();

if (!globalForAudits.betterSearchAudits) {
  globalForAudits.betterSearchAudits = audits;
}

export function saveAudit(audit: StoredAudit) {
  audits.set(audit.id, audit);
  return audit;
}

export function getAudit(id: string) {
  return audits.get(id) ?? null;
}

export function getRecentAudits() {
  return Array.from(audits.values())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);
}

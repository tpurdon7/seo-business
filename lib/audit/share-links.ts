import { createHmac, timingSafeEqual } from "node:crypto";

function shareSecret() {
  const secret = process.env.AUDIT_SHARE_SECRET;

  if (!secret) {
    throw new Error("Missing AUDIT_SHARE_SECRET.");
  }

  return secret;
}

export function createAuditShareToken(auditId: string) {
  return createHmac("sha256", shareSecret()).update(auditId).digest("base64url");
}

export function isValidAuditShareToken(auditId: string, token: string | null | undefined) {
  if (!token) return false;

  const expected = createAuditShareToken(auditId);
  const expectedBuffer = Buffer.from(expected);
  const tokenBuffer = Buffer.from(token);

  return expectedBuffer.length === tokenBuffer.length && timingSafeEqual(expectedBuffer, tokenBuffer);
}

export function sharePathForAudit(auditId: string) {
  return `/share/audit/${auditId}?token=${createAuditShareToken(auditId)}`;
}

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(process.cwd(), "..");
const inputPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links-public.csv");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  process.exit(1);
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];

    if (quoted && character === "\"" && input[index + 1] === "\"") {
      current += "\"";
      index += 1;
    } else if (character === "\"") {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(current);
      current = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && input[index + 1] === "\n") {
        index += 1;
      }

      row.push(current);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      current = "";
    } else {
      current += character;
    }
  }

  if (current || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function auditIdFromLink(link) {
  const match = String(link ?? "").match(/\/audit\/([^/?#]+)/);
  return match?.[1] ?? "";
}

function tokenFromLink(link) {
  try {
    return new URL(link).searchParams.get("token") ?? "";
  } catch {
    return "";
  }
}

function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

const rows = parseCsv(fs.readFileSync(inputPath, "utf8"));
const [header, ...records] = rows;
const statusIndex = header.indexOf("audit_status");
const shareLinkIndex = header.indexOf("public_share_link");
const reportLinkIndex = header.indexOf("audit_report_link");

const shareRows = records
  .filter((record) => record[statusIndex] === "complete")
  .map((record) => {
    const auditId = auditIdFromLink(record[reportLinkIndex]);
    const token = tokenFromLink(record[shareLinkIndex]);

    return auditId && token
      ? {
          audit_id: auditId,
          token_hash: tokenHash(token),
          enabled: true,
          revoked_at: null,
          expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        }
      : null;
  })
  .filter(Boolean);

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { error } = await supabase.from("audit_share_links").upsert(shareRows, {
  onConflict: "audit_id",
});

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Synced ${shareRows.length} share link(s).`);

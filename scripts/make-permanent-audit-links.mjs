import fs from "node:fs";
import { createHmac } from "node:crypto";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd(), "..");
const inputPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links-clean.csv");
const outputPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links-public.csv");
const publicBaseUrl = (process.env.PUBLIC_AUDIT_BASE_URL || "https://bettersearch.dev").replace(/\/$/, "");
const shareSecret = process.env.AUDIT_SHARE_SECRET;

if (!shareSecret) {
  console.error("Set AUDIT_SHARE_SECRET to generate signed share links.");
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

function csvCell(value) {
  return `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
}

function auditIdFromLink(link) {
  const match = String(link ?? "").match(/\/audit\/([^/?#]+)/);
  return match?.[1] ?? "";
}

function shareToken(auditId) {
  return createHmac("sha256", shareSecret).update(auditId).digest("base64url");
}

const rows = parseCsv(fs.readFileSync(inputPath, "utf8"));
const [header, ...records] = rows;
const reportIndex = header.indexOf("audit_report_link");
const statusIndex = header.indexOf("audit_status");
const nextHeader = [...header, "public_share_link"];

const nextRows = records.map((record) => {
  const auditId = auditIdFromLink(record[reportIndex]);
  const shareLink = record[statusIndex] === "complete" && auditId ? `${publicBaseUrl}/share/audit/${auditId}?token=${shareToken(auditId)}` : "";
  return [...record, shareLink];
});

fs.writeFileSync(outputPath, [nextHeader, ...nextRows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n");

console.log(`Wrote ${nextRows.length} rows.`);
console.log(outputPath);

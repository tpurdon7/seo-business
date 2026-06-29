import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd(), "..");
const csvPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links-clean.csv");
const apiBaseUrl = (process.env.AUDIT_API_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const apiToken = process.env.AUDIT_API_TOKEN;
const targetUrl = process.env.AUDIT_TARGET_URL;

if (!apiToken || !targetUrl) {
  console.error("Set AUDIT_API_TOKEN and AUDIT_TARGET_URL.");
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
      if (row.some((cell) => cell.trim())) {
        rows.push(row);
      }
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

async function request(pathname, options = {}) {
  const response = await fetch(`${apiBaseUrl}${pathname}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiToken}`,
      ...(options.headers ?? {}),
    },
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || `Request failed: ${response.status}`);
  }

  return payload;
}

const createdJob = await request("/api/audit/batch", {
  method: "POST",
  body: JSON.stringify({ urls: [targetUrl], source: "surrey_clinics_single_fill" }),
});

let job = createdJob;

while (job.audits.some((audit) => ["queued", "crawling", "auditing"].includes(audit.status))) {
  job = await request(`/api/audit/jobs/${job.jobId}`);
  console.log(`Progress: ${job.completed}/${job.total} complete, ${job.failed} failed`);
}

const audit = job.audits[0];
const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));
const header = rows[0];
const websiteIndex = header.indexOf("website");
const statusIndex = header.indexOf("audit_status");
const reportIndex = header.indexOf("audit_report_link");
const errorIndex = header.indexOf("error");
const targetRow = rows.slice(1).find((row) => row[websiteIndex] === targetUrl);

if (!targetRow) {
  throw new Error(`Could not find ${targetUrl} in ${csvPath}`);
}

targetRow[statusIndex] = audit.status;
targetRow[reportIndex] = audit.reportUrl ? `${apiBaseUrl}${audit.reportUrl}` : "";
targetRow[errorIndex] = audit.error ?? "";

fs.writeFileSync(csvPath, rows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n");

console.log(`${audit.status}: ${targetRow[reportIndex]}`);

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd(), "..");
const inputPath = path.join(root, "lead-packs", "surrey-clinics-audit-input.csv");
const outputPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links.csv");
const apiBaseUrl = (process.env.AUDIT_API_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const apiToken = process.env.AUDIT_API_TOKEN;
const existingJobId = process.env.AUDIT_JOB_ID;

if (!apiToken) {
  console.error("Set AUDIT_API_TOKEN to a Better Search bsa_... API token.");
  process.exit(1);
}

function parseCsvLine(line) {
  const columns = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (quoted && character === "\"" && line[index + 1] === "\"") {
      current += "\"";
      index += 1;
    } else if (character === "\"") {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      columns.push(current);
      current = "";
    } else {
      current += character;
    }
  }

  columns.push(current);
  return columns;
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
}

function readInputRows() {
  const input = fs.readFileSync(inputPath, "utf8").trim();
  const lines = input.split(/\r?\n/);
  const header = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const columns = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, columns[index] ?? ""]));
  });
}

function writeOutput(rows, audits = []) {
  const auditByUrl = new Map(audits.map((audit) => [audit.url, audit]));
  const lines = [
    "clinic_name,website,opportunity_score,audit_status,audit_report_link,error",
    ...rows.map((row) => {
      const audit = auditByUrl.get(row.website);
      const reportLink = audit?.reportUrl ? `${apiBaseUrl}${audit.reportUrl}` : "";

      return [
        row.clinic_name,
        row.website,
        row.opportunity_score,
        audit?.status ?? "queued",
        reportLink,
        audit?.error ?? "",
      ]
        .map(csvCell)
        .join(",");
    }),
  ];

  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
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

const rows = readInputRows();
const urls = rows.map((row) => row.website).filter(Boolean);

console.log(`Creating audit job for ${urls.length} URLs against ${apiBaseUrl}...`);
const createdJob = existingJobId
  ? await request(`/api/audit/jobs/${existingJobId}`)
  : await request("/api/audit/batch", {
      method: "POST",
      body: JSON.stringify({ urls, source: "surrey_clinics_launch" }),
    });

let job = createdJob;
writeOutput(rows, job.audits);
console.log(`Job created: ${job.jobId}`);

function hasUnfinishedAudits(audits) {
  return audits.some((audit) => ["queued", "crawling", "auditing"].includes(audit.status));
}

while (job.status === "queued" || job.status === "running" || hasUnfinishedAudits(job.audits)) {
  job = await request(`/api/audit/jobs/${job.jobId}`);
  writeOutput(rows, job.audits);
  console.log(`Progress: ${job.completed}/${job.total} complete, ${job.failed} failed`);
}

writeOutput(rows, job.audits);
console.log(`Done: ${job.completed}/${job.total} complete, ${job.failed} failed`);
console.log(outputPath);

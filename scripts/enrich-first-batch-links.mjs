import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "..");
const batchPath = path.join(root, "lead-packs", "2026-06-16-surrey-clinics", "first-batch-12.csv");
const linksPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links-public.csv");

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
      if (character === "\r" && input[index + 1] === "\n") index += 1;
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

function recordsFrom(rows) {
  const [header, ...records] = rows;
  return {
    header,
    records: records.map((record) =>
      Object.fromEntries(header.map((column, index) => [column, record[index] ?? ""])),
    ),
  };
}

const batch = recordsFrom(parseCsv(fs.readFileSync(batchPath, "utf8")));
const links = recordsFrom(parseCsv(fs.readFileSync(linksPath, "utf8")));
const linkByWebsite = new Map(links.records.map((record) => [record.website, record]));

const updated = batch.records.map((record) => {
  const link = linkByWebsite.get(record.website);
  if (!link || link.audit_status !== "complete" || !link.public_share_link) return record;

  return {
    ...record,
    pipeline_stage: "Audit Ready",
    last_action: "2026-06-19: automated audit generated and permanent share link registered",
    next_action: "Manually QA report and website evidence immediately before outreach; then move to Contacted",
    audit_status: "complete_pending_manual_qa",
    audit_link: link.public_share_link,
  };
});

const output = [
  batch.header.map(csvCell).join(","),
  ...updated.map((record) => batch.header.map((column) => csvCell(record[column])).join(",")),
].join("\n");

fs.writeFileSync(batchPath, `${output}\n`);

const ready = updated.filter((record) => record.pipeline_stage === "Audit Ready").length;
console.log(`Updated ${ready}/${updated.length} first-batch leads with audit share links.`);

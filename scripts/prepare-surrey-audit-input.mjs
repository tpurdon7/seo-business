import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "..");
const sourcePath = path.join(root, "lead-packs", "better-search-weekly-surrey-all-lead-emails.csv");
const urlsPath = path.join(root, "lead-packs", "surrey-clinics-audit-urls.txt");
const csvPath = path.join(root, "lead-packs", "surrey-clinics-audit-input.csv");

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

const input = fs.readFileSync(sourcePath, "utf8").trim();
const lines = input.split(/\r?\n/);
const header = parseCsvLine(lines[0]);
const websiteIndex = header.indexOf("website");
const nameIndex = header.indexOf("clinic_name");
const scoreIndex = header.indexOf("opportunity_score");
const seen = new Set();
const rows = [];

for (const line of lines.slice(1)) {
  const columns = parseCsvLine(line);
  const website = columns[websiteIndex]?.trim();

  if (!website || seen.has(website)) {
    continue;
  }

  seen.add(website);
  rows.push({
    clinicName: columns[nameIndex] ?? "",
    website,
    opportunityScore: Number(columns[scoreIndex] ?? 0),
  });
}

rows.sort((left, right) => right.opportunityScore - left.opportunityScore);

fs.writeFileSync(urlsPath, `${rows.map((row) => row.website).join("\n")}\n`);
fs.writeFileSync(
  csvPath,
  [
    "clinic_name,website,opportunity_score",
    ...rows.map((row) => [row.clinicName, row.website, row.opportunityScore].map(csvCell).join(",")),
  ].join("\n") + "\n",
);

console.log(`Prepared ${rows.length} unique Surrey clinic URLs.`);
console.log(urlsPath);
console.log(csvPath);

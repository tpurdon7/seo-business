import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "..");
const inputPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links.csv");
const outputPath = path.join(root, "lead-packs", "surrey-clinics-audit-report-links-clean.csv");

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
      rows.push(row);
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

  return rows.filter((csvRow) => csvRow.some((cell) => cell.trim()));
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
}

function tidyError(value) {
  return String(value ?? "")
    .replace(/\u001b\[[0-9;]*m/g, "")
    .replace(/\s+/g, " ")
    .replace(/^"$/, "")
    .replace(/^page\.goto:\s*/i, "")
    .trim();
}

const rows = parseCsv(fs.readFileSync(inputPath, "utf8"));
const [header, ...records] = rows;
const errorIndex = header.indexOf("error");

const cleanedRecords = records.map((record) => {
  const nextRecord = [...record];
  nextRecord[errorIndex] = tidyError(nextRecord[errorIndex]);
  return nextRecord;
});

fs.writeFileSync(
  outputPath,
  [header, ...cleanedRecords].map((row) => row.map(csvCell).join(",")).join("\n") + "\n",
);

console.log(`Cleaned ${cleanedRecords.length} report rows.`);
console.log(outputPath);

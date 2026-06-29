import process from "node:process";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  alias: {
    "@": process.cwd(),
  },
});

const { createSupabaseAdminClient } = await jiti.import("../lib/supabase/admin.ts");
const { generateAuditReport } = await jiti.import("../lib/audit/generate-audit.ts");
const { scorePage } = await jiti.import("../lib/audit/score-page.ts");

const apply = process.argv.includes("--apply");
const supabase = createSupabaseAdminClient();
const { data: audits, error } = await supabase
  .from("audits")
  .select("id, extracted_json")
  .eq("status", "complete")
  .not("extracted_json", "is", null)
  .order("created_at", { ascending: true });

if (error) {
  throw new Error(error.message);
}

console.log(`${apply ? "Regenerating" : "Would regenerate"} ${audits.length} completed report(s).`);

for (const audit of audits) {
  const scores = scorePage(audit.extracted_json);
  const report = generateAuditReport(audit.id, audit.extracted_json, scores);

  if (!apply) {
    console.log(`Would update ${audit.id}.`);
    continue;
  }

  const { error: updateError } = await supabase
    .from("audits")
    .update({
      report_json: report,
      score_total: report.overallScore,
    })
    .eq("id", audit.id)
    .eq("status", "complete");

  if (updateError) {
    throw new Error(`Could not update ${audit.id}: ${updateError.message}`);
  }

  console.log(`Updated ${audit.id}.`);
}

console.log(apply ? "Report regeneration complete." : "Dry run complete; no reports changed.");

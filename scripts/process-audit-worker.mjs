import process from "node:process";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  alias: {
    "@": process.cwd(),
  },
});

const { createSupabaseAdminClient } = await jiti.import("../lib/supabase/admin.ts");
const { processClaimedAudit } = await jiti.import("../lib/audit/audit-service.ts");
const { claimNextQueuedAudit, recoverStaleAudits } = await jiti.import("../lib/audit/persistent-store.ts");

const supabase = createSupabaseAdminClient();
const maxItems = Number(process.env.AUDIT_WORKER_MAX_ITEMS || 0);
const pollMs = Number(process.env.AUDIT_WORKER_POLL_MS || 5000);
const targetJobId = process.env.AUDIT_JOB_ID;

async function findNextQueuedAudit() {
  if (!targetJobId) {
    return claimNextQueuedAudit();
  }

  let query = supabase
    .from("audits")
    .select("id, user_id, job_id, input_url, status")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1);

  if (targetJobId) {
    query = query.eq("job_id", targetJobId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const audit = data?.[0] ?? null;

  if (!audit) {
    return null;
  }

  const { data: claimed, error: claimError } = await supabase
    .from("audits")
    .update({ status: "crawling", started_at: new Date().toISOString(), error: null })
    .eq("id", audit.id)
    .eq("status", "queued")
    .select("id, user_id, job_id, input_url")
    .maybeSingle();

  if (claimError) {
    throw new Error(claimError.message);
  }

  return claimed;
}

async function getActor(userId) {
  const { data, error } = await supabase.from("profiles").select("email").eq("id", userId).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: userId,
    email: data?.email ?? null,
    source: "api_token",
  };
}

async function runOnce() {
  const audit = await findNextQueuedAudit();

  if (!audit?.job_id) {
    return false;
  }

  console.log(`Processing ${audit.input_url} (${audit.id})`);
  const actor = await getActor(audit.user_id);
  await processClaimedAudit(actor, audit.job_id, audit.id, audit.input_url);
  return true;
}

const recovered = await recoverStaleAudits();
if (recovered > 0) {
  console.log(`Recovered ${recovered} stale audit(s).`);
}

let processed = 0;

while (maxItems <= 0 || processed < maxItems) {
  let didWork = false;

  try {
    didWork = await runOnce();
  } catch (error) {
    console.error("Worker iteration failed:", error instanceof Error ? error.message : error);
  }

  if (!didWork) {
    console.log("No queued audits found.");

    if (pollMs <= 0 || targetJobId) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, pollMs));
    continue;
  }

  processed += 1;
  console.log(`Processed ${processed}/${maxItems}`);
}

console.log(`Worker finished after ${processed} audit(s).`);

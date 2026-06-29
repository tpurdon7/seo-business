import type { AuditExtractedData, AuditReport } from "@/lib/audit/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";

export type PersistedAuditStatus = "queued" | "crawling" | "auditing" | "complete" | "failed";
export type PersistedJobStatus = "queued" | "running" | "complete" | "failed";

export interface UsageState {
  free_audits_used: number;
  free_audit_limit: number;
}

export interface PersistedAudit {
  id: string;
  user_id: string;
  job_id: string | null;
  input_url: string;
  final_url: string | null;
  status: PersistedAuditStatus;
  score_total: number | null;
  report_json: AuditReport | null;
  extracted_json: AuditExtractedData | null;
  error: string | null;
  created_at: string;
}

export interface PersistedJob {
  id: string;
  user_id: string;
  status: PersistedJobStatus;
  total: number;
  completed: number;
  failed: number;
  created_at: string;
}

function createPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Missing public Supabase environment variables.");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function ensureUserRows(userId: string, email: string | null) {
  const supabase = createSupabaseAdminClient();
  const safeEmail = email || `${userId}@unknown.local`;

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: userId, email: safeEmail }, { onConflict: "id" });

  if (profileError) throw new Error(profileError.message);

  const { error: usageError } = await supabase
    .from("usage_limits")
    .upsert({ user_id: userId, free_audit_limit: 1 }, { onConflict: "user_id", ignoreDuplicates: true });

  if (usageError) throw new Error(usageError.message);
}

export async function getUsageState(userId: string, email?: string | null): Promise<UsageState> {
  await ensureUserRows(userId, email ?? null);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("usage_limits")
    .select("free_audits_used, free_audit_limit")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function consumeFreeAudit(userId: string, email: string | null) {
  await ensureUserRows(userId, email);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .rpc("consume_free_audit", { p_user_id: userId });

  if (error) throw new Error(error.message);
  const result = data?.[0];

  if (!result) {
    throw new Error("Audit usage could not be loaded.");
  }

  return {
    allowed: Boolean(result.allowed),
    usage: {
      free_audits_used: result.free_audits_used,
      free_audit_limit: result.free_audit_limit,
    },
  };
}

export async function createPersistedJob(job: PersistedJob) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("audit_jobs").insert(job);
  if (error) throw new Error(error.message);
}

export async function updatePersistedJob(id: string, update: Partial<Pick<PersistedJob, "status" | "completed" | "failed">>) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("audit_jobs").update(update).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function createPersistedAudit(audit: Omit<PersistedAudit, "created_at">) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("audits").insert(audit);
  if (error) throw new Error(error.message);
}

export async function updatePersistedAudit(id: string, update: Partial<Omit<PersistedAudit, "id" | "created_at">>) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("audits").update(update).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function claimNextQueuedAudit() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("claim_next_queued_audit");

  if (error) throw new Error(error.message);
  return (data?.[0] as {
    id: string;
    user_id: string;
    job_id: string;
    input_url: string;
  } | undefined) ?? null;
}

export async function recoverStaleAudits(staleAfterMinutes = 30) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("recover_stale_audits", {
    p_stale_after_minutes: staleAfterMinutes,
  });

  if (error) throw new Error(error.message);
  return Number(data ?? 0);
}

export async function getPersistedAuditForUser(id: string, userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("audits").select("*").eq("id", id).eq("user_id", userId).maybeSingle();

  if (error) throw new Error(error.message);
  return data as PersistedAudit | null;
}

export async function getPersistedAudit(id: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("audits").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(error.message);
  return data as PersistedAudit | null;
}

export async function getSharedPersistedAudit(id: string, token: string) {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase.rpc("get_shared_audit", {
    p_audit_id: id,
    p_token: token,
  });

  if (error) throw new Error(error.message);
  return (data?.[0] as PersistedAudit | undefined) ?? null;
}

export async function createApiTokenAuditJob(tokenHash: string, jobId: string, urls: string[], auditIds: string[]) {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase.rpc("create_api_token_audit_job", {
    p_token_hash: tokenHash,
    p_job_id: jobId,
    p_urls: urls,
    p_audit_ids: auditIds,
  });

  if (error) throw new Error(error.message);
  return data?.[0] as
    | {
        job_id: string;
        status: PersistedJobStatus;
        audits: Array<{
          url: string;
          auditId: string | null;
          status: PersistedAuditStatus;
          reportUrl: string | null;
          error: string | null;
        }>;
      }
    | undefined;
}

export async function getApiTokenAuditJob(tokenHash: string, jobId: string) {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase.rpc("get_api_token_audit_job", {
    p_token_hash: tokenHash,
    p_job_id: jobId,
  });

  if (error) throw new Error(error.message);
  return data?.[0] as
    | {
        job_id: string;
        status: PersistedJobStatus;
        total: number;
        completed: number;
        failed: number;
        audits: Array<{
          url: string;
          auditId: string | null;
          status: PersistedAuditStatus;
          reportUrl: string | null;
          error: string | null;
        }>;
      }
    | undefined;
}

export async function getPersistedJobForUser(id: string, userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("audit_jobs").select("*").eq("id", id).eq("user_id", userId).maybeSingle();

  if (error) throw new Error(error.message);
  return data as PersistedJob | null;
}

export async function listPersistedJobAudits(jobId: string, userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("audits")
    .select("id, input_url, status, error")
    .eq("job_id", jobId)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export type AuditStatus = "queued" | "crawling" | "auditing" | "complete" | "failed";
export type JobStatus = "queued" | "running" | "complete" | "failed";

export interface AppSettings {
  apiBaseUrl: string;
  apiKey: string;
}

export interface AuditJobItem {
  url: string;
  auditId: string | null;
  status: AuditStatus;
  reportUrl: string | null;
  error: string | null;
}

export interface CreateBatchResponse {
  jobId: string;
  status: "queued";
  audits: AuditJobItem[];
}

export interface AuditJobResponse {
  jobId: string;
  status: JobStatus;
  total: number;
  completed: number;
  failed: number;
  audits: AuditJobItem[];
}

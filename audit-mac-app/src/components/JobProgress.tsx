import type { AuditJobItem, JobStatus } from "../lib/types";

const statusLabels: Record<AuditJobItem["status"], string> = {
  queued: "Queued",
  crawling: "Crawling",
  auditing: "Auditing",
  complete: "Complete",
  failed: "Failed",
};

interface JobProgressProps {
  jobId: string | null;
  status: JobStatus | null;
  total: number;
  completed: number;
  failed: number;
  audits: AuditJobItem[];
}

export function JobProgress({ jobId, status, total, completed, failed, audits }: JobProgressProps) {
  if (!jobId) {
    return null;
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Job progress</h2>
        <span>{status ? status.charAt(0).toUpperCase() + status.slice(1) : "Queued"}</span>
      </div>
      <div className="progress-summary">
        <div>
          <strong>{completed}</strong>
          <span>complete</span>
        </div>
        <div>
          <strong>{total}</strong>
          <span>total</span>
        </div>
        <div>
          <strong>{failed}</strong>
          <span>failed</span>
        </div>
      </div>
      <div className="audit-list">
        {audits.map((audit) => (
          <div className="audit-row" key={audit.url}>
            <span className="audit-url">{audit.url}</span>
            <span className={`status-chip status-${audit.status}`}>{statusLabels[audit.status]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

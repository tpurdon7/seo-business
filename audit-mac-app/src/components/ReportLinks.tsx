import { openUrl } from "@tauri-apps/plugin-opener";

import { absoluteReportUrl } from "../lib/api";
import type { AppSettings, AuditJobItem } from "../lib/types";

interface ReportLinksProps {
  audits: AuditJobItem[];
  settings: AppSettings;
  onError: (message: string) => void;
}

export function ReportLinks({ audits, settings, onError }: ReportLinksProps) {
  const completed = audits.filter((audit) => audit.status === "complete" && audit.reportUrl);

  if (completed.length === 0) {
    return null;
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Reports</h2>
        <span>{completed.length} ready</span>
      </div>
      <div className="report-list">
        {completed.map((audit) => {
          const href = absoluteReportUrl(settings, audit.reportUrl ?? "");

          return (
            <button
              className="report-link"
              key={audit.url}
              type="button"
              onClick={async () => {
                try {
                  await openUrl(href);
                } catch {
                  window.open(href, "_blank", "noopener,noreferrer");
                  onError(`If the report did not open, copy this URL into your browser: ${href}`);
                }
              }}
            >
              <span>{audit.url}</span>
              <strong>Open</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

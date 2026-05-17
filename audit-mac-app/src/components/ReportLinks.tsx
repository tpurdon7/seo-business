import { openUrl } from "@tauri-apps/plugin-opener";

import { absoluteReportUrl } from "../lib/api";
import type { AppSettings, AuditJobItem } from "../lib/types";

interface ReportLinksProps {
  audits: AuditJobItem[];
  settings: AppSettings;
}

export function ReportLinks({ audits, settings }: ReportLinksProps) {
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
              onClick={() => {
                void openUrl(href);
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

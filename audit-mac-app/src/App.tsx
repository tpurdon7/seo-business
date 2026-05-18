import { useEffect, useMemo, useState } from "react";

import { createBatchAudit, getAuditJob } from "./lib/api";
import { parseUrls } from "./lib/parseUrls";
import type { AppSettings, AuditJobItem, JobStatus } from "./lib/types";
import { DropZone } from "./components/DropZone";
import { JobProgress } from "./components/JobProgress";
import { ReportLinks } from "./components/ReportLinks";
import { Settings } from "./components/Settings";
import { UrlInput } from "./components/UrlInput";

const settingsKey = "better-search-audit-settings";
const defaultSettings: AppSettings = {
  apiBaseUrl: "https://seo-growth-agency.vercel.app",
  apiKey: "",
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(settingsKey);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function App() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [draft, setDraft] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [audits, setAudits] = useState<AuditJobItem[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  const pendingUrls = useMemo(() => Array.from(new Set([...urls, ...parseUrls(draft)])), [draft, urls]);
  const completed = audits.filter((audit) => audit.status === "complete").length;
  const failed = audits.filter((audit) => audit.status === "failed").length;

  useEffect(() => {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }, [settings]);

  function resetJobState() {
    setJobId(null);
    setJobStatus(null);
    setAudits([]);
    setRunning(false);
    setError("");
  }

  useEffect(() => {
    if (!jobId || jobStatus === "complete" || jobStatus === "failed") {
      return;
    }

    const interval = window.setInterval(async () => {
      try {
        const job = await getAuditJob(jobId, settings);
        setJobStatus(job.status);
        setAudits(job.audits);
        setRunning(job.status === "queued" || job.status === "running");
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Could not poll the audit job.");
        setRunning(false);
        setJobStatus("failed");
      }
    }, 1_200);

    return () => window.clearInterval(interval);
  }, [jobId, jobStatus, settings]);

  function addUrls(nextUrls: string[]) {
    setUrls((current) => Array.from(new Set([...current, ...nextUrls])));
  }

  async function runAudit() {
    setError("");

    if (pendingUrls.length === 0) {
      setError("Add at least one URL before running an audit.");
      return;
    }

    try {
      setRunning(true);
      const job = await createBatchAudit(pendingUrls, settings);
      setJobId(job.jobId);
      setJobStatus(job.status);
      setAudits(job.audits);
      setDraft("");
      setUrls([]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Audit job could not be created.");
      setRunning(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p>Better Search</p>
          <h1>Audit Machine</h1>
        </div>
        <button className="ghost-button" type="button" onClick={resetJobState} disabled={running}>
          Clear
        </button>
      </header>

      <DropZone onUrls={addUrls} />
      <UrlInput value={draft} onChange={setDraft} onUrls={addUrls} />

      <div className="url-count">
        <span>{pendingUrls.length} URL{pendingUrls.length === 1 ? "" : "s"} ready</span>
        <button className="primary-button" type="button" onClick={runAudit} disabled={running}>
          {running ? "Running" : "Run audit"}
        </button>
      </div>

      {error ? <div className="error-box">{error}</div> : null}

      <JobProgress
        jobId={jobId}
        status={jobStatus}
        total={audits.length}
        completed={completed}
        failed={failed}
        audits={audits}
      />
      <ReportLinks audits={audits} settings={settings} />
      <Settings
        settings={settings}
        onChange={(nextSettings) => {
          setSettings(nextSettings);
          resetJobState();
        }}
      />
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";

import { createBatchAudit, getAuditJob } from "./lib/api";
import { parseUrlFiles, parseUrls } from "./lib/parseUrls";
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
  const [showUrlInput, setShowUrlInput] = useState(false);
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

      <section className={running ? "crab-stage crab-stage-active" : "crab-stage"}>
        <div className="crab-scene" aria-hidden="true">
          <div className="crab-shadow" />
          <div className="crab">
            <span className="claw claw-left" />
            <span className="claw claw-right" />
            <span className="eye eye-left" />
            <span className="eye eye-right" />
            <span className="shell" />
            <span className="leg leg-1" />
            <span className="leg leg-2" />
            <span className="leg leg-3" />
            <span className="leg leg-4" />
          </div>
        </div>
        <div>
          <span className="status-kicker">{running ? "Claude crab is auditing" : "Ready for URLs"}</span>
          <h2>{running ? "Claws are swinging through the audit queue" : "Drop, paste, or upload a prospect list"}</h2>
          <p>{running ? "The Mac app is only sending URLs. The Better Search backend is crawling, scoring, and building the reports." : "Add one page or a list. Full page content stays with the backend crawl."}</p>
        </div>
      </section>

      <DropZone onUrls={addUrls} />

      <div className="quick-actions">
        <label className="action-button">
          Upload list
          <input
            type="file"
            accept=".txt,.csv,text/plain,text/csv"
            multiple
            onChange={async (event) => {
              const files = event.currentTarget.files;
              if (!files) return;
              addUrls(await parseUrlFiles(files));
            }}
          />
        </label>
        <button className="action-button action-button-secondary" type="button" onClick={() => setShowUrlInput((current) => !current)}>
          {showUrlInput ? "Hide URL box" : "Add URL"}
        </button>
      </div>

      {showUrlInput || draft ? <UrlInput value={draft} onChange={setDraft} onUrls={addUrls} /> : null}

      {pendingUrls.length > 0 ? <div className="url-count">
        <span>{pendingUrls.length} URL{pendingUrls.length === 1 ? "" : "s"} ready</span>
        <button className="primary-button" type="button" onClick={runAudit} disabled={running}>
          {running ? "Running" : "Run audit"}
        </button>
      </div> : null}

      {error ? <div className="error-box">{error}</div> : null}

      <JobProgress
        jobId={jobId}
        status={jobStatus}
        total={audits.length}
        completed={completed}
        failed={failed}
        audits={audits}
      />
      <ReportLinks audits={audits} settings={settings} onError={setError} />
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

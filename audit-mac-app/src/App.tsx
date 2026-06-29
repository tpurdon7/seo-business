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
const logoSrc = "/scout-logo.png";
const productionApiBaseUrl = "https://bettersearch.dev";
const legacyApiBaseUrls = new Set(["https://seo-growth-agency.vercel.app"]);
const defaultSettings: AppSettings = {
  apiBaseUrl: productionApiBaseUrl,
  apiKey: "",
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(settingsKey);
    const settings = stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    const apiBaseUrl = String(settings.apiBaseUrl || "").replace(/\/$/, "");

    return {
      ...settings,
      apiBaseUrl: legacyApiBaseUrls.has(apiBaseUrl) ? productionApiBaseUrl : settings.apiBaseUrl,
    };
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

  const draftUrls = useMemo(() => parseUrls(draft), [draft]);
  const pendingUrls = useMemo(() => Array.from(new Set([...urls, ...draftUrls])), [draftUrls, urls]);
  const completed = audits.filter((audit) => audit.status === "complete").length;
  const failed = audits.filter((audit) => audit.status === "failed").length;

  useEffect(() => {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }, [settings]);

  function resetJobState() {
    setDraft("");
    setUrls([]);
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

  function addDraftUrls() {
    const nextUrls = parseUrls(draft);

    if (nextUrls.length === 0) {
      setError("Paste a valid URL first.");
      return;
    }

    addUrls(nextUrls);
    setDraft("");
    setShowUrlInput(true);
    setError("");
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
      setRunning(job.status === "queued" || job.status === "running");
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
        <div className="brand-lockup">
          <img className="brand-logo" src={logoSrc} alt="" aria-hidden="true" />
          <div>
          <p>Better Search</p>
          <h1>Audit Machine</h1>
          </div>
        </div>
        <button className="ghost-button" type="button" onClick={resetJobState} disabled={running}>
          Clear
        </button>
      </header>

      <section className={running ? "crab-stage crab-stage-active" : "crab-stage"}>
        <div className="scout-scene" aria-hidden="true">
          <div className="scout-glow" />
          <img className="scout-logo" src={logoSrc} alt="" />
          <div className="scout-shadow" />
        </div>
        <div>
          <span className="status-kicker">{running ? "Audit scout is checking" : "Ready for URLs"}</span>
          <h2>{running ? "Scanning through the audit queue" : "Drop, paste, or upload a prospect list"}</h2>
          <p>{running ? "The Mac app is only sending URLs. The Better Search backend is crawling, scoring, and building the reports." : "Add one page or a list. Full page content stays with the backend crawl."}</p>
        </div>
      </section>

      <DropZone onUrls={addUrls} />

      <div className={pendingUrls.length > 0 ? "quick-actions quick-actions-has-run" : "quick-actions"}>
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
              event.currentTarget.value = "";
            }}
          />
        </label>
        <button className="action-button action-button-secondary" type="button" onClick={() => setShowUrlInput((current) => !current)}>
          {showUrlInput ? "Hide URL box" : "Add URL"}
        </button>
        {pendingUrls.length > 0 ? (
          <button className="action-button action-button-run" type="button" onClick={runAudit} disabled={running}>
            {running ? "Running" : `Run ${pendingUrls.length}`}
          </button>
        ) : null}
      </div>

      {showUrlInput || draft ? (
        <UrlInput
          value={draft}
          onChange={setDraft}
          onAdd={addDraftUrls}
        />
      ) : null}

      {pendingUrls.length > 0 ? <div className="run-dock">
        <div>
          <span>{pendingUrls.length} URL{pendingUrls.length === 1 ? "" : "s"} ready</span>
          <div className="pending-preview">
            {pendingUrls.slice(0, 3).map((url) => (
              <small key={url}>{url}</small>
            ))}
            {pendingUrls.length > 3 ? <small>+{pendingUrls.length - 3} more</small> : null}
          </div>
        </div>
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

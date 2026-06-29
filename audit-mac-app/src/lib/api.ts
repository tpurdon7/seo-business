import type { AppSettings, AuditJobResponse, CreateBatchResponse } from "./types";

function headers(settings: AppSettings) {
  const result: Record<string, string> = {
    "content-type": "application/json",
  };

  if (settings.apiKey.trim()) {
    result.authorization = `Bearer ${settings.apiKey.trim()}`;
  }

  return result;
}

function endpoint(settings: AppSettings, path: string) {
  return `${settings.apiBaseUrl.replace(/\/$/, "")}${path}`;
}

export async function createBatchAudit(urls: string[], settings: AppSettings) {
  let response: Response;

  try {
    response = await fetch(endpoint(settings, "/api/audit/batch"), {
      method: "POST",
      headers: headers(settings),
      body: JSON.stringify({
        urls,
        source: "mac_app",
      }),
    });
  } catch {
    throw new Error(`Could not reach the Better Search backend at ${settings.apiBaseUrl}. Check the API base URL and account token.`);
  }

  const payload = (await response.json()) as CreateBatchResponse | { error?: string };

  if (!response.ok) {
    const message = "error" in payload && payload.error ? payload.error : "Audit job could not be created.";
    throw new Error(
      response.status === 401
        ? "Connect your Better Search account in Settings, then paste your Mac app token."
        : message,
    );
  }

  return payload as CreateBatchResponse;
}

export async function getAuditJob(jobId: string, settings: AppSettings) {
  let response: Response;

  try {
    response = await fetch(endpoint(settings, `/api/audit/jobs/${jobId}`), {
      headers: headers(settings),
    });
  } catch {
    throw new Error(`Could not reach the Better Search backend at ${settings.apiBaseUrl}. Check the API base URL and account token.`);
  }

  const payload = (await response.json()) as AuditJobResponse | { error?: string };

  if (!response.ok) {
    const message = "error" in payload && payload.error ? payload.error : "Audit job could not be loaded.";
    throw new Error(
      response.status === 401
        ? "Your Mac app token is missing, invalid, or expired. Reconnect your account in Settings."
        : message,
    );
  }

  return payload as AuditJobResponse;
}

export function absoluteReportUrl(settings: AppSettings, reportUrl: string) {
  if (/^https?:\/\//i.test(reportUrl)) {
    return reportUrl;
  }

  return `${settings.apiBaseUrl.replace(/\/$/, "")}${reportUrl.startsWith("/") ? reportUrl : `/${reportUrl}`}`;
}

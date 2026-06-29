import { openUrl } from "@tauri-apps/plugin-opener";

import type { AppSettings } from "../lib/types";

interface SettingsProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export function Settings({ settings, onChange }: SettingsProps) {
  const accountUrl = `${settings.apiBaseUrl.replace(/\/$/, "")}/login?next=/account`;

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Settings</h2>
        <span>Local only</span>
      </div>
      <div className="account-access">
        <div>
          <strong>Connect your Better Search account</strong>
          <p>Log in with an approved administrator account, create a Mac app token, then paste it below.</p>
        </div>
        <button
          className="action-button action-button-secondary"
          type="button"
          onClick={() => void openUrl(accountUrl)}
        >
          Log in &amp; get token
        </button>
      </div>
      <label className="field">
        <span>API base URL</span>
        <input
          value={settings.apiBaseUrl}
          onChange={(event) => onChange({ ...settings, apiBaseUrl: event.target.value })}
          placeholder="http://127.0.0.1:3000"
        />
      </label>
      <label className="field">
        <span>Account API token</span>
        <input
          value={settings.apiKey}
          type="password"
          onChange={(event) => onChange({ ...settings, apiKey: event.target.value })}
          placeholder="Paste token from Account page"
        />
      </label>
    </section>
  );
}

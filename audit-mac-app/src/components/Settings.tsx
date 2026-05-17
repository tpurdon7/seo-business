import type { AppSettings } from "../lib/types";

interface SettingsProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export function Settings({ settings, onChange }: SettingsProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Settings</h2>
        <span>Local only</span>
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
        <span>API key</span>
        <input
          value={settings.apiKey}
          type="password"
          onChange={(event) => onChange({ ...settings, apiKey: event.target.value })}
          placeholder="Optional"
        />
      </label>
    </section>
  );
}

import { parseUrls } from "../lib/parseUrls";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onUrls: (urls: string[]) => void;
}

export function UrlInput({ value, onChange, onUrls }: UrlInputProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Add URL</h2>
        <span>Paste one or many</span>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={(event) => {
          const pastedUrls = parseUrls(event.clipboardData.getData("text/plain"));

          if (pastedUrls.length > 0) {
            onUrls(pastedUrls);
          }
        }}
        placeholder="https://example.com/service-page"
        rows={4}
      />
    </section>
  );
}

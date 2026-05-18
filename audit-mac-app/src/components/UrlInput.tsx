import { parseUrls } from "../lib/parseUrls";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onUrls: (urls: string[]) => void;
}

export function UrlInput({ value, onChange, onAdd, onUrls }: UrlInputProps) {
  const parsedUrls = parseUrls(value);

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Add URL</h2>
        <span>{parsedUrls.length > 0 ? `${parsedUrls.length} found` : "Paste one or many"}</span>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={(event) => {
          const pastedUrls = parseUrls(event.clipboardData.getData("text/plain"));

          if (pastedUrls.length > 0) {
            event.preventDefault();
            onUrls(pastedUrls);
          }
        }}
        placeholder="https://example.com/service-page"
        rows={4}
      />
      <button className="inline-add-button" type="button" onClick={onAdd} disabled={parsedUrls.length === 0}>
        Add to queue
      </button>
    </section>
  );
}

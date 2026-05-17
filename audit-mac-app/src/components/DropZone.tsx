import { useState } from "react";

import { parseUrlFiles, parseUrls } from "../lib/parseUrls";

interface DropZoneProps {
  onUrls: (urls: string[]) => void;
}

export function DropZone({ onUrls }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("Drop URLs, text files, or CSV files");

  async function handleFiles(files: FileList) {
    const urls = await parseUrlFiles(files);
    setMessage(urls.length > 0 ? `${urls.length} URL${urls.length === 1 ? "" : "s"} found` : "No URLs found in those files");
    onUrls(urls);
  }

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const text = event.dataTransfer.getData("text/plain");
    const textUrls = parseUrls(text);

    if (textUrls.length > 0) {
      setMessage(`${textUrls.length} URL${textUrls.length === 1 ? "" : "s"} found`);
      onUrls(textUrls);
      return;
    }

    if (event.dataTransfer.files.length > 0) {
      await handleFiles(event.dataTransfer.files);
    }
  }

  return (
    <div
      className={dragging ? "drop-zone drop-zone-active" : "drop-zone"}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="drop-icon" aria-hidden="true" />
      <p>{message}</p>
      <span>URLs only. The app never sends page content.</span>
      <label className="file-button">
        Upload list
        <input
          type="file"
          accept=".txt,.csv,text/plain,text/csv"
          multiple
          onChange={(event) => {
            if (event.currentTarget.files) {
              void handleFiles(event.currentTarget.files);
            }
          }}
        />
      </label>
    </div>
  );
}

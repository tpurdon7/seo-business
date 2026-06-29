"use client";

import { useLayoutEffect, useRef, useState } from "react";

export function ExpandableEvidence({ children }: { children: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text || expanded) return;

    const updateTruncation = () => {
      setIsTruncated(text.scrollHeight > text.clientHeight + 1);
    };

    updateTruncation();
    const observer = new ResizeObserver(updateTruncation);
    observer.observe(text);

    return () => observer.disconnect();
  }, [children, expanded]);

  return (
    <div className="mt-1">
      <p
        ref={textRef}
        className={`${expanded ? "" : "line-clamp-2"} text-xs leading-5 text-slate-500`}
      >
        {children}
      </p>
      {isTruncated || expanded ? (
        <button
          type="button"
          className="mt-1 text-xs font-semibold text-orange-700 transition hover:text-orange-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}

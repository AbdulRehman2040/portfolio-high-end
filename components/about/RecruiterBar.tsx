"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

// Segment: mono, carbon on houselights; full inversion on hover AND keyboard
// focus via the .invert-hover utility (globals.css).
const SEG =
  "invert-hover flex items-center justify-center gap-1.5 py-5 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-carbon";

// Mobile 2×2 dividers + desktop 1×4 dividers, via per-index borders.
function borders(i: number) {
  return [
    "border-[var(--line-light)]",
    i % 2 === 1 ? "border-l" : "",
    i >= 2 ? "border-t" : "",
    "md:border-t-0",
    i > 0 ? "md:border-l" : "md:border-l-0",
  ].join(" ");
}

export function RecruiterBar() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Clipboard unavailable — still reflect intent to the user.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 grid grid-cols-2 border-y border-[var(--line-light)] md:mt-24 md:grid-cols-4">
      <a
        href={site.cvUrl}
        className={`${SEG} ${borders(0)}`}
        download
      >
        Download CV
        <span aria-hidden="true">↓</span>
      </a>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className={`${SEG} ${borders(1)}`}
      >
        GitHub
        <span aria-hidden="true">↗</span>
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${SEG} ${borders(2)}`}
      >
        LinkedIn
        <span aria-hidden="true">↗</span>
      </a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label="Copy email address"
        className={`${SEG} ${borders(3)}`}
      >
        <span aria-live="polite" className="inline-flex items-center gap-1.5">
          {copied ? (
            <>
              Copied
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-live"
              />
            </>
          ) : (
            "Copy Email"
          )}
        </span>
      </button>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Copies the site email to the clipboard and flips `copied` true for a
 * window, then back. Shared by the recruiter bar and the contact section.
 */
export function useCopyEmail(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Clipboard unavailable — still reflect intent to the user.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), resetMs);
  };

  return { copied, copy };
}

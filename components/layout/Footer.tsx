"use client";

import { useReducedMotion } from "motion/react";

export function Footer() {
  const reduce = useReducedMotion() ?? false;

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="border-t border-[var(--line-dark)] bg-backstage py-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="mono-label">© 2026 Abdul Rehman</span>
        <span className="mono-label">
          Designed &amp; built by Abdul Rehman — no templates.
        </span>
        <button
          type="button"
          onClick={toTop}
          className="group mono-label inline-flex items-center gap-1.5 self-start transition-colors duration-[var(--dur-fast)] hover:text-bone md:self-auto"
        >
          Top
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:-translate-y-[3px]"
          >
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS } from "./nav";
import { MobileMenu } from "./MobileMenu";

type TintStyle = CSSProperties & { ["--tint"]?: string };

export function Header() {
  const { activeId, activeTint } = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Solid/height transition only — active section is observer-driven elsewhere.
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Header carries the active chapter's tint, so nav underlines + hovers relight.
  const style: TintStyle = { ["--tint"]: activeTint };

  return (
    <motion.header
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={[
        "fixed inset-x-0 top-0 z-50 w-full",
        "transition-[background-color,height,border-color] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
        scrolled
          ? "h-16 border-b border-[var(--line-dark)] bg-backstage"
          : "h-20 border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Left — wordmark. Type is the mark; no logo, no monogram. */}
        <a
          href="#top"
          className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-bone"
          style={{ fontStretch: "125%" }}
        >
          Abdul Rehman
        </a>

        {/* Centre — desktop nav */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active ? "true" : undefined}
                className="group relative py-1 font-mono text-[11px] uppercase tracking-[0.14em] md:text-xs"
              >
                <span
                  className={
                    active
                      ? "text-bone"
                      : "text-dim transition-colors duration-[var(--dur-fast)] group-hover:text-bone"
                  }
                >
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--tint)]",
                    "transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </nav>

        {/* Right — availability + hire */}
        <div className="flex items-center gap-4 md:gap-5">
          <span className="hidden items-center gap-2 lg:flex">
            <span
              aria-hidden="true"
              className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-live"
            />
            <span className="mono-label">Open to work</span>
          </span>

          <div className="hidden md:block">
            <Button href="#contact" variant="ghost">
              Hire me
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

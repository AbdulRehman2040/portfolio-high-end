"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { site } from "@/lib/site";
import { NAV_LINKS } from "./nav";

const RAIL_LINKS = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the menu on open; return it to the trigger on close.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Escape closes; Tab is trapped within the overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.06 },
    },
  };

  const itemVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative grid h-11 w-11 place-items-center md:hidden"
      >
        <span className="relative block h-3 w-6">
          <span
            className={[
              "absolute left-0 block h-px w-6 bg-bone transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]",
              open ? "top-1/2 rotate-45" : "top-0",
            ].join(" ")}
          />
          <span
            className={[
              "absolute bottom-0 left-0 block h-px w-6 bg-bone transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]",
              open ? "bottom-1/2 -rotate-45" : "",
            ].join(" ")}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-backstage px-6 pb-10 pt-24 md:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-2"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${link.id}`}
                  onClick={close}
                  variants={itemVariants}
                  className="display text-[11vw] leading-[1.05] text-bone"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>

            <div className="flex flex-col gap-5">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-live"
                />
                <span className="mono-label">Open to work</span>
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {RAIL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group mono-label inline-flex items-center gap-1 transition-colors duration-[var(--dur-fast)] hover:text-bone"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

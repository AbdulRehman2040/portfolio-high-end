"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Button } from "@/components/ui/Button";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const reduce = useReducedMotion() ?? false;
  const { copied, copy } = useCopyEmail();

  const fade = (delay: number, duration = 0.55) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 } as const,
    transition: {
      duration: reduce ? 0.25 : duration,
      delay: reduce ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <Section
      id="contact"
      dataSection="contact"
      py="py-32 md:py-44"
      className="flex min-h-[80svh] flex-col justify-center"
    >
      <motion.div className="flex flex-wrap items-center gap-x-4 gap-y-2" {...fade(0)}>
        <MonoLabel>Contact</MonoLabel>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-live"
          />
          <span className="mono-label">Open to work</span>
        </span>
      </motion.div>

      <h2 className="display mt-6 text-[clamp(44px,7.5vw,150px)] leading-[0.9] text-bone">
        <MaskReveal reduce={reduce}>Have a role</MaskReveal>
        <MaskReveal reduce={reduce} delay={reduce ? 0 : 0.06}>
          or a project?
        </MaskReveal>
      </h2>

      {/* The closing move — the inbox is the final lit screen in the room. */}
      <motion.div className="mt-10" {...fade(0.1, 0.8)}>
        <span className="screenlight inline-block rounded-[var(--radius-frame)]">
          <a
            href={`mailto:${site.email}`}
            className="email-link group relative inline-block"
          >
            <span
              className="display block text-[clamp(24px,5vw,88px)] leading-[1.05] text-bone [overflow-wrap:anywhere]"
              style={{ textTransform: "lowercase" }}
            >
              {site.email}
            </span>
            <span
              aria-hidden="true"
              className="email-underline absolute -bottom-1 left-0 block h-0.5 w-full bg-[var(--tint)]"
            />
          </a>
        </span>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-wrap items-center gap-4"
        {...fade(0.18)}
      >
        <Button href={`mailto:${site.email}`} variant="primary">
          Email me
        </Button>
        <Button
          href={site.linkedin}
          variant="ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Button>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="inline-flex h-12 items-center px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:text-bone"
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
      </motion.div>
    </Section>
  );
}

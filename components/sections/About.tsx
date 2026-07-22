"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { RecruiterBar } from "@/components/about/RecruiterBar";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.4 } as const;

// TODO: Abdul to confirm/edit — especially location.
const FACTS = [
  { key: "Location", value: "[TODO]" },
  { key: "Focus", value: "React · Next.js · TypeScript" },
  { key: "Working With", value: "UK · USA · Remote" },
  { key: "Availability", value: "Open to roles & projects", live: true },
];

function fadeUp(reduce: boolean, delay: number) {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: reduce ? 0.25 : 0.55, delay: reduce ? 0 : delay, ease: EASE },
  };
}

function Portrait({ reduce }: { reduce: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)] border border-[var(--line-light)]">
      <motion.div
        className="h-full w-full"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: "8%" }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={VIEWPORT}
        transition={{ duration: reduce ? 0.25 : 0.8, ease: EASE }}
      >
        {failed ? (
          <div
            className="grid h-full w-full place-items-center"
            style={{
              background:
                "color-mix(in oklch, var(--color-carbon) 8%, var(--color-houselights))",
            }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-carbon/55">
              Portrait — TODO
            </span>
          </div>
        ) : (
          <Image
            src="/portrait.jpg"
            alt="Abdul Rehman"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            onError={() => setFailed(true)}
            className="object-cover grayscale transition-[filter] duration-[400ms] ease-[var(--ease-out)] group-hover:grayscale-0"
          />
        )}
      </motion.div>
    </div>
  );
}

export function About() {
  const reduce = useReducedMotion() ?? false;

  return (
    <Section light id="about" dataSection="about" py="py-28 md:py-40">
      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-10">
        {/* LEFT — portrait */}
        <div className="col-span-12 md:col-span-5">
          <Portrait reduce={reduce} />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-carbon/70">
            Abdul Rehman · [Location — TODO] · Remote
          </p>
        </div>

        {/* RIGHT — bio + facts */}
        <div className="col-span-12 min-w-0 md:col-span-7">
          <motion.div {...fadeUp(reduce, 0)}>
            <MonoLabel>About</MonoLabel>
          </motion.div>

          <h2 className="display mt-5 text-[clamp(22px,3.4vw,52px)] leading-[1.02] text-carbon [overflow-wrap:break-word] [text-wrap:balance]">
            <MaskReveal reduce={reduce} amount={0.4}>
              Developer mindset. Business understanding.
            </MaskReveal>
          </h2>

          <motion.p
            className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-carbon md:text-[18px]"
            {...fadeUp(reduce, 0.07)}
          >
            I&rsquo;m Abdul Rehman, a full-stack developer working with clients
            and teams in the UK, the US and beyond. I specialise in React,
            Next.js and TypeScript — building fast, modern, reliable products.
          </motion.p>
          <motion.p
            className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-carbon md:text-[18px]"
            {...fadeUp(reduce, 0.14)}
          >
            I care about the details users notice, the performance businesses
            depend on, and the communication that keeps projects moving.
          </motion.p>

          {/* Facts table */}
          <dl className="mt-10">
            {FACTS.map((fact, i) => (
              <div key={fact.key} className="relative py-4">
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-full origin-left bg-[var(--line-light)]"
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.07, ease: EASE }}
                />
                <div className="flex items-center justify-between gap-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-carbon/55">
                    {fact.key}
                  </dt>
                  <dd className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-carbon">
                    {fact.live && (
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-1.5 rounded-full bg-live"
                      />
                    )}
                    {fact.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Recruiter bar */}
      <motion.div {...fadeUp(reduce, 0.1)}>
        <RecruiterBar />
      </motion.div>
    </Section>
  );
}

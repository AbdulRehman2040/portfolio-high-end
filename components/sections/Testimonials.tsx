"use client";

import { motion, useReducedMotion } from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { testimonials, type Testimonial } from "@/lib/testimonials";

const EASE = [0.16, 1, 0.3, 1] as const;

function Rule({
  edge,
  reduce,
  delay,
}: {
  edge: "top" | "bottom";
  reduce: boolean;
  delay: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute left-0 ${edge === "top" ? "top-0" : "bottom-0"} h-px w-full origin-left bg-[var(--line-dark)]`}
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0 : 0.6, delay, ease: EASE }}
    />
  );
}

function Row({
  t,
  i,
  last,
  reduce,
}: {
  t: Testimonial;
  i: number;
  last: boolean;
  reduce: boolean;
}) {
  const delay = reduce ? 0 : i * 0.08;
  const stars = t.rating === 5 ? " · ★★★★★" : "";
  const attribution = `— ${t.name} · ${t.projectType} · ${t.country} · ${t.source}${stars}`;

  return (
    <div className="relative py-14 md:py-16">
      <Rule edge="top" reduce={reduce} delay={delay} />
      {last && <Rule edge="bottom" reduce={reduce} delay={delay} />}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduce ? 0.25 : 0.55, delay, ease: EASE }}
      >
        <div
          className={`md:col-span-6 ${i % 2 === 1 ? "md:col-start-4" : "md:col-start-1"}`}
        >
          {/* Archivo normal width — quotes don't shout. */}
          <p className="max-w-[28ch] font-sans text-[clamp(22px,2.6vw,34px)] font-medium leading-[1.35] text-bone">
            {t.quote}
          </p>
          <p className="mono-label mt-5">{attribution}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion() ?? false;

  // Invisible until real reviews exist — the section does not render at all.
  if (testimonials.length === 0) return null;

  return (
    <section aria-label="Client words" className="bg-backstage py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
        >
          <MonoLabel>Client Words</MonoLabel>
          <h2 className="display mt-5 text-[clamp(48px,8vw,120px)] leading-[0.92] text-bone">
            <MaskReveal reduce={reduce}>What Clients Say</MaskReveal>
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-20">
          {testimonials.map((t, i) => (
            <Row
              key={`${t.name}-${i}`}
              t={t}
              i={i}
              last={i === testimonials.length - 1}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

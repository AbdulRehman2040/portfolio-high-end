"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A hairline rule that draws itself left→right when scrolled into view. */
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
      className={`absolute left-0 ${
        edge === "top" ? "top-0" : "bottom-0"
      } h-px w-full origin-left bg-[var(--line-dark)]`}
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0 : 0.6, delay, ease: EASE }}
    />
  );
}

type SpecRowProps = {
  title: string;
  description: string;
  tech: string[];
  index: number;
  isLast: boolean;
  reduce: boolean;
};

/**
 * One line of the editorial spec sheet. No icons, no card — type only.
 * The top hairline DRAWS itself (scaleX from the left); hover shifts the
 * row bg backstage→iron and the tech list dim→bone. Nothing translates.
 */
export function SpecRow({
  title,
  description,
  tech,
  index,
  isLast,
  reduce,
}: SpecRowProps) {
  const delay = reduce ? 0 : index * 0.08;

  return (
    <div className="group relative transition-colors duration-[180ms] ease-[var(--ease-out)] md:hover:bg-iron">
      <Rule edge="top" reduce={reduce} delay={delay} />
      {isLast && <Rule edge="bottom" reduce={reduce} delay={delay} />}

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduce ? 0.25 : 0.55, delay, ease: EASE }}
        className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-10 md:py-12"
      >
        {/* Desktop — 12-col spec grid */}
        <div className="hidden grid-cols-12 items-start gap-x-10 md:grid">
          <h3 className="display col-span-5 text-[clamp(26px,3vw,44px)] leading-[1] text-bone">
            {title}
          </h3>
          <p className="col-span-4 max-w-[46ch] text-[17px] leading-relaxed text-bone">
            {description}
          </p>
          <ul className="col-span-3 flex flex-col gap-1 text-right">
            {tech.map((t) => (
              <li
                key={t}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors duration-[180ms] md:group-hover:text-bone"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile — stacked, tech as a single comma-separated line */}
        <div className="flex flex-col gap-4 md:hidden">
          <h3 className="display text-[clamp(26px,7vw,44px)] leading-[1.05] text-bone">
            {title}
          </h3>
          <p className="text-[17px] leading-relaxed text-bone">{description}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            {tech.join(" · ")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

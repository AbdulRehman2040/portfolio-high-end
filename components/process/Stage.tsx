"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type StageProps = {
  index: number;
  name: string;
  phase: string;
  description: string;
  /** True once the rail fill has passed this stage's node. */
  done: boolean;
  reduce: boolean;
};

/**
 * One pipeline stage. The node sits on the shared rail; its fill, the name
 * colour and the status chip all flip from `done`. No fake terminals, no
 * typing — the metaphor is the structure and the status markers.
 */
export function Stage({ index, name, phase, description, done, reduce }: StageProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative py-12 pl-10 md:py-16 md:pl-14">
      {/* Node on the rail */}
      <span
        aria-hidden="true"
        className={`absolute left-1 top-[3.75rem] block h-2 w-2 border transition-colors duration-[180ms] ease-[var(--ease-out)] md:left-2 md:top-[5rem] ${
          done ? "border-bone bg-bone" : "border-[var(--line-dark)] bg-transparent"
        }`}
      />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
        className="grid grid-cols-12 items-start gap-x-6 md:gap-x-10"
      >
        {/* Cols 2–6: label + name + phase */}
        <div className="col-span-12 md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            Stage {num}
          </p>
          <h3
            className={`display mt-2 text-[clamp(28px,3.2vw,52px)] leading-[1] transition-colors duration-[250ms] ease-[var(--ease-out)] ${
              done ? "text-bone" : "text-dim"
            }`}
          >
            {name}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            {phase}
          </p>
        </div>

        {/* Cols 7–10: description */}
        <p className="col-span-12 mt-4 max-w-[46ch] text-[17px] leading-relaxed text-bone md:col-span-4 md:mt-0">
          {description}
        </p>

        {/* Cols 11–12: status chip */}
        <div className="col-span-12 mt-4 md:col-span-3 md:mt-0 md:text-right">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span
              aria-hidden="true"
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                done ? "bg-live" : "border border-dim"
              }`}
            />
            <span className={done ? "text-bone" : "text-dim"}>
              {done ? "Done" : "Queued"}
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

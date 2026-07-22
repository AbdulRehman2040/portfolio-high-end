"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Stage } from "@/components/process/Stage";

const EASE = [0.16, 1, 0.3, 1] as const;

// TODO: Abdul to confirm/edit
const STAGES = [
  {
    key: "localhost",
    name: "Localhost",
    phase: "Discovery & design",
    description:
      "Requirements, structure and design direction agreed before a single line of code is written.",
  },
  {
    key: "build",
    name: "Build",
    phase: "Development",
    description:
      "The site or application is built — clean TypeScript, responsive from the first commit.",
  },
  {
    key: "staging",
    name: "Staging",
    phase: "Review & testing",
    description:
      "You review a live preview link. Devices, speed and accessibility get tested; anything not right gets fixed.",
  },
  {
    key: "production",
    name: "Production",
    phase: "Launch & support",
    description:
      "Deployed, monitored and handed over properly — with support after launch.",
  },
];

export function Process() {
  const reduce = useReducedMotion() ?? false;
  const railRef = useRef<HTMLDivElement>(null);

  // The one scroll-linked element on the site.
  // "end end" (target bottom meets viewport bottom) is always reachable —
  // even when Process is the last section and can't scroll its end to centre.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end end"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.0005,
  });

  const [doneCount, setDoneCount] = useState(0);
  useMotionValueEvent(fill, "change", (v) => {
    if (reduce) return;
    // Stage i is done once the fill passes (i + 0.5)/n. Monotonic in v, so
    // it flips once per direction and reverses cleanly on scroll-up.
    let n = 0;
    for (let i = 0; i < STAGES.length; i++) {
      if (v >= (i + 0.5) / STAGES.length) n = i + 1;
    }
    setDoneCount(n);
  });

  return (
    // Monochrome — no tint override. --color-live lives only in DONE dots.
    <section
      id="process"
      data-section="process"
      className="bg-backstage py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
        >
          <MonoLabel>Process</MonoLabel>
          <h2 className="display mt-5 text-[clamp(40px,6.5vw,104px)] leading-[0.95] text-bone [text-wrap:balance]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduce ? 0.25 : 0.7, ease: EASE }}
              >
                Localhost → Production
              </motion.span>
            </span>
          </h2>
          <p className="mt-5 text-[18px] text-dim">
            Every project moves through the same pipeline — and you see it at
            every stage.
          </p>
        </motion.div>

        <div ref={railRef} className="relative mt-14 md:mt-20">
          {/* Rail + scroll-linked fill */}
          <div className="absolute bottom-0 left-2 top-0 w-px bg-[var(--line-dark)] md:left-3">
            {reduce ? (
              <div className="h-full w-px bg-bone" />
            ) : (
              <motion.div
                className="h-full w-px origin-top bg-bone"
                style={{ scaleY: fill }}
              />
            )}
          </div>

          {STAGES.map((stage, i) => (
            <Stage
              key={stage.key}
              index={i}
              name={stage.name}
              phase={stage.phase}
              description={stage.description}
              done={reduce || i < doneCount}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

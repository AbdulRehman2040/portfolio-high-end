"use client";

import { motion, useReducedMotion } from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Chapter } from "@/components/work/Chapter";
import { projects } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Work() {
  const reduce = useReducedMotion() ?? false;

  return (
    // id="work" is the single anchor wrapping all chapters.
    <section id="work">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-24 md:px-10 md:pt-32">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
        >
          <MonoLabel>Selected Work · 01–06</MonoLabel>
          <h2 className="display mt-5 text-[clamp(48px,8vw,120px)] leading-[0.92] text-bone">
            Selected Work
          </h2>
          <p className="mt-5 text-[18px] text-dim">
            Real client projects, live in production.
          </p>
        </motion.div>
      </div>

      {projects.map((project, i) => (
        <Chapter key={project.slug} project={project} index={i + 1} />
      ))}
    </section>
  );
}

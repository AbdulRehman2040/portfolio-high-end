"use client";

import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { ScreenFrame } from "@/components/ScreenFrame";
import { Placard } from "@/components/Placard";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.35 } as const;

type PieceProps = {
  project: Project;
  index: number;
  reduce: boolean;
};

function fadeUp(reduce: boolean, delay: number, y = 16, dur = 0.5) {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: reduce ? 0.25 : dur, delay: reduce ? 0 : delay, ease: EASE },
  };
}

function Label({ project, index, reduce }: PieceProps) {
  return (
    <motion.div {...fadeUp(reduce, 0, 14)}>
      <MonoLabel index={index}>{project.category}</MonoLabel>
    </motion.div>
  );
}

function Title({ project, reduce }: PieceProps) {
  return (
    <h3 className="display mt-4 text-[clamp(36px,4.5vw,72px)] leading-[0.95] text-bone [text-wrap:balance]">
      <MaskReveal reduce={reduce} amount={0.35}>
        {project.title}
      </MaskReveal>
    </h3>
  );
}

function Summary({ project, reduce }: PieceProps) {
  return (
    <motion.p
      className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-bone md:text-[18px]"
      {...fadeUp(reduce, 0.1)}
    >
      {project.summary}
    </motion.p>
  );
}

function Tags({ project, reduce }: PieceProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.18 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.ul
      className="mt-6 flex flex-wrap gap-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {project.stack.map((tag) => (
        <motion.li
          key={tag}
          variants={item}
          transition={{ duration: reduce ? 0.25 : 0.4, ease: EASE }}
          className="rounded-[var(--radius-sm)] border border-[var(--line-dark)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
        >
          {tag}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function LiveButton({ project, reduce }: PieceProps) {
  return (
    <motion.div className="mt-8" {...fadeUp(reduce, 0.3)}>
      <Button href={project.liveUrl} variant="ghost">
        View live
      </Button>
    </motion.div>
  );
}

function Media({
  project,
  index,
  reduce,
  enableParallax,
}: PieceProps & { enableParallax: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Total travel capped at 4% of frame height (-2% → 2%).
  const parallax = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <div ref={ref} className="group/media">
      <motion.div {...fadeUp(reduce, 0, 28, 0.7)}>
        <motion.div style={enableParallax ? { y: parallax } : undefined}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — open live site`}
            className="block"
          >
            <ScreenFrame
              src={project.screenshot}
              alt={`${project.title} — ${project.category}`}
              title={project.title}
              hoverZoom
            />
          </a>
        </motion.div>
      </motion.div>

      <motion.div {...fadeUp(reduce, 0.15)}>
        <Placard
          index={index}
          title={project.title}
          category={project.category}
          liveUrl={project.liveUrl}
          linkedHover
          className="mt-4"
        />
      </motion.div>
    </div>
  );
}

export function Chapter({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const enableParallax = !isMobile && !reduce;

  // Even chapters (1-based) flip the columns for rhythm.
  const reversed = index % 2 === 0;
  const piece: PieceProps = { project, index, reduce };
  const tintStyle: CSSProperties = {
    ["--tint" as string]: project.tint,
  };

  return (
    <article
      data-section="work"
      data-tint={project.tint}
      style={tintStyle}
      className="py-20 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        {/* Desktop — sticky text + media column, alternating */}
        <div className="hidden grid-cols-12 items-start gap-x-10 md:grid">
          <div
            className={`col-span-5 self-start md:sticky md:top-28 ${
              reversed ? "order-2" : "order-1"
            }`}
          >
            <Label {...piece} />
            <Title {...piece} />
            <Summary {...piece} />
            <Tags {...piece} />
            <LiveButton {...piece} />
          </div>
          <div className={`col-span-7 ${reversed ? "order-1" : "order-2"}`}>
            <Media {...piece} enableParallax={enableParallax} />
          </div>
        </div>

        {/* Mobile — single column, fixed order */}
        <div className="flex flex-col md:hidden">
          <Label {...piece} />
          <Title {...piece} />
          <div className="mt-6">
            <Media {...piece} enableParallax={false} />
          </div>
          <Summary {...piece} />
          <Tags {...piece} />
          <LiveButton {...piece} />
        </div>
      </div>
    </article>
  );
}

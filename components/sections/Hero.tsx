"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Button } from "@/components/ui/Button";
import { ScreenFrame } from "@/components/ScreenFrame";
import { Placard } from "@/components/Placard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { projects } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;
const HERO = projects[0];
const STACK = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind"];
const NAME = ["Abdul", "Rehman"];

export function Hero() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const factor = isMobile ? 0.8 : 1;
  const [poweredOn, setPoweredOn] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  // Cursor-follow spring for the screen (desktop, fine pointer, motion on).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 140, damping: 18, mass: 0.4 });

  // Power-on: flip --tint to the flagship colour. Reduced motion → immediate
  // (delay 0). setState lives in the timer callback, never in the effect body.
  useEffect(() => {
    const id = window.setTimeout(
      () => setPoweredOn(true),
      reduce ? 0 : 1050 * factor,
    );
    return () => window.clearTimeout(id);
  }, [reduce, factor]);

  // Scroll cue disappears permanently once past 80px.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        setScrolledPast(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Idle depth — translation only, capped 6px, desktop + fine pointer only.
  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || !desktop) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx * 6);
      my.set(ny * 6);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  const t = (base: number) => base * factor;

  // Reduced motion: plain 0.25s fades in document order.
  const fade = (order: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.25, delay: order * 0.06 },
        }
      : null;

  const tintStyle: CSSProperties = {
    ["--tint" as string]: poweredOn ? HERO.tint : "var(--color-bone)",
  };

  return (
    <section
      className={`relative flex min-h-svh flex-col justify-center overflow-hidden ${
        reduce ? "" : "tint-transition"
      }`}
      style={tintStyle}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36">
        {/* 1 — eyebrow */}
        <motion.p
          className="mono-label"
          {...(fade(0) ?? {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: t(0.35), duration: 0.5, ease: EASE },
          })}
        >
          Full-Stack Developer · React / Next.js / TypeScript
        </motion.p>

        {/* 2 — name, masked reveal */}
        <h1 className="display mt-5 text-[clamp(48px,12.5vw,190px)] leading-[0.9] text-bone [text-wrap:balance]">
          {NAME.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={
                  reduce
                    ? { duration: 0.25, delay: 0.06 + i * 0.04 }
                    : { delay: t(0.45 + i * 0.09), duration: 0.75, ease: EASE }
                }
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* 3 — 12-col row */}
        <div className="mt-12 grid grid-cols-1 items-start gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* left: cols 1–5 */}
          <div className="col-span-12 md:col-span-5">
            <motion.p
              className="max-w-[42ch] text-[18px] leading-relaxed text-bone md:text-[20px]"
              {...(fade(1) ?? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: t(0.7), duration: 0.55, ease: EASE },
              })}
            >
              I design and build production web apps for companies in the UK and
              US. The work below is live.
            </motion.p>

            <div className="mt-8 flex flex-col gap-3 min-[380px]:flex-row md:gap-4">
              {[
                { label: "See the work", href: "#work", variant: "primary" as const },
                { label: "Hire me", href: "#contact", variant: "ghost" as const },
              ].map((b, i) => (
                <motion.div
                  key={b.href}
                  className="w-full flex-1 md:w-auto md:flex-none"
                  {...(fade(2 + i) ?? {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      delay: t(0.82 + i * 0.08),
                      duration: 0.5,
                      ease: EASE,
                    },
                  })}
                >
                  <Button href={b.href} variant={b.variant} className="w-full">
                    {b.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="mono-label mt-8"
              {...(fade(4) ?? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: t(0.94), duration: 0.5, ease: EASE },
              })}
            >
              {STACK.join(" · ")}
            </motion.p>
          </div>

          {/* right: cols 6–12 — the screen (LCP) */}
          <div className="col-span-12 md:col-span-7">
            <motion.div
              style={{ x: sx, y: sy }}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.03, filter: "brightness(0.4)" }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      filter: [
                        "brightness(0.4)",
                        "brightness(1.12)",
                        "brightness(1)",
                      ],
                    }
              }
              transition={
                reduce
                  ? { duration: 0.25, delay: 0.06 }
                  : {
                      delay: t(1.05),
                      duration: 0.7,
                      ease: EASE,
                      filter: { times: [0, 0.7, 1], delay: t(1.05), duration: 0.7 },
                    }
              }
            >
              <ScreenFrame
                src={HERO.screenshot}
                alt={`${HERO.title} — ${HERO.category}`}
                title={HERO.title}
                priority
              />
            </motion.div>

            <motion.div
              {...(fade(5) ?? {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: t(1.6), duration: 0.5, ease: EASE },
              })}
            >
              <Placard
                index={1}
                title={HERO.title}
                category={HERO.category}
                liveUrl={HERO.liveUrl}
                className="mt-4"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4 — scroll cue (desktop only) */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-6 hidden items-center gap-3 md:left-10 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolledPast ? 0 : 1 }}
          transition={{
            delay: scrolledPast ? 0 : t(1.95),
            duration: scrolledPast ? 0.35 : 0.5,
            ease: EASE,
          }}
        >
          <span className="mono-label">Scroll</span>
          <span className="relative block h-6 w-px overflow-hidden bg-[var(--line-dark)]">
            <motion.span
              className="absolute left-0 top-0 block h-2 w-px bg-bone"
              animate={{ y: [-8, 24] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </motion.div>
      )}
    </section>
  );
}

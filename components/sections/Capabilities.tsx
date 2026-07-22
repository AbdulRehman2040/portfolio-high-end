"use client";

import { motion, useReducedMotion } from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { SpecRow } from "@/components/capabilities/SpecRow";

const EASE = [0.16, 1, 0.3, 1] as const;

// TODO: Abdul to confirm/edit — no invented claims.
const AREAS = [
  {
    title: "Frontend Engineering",
    description:
      "Interfaces that are fast, responsive and precise — built to feel as good as they look.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "Full-Stack Applications",
    description:
      "Authentication, databases, dashboards, roles and reporting — applications built to run in production, not in a demo.",
    tech: ["Node.js", "MongoDB", "Postgres", "REST APIs", "Auth"],
  },
  {
    title: "Conversion Websites",
    description:
      "Business websites and landing pages designed around enquiries and sales, not decoration.",
    tech: ["WordPress", "Elementor", "Landing Pages", "SEO", "CRO"],
  },
  {
    title: "Integrations & Systems",
    description:
      "Third-party APIs, payments, communications and deployment, wired together properly.",
    tech: ["Twilio", "Payments", "APIs", "Vercel", "Automation"],
  },
];

export function Capabilities() {
  const reduce = useReducedMotion() ?? false;

  return (
    // Deliberately monochrome — no tint override. A rest between chapters.
    <section
      id="capabilities"
      data-section="capabilities"
      className="bg-backstage py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
        >
          <MonoLabel>Capabilities</MonoLabel>
          <h2 className="display mt-5 text-[clamp(48px,8vw,120px)] leading-[0.92] text-bone">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduce ? 0.25 : 0.7, ease: EASE }}
              >
                What I Build
              </motion.span>
            </span>
          </h2>
          <p className="mt-5 text-[18px] text-dim">
            Four areas, one standard: it ships and it works.
          </p>
        </motion.div>
      </div>

      <div className="mt-14 md:mt-20">
        {AREAS.map((area, i) => (
          <SpecRow
            key={area.title}
            {...area}
            index={i}
            isLast={i === AREAS.length - 1}
            reduce={reduce}
          />
        ))}
      </div>

      {/* Closing row */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
          className="flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-[46ch] text-[18px] text-bone">
            Something else in mind? If it runs on the web, I can build it.
          </p>
          <Button href="#contact" variant="ghost">
            Start a conversation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

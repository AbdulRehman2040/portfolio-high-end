"use client";

import { motion, useReducedMotion } from "motion/react";
import { Marquee } from "@/components/ui/Marquee";

const EASE = [0.16, 1, 0.3, 1] as const;

// Truthful claims only.
const CLAIMS = [
  "UK & USA Client Projects",
  "React & Next.js Specialist",
  "Full-Stack Production Apps",
  "5-Star Client Reviews",
  "Open to Remote Roles",
];

function ClaimItem({ label }: { label: string }) {
  return (
    <span className="flex items-center">
      {/* mono-label typography, controlled inline so 13px + hover colour win */}
      <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-dim transition-colors duration-[180ms] ease-[var(--ease-out)] group-hover/band:text-bone">
        {label}
      </span>
      {/* separator — 3px square in the tint (bone at root), rotated 45° */}
      <span
        aria-hidden="true"
        className="mx-8 inline-block h-[3px] w-[3px] rotate-45 bg-[var(--tint)]"
      />
    </span>
  );
}

export function Credibility() {
  const reduce = useReducedMotion();

  const items = CLAIMS.map((claim) => <ClaimItem key={claim} label={claim} />);

  return (
    <motion.section
      aria-label="Credibility"
      className="group/band border-y border-[var(--line-dark)] bg-backstage py-5 md:py-6"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE }}
    >
      <Marquee items={items} speed={45} pauseOnHover />
    </motion.section>
  );
}

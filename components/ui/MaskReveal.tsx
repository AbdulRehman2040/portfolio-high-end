"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type MaskRevealProps = {
  children: ReactNode;
  reduce: boolean;
  amount?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

/**
 * Line mask reveal. The whileInView trigger sits on the OUTER (unclipped)
 * wrapper — if it were on the translated inner span, the overflow-hidden
 * parent would clip that span to zero intersection and the observer would
 * never fire. Variants propagate the state down to the inner span.
 */
export function MaskReveal({
  children,
  reduce,
  amount = 0.5,
  duration = 0.7,
  delay = 0,
  className = "",
}: MaskRevealProps) {
  const inner: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { y: "110%" }, visible: { y: "0%" } };

  return (
    <motion.span
      className="block overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      <motion.span
        className={`block ${className}`}
        variants={inner}
        transition={{ duration: reduce ? 0.25 : duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

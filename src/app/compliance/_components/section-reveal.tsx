"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

type SectionRevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * SectionReveal
 * Lightweight wrapper that fades + lifts its children once on first scroll-in.
 * Used to give each compliance page section a consistent entry rhythm.
 */
export function SectionReveal({
  children,
  delay = 0,
  y = 18,
  className,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SectionReveal;

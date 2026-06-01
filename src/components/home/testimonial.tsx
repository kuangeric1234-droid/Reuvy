"use client";

import { motion } from "motion/react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

export function Testimonial() {
  return (
    <section className="wrap section">
      <div className="max-w-[880px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-serif text-[72px] leading-[0.5] text-[var(--color-blue)]"
        >
          ”
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="font-serif text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.28] tracking-[-0.015em] mt-6"
        >
          Ruevii is the first system that actually understands{" "}
          <em className="italic">Australian</em> cosmetic practice. Compliance stopped being a folder of
          PDFs and became part of how we work — and my front desk got their afternoons back.
        </motion.blockquote>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
          className="mt-8 flex items-center justify-center gap-[14px]"
        >
          <span className="w-[46px] h-[46px] rounded-full bg-[var(--color-greige)]" />
          <div className="text-left">
            <div className="font-semibold text-[15px]">Dr. Hannah Lane</div>
            <div className="font-mono text-[13px] text-[var(--color-charcoal)]">
              Founder · Lumière Aesthetics, Melbourne
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

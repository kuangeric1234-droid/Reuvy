"use client";

import { motion } from "motion/react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

export function FinalCTA() {
  return (
    <section id="pricing" className="bg-[var(--color-ink)] text-[#fafaf8] py-[130px] max-md:py-[80px] relative overflow-hidden">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,183,209,0.2), transparent 70%)",
        }}
      />
      <div className="wrap text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[clamp(38px,5.5vw,72px)] text-[#fafaf8] max-w-[18ch] mx-auto tracking-[-0.025em]"
        >
          See Ruevii in <em style={{ color: "var(--color-blue)" }}>your</em> clinic
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="mt-6 text-[#b9b6ad] text-[19px] max-w-[46ch] mx-auto"
        >
          A 30-minute walkthrough with someone who knows Australian aesthetics practice. We'll map
          it to how you actually work.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
          className="mt-10 flex gap-3 justify-center max-md:flex-col"
        >
          <motion.a
            href="#"
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="group inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-white text-black hover:bg-[#eceae5] transition-colors"
          >
            Book a demo
            <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-transparent border border-white/25 text-white hover:border-white/50 transition-colors"
          >
            View pricing
          </motion.a>
        </motion.div>
        <p className="mt-7 font-mono text-[12.5px] text-[#8a877f]">
          No lock-in contracts · Australian data residency · onboarding included
        </p>
      </div>
    </section>
  );
}

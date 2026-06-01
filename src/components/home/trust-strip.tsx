"use client";

import { motion } from "motion/react";

const LOGOS = [
  { name: "Lumière Aesthetics", style: "serif" },
  { name: "SKIN&CO", style: "sans" },
  { name: "Bayside Cosmetic", style: "serif" },
  { name: "FORM", style: "sans" },
  { name: "The Brow Clinic", style: "serif" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--color-greige)] bg-[var(--color-paper)]">
      <div className="wrap py-[30px] flex items-center gap-10 flex-wrap">
        <p className="text-[14px] text-[var(--color-charcoal)] max-w-[230px] leading-[1.45]">
          Built for Australian clinics.{" "}
          <b className="text-[var(--color-blue-ink)] font-semibold">AHPRA-compliant</b>{" "}
          consultations and S4 records, baked in.
        </p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="flex items-center gap-[38px] flex-wrap ml-auto max-md:ml-0 max-md:gap-[26px]"
        >
          {LOGOS.map((l) => (
            <motion.span
              key={l.name}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.61, 0.27, 1] } },
              }}
              className={`flex items-center gap-2 text-[19px] text-[#b4b1a8] ${
                l.style === "serif" ? "font-serif tracking-[-0.01em]" : "font-sans font-bold tracking-[-0.02em]"
              }`}
            >
              {l.style === "serif" && (
                <span className="w-4 h-4 rounded-[4px] border-[1.5px] border-[#c4c1b8]" aria-hidden />
              )}
              {l.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

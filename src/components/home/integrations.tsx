"use client";

import { motion } from "motion/react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

const TILES = [
  { letter: "S", name: "Stripe" },
  { letter: "T", name: "Tyro" },
  { letter: "X", name: "Xero" },
  { letter: "G", name: "Gmail" },
  { letter: "M", name: "Microsoft 365" },
  { letter: "∿", name: "Twilio SMS" },
];

export function Integrations() {
  return (
    <section className="border-t border-[var(--color-greige)] bg-[var(--color-paper)] section-sm">
      <div className="wrap grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-[60px] items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <h3 className="text-[clamp(24px,3vw,34px)]">
            Works with the tools your clinic <em>already uses</em>
          </h3>
          <p className="mt-4 text-[var(--color-charcoal)] text-[16px] max-w-[32ch]">
            Connect payments, inbox and accounting in a few clicks. Two-way sync, no exports.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {TILES.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              whileHover={{ y: -2 }}
              className="group border border-[var(--color-greige)] rounded-md bg-white px-[18px] py-5 flex items-center gap-3 text-[15px] font-medium transition-[border-color,transform] duration-200 hover:border-[color-mix(in_srgb,var(--color-blue)_70%,var(--color-white))]"
            >
              <span className="w-[30px] h-[30px] rounded-[7px] bg-[var(--color-greige-2)] border border-[var(--color-greige)] flex-none grid place-items-center font-mono text-[13px] text-[var(--color-charcoal)] transition-colors group-hover:border-[color-mix(in_srgb,var(--color-blue)_60%,var(--color-white))] group-hover:text-[var(--color-blue-ink)]">
                {t.letter}
              </span>
              {t.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

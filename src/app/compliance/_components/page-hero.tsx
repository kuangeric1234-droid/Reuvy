"use client";

import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, FileDown } from "lucide-react";
import { EyebrowTag, TwoToneHeadline } from "@/components/ui";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/**
 * PageHero
 * Compliance page hero. Light/paper background. EyebrowTag · TwoToneHeadline ·
 * subhead · two CTAs (primary solid black "Read the AHPRA brief (PDF)",
 * secondary outline "Book a demo"). Entry animation: tag fades first, headline
 * blurs in, subhead/CTAs settle below.
 */
export function PageHero() {
  return (
    <section className="wrap pt-[84px] pb-[64px] max-md:pt-14 max-md:pb-10">
      <div className="max-w-[60ch]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag icon={ShieldCheck}>AHPRA & Compliance</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-6"
        >
          <TwoToneHeadline
            as="h1"
            primary="Built for AU regulation."
            secondary="Not bolted on."
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="mt-7 text-[19px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]"
        >
          Ruevii ships with AHPRA-aligned workflows, an S4 dispensing register,
          consent enforcement and an immutable audit trail &mdash; out of the box.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch"
        >
          <motion.a
            href="#"
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors max-md:w-full"
          >
            <FileDown size={15} aria-hidden />
            Read the AHPRA brief (PDF)
          </motion.a>
          <motion.a
            href="/demo"
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="inline-flex items-center justify-center gap-[7px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-white border border-[var(--color-greige)] text-black hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)] transition-colors max-md:w-full"
          >
            Book a demo
            <ArrowRight size={15} aria-hidden />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;

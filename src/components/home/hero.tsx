"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";

const EASE = [0.21, 0.61, 0.27, 1] as const;

const ROTATING_WORDS = [
  "aesthetics clinic",
  "med spa",
  "skin & laser clinic",
  "injectable clinic",
  "cosmetic practice",
] as const;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const currentWord = ROTATING_WORDS[wordIndex];

  return (
    <section className="wrap pt-[84px] pb-[72px] text-center max-md:pt-14 max-md:pb-12">
      {/* Eyebrow tag */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex justify-center mb-[18px]"
      >
        <EyebrowTag icon={Sparkles}>RUEVII · ALL-IN-ONE CLINIC OS</EyebrowTag>
      </motion.div>

      {/* Trust pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
        className="inline-flex items-center gap-[10px] bg-white border border-[var(--color-greige)] rounded-full pl-2 pr-[14px] py-[7px] text-[13px] text-[var(--color-charcoal)] mb-[30px]"
      >
        <span className="flex">
          <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-[var(--color-greige)]" />
          <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-[color-mix(in_srgb,var(--color-blue)_60%,var(--color-greige))] -ml-[7px]" />
          <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-[var(--color-greige-2)] -ml-[7px]" />
        </span>
        Trusted by <b className="text-black font-semibold">340+ Australian clinics</b>
        <span aria-hidden className="w-[7px] h-[7px] rounded-full bg-[var(--color-blue)]" />
      </motion.div>

      {/* H1 with per-word stagger */}
      <motion.h1
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } } }}
        className="text-[clamp(40px,6vw,78px)] font-normal mx-auto max-w-[16ch] tracking-[-0.025em] leading-[1.02]"
      >
        {["The", "operating", "system", "for", "your"].map((w, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
            }}
            className="inline-block mr-[0.22em]"
          >
            {w}
          </motion.span>
        ))}

        {/* Rotating last word */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
          }}
          className="inline-flex align-baseline relative overflow-hidden"
          style={{
            // give the rotator enough room — sized to the longest phrase.
            minWidth: "12ch",
            verticalAlign: "baseline",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.em
              key={currentWord}
              initial={{ opacity: 0, y: "0.6em", filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.6em", filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="inline-block whitespace-nowrap"
              style={{
                fontStyle: "italic",
                color: "var(--color-blue-ink)",
                fontSize: "inherit",
                lineHeight: "inherit",
              }}
            >
              {currentWord}
            </motion.em>
          </AnimatePresence>
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="mx-auto mt-[26px] text-[20px] text-[var(--color-charcoal)] max-w-[52ch] leading-[1.5]"
      >
        Ruevii brings clinical records, AHPRA-compliant consults, bookings, payments and inventory
        into one calm, beautiful workspace — built natively for Australian injectable &amp; cosmetic
        clinics.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
        className="flex gap-3 justify-center mt-[34px] max-md:flex-col max-md:items-stretch"
      >
        <motion.a
          href="/demo"
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="group inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors"
        >
          Book a demo
          <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
        </motion.a>
        <motion.a
          href="#features"
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-white border border-[var(--color-greige)] text-black hover:border-[#cdcabf] transition-colors"
        >
          Take a product tour
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-[26px] flex items-center justify-center gap-[10px] text-[13.5px] text-[var(--color-charcoal)]"
      >
        <span className="text-black tracking-[2px] text-[12px]">★★★★★</span>
        <span>
          <b className="text-black font-semibold">4.9</b> from clinic owners · AHPRA-aligned by
          design
        </span>
      </motion.div>

      <HeroCarousel />
    </section>
  );
}

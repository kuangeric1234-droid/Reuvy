"use client";

import { motion } from "motion/react";
import { TwoToneHeadline } from "./two-tone-headline";

type CTA = { label: string; href: string };

type ClosingCTABandProps = {
  primary: string;
  secondary: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
};

const EASE = [0.21, 0.61, 0.27, 1] as const;

const DEFAULT_PRIMARY: CTA = { label: "Book a demo", href: "/demo" };
const DEFAULT_SECONDARY: CTA = { label: "See pricing", href: "/pricing" };

/**
 * ClosingCTABand
 * Global dark band rendered at the bottom of every marketing page, before
 * the footer. Centered TwoToneHeadline + two CTAs (primary white/black,
 * secondary outline-on-dark). Slow pulsing radial glow behind.
 */
export function ClosingCTABand({
  primary,
  secondary,
  ctaPrimary = DEFAULT_PRIMARY,
  ctaSecondary = DEFAULT_SECONDARY,
}: ClosingCTABandProps) {
  return (
    <section
      aria-label="Closing call to action"
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--color-ink)",
        color: "var(--color-white)",
      }}
    >
      {/* Slow pulsing radial glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.55, scale: 1 }}
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(155,183,209,0.18) 0%, rgba(155,183,209,0.06) 35%, rgba(15,15,14,0) 70%)",
        }}
      />

      <div className="wrap section relative">
        <div className="flex flex-col items-center text-center max-w-[28ch] mx-auto">
          <TwoToneHeadlineOnDark primary={primary} secondary={secondary} />

          <div className="flex flex-wrap items-center justify-center gap-3 mt-9 max-md:flex-col max-md:w-full">
            <motion.a
              href={ctaPrimary.href}
              whileHover={{ y: -1 }}
              whileTap={{ y: 1 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-white text-black hover:bg-white/90 transition-colors max-md:w-full"
            >
              {ctaPrimary.label}
              <span aria-hidden>→</span>
            </motion.a>
            <motion.a
              href={ctaSecondary.href}
              whileHover={{ y: -1 }}
              whileTap={{ y: 1 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-transparent border border-white/25 text-white hover:bg-white/[0.06] hover:border-white/40 transition-colors max-md:w-full"
            >
              {ctaSecondary.label}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Dark-mode variant of the two-tone headline used inside the band.
 * Line 1 white, line 2 dusty blue.
 */
function TwoToneHeadlineOnDark({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <h2
      className="font-serif font-normal text-[clamp(36px,5vw,68px)] leading-[1.04] tracking-[-0.025em] text-balance"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      <span className="block text-white">{primary}</span>
      <span className="block" style={{ color: "var(--color-blue)" }}>
        {secondary}
      </span>
    </h2>
  );
}

// re-export the standard TwoToneHeadline so consumers that import this file
// don't accidentally break their tree-shaking expectations.
export { TwoToneHeadline };

export default ClosingCTABand;

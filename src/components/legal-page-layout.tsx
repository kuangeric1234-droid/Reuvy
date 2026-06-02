"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { AlertTriangle } from "lucide-react";
import { EyebrowTag, TwoToneHeadline, ClosingCTABand } from "@/components/ui";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

export type LegalSection = {
  /** stable kebab-case slug used as the h2 id and TOC link */
  id: string;
  /** display label in TOC + h2 */
  label: string;
  /** Rendered prose body (paragraphs, lists, callouts) */
  body: ReactNode;
};

export type LegalPageLayoutProps = {
  /** Small eyebrow chip label e.g. "Privacy" */
  eyebrow: string;
  /** Two-tone headline lines */
  headlinePrimary: string;
  headlineSecondary: string;
  /** Subhead paragraph below the headline */
  subhead: ReactNode;
  /** Geist-mono "Last updated 2026-06-01" badge text */
  lastUpdated: string;
  /** Long-form sections — order is preserved */
  sections: LegalSection[];
  /** ClosingCTABand text */
  closing: {
    primary: string;
    secondary: string;
  };
};

/**
 * LegalPageLayout
 * Shared chassis used by /privacy, /terms and /security.
 * - SiteNav + light compact hero (eyebrow · two-tone headline · subhead · Last-updated mono badge)
 * - 2-col body: sticky table-of-contents on the left, long-form prose on the right
 *   The TOC highlights the section currently in view using IntersectionObserver.
 * - Sample-text callout pinned at the very top of the body so reviewers know it's a draft.
 * - ClosingCTABand + SiteFooter at the bottom.
 */
export function LegalPageLayout({
  eyebrow,
  headlinePrimary,
  headlineSecondary,
  subhead,
  lastUpdated,
  sections,
  closing,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-black">
      <SiteNav />

      <LegalHero
        eyebrow={eyebrow}
        headlinePrimary={headlinePrimary}
        headlineSecondary={headlineSecondary}
        subhead={subhead}
        lastUpdated={lastUpdated}
      />

      <LegalBody sections={sections} />

      <ClosingCTABand primary={closing.primary} secondary={closing.secondary} />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — light, compact                                                     */
/* -------------------------------------------------------------------------- */

function LegalHero({
  eyebrow,
  headlinePrimary,
  headlineSecondary,
  subhead,
  lastUpdated,
}: {
  eyebrow: string;
  headlinePrimary: string;
  headlineSecondary: string;
  subhead: ReactNode;
  lastUpdated: string;
}) {
  return (
    <section className="wrap pt-[72px] pb-[44px] max-md:pt-12 max-md:pb-8 border-b border-[var(--color-greige)]">
      <div className="max-w-[60ch]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag>{eyebrow}</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-5"
        >
          <TwoToneHeadline
            as="h1"
            primary={headlinePrimary}
            secondary={headlineSecondary}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="mt-6 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]"
        >
          {subhead}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
          className="mt-7"
        >
          <span
            className="inline-flex items-center gap-[8px] rounded-full bg-white border border-[var(--color-greige)] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] leading-none text-[var(--color-charcoal)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span
              aria-hidden
              className="w-[6px] h-[6px] rounded-full bg-[var(--color-blue-ink)]"
            />
            Last updated {lastUpdated}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Body — sticky TOC on the left, prose on the right                         */
/* -------------------------------------------------------------------------- */

function LegalBody({ sections }: { sections: LegalSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!rootRef.current) return;

    // Pick the topmost heading whose top has crossed an offset near the top
    // of the viewport. Avoids the IO-only race of multiple sections being
    // intersecting at once.
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const recompute = () => {
      const offset = 140; // a little below the sticky nav
      let current = headings[0].id;
      for (const h of headings) {
        const top = h.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = h.id;
        } else {
          break;
        }
      }
      setActive(current);
    };

    recompute();
    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
  }, [sections]);

  return (
    <section className="wrap pt-[56px] pb-[96px] max-md:pt-10 max-md:pb-16" ref={rootRef}>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-x-12 gap-y-10">
        {/* TOC */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <p
            className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            On this page
          </p>
          <nav aria-label="Section navigation">
            <ul className="flex flex-col">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id} className="relative">
                    <a
                      href={`#${s.id}`}
                      className={clsx(
                        "block py-[7px] pl-3 text-[13.5px] leading-snug transition-colors border-l",
                        isActive
                          ? "text-black border-[var(--color-blue-ink)] font-medium"
                          : "text-[var(--color-charcoal)] hover:text-black border-transparent",
                      )}
                    >
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Prose */}
        <article className="min-w-0 max-w-[68ch]">
          {/* Draft callout */}
          <div className="mb-10 flex items-start gap-3 rounded-lg border border-[color-mix(in_srgb,var(--color-blue)_45%,white)] bg-[color-mix(in_srgb,var(--color-blue)_10%,white)] px-4 py-3.5">
            <AlertTriangle
              size={16}
              aria-hidden
              className="mt-[3px] text-[var(--color-blue-ink)] shrink-0"
            />
            <p className="text-[13.5px] leading-[1.55] text-[var(--color-charcoal)]">
              <span className="font-medium text-black">Sample text — replace with your final policy before launch.</span>{" "}
              The content below is a working draft to give the page real shape; it has not been reviewed by Australian counsel.
            </p>
          </div>

          {sections.map((s, i) => (
            <Reveal key={s.id} delay={i === 0 ? 0 : 0.04}>
              <section
                aria-labelledby={s.id}
                className="scroll-mt-[110px] mb-14 last:mb-0"
              >
                <h2
                  id={s.id}
                  className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.12] tracking-[-0.02em] text-black mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {s.label}
                </h2>
                <div
                  className="text-[16px] leading-[1.7] text-[var(--color-charcoal)] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-black [&_strong]:font-medium [&_ul]:my-4 [&_ul]:pl-5 [&_li]:mb-2 [&_li]:list-disc [&_li]:marker:text-[var(--color-blue-ink)] [&_a]:text-black [&_a]:underline [&_a]:decoration-[var(--color-greige)] [&_a]:underline-offset-2 hover:[&_a]:decoration-[var(--color-blue-ink)]"
                >
                  {s.body}
                </div>
              </section>
            </Reveal>
          ))}
        </article>
      </div>
    </section>
  );
}

export default LegalPageLayout;

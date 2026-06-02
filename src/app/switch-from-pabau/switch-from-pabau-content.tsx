"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRightLeft,
  ChevronDown,
  ClipboardList,
  Database,
  GraduationCap,
  Rocket,
  Quote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import {
  ClosingCTABand,
  EyebrowTag,
  HighlightBlock,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

type Stage = {
  range: string;
  title: string;
  icon: LucideIcon;
  bullets: string[];
};

const STAGES: Stage[] = [
  {
    range: "Days 1–3",
    title: "Audit",
    icon: ClipboardList,
    bullets: [
      "Map your Pabau setup — services, staff, locations, payment flows",
      "Export your data and confirm what we can carry over",
      "Agree the cutover weekend & freeze a billing-safe migration plan",
    ],
  },
  {
    range: "Days 4–8",
    title: "Import",
    icon: Database,
    bullets: [
      "Migrate client records, appointment history & active memberships",
      "Move photo libraries, consent PDFs and form templates intact",
      "Reconcile balances, packages and outstanding payment plans",
    ],
  },
  {
    range: "Days 9–11",
    title: "Train",
    icon: GraduationCap,
    bullets: [
      "Hands-on team sessions — front desk, injectors, owner reporting",
      "Calendar, S4 register and Conversations walked through live",
      "Set up your AI Receptionist FAQs in your clinic&rsquo;s tone",
    ],
  },
  {
    range: "Days 12–14",
    title: "Cutover",
    icon: Rocket,
    bullets: [
      "Cutover Friday evening; Saturday-morning safety check with you on call",
      "Forward your numbers, redirect online bookings, decommission Pabau",
      "Two-week hyper-care window with your dedicated onboarding lead",
    ],
  },
];

const MIGRATE_BULLETS = [
  "Client records & complete patient history",
  "Past appointments with notes & attached photos",
  "Active memberships with their renewal dates",
  "Outstanding payment plans & remaining balances",
  "Before-and-after photo libraries (folder-tagged)",
  "Form templates & previously signed consents",
  "Staff accounts, roles & calendar permissions",
  "Service catalogue, durations & current pricing",
];

const REBUILD_BULLETS = [
  "S4 register configured from scratch with AHPRA-aligned fields",
  "Workflows tailored to how your clinic actually runs the day",
  "AI Receptionist trained with your tone, brand & FAQs",
  "Online booking widget styled to match your brand exactly",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can you handle multi-location?",
    a: "Yes. We&rsquo;ve migrated single-location clinics and groups of up to twelve sites. For multi-location, the audit phase runs slightly longer (4–5 days) but the rest of the timeline holds. Each location keeps its own calendar, inventory and S4 register, with consolidated reporting in the owner dashboard.",
  },
  {
    q: "What if my Pabau export is incomplete?",
    a: "It happens. Some Pabau exports omit photo attachments, custom-form responses or partial payment-plan history. We&rsquo;ll flag the gaps in the audit phase, pull what we can directly via the Pabau API, and where data truly isn&rsquo;t recoverable we&rsquo;ll either ingest it from PDFs or carry it across manually — at no extra cost.",
  },
  {
    q: "Do I lose appointment history?",
    a: "No. Past appointments come across with their notes, products used, photos attached and the practitioner who delivered them. The new appointments you book in Ruevii from cutover Saturday onward live alongside the historical ones in the same client record.",
  },
  {
    q: "How disruptive is the cutover weekend?",
    a: "Designed to be invisible to clients. We cut over Friday after your last appointment, run a Saturday-morning sanity check together, and your team walks into Monday on the new system. Your phone number and online booking URL keep working — they just route to Ruevii now.",
  },
  {
    q: "What about my existing memberships' next billing dates?",
    a: "Every active membership keeps its original next-billing date and the running balance of unused allowances. We move the Stripe customer object across so no one is asked to re-enter a card, and the first Ruevii-billed cycle lands on the same day Pabau would have charged.",
  },
  {
    q: "Can we run Pabau and Ruevii in parallel?",
    a: "For up to two weeks, yes — most clinics use this to compare reports side-by-side. We don&rsquo;t recommend longer parallel runs because dual data entry burns out the front desk fast. We&rsquo;ll cover your Pabau subscription during the overlap (up to 30 days).",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function SwitchFromPabauContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <SwitchHero />
        <TimelineSection />
        <MoveAndRebuildSection />
        <PricingDuringMigration />
        <Testimonial />
        <FAQSection />
        <ClosingCTABand
          primary="Fourteen days from now,"
          secondary="you could be on Ruevii."
          ctaPrimary={{ label: "Book a migration call", href: "/demo" }}
          ctaSecondary={{ label: "Compare Ruevii", href: "/compare" }}
        />
      </main>
      <SiteFooter />
      <CommandPalette />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Hero                                                                    */
/* -------------------------------------------------------------------------- */

function SwitchHero() {
  return (
    <section className="wrap pt-[84px] pb-[64px] max-md:pt-14 max-md:pb-10">
      <div className="max-w-[64ch]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag icon={ArrowRightLeft}>Migration</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-6"
        >
          <TwoToneHeadline
            as="h1"
            primary="From Pabau to Ruevii."
            secondary="In 14 days. Done for you."
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="mt-7 text-[19px] leading-[1.55] text-[var(--color-charcoal)] max-w-[60ch]"
        >
          Our AU onboarding crew handles the import, the staff training and the
          cutover weekend &mdash; so you keep treating clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-charcoal)] font-mono uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span>14-day plan</span>
          <Dot />
          <span>Zero double-billing</span>
          <Dot />
          <span>Sydney crew, on the phone</span>
        </motion.div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="w-[3px] h-[3px] rounded-full bg-[var(--color-mute)]"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Timeline                                                                */
/* -------------------------------------------------------------------------- */

function TimelineSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[60ch]">
            <EyebrowTag>The 14-day plan</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Four stages,"
              secondary="one quiet handover."
            />
            <p className="mt-2 text-[16.5px] leading-[1.6] text-[var(--color-charcoal)] max-w-[58ch]">
              No big-bang weekends. No spreadsheets. A dedicated lead from day
              one, a phased plan from day three, and a calendar your team
              actually trusts by day fourteen.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Desktop: horizontal timeline with connecting line */}
          <div className="hidden lg:block mt-16">
            <div className="relative">
              {/* connecting line */}
              <div
                aria-hidden
                className="absolute left-0 right-0 top-[22px] h-px"
                style={{
                  background:
                    "linear-gradient(to right, color-mix(in srgb, var(--color-blue) 35%, var(--color-greige)) 0%, color-mix(in srgb, var(--color-blue) 35%, var(--color-greige)) 100%)",
                }}
              />
              <ol className="relative grid grid-cols-4 gap-6">
                {STAGES.map((s, i) => (
                  <li key={s.title} className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span
                        className="relative z-10 inline-flex w-11 h-11 rounded-full items-center justify-center bg-white border border-[color-mix(in_srgb,var(--color-blue)_45%,var(--color-greige))] text-[var(--color-blue-ink)] shadow-[0_0_0_4px_var(--color-paper)]"
                        aria-hidden
                      >
                        <s.icon size={18} strokeWidth={1.6} />
                      </span>
                      <span
                        className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] leading-none"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Stage {i + 1}
                      </span>
                    </div>
                    <p
                      className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {s.range}
                    </p>
                    <h3
                      className="mt-1 font-serif text-[26px] leading-[1.1] tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {s.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[var(--color-charcoal)]"
                        >
                          <span
                            aria-hidden
                            className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
                            style={{ background: "var(--color-blue-ink)" }}
                          />
                          <span
                            className="text-black/85"
                            dangerouslySetInnerHTML={{ __html: b }}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Mobile / tablet: vertical stack */}
          <ol className="lg:hidden mt-12 flex flex-col gap-10 relative">
            <div
              aria-hidden
              className="absolute left-[21px] top-2 bottom-2 w-px"
              style={{
                background:
                  "color-mix(in srgb, var(--color-blue) 35%, var(--color-greige))",
              }}
            />
            {STAGES.map((s, i) => (
              <li key={s.title} className="relative pl-16">
                <span
                  className="absolute left-0 top-0 inline-flex w-11 h-11 rounded-full items-center justify-center bg-white border border-[color-mix(in_srgb,var(--color-blue)_45%,var(--color-greige))] text-[var(--color-blue-ink)]"
                  aria-hidden
                >
                  <s.icon size={18} strokeWidth={1.6} />
                </span>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] leading-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Stage {i + 1} · {s.range}
                </p>
                <h3
                  className="mt-2 font-serif text-[26px] leading-[1.1] tracking-[-0.02em] text-black"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {s.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-[var(--color-charcoal)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
                        style={{ background: "var(--color-blue-ink)" }}
                      />
                      <span
                        className="text-black/85"
                        dangerouslySetInnerHTML={{ __html: b }}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. What moves / what we set up fresh                                       */
/* -------------------------------------------------------------------------- */

function MoveAndRebuildSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[60ch]">
            <EyebrowTag>Carry over vs. rebuild</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="What moves with you,"
              secondary="and what we build fresh."
            />
            <p className="mt-2 text-[16.5px] leading-[1.6] text-[var(--color-charcoal)] max-w-[58ch]">
              Some things deserve to travel intact. Others deserve to be set up
              properly for AU practice on day one. Here&rsquo;s where we draw
              that line.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <StaggerItem>
            <HighlightBlock
              eyebrow="Data we migrate"
              title="What moves over"
              body="A complete clinical history, paid in full, parked alongside your new Ruevii records. No spreadsheet exports for your team to reconcile."
              bullets={MIGRATE_BULLETS}
            />
          </StaggerItem>
          <StaggerItem>
            <HighlightBlock
              eyebrow="Rebuilt, not copied"
              title="What we set up fresh"
              body="A few things are worth doing properly in Ruevii rather than carrying over assumptions from your old system. We&rsquo;ll do these in week two with your team."
              bullets={REBUILD_BULLETS}
            />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Pricing-during-migration callout                                        */
/* -------------------------------------------------------------------------- */

function PricingDuringMigration() {
  return (
    <section
      className="border-t border-[var(--color-greige)] section-sm"
      style={{ background: "var(--color-greige-2)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="rounded-[12px] border border-[color-mix(in_srgb,var(--color-blue)_35%,var(--color-greige))] bg-[color-mix(in_srgb,var(--color-blue)_6%,white)] p-8 md:p-12 grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            <div
              className="inline-flex w-14 h-14 rounded-full items-center justify-center bg-white border border-[color-mix(in_srgb,var(--color-blue)_35%,var(--color-greige))] text-[var(--color-blue-ink)] shrink-0"
              aria-hidden
            >
              <ArrowRightLeft size={22} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-3 max-w-[60ch]">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                No double-billing
              </p>
              <h3
                className="font-serif text-[clamp(24px,3vw,34px)] leading-[1.12] tracking-[-0.02em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                We cover your Pabau subscription during the migration weeks
                &mdash; up to 30 days.
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-[var(--color-charcoal)]">
                You won&rsquo;t pay twice for clinic software while we move you
                across. Send us the most recent Pabau invoice during onboarding
                and we&rsquo;ll credit your first Ruevii bill for the overlap
                period, up to 30 days.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Testimonial                                                             */
/* -------------------------------------------------------------------------- */

function Testimonial() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <figure className="max-w-[64ch] mx-auto text-center flex flex-col items-center">
            <Quote
              size={24}
              className="text-[var(--color-blue-ink)]"
              aria-hidden
            />
            <blockquote
              className="mt-6 font-serif text-[clamp(24px,3vw,34px)] leading-[1.25] tracking-[-0.015em] text-black"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <p>
                &ldquo;We&rsquo;d been on Pabau for three years and dreaded the
                idea of moving. The Ruevii team did the audit on a Tuesday,
                imported the lot by the second Friday, and our front desk
                didn&rsquo;t miss a single booking. The S4 register alone has
                given me back two evenings a week.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-1">
              <span
                className="font-serif text-[17px] tracking-[-0.01em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Dr. Imogen Whitfield
              </span>
              <span className="text-[13.5px] text-[var(--color-charcoal)]">
                Clinical Director, Whitfield Aesthetics
              </span>
              <span
                className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-mute)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Paddington, NSW · 2 locations
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. FAQ                                                                     */
/* -------------------------------------------------------------------------- */

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      className="border-t border-[var(--color-greige)] section"
      id="faq"
      style={{ background: "var(--color-greige-2)" }}
    >
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          {/* LEFT — header */}
          <div className="lg:sticky lg:top-32">
            <EyebrowTag className="mb-5">FAQ</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Migration"
              secondary="questions, answered."
            />
            <p className="mt-5 text-[15.5px] leading-[1.55] text-[var(--color-charcoal)] max-w-[40ch]">
              Six questions every Pabau clinic asks us before they switch. If
              yours isn&rsquo;t here, our onboarding lead is one email away.
            </p>
            <a
              href="mailto:onboarding@ruevii.com.au"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
            >
              onboarding@ruevii.com.au
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* RIGHT — accordion */}
          <ul className="flex flex-col">
            {FAQS.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <li
                  key={f.q}
                  className="border-b border-[var(--color-greige)] first:border-t"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 text-left py-6"
                  >
                    <span
                      className="font-serif text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] text-black"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.24, ease: EASE }}
                      className="shrink-0 inline-flex w-9 h-9 rounded-full items-center justify-center border border-[var(--color-greige)] bg-white text-[var(--color-charcoal)]"
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-7 pr-12 text-[15px] leading-[1.6] text-[var(--color-charcoal)] max-w-[62ch]"
                          dangerouslySetInnerHTML={{ __html: f.a }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SwitchFromPabauContent;

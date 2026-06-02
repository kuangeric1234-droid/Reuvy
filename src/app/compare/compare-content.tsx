"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  MapPin,
  Sparkles,
  Scale,
  ArrowRight,
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
/*  Matrix data                                                                */
/* -------------------------------------------------------------------------- */

type Cell =
  | { kind: "yes"; note?: string }
  | { kind: "no" }
  | { kind: "addon"; note?: string }
  | { kind: "partial"; note?: string };

type Row = {
  feature: string;
  detail?: string;
  ruevii: Cell;
  pabau: Cell;
  cliniko: Cell;
};

const yes = (note?: string): Cell => ({ kind: "yes", note });
const no: Cell = { kind: "no" };
const addon = (note?: string): Cell => ({ kind: "addon", note });
const partial = (note?: string): Cell => ({ kind: "partial", note });

const ROWS: Row[] = [
  {
    feature: "AHPRA-native compliance",
    detail: "Consent gating, prescriber sign-off, AU-aligned record retention",
    ruevii: yes("First-class"),
    pabau: partial("Configurable"),
    cliniko: partial("Configurable"),
  },
  {
    feature: "Australian data residency",
    detail: "Clinical data stored in Sydney (ap-southeast-2)",
    ruevii: yes("Sydney"),
    pabau: no,
    cliniko: yes("Sydney"),
  },
  {
    feature: "S4 controlled-substance register",
    detail: "Append-only register with batch, dose & wastage",
    ruevii: yes("Built-in"),
    pabau: partial("Stock module"),
    cliniko: no,
  },
  {
    feature: "AI command bar",
    detail: "Ctrl+K natural-language search & actions across the clinic",
    ruevii: yes("Ruevii AI"),
    pabau: no,
    cliniko: no,
  },
  {
    feature: "AI Receptionist (calls & SMS)",
    detail: "Answers missed calls, books, sends links 24/7",
    ruevii: yes("Included"),
    pabau: no,
    cliniko: no,
  },
  {
    feature: "AI Scribe for consult notes",
    detail: "Records consult, drafts a SOAP note for review",
    ruevii: yes("Included"),
    pabau: no,
    cliniko: no,
  },
  {
    feature: "Injectable charting",
    detail: "Face & body face-maps, dose, product, batch, technique",
    ruevii: yes("Native"),
    pabau: partial("Body charting"),
    cliniko: no,
  },
  {
    feature: "Pay-in-conversation",
    detail: "Send a Stripe link inside an SMS thread; lands in POS",
    ruevii: yes("Native"),
    pabau: no,
    cliniko: no,
  },
  {
    feature: "Memberships & recurring plans",
    ruevii: yes(),
    pabau: yes(),
    cliniko: addon("Via Mailchimp/3rd party"),
  },
  {
    feature: "Loyalty program",
    ruevii: yes(),
    pabau: yes(),
    cliniko: no,
  },
  {
    feature: "Reviews collection & moderation",
    ruevii: yes(),
    pabau: yes(),
    cliniko: addon("Via Podium/3rd party"),
  },
  {
    feature: "Lead CRM with AI scoring",
    detail: "Pipeline, saved views & AI-ranked enquiries",
    ruevii: yes("AI-scored"),
    pabau: yes("Manual"),
    cliniko: no,
  },
  {
    feature: "Calls with transcripts",
    detail: "In-app calling, recording, per-call AI summary",
    ruevii: yes("Beta"),
    pabau: addon("Twilio add-on"),
    cliniko: no,
  },
  {
    feature: "Online booking widget",
    ruevii: yes(),
    pabau: yes(),
    cliniko: yes(),
  },
  {
    feature: "Calendar with rooms & resources",
    ruevii: yes(),
    pabau: yes(),
    cliniko: yes(),
  },
  {
    feature: "Payments — Stripe + Tyro",
    detail: "Online checkout + in-clinic terminal",
    ruevii: yes("Stripe + Tyro"),
    pabau: partial("Stripe / GoCardless"),
    cliniko: partial("Stripe / Tyro AU"),
  },
  {
    feature: "Inventory with batch & expiry",
    ruevii: yes(),
    pabau: yes(),
    cliniko: no,
  },
  {
    feature: "Multi-location reporting",
    detail: "Owner dashboard across locations",
    ruevii: yes(),
    pabau: yes(),
    cliniko: partial("Per-business reports"),
  },
  {
    feature: "Public REST API",
    ruevii: yes(),
    pabau: yes(),
    cliniko: yes(),
  },
  {
    feature: "Webhooks",
    ruevii: yes(),
    pabau: partial(),
    cliniko: yes(),
  },
];

/* -------------------------------------------------------------------------- */
/*  Where-they-might-fit cards                                                 */
/* -------------------------------------------------------------------------- */

type WhereCard = {
  title: string;
  body: string;
  tag: string;
};

const HONEST_CARDS: WhereCard[] = [
  {
    tag: "UK / EU first",
    title: "If you need a UK or EU-first product",
    body:
      "Pabau is built in the UK and has deeper coverage of NHS-adjacent workflows, GDPR-on-paper artefacts and EU billing nuances. If most of your clinics are in London, Manchester or Dublin, that home-court advantage is real.",
  },
  {
    tag: "US ePrescribe",
    title: "If you need ePrescribe in the United States",
    body:
      "We do not transmit prescriptions to US pharmacies. Our prescribing pad is AHPRA-gated for Australian practice. If you need DEA-compliant ePrescribe, Surescripts integrations or US RxSafe workflows, look at a US-native EMR.",
  },
  {
    tag: "Multi-disciplinary",
    title: "If you primarily run physio or allied health",
    body:
      "Cliniko is exceptionally well-built for physiotherapy, osteopathy and multi-disciplinary allied health — body charts, exercise libraries and Medicare-adjacent claiming flows. We focus on cosmetic, injectable and aesthetic medicine.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function CompareContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <CompareHero />
        <MatrixSection />
        <WinsSection />
        <HonestSection />
        <MigrationFooter />
        <ClosingCTABand
          primary="See Ruevii for yourself,"
          secondary="on your own clinic data."
          ctaPrimary={{ label: "Book a demo", href: "/demo" }}
          ctaSecondary={{ label: "See pricing", href: "/pricing" }}
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

function CompareHero() {
  return (
    <section className="wrap pt-[84px] pb-[64px] max-md:pt-14 max-md:pb-10">
      <div className="max-w-[64ch]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag icon={ArrowLeftRight}>Compare</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-6"
        >
          <TwoToneHeadline
            as="h1"
            primary="How Ruevii compares."
            secondary="Honest tradeoffs, not marketing claims."
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="mt-7 text-[19px] leading-[1.55] text-[var(--color-charcoal)] max-w-[60ch]"
        >
          An honest look at how Ruevii stacks up against the practice software
          AU clinics commonly evaluate. We lead with what we do well — and tell
          you where someone else may suit you better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46, ease: EASE }}
          className="mt-8 flex items-center gap-[10px] text-[13px] text-[var(--color-charcoal)] font-mono uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Scale
            size={13}
            className="text-[var(--color-blue-ink)]"
            aria-hidden
          />
          <span>Updated quarterly</span>
          <span
            aria-hidden
            className="w-[3px] h-[3px] rounded-full bg-[var(--color-mute)]"
          />
          <span>Last review · Q2 2026</span>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Matrix                                                                  */
/* -------------------------------------------------------------------------- */

function CellChip({ cell }: { cell: Cell }) {
  if (cell.kind === "yes") {
    return (
      <span className="inline-flex items-center gap-[6px] rounded-full border border-[color-mix(in_srgb,var(--color-blue)_40%,white)] bg-[color-mix(in_srgb,var(--color-blue)_10%,white)] px-2.5 py-1 text-[12px] leading-none text-[var(--color-blue-ink)]">
        <Check
          size={12}
          strokeWidth={2.4}
          className="text-[var(--color-blue-ink)]"
          aria-hidden
        />
        <span className="font-medium">
          {cell.note ?? "Included"}
        </span>
      </span>
    );
  }
  if (cell.kind === "partial") {
    return (
      <span className="inline-flex items-center gap-[6px] rounded-full border border-[var(--color-greige)] bg-white px-2.5 py-1 text-[12px] leading-none text-[var(--color-charcoal)]">
        <Check
          size={12}
          strokeWidth={2}
          className="text-[var(--color-mute)]"
          aria-hidden
        />
        <span>{cell.note ?? "Partial"}</span>
      </span>
    );
  }
  if (cell.kind === "addon") {
    return (
      <span className="inline-flex items-center gap-[6px] rounded-full border border-[var(--color-greige)] bg-white px-2.5 py-1 text-[12px] leading-none text-[var(--color-charcoal)]">
        <Plus
          size={12}
          strokeWidth={2}
          className="text-[var(--color-mute)]"
          aria-hidden
        />
        <span>{cell.note ?? "Add-on"}</span>
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-[6px] text-[12px] leading-none text-[var(--color-mute)]"
      title="Not available"
    >
      <Minus size={14} strokeWidth={2} aria-hidden />
      <span className="sr-only">Not available</span>
    </span>
  );
}

function MatrixSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[60ch]">
            <EyebrowTag>Feature-by-feature</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Twenty features,"
              secondary="three honest scorecards."
            />
            <p className="mt-2 text-[16.5px] leading-[1.6] text-[var(--color-charcoal)] max-w-[58ch]">
              Where we have it, we say so. Where competitors do, we say so.
              Where something is an add-on or partial, we mark it that way. Where
              we don&rsquo;t know with confidence, we leave it blank rather than
              guess.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-[12px] border border-[var(--color-greige)] bg-white overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-end gap-4 px-6 py-5 border-b border-[var(--color-greige)] bg-[var(--color-greige-2)]">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Feature
              </span>
              <ColumnHead name="Ruevii" highlight />
              <ColumnHead name="Pabau" />
              <ColumnHead name="Cliniko" />
            </div>

            {/* Rows */}
            <ul className="flex flex-col">
              {ROWS.map((row) => (
                <li
                  key={row.feature}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 px-6 py-5 border-b last:border-b-0 border-[var(--color-greige)]"
                >
                  <div className="min-w-0 flex flex-col gap-1">
                    <span className="text-[14.5px] leading-[1.35] text-black">
                      {row.feature}
                    </span>
                    {row.detail && (
                      <span className="text-[12.5px] leading-[1.45] text-[var(--color-charcoal)]">
                        {row.detail}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-start">
                    <CellChip cell={row.ruevii} />
                  </div>
                  <div className="flex justify-start">
                    <CellChip cell={row.pabau} />
                  </div>
                  <div className="flex justify-start">
                    <CellChip cell={row.cliniko} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 px-6 py-4 border-t border-[var(--color-greige)] bg-[var(--color-paper)]">
              <LegendItem>
                <CellChip cell={yes("Included")} />
                <span>Native &amp; ready</span>
              </LegendItem>
              <LegendItem>
                <CellChip cell={partial()} />
                <span>Partial / via module</span>
              </LegendItem>
              <LegendItem>
                <CellChip cell={addon()} />
                <span>Add-on or 3rd-party</span>
              </LegendItem>
              <LegendItem>
                <CellChip cell={no} />
                <span>Not available / unknown</span>
              </LegendItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ColumnHead({ name, highlight }: { name: string; highlight?: boolean }) {
  return (
    <span
      className={[
        "font-serif text-[18px] leading-none tracking-[-0.01em]",
        highlight ? "text-black" : "text-[var(--color-charcoal)]",
      ].join(" ")}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {name}
      {highlight && (
        <span
          className="ml-2 inline-flex align-middle font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          · us
        </span>
      )}
    </span>
  );
}

function LegendItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] text-[var(--color-charcoal)]">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Where Ruevii wins                                                       */
/* -------------------------------------------------------------------------- */

type Win = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  icon: LucideIcon;
};

const WINS: Win[] = [
  {
    eyebrow: "Won on day one",
    title: "AHPRA-native, not configurable",
    body:
      "We didn't translate a US EMR. The S4 register, consent gating, prescriber sign-off and append-only audit log are first-class objects in the database — not toggles a consultant has to wire up for you.",
    bullets: [
      "S4 register with batch, dose & wastage",
      "Consent enforcement blocks treatment until signed",
      "Append-only audit log on every clinical action",
    ],
    icon: ShieldCheck,
  },
  {
    eyebrow: "Built where you practice",
    title: "Australian-made, Sydney-resident",
    body:
      "Built in Surry Hills, supported in AU business hours, and stored in AWS Sydney (ap-southeast-2). No clinical data leaves Australia. Our onboarding crew has stood on the clinic floor.",
    bullets: [
      "AU data residency · ap-southeast-2",
      "Sydney support, AU business hours",
      "Onboarding by people who&apos;ve run clinics",
    ],
    icon: MapPin,
  },
  {
    eyebrow: "Not bolted on",
    title: "Genuinely AI-native",
    body:
      "Ruevii AI is the command bar (Ctrl+K), the receptionist that answers your missed calls, the scribe that drafts your consult note, and the auto-reply that closes a booking at 11pm. One model running through one product.",
    bullets: [
      "Ruevii AI command bar — ask anything",
      "AI Receptionist for calls & SMS",
      "AI Scribe drafts SOAP notes from consult audio",
    ],
    icon: Sparkles,
  },
];

function WinsSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[58ch]">
            <EyebrowTag>Where Ruevii wins</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Three reasons"
              secondary="AU clinics choose us."
            />
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 grid-cols-1 lg:grid-cols-3">
          {WINS.map((w) => (
            <StaggerItem key={w.title}>
              <HighlightBlock
                eyebrow={w.eyebrow}
                title={
                  <span className="flex items-start gap-3">
                    <span
                      className="mt-1 inline-flex w-9 h-9 shrink-0 rounded-full items-center justify-center border border-[var(--color-greige)] bg-[var(--color-paper)] text-[var(--color-blue-ink)]"
                      aria-hidden
                    >
                      <w.icon size={16} strokeWidth={1.75} />
                    </span>
                    <span>{w.title}</span>
                  </span>
                }
                body={w.body}
                bullets={w.bullets}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Being honest section                                                    */
/* -------------------------------------------------------------------------- */

function HonestSection() {
  return (
    <section
      className="border-t border-[var(--color-greige)] section"
      style={{ background: "var(--color-greige-2)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-end">
            <div className="flex flex-col gap-4 max-w-[44ch]">
              <EyebrowTag>Being honest</EyebrowTag>
              <TwoToneHeadline
                as="h2"
                primary="Where they might"
                secondary="be a better fit."
              />
            </div>
            <p className="text-[17px] leading-[1.65] text-[var(--color-charcoal)] max-w-[52ch]">
              We&rsquo;d rather lose a deal than win one we can&rsquo;t serve.
              If any of these are true for your clinic, talk to us anyway — we
              may still be a fit, but we&rsquo;ll tell you straight.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 grid-cols-1 md:grid-cols-3">
          {HONEST_CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <article className="flex flex-col h-full rounded-lg bg-white border border-[var(--color-greige)] p-7">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] leading-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c.tag}
                </p>
                <h3
                  className="mt-5 font-serif text-[22px] leading-[1.2] tracking-[-0.015em] text-black"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-[var(--color-charcoal)]">
                  {c.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Migration footer                                                        */
/* -------------------------------------------------------------------------- */

function MigrationFooter() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section-sm">
      <div className="wrap">
        <Reveal>
          <div className="rounded-[12px] border border-[var(--color-greige)] bg-white p-8 md:p-10 grid lg:grid-cols-[1.2fr_auto] gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-3 max-w-[56ch]">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Already on Pabau or Cliniko?
              </p>
              <h3
                className="font-serif text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-0.02em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Move to Ruevii in 14 days — handled by our Sydney crew.
              </h3>
              <p className="text-[15.5px] leading-[1.55] text-[var(--color-charcoal)]">
                We&rsquo;ll audit your current setup, import the data we can,
                rebuild the parts that need rebuilding, and run cutover weekend
                with you on the phone — so you keep treating clients.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href="/switch-from-pabau"
                className="inline-flex items-center justify-center gap-2 text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[var(--color-ink-soft)] transition-colors"
              >
                See the 14-day plan
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center text-[14px] leading-none text-[var(--color-charcoal)] hover:text-black transition-colors"
              >
                Or book a demo first
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CompareContent;

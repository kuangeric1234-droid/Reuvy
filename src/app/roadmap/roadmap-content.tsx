"use client";

import { motion } from "motion/react";
import {
  ScrollText,
  Vote,
  Sparkles,
  CheckCircle2,
  Hammer,
  Compass,
  ArrowRight,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import {
  ClosingCTABand,
  EyebrowTag,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

type Category = "Feature" | "Improvement" | "Infra" | "Compliance";

type RoadmapItem = {
  title: string;
  desc: string;
  category: Category;
  target?: string; // for in-progress only
};

// Shipped — pulled from feature-inventory ✅ items
const SHIPPED: RoadmapItem[] = [
  {
    title: "Pay in Conversation",
    desc: "Send a Stripe link inside any SMS thread — payment lands straight in POS.",
    category: "Feature",
  },
  {
    title: "AI Receptionist",
    desc: "Missed calls and after-hours texts answered, triaged, and booked 24/7.",
    category: "Feature",
  },
  {
    title: "Injectable Charting",
    desc: "Face & body face-map plotting with dose, product, batch and depth.",
    category: "Feature",
  },
  {
    title: "S4 Drug Register",
    desc: "Controlled-substance dispensing log with append-only audit trail.",
    category: "Compliance",
  },
  {
    title: "Consent Enforcement",
    desc: "Block treatment until consent is signed — plaintiff-proof at the database level.",
    category: "Compliance",
  },
  {
    title: "AI Scribe",
    desc: "Record the consult, auto-draft a SOAP note for clinician review.",
    category: "Feature",
  },
  {
    title: "Memberships & Packages",
    desc: "Recurring billing, prepaid bundles and session redemption.",
    category: "Feature",
  },
  {
    title: "Visual Automations",
    desc: "Branching workflow builder with an AI assistant for first-draft flows.",
    category: "Improvement",
  },
];

// In progress — 🟡 items from inventory + adjacent realistic in-flight work
const IN_PROGRESS: RoadmapItem[] = [
  {
    title: "Calls — transcripts & AI summaries",
    desc: "In-app calling with recordings, full transcripts, and a per-call AI summary block.",
    category: "Feature",
    target: "JUL 2026",
  },
  {
    title: "Check-In Hub",
    desc: "One-screen front-desk arrival flow with live queue and room status.",
    category: "Feature",
    target: "AUG 2026",
  },
  {
    title: "Outbound email inbox UI",
    desc: "Compose, send and thread two-way clinic email alongside SMS in the unified inbox.",
    category: "Feature",
    target: "SEP 2026",
  },
  {
    title: "AI Letters refinements",
    desc: "Tone presets, GP-specific templates, and clinician-style learning for letters.",
    category: "Improvement",
    target: "JUL 2026",
  },
  {
    title: "Apple Wallet membership card",
    desc: "Issue branded Wallet passes for memberships, packages and visit credits.",
    category: "Feature",
    target: "OCT 2026",
  },
  {
    title: "Background-job platform v2",
    desc: "New worker pool for faster bulk SMS, report generation and inventory sync.",
    category: "Infra",
    target: "AUG 2026",
  },
];

// Planned — 6 plausible upcoming items
const PLANNED: RoadmapItem[] = [
  {
    title: "Native iOS app for clinicians",
    desc: "Calendar, charting and photos on iPhone — built for the treatment room.",
    category: "Feature",
  },
  {
    title: "Cliniko one-click migration",
    desc: "Self-serve importer for clients, appointments, notes and invoices.",
    category: "Improvement",
  },
  {
    title: "Marketing automation v2",
    desc: "Multi-channel journeys, segmentation editor, and revenue attribution.",
    category: "Feature",
  },
  {
    title: "Patient family accounts",
    desc: "Linked profiles, shared payment methods and consent for related patients.",
    category: "Feature",
  },
  {
    title: "GST quarter-close report",
    desc: "BAS-ready exports with GST splits per location and tax-code reconciliation.",
    category: "Compliance",
  },
  {
    title: "OAuth for partners",
    desc: "App marketplace and third-party OAuth scopes for integrations and tools.",
    category: "Infra",
  },
];

// Changelog teaser — 5 dated entries around May–June 2026
type ChangelogEntry = {
  date: string;
  version: string;
  body: string;
};
const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-06-01",
    version: "v2.18.0",
    body: "Pay in Conversation — Stripe links now embed inline in SMS threads with auto-receipt.",
  },
  {
    date: "2026-05-23",
    version: "v2.17.2",
    body: "Calendar drag-and-drop is 3x faster on multi-location workspaces.",
  },
  {
    date: "2026-05-14",
    version: "v2.17.0",
    body: "AI Scribe now drafts AHPRA-style cosmetic consult notes in under 6 seconds.",
  },
  {
    date: "2026-05-02",
    version: "v2.16.4",
    body: "S4 register: bulk-dispensing UI plus CSV export for end-of-week reconciliation.",
  },
  {
    date: "2026-04-21",
    version: "v2.16.0",
    body: "Ruevii AI command bar (Ctrl+K) shipped — ask the clinic anything, run actions.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function RoadmapContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <RoadmapHero />
        <ColumnsSection />
        <VotingBand />
        <ChangelogTeaser />
        <ClosingCTABand
          primary="Built in the open."
          secondary="Shipped on a two-week cadence."
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

function RoadmapHero() {
  return (
    <section className="wrap pt-[84px] pb-[64px] max-md:pt-14 max-md:pb-10">
      <div className="max-w-[64ch]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag icon={ScrollText}>Roadmap</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-6"
        >
          <TwoToneHeadline
            as="h1"
            primary="What's shipping next."
            secondary="Updated every two weeks."
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="mt-7 text-[19px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]"
        >
          Our public roadmap &mdash; voted by the clinics that pay us. No
          stealth features, no surprise pricing tiers, no &ldquo;coming
          soon&rdquo; that never lands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46, ease: EASE }}
          className="mt-8 flex items-center gap-[10px] text-[12px] text-[var(--color-charcoal)] font-mono uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span aria-hidden className="w-[6px] h-[6px] rounded-full bg-[var(--color-blue-ink)]" />
          <span>Last refreshed 2026-06-02</span>
          <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-[var(--color-mute)]" />
          <span>Next refresh 2026-06-16</span>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Three columns                                                           */
/* -------------------------------------------------------------------------- */

type ColumnDef = {
  key: "shipped" | "in-progress" | "planned";
  label: string;
  blurb: string;
  icon: typeof CheckCircle2;
  items: RoadmapItem[];
  accent: "sage" | "blue" | "sand";
};

const COLUMNS: ColumnDef[] = [
  {
    key: "shipped",
    label: "Shipped",
    blurb: "Live in production for every clinic on Ruevii.",
    icon: CheckCircle2,
    items: SHIPPED,
    accent: "sage",
  },
  {
    key: "in-progress",
    label: "In progress",
    blurb: "On the workbench. Targets are best estimates, not promises.",
    icon: Hammer,
    items: IN_PROGRESS,
    accent: "blue",
  },
  {
    key: "planned",
    label: "Planned",
    blurb: "Scoped and committed for the next two quarters.",
    icon: Compass,
    items: PLANNED,
    accent: "sand",
  },
];

// Accent dot tones per column header
const COLUMN_DOT: Record<ColumnDef["accent"], string> = {
  sage: "#4a8b6a",
  blue: "var(--color-blue-ink)",
  sand: "#c08d3f",
};

// Category badge tones
const CATEGORY_STYLE: Record<Category, { bg: string; fg: string; border: string }> = {
  Feature: {
    bg: "color-mix(in srgb, var(--color-blue) 16%, white)",
    fg: "var(--color-blue-ink)",
    border: "color-mix(in srgb, var(--color-blue) 36%, white)",
  },
  Improvement: {
    bg: "var(--color-greige-2)",
    fg: "var(--color-charcoal)",
    border: "var(--color-greige)",
  },
  Infra: {
    bg: "#eceae3",
    fg: "#7a6a3f",
    border: "#dcd6c4",
  },
  Compliance: {
    bg: "#e2ece4",
    fg: "#3e6e54",
    border: "#cadccf",
  },
};

function ColumnsSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {COLUMNS.map((col, idx) => (
            <Reveal key={col.key} delay={idx * 0.08}>
              <RoadmapColumn col={col} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapColumn({ col }: { col: ColumnDef }) {
  return (
    <div className="flex flex-col">
      {/* Column header */}
      <div className="flex items-baseline justify-between gap-3 pb-4 border-b border-[var(--color-greige)]">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="w-[10px] h-[10px] rounded-full shrink-0"
            style={{ background: COLUMN_DOT[col.accent] }}
          />
          <h2
            className="font-serif text-[26px] tracking-[-0.01em] text-black leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {col.label}
          </h2>
        </div>
        <span
          className="text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--color-mute)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {col.items.length} items
        </span>
      </div>

      <p className="mt-3 text-[13.5px] text-[var(--color-charcoal)] leading-[1.55] max-w-[36ch]">
        {col.blurb}
      </p>

      {/* Card stack */}
      <Stagger className="mt-6 flex flex-col gap-3" stagger={0.05}>
        {col.items.map((item) => (
          <StaggerItem key={item.title} y={12}>
            <RoadmapCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const cat = CATEGORY_STYLE[item.category];
  return (
    <article
      className="group flex flex-col gap-2 rounded-lg bg-white border border-[var(--color-greige)] p-[18px] transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="font-serif text-[17px] leading-[1.25] tracking-[-0.005em] text-black"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {item.title}
        </h3>
        {item.target && (
          <span
            className="shrink-0 inline-flex items-center text-[10.5px] font-mono uppercase tracking-[0.14em] px-2 py-1 rounded-md border"
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--color-paper)",
              color: "var(--color-blue-ink)",
              borderColor: "color-mix(in srgb, var(--color-blue) 36%, white)",
            }}
          >
            {item.target}
          </span>
        )}
      </div>

      <p className="text-[13.5px] leading-[1.55] text-[var(--color-charcoal)]">
        {item.desc}
      </p>

      <div className="mt-1 flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center text-[10.5px] font-mono uppercase tracking-[0.14em] px-2 py-1 rounded-md border"
          style={{
            fontFamily: "var(--font-mono)",
            background: cat.bg,
            color: cat.fg,
            borderColor: cat.border,
          }}
        >
          {item.category}
        </span>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Voting band                                                             */
/* -------------------------------------------------------------------------- */

function VotingBand() {
  return (
    <section
      className="border-t border-[var(--color-greige)] section-sm"
      style={{ background: "var(--color-greige-2)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-4 max-w-[52ch]">
              <EyebrowTag icon={Vote}>Vote with your usage</EyebrowTag>
              <TwoToneHeadline
                as="h2"
                primary="Roadmap by clinic vote,"
                secondary="not loudest customer in the room."
              />
              <p className="mt-3 text-[16.5px] leading-[1.6] text-[var(--color-charcoal)] max-w-[50ch]">
                We prioritise by clinic vote and adoption &mdash; every Ruevii
                admin can upvote roadmap items in-app, and we weigh votes by how
                often a workspace actually touches the surrounding workflows.
              </p>

              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <motion.a
                  href="#"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="inline-flex items-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors"
                >
                  Open roadmap board
                  <ArrowRight size={15} aria-hidden />
                </motion.a>
                <a
                  href="mailto:product@ruevii.com.au"
                  className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-transparent border border-[var(--color-greige)] text-black hover:border-[#cdcabf] transition-colors"
                >
                  Email a feature request
                </a>
              </div>
            </div>

            {/* Decorative vote tally card */}
            <VoteTallyMock />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VoteTallyMock() {
  const rows = [
    { label: "Native iOS app", votes: 312, pct: 92 },
    { label: "Cliniko migration", votes: 248, pct: 73 },
    { label: "Patient family accounts", votes: 196, pct: 58 },
    { label: "Marketing automation v2", votes: 174, pct: 51 },
    { label: "Apple Wallet pass", votes: 152, pct: 45 },
  ];
  return (
    <div className="relative rounded-xl border border-[var(--color-greige)] bg-white p-5 shadow-[0_24px_60px_-30px_rgba(15,29,43,0.18)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--color-blue-ink)]" aria-hidden />
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Top votes · this fortnight
          </span>
        </div>
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-mute)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          340 clinics
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {rows.map((r) => (
          <li key={r.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] text-black leading-tight">{r.label}</span>
              <span
                className="font-mono text-[11px] text-[var(--color-charcoal)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {r.votes}
              </span>
            </div>
            <div className="h-[6px] rounded-full bg-[var(--color-greige-2)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${r.pct}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="h-full rounded-full"
                style={{ background: "var(--color-blue-ink)" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Changelog teaser                                                        */
/* -------------------------------------------------------------------------- */

function ChangelogTeaser() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="flex flex-col gap-3 max-w-[48ch]">
              <EyebrowTag icon={Sparkles}>Recent releases</EyebrowTag>
              <TwoToneHeadline
                as="h2"
                primary="Five weeks of changes,"
                secondary="straight from the changelog."
              />
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-[6px] text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
            >
              Full changelog
              <ArrowRight size={14} aria-hidden />
            </a>
          </div>
        </Reveal>

        <Stagger className="mt-12 flex flex-col">
          {CHANGELOG.map((c, idx) => (
            <StaggerItem key={c.version} y={10}>
              <article
                className={[
                  "group grid gap-4 py-6 grid-cols-[140px_120px_1fr] max-md:grid-cols-1 max-md:gap-1.5 items-baseline",
                  idx === 0 ? "border-t border-[var(--color-greige)]" : "",
                  "border-b border-[var(--color-greige)]",
                ].join(" ")}
              >
                <span
                  className="font-mono text-[12.5px] tracking-[0.04em] text-[var(--color-charcoal)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c.date}
                </span>
                <span
                  className="font-mono text-[12.5px] tracking-[0.04em] text-[var(--color-blue-ink)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c.version}
                </span>
                <p className="text-[16px] leading-[1.55] text-black max-w-[68ch]">
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

export default RoadmapContent;

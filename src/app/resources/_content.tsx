"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  LifeBuoy,
  Code2,
  ArrowUpRight,
  Clock,
  Download,
  Users,
  Building2,
  Handshake,
  type LucideIcon,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { EyebrowTag, TwoToneHeadline, ClosingCTABand } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* ---------- Data ---------- */

type FeaturedCard = {
  title: string;
  href: string;
  body: string;
  icon: LucideIcon;
  meta: string;
};

const FEATURED: FeaturedCard[] = [
  {
    title: "Blog",
    href: "/resources/blog",
    body: "AU aesthetics ops, AHPRA changes, AI in clinics.",
    icon: BookOpen,
    meta: "Weekly · Editorial",
  },
  {
    title: "Help Center",
    href: "/resources/help",
    body: "Search Ruevii docs and FAQs.",
    icon: LifeBuoy,
    meta: "200+ articles",
  },
  {
    title: "Developers",
    href: "/resources/developers",
    body: "REST API, webhooks, embed widgets.",
    icon: Code2,
    meta: "v2 · OpenAPI",
  },
];

type GuideKind = "Guide" | "Template" | "Ebook";

type Guide = {
  kind: GuideKind;
  title: string;
  body: string;
  meta: string;
  href: string;
};

const GUIDES: Guide[] = [
  {
    kind: "Guide",
    title: "Switching from Pabau in 14 days",
    body: "The exact week-by-week migration plan our team runs with Sydney clinics.",
    meta: "8 min read",
    href: "/resources/blog/switching-from-pabau",
  },
  {
    kind: "Template",
    title: "AHPRA consent template for cosmetic injectables",
    body: "Editable consent pack aligned to the 2025 AHPRA cosmetic guidelines.",
    meta: "Download · DOCX",
    href: "/resources/templates/ahpra-consent-injectables",
  },
  {
    kind: "Ebook",
    title: "The AU cosmetic clinic pricing handbook",
    body: "Benchmarks, packaging strategy and the unit-vs-area question.",
    meta: "32 pages",
    href: "/resources/ebooks/au-pricing-handbook",
  },
  {
    kind: "Guide",
    title: "Hiring your first cosmetic nurse",
    body: "Scope of practice, supervision agreements and a 90-day onboarding plan.",
    meta: "12 min read",
    href: "/resources/blog/hiring-first-cosmetic-nurse",
  },
];

type Story = {
  clinic: string;
  city: string;
  headline: string;
  result: string;
  initials: string;
  href: string;
};

const STORIES: Story[] = [
  {
    clinic: "Halo Aesthetics",
    city: "Sydney",
    headline: "Cut admin from 14 to 4 hours a week.",
    result: "First month paid for the year.",
    initials: "HA",
    href: "/resources/stories/halo-aesthetics",
  },
  {
    clinic: "Northbridge Skin",
    city: "Melbourne",
    headline: "Booked 38% more consults from existing leads.",
    result: "AI receptionist answered every after-hours call.",
    initials: "NS",
    href: "/resources/stories/northbridge-skin",
  },
];

type PartnerCategory = {
  title: string;
  body: string;
  cta: { label: string; href: string };
  icon: LucideIcon;
};

const PARTNERS: PartnerCategory[] = [
  {
    title: "Affiliate program",
    body: "Earn recurring revenue for every clinic you bring to Ruevii.",
    cta: { label: "Apply to affiliate", href: "/resources/partners/affiliate" },
    icon: Handshake,
  },
  {
    title: "Agency partnerships",
    body: "For aesthetics-focused agencies running marketing and ops for AU clinics.",
    cta: { label: "Become a partner", href: "/resources/partners/agency" },
    icon: Building2,
  },
  {
    title: "Referral program",
    body: "Refer a clinic owner. They get a month free. You get the same.",
    cta: { label: "Refer a clinic", href: "/resources/partners/referral" },
    icon: Users,
  },
];

/* ---------- Page ---------- */

export function ResourcesContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main className="min-h-screen bg-[var(--color-paper)]">
        <Hero />
        <FeaturedRow />
        <PopularGuides />
        <CustomerStoriesTeaser />
        <Partners />
        <ClosingCTABand
          primary="One quiet system"
          secondary="for the whole practice."
          ctaPrimary={{ label: "Book a demo", href: "/demo" }}
          ctaSecondary={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}

/* ---------- 1. Hero ---------- */

function Hero() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pt-24 pb-14 md:pt-32 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col items-center text-center max-w-[44ch] mx-auto"
        >
          <EyebrowTag className="mb-6">Resources</EyebrowTag>
          <TwoToneHeadline
            as="h1"
            primary="Everything you need"
            secondary="to switch with confidence."
          />
          <p className="mt-6 text-[17px] leading-[1.55] text-[var(--color-charcoal)] max-w-[52ch]">
            Guides, templates, code samples and customer stories from
            Australian aesthetics practices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 2. Featured cards row ---------- */

function FeaturedRow() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-20 md:pb-28">
        <Stagger
          stagger={0.07}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {FEATURED.map((c) => (
            <StaggerItem key={c.title}>
              <FeaturedCard card={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeaturedCard({ card }: { card: FeaturedCard }) {
  const Icon = card.icon;
  return (
    <motion.a
      href={card.href}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: EASE }}
      className={[
        "group relative flex flex-col h-full",
        "rounded-[10px] bg-white",
        "border border-[var(--color-greige)]",
        "p-7 md:p-8",
        "transition-colors duration-200",
        "hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)]",
      ].join(" ")}
      style={{
        willChange: "transform",
        boxShadow: "0 1px 0 rgba(15,29,43,0.02)",
      }}
    >
      <span
        aria-hidden
        className="inline-flex w-11 h-11 rounded-md items-center justify-center mb-6"
        style={{
          background: "color-mix(in srgb, var(--color-blue) 16%, white)",
        }}
      >
        <Icon size={20} className="text-[var(--color-blue-ink)]" />
      </span>
      <h3
        className="font-serif text-[26px] md:text-[28px] leading-[1.1] tracking-[-0.02em] text-black mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {card.title}
      </h3>
      <p className="text-[15px] leading-[1.55] text-[var(--color-charcoal)] max-w-[34ch]">
        {card.body}
      </p>

      <div className="mt-8 pt-5 border-t border-[var(--color-greige)] flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
          {card.meta}
        </span>
        <span
          aria-hidden
          className="inline-flex w-8 h-8 rounded-full items-center justify-center border border-[var(--color-greige)] text-[var(--color-charcoal)] transition-colors group-hover:border-[var(--color-blue-ink)] group-hover:text-[var(--color-blue-ink)]"
        >
          <ArrowUpRight size={14} />
        </span>
      </div>
    </motion.a>
  );
}

/* ---------- 3. Popular guides ---------- */

function PopularGuides() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-[44ch]">
            <EyebrowTag className="mb-5">Popular guides</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="The four reads"
              secondary="every owner starts with."
            />
          </div>
          <Link
            href="/resources/blog"
            className="self-start md:self-end inline-flex items-center gap-2 text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
          >
            Browse all guides
            <span aria-hidden>→</span>
          </Link>
        </div>

        <Stagger
          stagger={0.06}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {GUIDES.map((g) => (
            <StaggerItem key={g.title}>
              <ResourceCard guide={g} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ResourceCard({ guide }: { guide: Guide }) {
  const isTemplate = guide.kind === "Template";
  return (
    <motion.a
      href={guide.href}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={[
        "group flex flex-col h-full",
        "rounded-[8px] bg-white",
        "border border-[var(--color-greige)]",
        "p-5",
        "transition-colors duration-200",
        "hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)]",
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      <KindBadge kind={guide.kind} />

      <h3
        className="mt-4 font-serif text-[18px] leading-[1.2] tracking-[-0.01em] text-black"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {guide.title}
      </h3>

      <p className="mt-2 text-[13.5px] leading-snug text-[var(--color-charcoal)] flex-1">
        {guide.body}
      </p>

      <div className="mt-5 pt-4 border-t border-[var(--color-greige)] flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-charcoal)]">
        {isTemplate ? (
          <Download size={12} className="text-[var(--color-blue-ink)]" />
        ) : (
          <Clock size={12} className="text-[var(--color-blue-ink)]" />
        )}
        <span>{guide.meta}</span>
      </div>
    </motion.a>
  );
}

function KindBadge({ kind }: { kind: GuideKind }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 self-start font-mono text-[9.5px] tracking-[0.16em] uppercase px-2 py-1 rounded-full leading-none"
      style={{
        background: "color-mix(in srgb, var(--color-blue) 14%, white)",
        color: "var(--color-blue-ink)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <span
        aria-hidden
        className="w-1 h-1 rounded-full"
        style={{ background: "var(--color-blue-ink)" }}
      />
      {kind}
    </span>
  );
}

/* ---------- 4. Customer stories teaser ---------- */

function CustomerStoriesTeaser() {
  return (
    <section
      className="w-full"
      style={{
        background:
          "color-mix(in srgb, var(--color-blue) 7%, var(--color-paper))",
      }}
    >
      <div className="wrap section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-[44ch]">
            <EyebrowTag className="mb-5">Customer stories</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Australian clinics,"
              secondary="in their own words."
            />
          </div>
          <Link
            href="/resources/stories"
            className="self-start md:self-end inline-flex items-center gap-2 text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
          >
            All customer stories
            <span aria-hidden>→</span>
          </Link>
        </div>

        <Stagger
          stagger={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {STORIES.map((s) => (
            <StaggerItem key={s.clinic}>
              <StoryCard story={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <motion.a
      href={story.href}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: EASE }}
      className={[
        "group relative flex flex-col h-full",
        "rounded-[10px] bg-white",
        "border border-[var(--color-greige)]",
        "overflow-hidden",
        "transition-colors duration-200",
        "hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)]",
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      {/* Portrait placeholder */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--color-greige)]"
        style={{
          background:
            "linear-gradient(150deg, color-mix(in srgb, var(--color-blue) 32%, white) 0%, color-mix(in srgb, var(--color-blue) 12%, white) 55%, var(--color-paper) 100%)",
        }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="inline-flex w-16 h-16 rounded-full items-center justify-center bg-white border border-[var(--color-greige)] font-serif text-[20px] tracking-[-0.02em] text-[var(--color-blue-ink)]"
            style={{ fontFamily: "var(--font-serif)" }}
            aria-hidden
          >
            {story.initials}
          </span>
        </div>
        <span className="absolute top-3 left-3 font-mono text-[9.5px] uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-white/85 backdrop-blur-[2px] text-[var(--color-charcoal)] border border-[var(--color-greige)]">
          Case study
        </span>
      </div>

      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <span
            className="font-serif text-[18px] tracking-[-0.01em] text-black"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {story.clinic}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
            {story.city}
          </span>
        </div>

        <h3
          className="font-serif text-[24px] md:text-[26px] leading-[1.15] tracking-[-0.02em] text-black mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {story.headline}
        </h3>

        <p className="text-[14.5px] leading-[1.55] text-[var(--color-charcoal)] max-w-[40ch] flex-1">
          {story.result}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-black group-hover:text-[var(--color-blue-ink)] transition-colors">
          Read the story
          <span aria-hidden>→</span>
        </div>
      </div>
    </motion.a>
  );
}

/* ---------- 5. Partners ---------- */

function Partners() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap section">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-20 items-start mb-12 md:mb-14">
          <div>
            <EyebrowTag className="mb-5">Partnerships</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Grow with us."
              secondary="Build on us."
            />
          </div>
          <p className="text-[16px] leading-[1.6] text-[var(--color-charcoal)] max-w-[58ch] lg:pt-4">
            Affiliate program, agency partnerships, referral program. Three
            simple ways to work with Ruevii — whether you run a clinic, market
            for one, or build software next to ours.
          </p>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {PARTNERS.map((p) => (
              <PartnerCard key={p.title} partner={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PartnerCard({ partner }: { partner: PartnerCategory }) {
  const Icon = partner.icon;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={[
        "group flex flex-col h-full",
        "rounded-[10px] bg-white",
        "border border-[var(--color-greige)]",
        "p-6 md:p-7",
        "transition-colors duration-200",
        "hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)]",
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      <span
        aria-hidden
        className="inline-flex w-10 h-10 rounded-md items-center justify-center mb-5"
        style={{
          background: "color-mix(in srgb, var(--color-blue) 15%, white)",
        }}
      >
        <Icon size={17} className="text-[var(--color-blue-ink)]" />
      </span>

      <h3
        className="font-serif text-[20px] leading-[1.2] tracking-[-0.015em] text-black mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {partner.title}
      </h3>

      <p className="text-[14px] leading-[1.55] text-[var(--color-charcoal)] flex-1">
        {partner.body}
      </p>

      <Link
        href={partner.cta.href}
        className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-medium text-black group-hover:text-[var(--color-blue-ink)] transition-colors"
      >
        {partner.cta.label}
        <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}


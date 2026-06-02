"use client";

import { motion } from "motion/react";
import {
  LifeBuoy,
  Search,
  Sparkles,
  Calendar,
  CreditCard,
  ShieldCheck,
  ArrowLeftRight,
  Bot,
  MessageCircle,
  Headphones,
  Clock,
  ArrowUpRight,
  Mail,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ClosingCTABand,
  EyebrowTag,
  FeatureCard,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  {
    icon: Sparkles,
    title: "Getting started",
    body:
      "First-week setup, your team, services, pricing and your clinic profile.",
  },
  {
    icon: Calendar,
    title: "Booking & calendar",
    body:
      "Online booking, calendar PINs, deposits, reminders and the waitlist.",
  },
  {
    icon: CreditCard,
    title: "Payments & POS",
    body:
      "Stripe AUD, payment plans, refunds, gift cards and split tender.",
  },
  {
    icon: ShieldCheck,
    title: "AHPRA & compliance",
    body:
      "Consent workflows, S4 register, audit trail and treatment records.",
  },
  {
    icon: ArrowLeftRight,
    title: "Migration from Pabau/Cliniko",
    body:
      "Importing clients, notes and history. We do the heavy lifting with you.",
  },
  {
    icon: Bot,
    title: "Ruevii AI",
    body:
      "The command bar, AI receptionist, instant answers and treatment scribe.",
  },
];

type ArticleCategory =
  | "Getting started"
  | "Payments"
  | "Conversations"
  | "Calendar"
  | "Refunds"
  | "Compliance"
  | "Integrations"
  | "Memberships";

const ARTICLES: {
  title: string;
  category: ArticleCategory;
  readTime: string;
}[] = [
  {
    title: "How to import your Pabau client list",
    category: "Getting started",
    readTime: "6 min read",
  },
  {
    title: "Setting up Stripe for AUD",
    category: "Payments",
    readTime: "4 min read",
  },
  {
    title: "Configuring SMS reminders for AU numbers",
    category: "Conversations",
    readTime: "3 min read",
  },
  {
    title: "Adding a new clinician with calendar access",
    category: "Calendar",
    readTime: "5 min read",
  },
  {
    title: "How to issue a refund in Ruevii",
    category: "Refunds",
    readTime: "4 min read",
  },
  {
    title: "Setting up your S4 register from scratch",
    category: "Compliance",
    readTime: "8 min read",
  },
  {
    title: "Embedding the booking widget on your Squarespace site",
    category: "Integrations",
    readTime: "5 min read",
  },
  {
    title: "Setting up payment plans",
    category: "Memberships",
    readTime: "6 min read",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function HelpContent() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <ScrollProgress />
      <SiteNav />

      <HelpHero />
      <CategoryGrid />
      <MostReadArticles />
      <TalkToHuman />

      <ClosingCTABand
        primary="A practice OS that doesn't need a manual."
        secondary="But the manual is here, just in case."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "Talk to support", href: "#talk-to-human" }}
      />

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Hero                                                                    */
/* -------------------------------------------------------------------------- */

function HelpHero() {
  return (
    <section className="w-full bg-[var(--color-paper)] relative overflow-hidden">
      <div className="wrap pt-[88px] pb-[64px] md:pt-[120px] md:pb-[88px] relative">
        <div className="flex flex-col items-start max-w-[820px]">
          <Reveal>
            <EyebrowTag icon={LifeBuoy} className="mb-6">
              Help Center
            </EyebrowTag>
          </Reveal>
          <Reveal delay={0.05}>
            <TwoToneHeadline
              as="h1"
              primary="Help, when you need it."
              secondary="From a Sydney-based team."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]">
              Articles, integrations and migration guides — all written by the
              same Australians who built the product and answer your tickets.
              No outsourced scripts, no 48-hour first response.
            </p>
          </Reveal>

          {/* SEARCH (visual only) */}
          <Reveal delay={0.18}>
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="mt-9 w-full max-w-[640px]"
            >
              <label
                htmlFor="help-search"
                className="sr-only"
              >
                Search the help center
              </label>
              <div
                className="relative flex items-center bg-white rounded-[10px] border border-[var(--color-greige)] transition-colors focus-within:border-[color-mix(in_srgb,var(--color-blue)_60%,white)]"
                style={{
                  boxShadow:
                    "0 12px 36px -22px rgba(20,20,18,0.18)",
                }}
              >
                <span
                  className="pl-4 pr-2 inline-flex items-center text-[var(--color-charcoal)]"
                  aria-hidden
                >
                  <Search size={16} />
                </span>
                <input
                  id="help-search"
                  type="search"
                  placeholder="Search articles, integrations and migration guides…"
                  className="flex-1 bg-transparent py-[14px] pr-3 text-[15px] text-black placeholder:text-[var(--color-mute)] outline-none"
                />
                <span
                  className="hidden sm:inline-flex items-center gap-1.5 mr-3 px-2 py-1 rounded border border-[var(--color-greige)] font-mono text-[10.5px] text-[var(--color-charcoal)] leading-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                  aria-hidden
                >
                  <span>⌘</span>
                  <span>K</span>
                </span>
              </div>
              <div
                className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[var(--color-charcoal)]"
              >
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Popular
                </span>
                {[
                  "Stripe setup",
                  "S4 register",
                  "Import from Pabau",
                  "SMS reminders",
                ].map((t) => (
                  <a
                    key={t}
                    href="#"
                    className="hover:text-black transition-colors underline decoration-[var(--color-greige)] underline-offset-4 hover:decoration-[var(--color-blue-ink)]"
                  >
                    {t}
                  </a>
                ))}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Category grid                                                           */
/* -------------------------------------------------------------------------- */

function CategoryGrid() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-[96px]">
        <Reveal>
          <p
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] mb-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Browse by topic
          </p>
        </Reveal>

        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={0.05}
        >
          {CATEGORIES.map((c) => (
            <StaggerItem key={c.title}>
              <FeatureCard
                icon={c.icon}
                title={c.title}
                body={c.body}
                href="#"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Most-read articles                                                      */
/* -------------------------------------------------------------------------- */

function MostReadArticles() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-[96px]">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <Reveal>
              <EyebrowTag className="mb-5">Most read</EyebrowTag>
            </Reveal>
            <Reveal delay={0.05}>
              <TwoToneHeadline
                as="h2"
                primary="The articles AU clinics open most."
                secondary="A good place to start."
              />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[14px] text-black hover:opacity-60 transition-opacity"
            >
              See every article
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          stagger={0.04}
        >
          {ARTICLES.map((a) => (
            <StaggerItem key={a.title}>
              <ArticleCard
                title={a.title}
                category={a.category}
                readTime={a.readTime}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ArticleCard({
  title,
  category,
  readTime,
}: {
  title: string;
  category: ArticleCategory;
  readTime: string;
}) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="group flex flex-col h-full p-5 rounded-lg bg-white border border-[var(--color-greige)] transition-colors hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)]"
      style={{ willChange: "transform" }}
    >
      <span
        className="inline-flex items-center self-start gap-[7px] px-2.5 py-1 rounded-full bg-[var(--color-paper)] border border-[var(--color-greige)] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] leading-none mb-4"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span
          aria-hidden
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]"
        />
        {category}
      </span>

      <h3
        className="font-serif text-[17px] leading-[1.2] tracking-[-0.01em] text-black flex-1"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h3>

      <div className="mt-5 pt-4 border-t border-[var(--color-greige)] flex items-center justify-between text-[12px] text-[var(--color-charcoal)]">
        <span
          className="inline-flex items-center gap-1.5 font-mono"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Clock size={11} />
          {readTime}
        </span>
        <ArrowUpRight
          size={14}
          className="text-[var(--color-charcoal)] transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
        />
      </div>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Talk to a human                                                         */
/* -------------------------------------------------------------------------- */

function TalkToHuman() {
  return (
    <section id="talk-to-human" className="w-full">
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper) 0%, color-mix(in srgb, var(--color-blue) 7%, var(--color-paper)) 100%)",
        }}
      >
        <div className="wrap section">
          <div className="max-w-[680px]">
            <Reveal>
              <EyebrowTag className="mb-6">Still stuck?</EyebrowTag>
            </Reveal>
            <Reveal delay={0.05}>
              <TwoToneHeadline
                as="h2"
                primary="Talk to a human."
                secondary="A Sydney one, who knows your clinic."
              />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 text-[17px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]">
                No tier-1 scripts. The same team that ships Ruevii answers
                tickets — most replies land in under an hour during AEST
                business hours.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Reveal>
              <ContactCard
                icon={Headphones}
                eyebrow="AU support"
                title="Always within reach."
                lines={[
                  {
                    label: "Hours",
                    value: "Mon–Fri · 8am–6pm AEST",
                  },
                  {
                    label: "In-app",
                    value: "Live chat from your dashboard",
                  },
                  {
                    label: "Email",
                    value: "support@ruevii.com",
                  },
                ]}
                cta={{ label: "Start a chat", href: "#", icon: MessageCircle }}
                badge="Avg first reply · 38 min"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <ContactCard
                icon={Sparkles}
                eyebrow="Onboarding call"
                title="A named lead for your first 90 days."
                lines={[
                  {
                    label: "Format",
                    value: "30-min calls, weekly cadence",
                  },
                  {
                    label: "Scope",
                    value: "Migration, training, go-live",
                  },
                  {
                    label: "Lead",
                    value: "Assigned at sign-up · stays after",
                  },
                ]}
                cta={{ label: "Book onboarding", href: "/demo", icon: Mail }}
                badge="Free on Pro and Practice"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  eyebrow,
  title,
  lines,
  cta,
  badge,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  eyebrow: string;
  title: string;
  lines: { label: string; value: string }[];
  cta: {
    label: string;
    href: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  };
  badge: string;
}) {
  const CtaIcon = cta.icon;
  return (
    <article className="rounded-[12px] bg-white border border-[var(--color-greige)] p-7 flex flex-col h-full">
      <div className="flex items-start justify-between gap-4 mb-5">
        <span
          className="inline-flex w-10 h-10 rounded-md items-center justify-center"
          style={{
            background: "color-mix(in srgb, var(--color-blue) 15%, white)",
          }}
        >
          <Icon size={17} className="text-[var(--color-blue-ink)]" />
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-paper)] border border-[var(--color-greige)] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] leading-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]"
          />
          {badge}
        </span>
      </div>

      <p
        className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {eyebrow}
      </p>
      <h3
        className="font-serif text-[24px] leading-[1.15] tracking-[-0.015em] text-black mb-5"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h3>

      <ul className="flex flex-col divide-y divide-[var(--color-greige)] flex-1">
        {lines.map((l) => (
          <li
            key={l.label}
            className="py-3 flex items-start gap-4"
          >
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] pt-[3px] w-[74px] shrink-0"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {l.label}
            </span>
            <span className="text-[14.5px] text-black/85 leading-[1.45] flex-1">
              {l.value}
            </span>
          </li>
        ))}
      </ul>

      <motion.a
        href={cta.href}
        whileHover={{ y: -1 }}
        whileTap={{ y: 1 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="mt-6 inline-flex items-center justify-center gap-[9px] text-[14.5px] font-medium leading-none px-5 py-[13px] rounded-md bg-black text-white hover:bg-[var(--color-ink-soft)] transition-colors self-start"
      >
        <CtaIcon size={15} />
        {cta.label}
      </motion.a>
    </article>
  );
}

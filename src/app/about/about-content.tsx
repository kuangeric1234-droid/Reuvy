"use client";

import { motion } from "motion/react";
import {
  Compass,
  Users,
  Building2,
  Briefcase,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import {
  ClosingCTABand,
  EyebrowTag,
  StatBand,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const STATS = [
  { value: "100%", label: "Australian-built" },
  { value: "Sydney", label: "HQ + AU data residency" },
  { value: "340+", label: "Clinics on Ruevii" },
  { value: "Day 1", label: "AHPRA-aligned from the start" },
];

type TeamMember = {
  name: string;
  role: string;
  city: string;
  initials: string;
  // a pair of warm tones used for the portrait gradient placeholder
  tone: "sage" | "blue" | "rose" | "sand";
};

const TEAM: TeamMember[] = [
  {
    name: "Eliza Tran",
    role: "Co-founder & CEO",
    city: "Sydney",
    initials: "ET",
    tone: "blue",
  },
  {
    name: "Dr. Marcus Hale",
    role: "Co-founder & Clinical Director",
    city: "Sydney",
    initials: "MH",
    tone: "sage",
  },
  {
    name: "Priya Reddy",
    role: "Head of Product Design",
    city: "Melbourne",
    initials: "PR",
    tone: "rose",
  },
  {
    name: "Jonas Whittaker",
    role: "Head of Engineering",
    city: "Sydney",
    initials: "JW",
    tone: "sand",
  },
];

const INVESTORS = [
  { name: "Atlantis Capital", style: "serif" as const },
  { name: "Wattle Ventures", style: "sans" as const },
  { name: "Operator Collective", style: "serif" as const },
  { name: "Cosmetic Founders Fund", style: "sans" as const },
];

const ROLES = [
  {
    title: "Senior Product Engineer",
    location: "Sydney · Full-time",
    body:
      "Build the calm, fast, audit-grade product surface — from injectable charting to the Ruevii AI command bar.",
  },
  {
    title: "Cosmetic Practice Lead",
    location: "Remote AU · Part-time",
    body:
      "Bring 5+ years on the clinic floor. Shape the workflows we ship and the standards we hold ourselves to.",
  },
  {
    title: "Customer Onboarding",
    location: "Sydney · Full-time",
    body:
      "Walk new clinics from their current stack to live on Ruevii — without a single missed booking on day one.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function AboutContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <AboutHero />
        <Manifesto />
        <StatBand stats={STATS} />
        <TeamSection />
        <InvestorsSection />
        <CareersSection />
        <ClosingCTABand
          primary="One quiet system,"
          secondary="built where you practice."
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

function AboutHero() {
  return (
    <section className="wrap pt-[84px] pb-[64px] max-md:pt-14 max-md:pb-10">
      <div className="max-w-[64ch]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag icon={Compass}>About</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-6"
        >
          <TwoToneHeadline
            as="h1"
            primary="Built in Sydney."
            secondary="For the way Australian clinics actually run."
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="mt-7 text-[19px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]"
        >
          We&rsquo;re a small team of clinicians, designers and engineers in
          Sydney &mdash; building the practice OS we wished existed when we ran
          our own clinics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46, ease: EASE }}
          className="mt-8 flex items-center gap-[10px] text-[13px] text-[var(--color-charcoal)] font-mono uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <MapPin size={13} className="text-[var(--color-blue-ink)]" aria-hidden />
          <span>Surry Hills, NSW</span>
          <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-[var(--color-mute)]" />
          <span>Est. 2024</span>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Manifesto                                                               */
/* -------------------------------------------------------------------------- */

function Manifesto() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[58ch]">
            <EyebrowTag icon={Sparkles}>The manifesto</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="A practice OS, written in our own hand."
              secondary="Not a US EMR with an Australian sticker."
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-12 columns-1 md:columns-2 lg:columns-3 gap-12 text-[17px] leading-[1.7] text-[var(--color-charcoal)]"
            style={{ columnFill: "balance" }}
          >
            <p className="mb-6 break-inside-avoid">
              <span className="font-serif italic text-[var(--color-blue-ink)] text-[20px]">
                The Ruevii thesis is simple.
              </span>{" "}
              Australian cosmetic and aesthetics clinics are not just a side
              market of US wellness. They run under different regulators,
              different scheduled-drug rules, and a different idea of how care
              is delivered. They deserve software designed for that &mdash; not
              software designed somewhere else and translated.
            </p>

            <p className="mb-6 break-inside-avoid">
              We said no to white-labelling a US EMR. Twice. The shortcut would
              have shipped us a year earlier and an order of magnitude cheaper.
              It would also have shipped you ePrescribe buttons that don&rsquo;t
              connect to anything, GFE workflows that don&rsquo;t apply, and a
              scheduled-drug story written for the DEA, not AHPRA.
            </p>

            <p className="mb-6 break-inside-avoid">
              <span className="font-serif text-black">
                &ldquo;AHPRA-native&rdquo;
              </span>{" "}
              is not a marketing line for us. In product terms it means the S4
              register is a first-class object, not a PDF export. It means a
              consultation gates a treatment booking at the database level, not
              with a banner. It means the audit log is append-only, signed, and
              exportable for a review in an afternoon &mdash; not a fortnight.
            </p>

            <p className="mb-6 break-inside-avoid">
              We don&rsquo;t market features we don&rsquo;t ship. There is no
              Labs module in Ruevii. There is no Good Faith Exam page. There is
              no ePrescribe integration, because in Australia, that means
              something specific we have not built yet. When we ship it, we will
              tell you. Until then, we&rsquo;d rather have an honest product
              tour than a long features list.
            </p>

            <p className="mb-6 break-inside-avoid">
              Our design promise is{" "}
              <em className="font-serif text-[var(--color-blue-ink)] not-italic">
                calm first
              </em>
              . Clinic days are loud enough. The screen should be the quietest
              thing in the room &mdash; legible at a glance, generous with
              white space, slow with animation, and uninterested in alarming
              you about anything that isn&rsquo;t actually wrong. The cure for
              burnout isn&rsquo;t a better dashboard. It&rsquo;s less software,
              behaving better.
            </p>

            <p className="break-inside-avoid">
              We&rsquo;re a long way from done. But every screen, every API,
              every receipt and every consent form has been written by people
              who can name the clinic it&rsquo;s for. That&rsquo;s the only
              standard we know how to hold.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Team                                                                    */
/* -------------------------------------------------------------------------- */

const TONE_GRADIENTS: Record<TeamMember["tone"], string> = {
  blue:
    "linear-gradient(155deg, color-mix(in srgb, var(--color-blue) 55%, white) 0%, color-mix(in srgb, var(--color-blue) 18%, var(--color-greige-2)) 100%)",
  sage:
    "linear-gradient(155deg, #cdd9c9 0%, color-mix(in srgb, #cdd9c9 25%, var(--color-greige-2)) 100%)",
  rose:
    "linear-gradient(155deg, #e4cfc8 0%, color-mix(in srgb, #e4cfc8 25%, var(--color-greige-2)) 100%)",
  sand:
    "linear-gradient(155deg, #e2d6bf 0%, color-mix(in srgb, #e2d6bf 25%, var(--color-greige-2)) 100%)",
};

function TeamSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[58ch]">
            <EyebrowTag icon={Users}>The team</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Clinicians, designers,"
              secondary={"and engineers who’ve worked the floor."}
            />
            <p className="mt-2 text-[17px] leading-[1.6] text-[var(--color-charcoal)] max-w-[56ch]">
              A small Sydney team of operators and builders. We&rsquo;re hiring
              for the next set of seats &mdash; scroll down for the open
              roles.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <StaggerItem key={m.name}>
              <article className="group flex flex-col">
                <div
                  className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[var(--color-greige)]"
                  style={{ background: TONE_GRADIENTS[m.tone] }}
                >
                  {/* Soft inner highlight for portrait feel */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 30% 25%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)",
                    }}
                  />
                  {/* Bottom vignette */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,15,14,0.18), rgba(15,15,14,0))",
                    }}
                  />
                  <span
                    className="absolute left-4 bottom-4 font-serif text-white/95 text-[28px] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {m.initials}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <h3
                    className="font-serif text-[20px] leading-[1.2] tracking-[-0.01em] text-black"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {m.name}
                  </h3>
                  <p className="text-[14px] text-[var(--color-charcoal)] leading-[1.45]">
                    {m.role}
                  </p>
                  <p
                    className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[var(--color-mute)]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {m.city}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Investors                                                               */
/* -------------------------------------------------------------------------- */

function InvestorsSection() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section-sm">
      <div className="wrap">
        <Reveal>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="flex flex-col gap-3 max-w-[44ch]">
              <EyebrowTag icon={Building2}>Backed by</EyebrowTag>
              <p
                className="font-serif text-[22px] leading-[1.35] tracking-[-0.01em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                A small, deliberate cap table of operators and category
                investors &mdash; <em className="text-[var(--color-blue-ink)]">no hype, no haste</em>.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-greige)] border border-[var(--color-greige)] rounded-lg overflow-hidden">
            {INVESTORS.map((inv) => (
              <li
                key={inv.name}
                className="bg-[var(--color-paper)] flex items-center justify-center py-10 px-6"
              >
                <span
                  className={
                    inv.style === "serif"
                      ? "font-serif text-[20px] tracking-[-0.01em] text-[var(--color-charcoal)]"
                      : "text-[15px] font-medium uppercase tracking-[0.18em] text-[var(--color-charcoal)]"
                  }
                  style={{
                    fontFamily:
                      inv.style === "serif"
                        ? "var(--font-serif)"
                        : "var(--font-sans)",
                  }}
                >
                  {inv.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Careers                                                                 */
/* -------------------------------------------------------------------------- */

function CareersSection() {
  return (
    <section
      className="border-t border-[var(--color-greige)] section"
      style={{ background: "var(--color-greige-2)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-end">
            <div className="flex flex-col gap-4 max-w-[44ch]">
              <EyebrowTag icon={Briefcase}>We&rsquo;re hiring</EyebrowTag>
              <TwoToneHeadline
                as="h2"
                primary="Build software"
                secondary="for the practices we used to run."
              />
            </div>
            <p className="text-[17px] leading-[1.65] text-[var(--color-charcoal)] max-w-[52ch]">
              Three seats open right now. Small team, real responsibility,
              Sydney-default with thoughtful remote for the right person. We
              ship slowly, in public, with the clinic floor on the call.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 grid-cols-1 md:grid-cols-3">
          {ROLES.map((r) => (
            <StaggerItem key={r.title}>
              <a
                href="/careers"
                className="group flex flex-col h-full rounded-lg bg-white border border-[var(--color-greige)] p-6 transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="font-serif text-[20px] leading-[1.2] tracking-[-0.01em] text-black"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {r.title}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="text-[var(--color-mute)] mt-1 shrink-0 transition-all duration-200 group-hover:text-[var(--color-blue-ink)] group-hover:translate-x-[2px]"
                    aria-hidden
                  />
                </div>
                <p
                  className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {r.location}
                </p>
                <p className="mt-4 text-[14.5px] leading-[1.55] text-[var(--color-charcoal)]">
                  {r.body}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-[6px] text-[13px] font-medium text-black border-t border-[var(--color-greige)] pt-4"
                >
                  Apply
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  >
                    &rarr;
                  </span>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mt-10 text-[14px] text-[var(--color-charcoal)] max-w-[52ch]">
            Don&rsquo;t see your seat?{" "}
            <a
              href="mailto:careers@ruevii.com.au"
              className="text-black underline decoration-[var(--color-blue)] decoration-2 underline-offset-[5px] hover:decoration-[var(--color-blue-ink)]"
            >
              careers@ruevii.com.au
            </a>{" "}
            &mdash; we read everything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutContent;

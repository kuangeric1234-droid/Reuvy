"use client";

import {
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import {
  ClosingCTABand,
  EyebrowTag,
  FeatureCard,
  ProblemCard,
  ProductScreenshot,
  StatBand,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { FEATURE_BY_SLUG } from "@/lib/marketing/features";
import { SEGMENT_BY_SLUG } from "@/lib/marketing/segments";

/* -------------------------------------------------------------------------- */
/*  Tiny in-screen mocks — small, segment-flavoured product UI                */
/* -------------------------------------------------------------------------- */

function HeroMock({
  segmentName,
  segmentTag,
}: {
  segmentName: string;
  segmentTag: string;
}) {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-[color-mix(in_srgb,var(--color-blue)_25%,white)] grid place-items-center font-mono text-[11px] text-[var(--color-blue-ink)]">
            RV
          </span>
          <div>
            <p className="text-[13px] font-medium text-black leading-tight">
              {segmentName}
            </p>
            <p
              className="font-mono text-[10.5px] text-[var(--color-charcoal)] leading-tight"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {segmentTag}
            </p>
          </div>
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          AHPRA-ALIGNED
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-[var(--color-greige-2)]">
        <Field label="Diary" value="Confirmed · 9:45 AM" />
        <Field label="Consent" value="Signed v3" />
        <Field label="S4 register" value="auto · batch B-2049" />
        <Field label="Data residency" value="Sydney AU" />
      </div>
    </div>
  );
}

function WorkflowMock({ segmentName }: { segmentName: string }) {
  return (
    <div className="p-5 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-4">
        <p
          className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-charcoal)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {segmentName} · Tuesday
        </p>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ON-TRACK
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <WorkflowStep step="09:00" title="Consult" detail="Consent signed" />
        <WorkflowStep step="09:45" title="Treatment" detail="Chart saved" />
        <WorkflowStep step="10:15" title="Checkout" detail="PAID · in-thread" />
        <WorkflowStep step="14:00" title="Rebook" detail="auto · 4 wks" />
      </div>
      <div className="mt-4 pt-3 border-t border-[var(--color-greige-2)] grid grid-cols-3 gap-3">
        <Stat label="bookings" value="14" />
        <Stat label="no-shows" value="0" />
        <Stat label="revenue" value="$8,420" />
      </div>
    </div>
  );
}

function WorkflowStep({
  step,
  title,
  detail,
}: {
  step: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border border-[var(--color-greige-2)] bg-white px-2.5 py-2">
      <p
        className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--color-blue-ink)] leading-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {step}
      </p>
      <p className="mt-1 text-[12px] font-medium text-black leading-tight">
        {title}
      </p>
      <p className="text-[10.5px] text-[var(--color-charcoal)] leading-snug mt-0.5">
        {detail}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--color-charcoal)] leading-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className="mt-1 font-serif text-[18px] tracking-[-0.01em] text-black leading-tight">
        {value}
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-0.5"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className="text-[12px] text-black leading-tight">{value}</p>
    </div>
  );
}

function CapabilityMock({ slug }: { slug: string }) {
  // Dark-band small mock — segment-flavoured snapshot.
  return (
    <div className="text-[12px] leading-snug rounded-[10px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <p
          className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-blue)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ruevii · {slug}
        </p>
        <span
          className="font-mono text-[9.5px] tracking-[0.12em] uppercase px-1.5 py-[2px] rounded-full text-white/80"
          style={{ background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-mono)" }}
        >
          LIVE
        </span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
        <DarkField label="appointments.today" value="14" />
        <DarkField label="consent.gaps" value="0" />
        <DarkField label="s4.entries" value="6" />
        <DarkField label="audit.actions" value="218" />
      </div>
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <p
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          status · ahpra-aligned
        </p>
        <p
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-blue)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          au · sydney
        </p>
      </div>
    </div>
  );
}

function DarkField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-white/45 mb-0.5"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className="font-serif text-[20px] tracking-[-0.01em] text-white leading-tight">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section helper                                                             */
/* -------------------------------------------------------------------------- */

function SectionLight({
  children,
  id,
  tint,
}: {
  children: React.ReactNode;
  id?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className="w-full"
      style={{
        background: tint
          ? "color-mix(in srgb, var(--color-paper) 80%, white)"
          : "var(--color-white)",
      }}
    >
      <div className="wrap section">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main exported content                                                      */
/* -------------------------------------------------------------------------- */

export function SegmentDetailContent({ slug }: { slug: string }) {
  const segment = SEGMENT_BY_SLUG[slug];

  if (!segment) {
    return (
      <>
        <ScrollProgress />
        <SiteNav />
        <main className="wrap section">
          <p className="text-[16px] text-[var(--color-charcoal)]">
            Segment not found.
          </p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const HeroIcon = segment.icon;
  const groupLabel =
    segment.group === "clinic-type" ? "By clinic type" : "By size";

  const relatedFeatures = segment.relatedFeatureSlugs
    .map((s) => FEATURE_BY_SLUG[s])
    .filter(Boolean);

  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        {/* ----------------- 1. HERO (light) ----------------- */}
        <SectionLight id="segment-hero">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="max-w-[640px]">
              <Reveal y={8}>
                <div className="inline-flex mb-6">
                  <EyebrowTag icon={HeroIcon}>
                    Who we serve · {groupLabel}
                  </EyebrowTag>
                </div>
              </Reveal>
              <Reveal y={14} delay={0.05}>
                <TwoToneHeadline
                  as="h1"
                  primary={segment.hookPrimary}
                  secondary={segment.hookSecondary}
                  accent="charcoal"
                />
              </Reveal>
              <Reveal y={12} delay={0.12}>
                <p className="mt-6 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[54ch]">
                  {segment.subhead}
                </p>
              </Reveal>
              <Reveal y={10} delay={0.18}>
                <div className="mt-8 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch">
                  <a
                    href="/demo"
                    className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors max-md:w-full"
                  >
                    Book a demo
                    <ArrowRight size={15} aria-hidden />
                  </a>
                  <a
                    href="#segment-related"
                    className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-white text-black border border-[var(--color-greige)] hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)] transition-colors max-md:w-full"
                  >
                    See what you'll use
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal y={20} delay={0.22} className="min-w-0">
              <ProductScreenshot
                url={`who-we-serve/${segment.slug}`}
                className="max-w-[480px] ml-auto"
              >
                <HeroMock
                  segmentName={segment.name}
                  segmentTag={segment.slug.toUpperCase()}
                />
              </ProductScreenshot>
            </Reveal>
          </div>
        </SectionLight>

        {/* ----------------- 2. WHERE IT BREAKS (light) ----------------- */}
        <SectionLight tint>
          <div className="max-w-[640px] mb-10">
            <Reveal y={8}>
              <div className="inline-flex mb-5">
                <EyebrowTag icon={AlertTriangle}>WHERE IT BREAKS</EyebrowTag>
              </div>
            </Reveal>
            <Reveal y={14} delay={0.05}>
              <TwoToneHeadline
                primary="The cracks you already know about."
                secondary="And the ones you've stopped noticing."
              />
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {segment.whereItBreaks.map((p) => (
              <StaggerItem key={p.title}>
                <ProblemCard icon={AlertTriangle} title={p.title} body={p.body} />
              </StaggerItem>
            ))}
          </Stagger>
        </SectionLight>

        {/* ----------------- 3. WORKFLOW SCREENSHOT BAND (light) ----------------- */}
        <SectionLight>
          <div className="max-w-[640px] mb-10">
            <Reveal y={8}>
              <div className="inline-flex mb-5">
                <EyebrowTag>SAME PRACTICE. DIFFERENT TUESDAY.</EyebrowTag>
              </div>
            </Reveal>
            <Reveal y={14} delay={0.05}>
              <TwoToneHeadline
                primary="Booking, consent, treatment, checkout."
                secondary="One thread, one screen, one click apart."
              />
            </Reveal>
            <Reveal y={10} delay={0.12}>
              <p className="mt-5 text-[16px] leading-[1.55] text-[var(--color-charcoal)] max-w-[54ch]">
                The Tuesday you actually wanted. The diary moves, the chart
                writes itself, the deposit lands in the thread, and the next
                visit is booked before the patient leaves the chair.
              </p>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.05}>
            <ProductScreenshot
              url={`who-we-serve/${segment.slug}/workflow`}
              className="max-w-[1080px] mx-auto"
            >
              <WorkflowMock segmentName={segment.name} />
            </ProductScreenshot>
          </Reveal>
        </SectionLight>

        {/* ----------------- 4. CAPABILITY BAND (DARK) ----------------- */}
        <section
          className="w-full"
          style={{
            background: "var(--color-ink)",
            color: "var(--color-white)",
          }}
        >
          <div className="wrap section">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
              <div className="max-w-[600px]">
                <Reveal y={8}>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue)] leading-none mb-5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    What Ruevii does for {segment.name.toLowerCase()}
                  </p>
                </Reveal>
                <Reveal y={14} delay={0.05}>
                  <h2
                    className="font-serif font-normal text-[clamp(34px,4.4vw,58px)] leading-[1.04] tracking-[-0.025em] text-balance"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    <span className="block text-white">
                      {segment.capabilityHeading.primary}
                    </span>
                    <span className="block" style={{ color: "var(--color-blue)" }}>
                      {segment.capabilityHeading.secondary}
                    </span>
                  </h2>
                </Reveal>

                <Stagger className="mt-9 flex flex-col gap-3.5" stagger={0.06}>
                  {segment.capabilityBullets.map((b) => (
                    <StaggerItem key={b}>
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[8px] w-[6px] h-[6px] rounded-full shrink-0"
                          style={{ background: "var(--color-blue)" }}
                        />
                        <span className="text-[15.5px] leading-[1.55] text-white/85">
                          {b}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <Reveal y={20} delay={0.12}>
                <CapabilityMock slug={segment.slug} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ----------------- 5. RETENTION STORY / STATS (DARK) ----------------- */}
        <StatBand
          stats={segment.stats}
          quote={{
            body: segment.testimonial.body,
            name: segment.testimonial.name,
            role: segment.testimonial.role,
          }}
        />

        {/* ----------------- 6. INLINE TESTIMONIAL QUOTE (light) ----------------- */}
        <SectionLight>
          <Reveal y={18}>
            <figure
              className="mx-auto max-w-[760px] rounded-[16px] border border-[var(--color-greige)] p-10 md:p-14 text-center"
              style={{
                background:
                  "color-mix(in srgb, var(--color-blue) 5%, var(--color-white))",
              }}
            >
              <div className="inline-flex mb-6">
                <EyebrowTag>FROM THE FLOOR</EyebrowTag>
              </div>
              <blockquote
                className="font-serif italic text-[clamp(22px,2.6vw,32px)] leading-[1.25] tracking-[-0.015em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span aria-hidden className="text-[var(--color-blue-ink)]/45 mr-1">
                  “
                </span>
                {segment.testimonial.body}
                <span aria-hidden className="text-[var(--color-blue-ink)]/45 ml-1">
                  ”
                </span>
              </blockquote>
              <figcaption className="mt-7 flex items-center justify-center gap-3">
                <span
                  aria-hidden
                  className="w-[28px] h-px"
                  style={{ background: "var(--color-blue-ink)" }}
                />
                <span className="text-[13.5px] text-[var(--color-charcoal)]">
                  <span className="font-medium text-black">
                    {segment.testimonial.name}
                  </span>
                  <span> · {segment.testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </SectionLight>

        {/* ----------------- 7. RELATED FEATURES (light) ----------------- */}
        <SectionLight id="segment-related" tint>
          <div className="max-w-[640px] mb-10">
            <Reveal y={8}>
              <div className="inline-flex mb-5">
                <EyebrowTag icon={Sparkles}>WHAT YOU'LL USE</EyebrowTag>
              </div>
            </Reveal>
            <Reveal y={14} delay={0.05}>
              <TwoToneHeadline
                primary="Four capabilities."
                secondary="The ones you'll feel on day one."
              />
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedFeatures.map((f) => (
              <StaggerItem key={f.slug}>
                <FeatureCard
                  icon={f.icon}
                  title={f.name}
                  body={f.oneLiner}
                  href={`/features/${f.slug}`}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </SectionLight>

        {/* ----------------- 8. ASPIRATIONAL CTA BAND (DARK) ----------------- */}
        <section
          aria-label="Aspirational call to action"
          className="relative w-full overflow-hidden"
          style={{
            background: "var(--color-ink)",
            color: "var(--color-white)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 65%, rgba(155,183,209,0.16) 0%, rgba(155,183,209,0.05) 36%, rgba(15,15,14,0) 70%)",
            }}
          />
          <div className="wrap section relative">
            <div className="flex flex-col items-center text-center max-w-[32ch] mx-auto">
              <h2
                className="font-serif font-normal text-[clamp(34px,4.6vw,62px)] leading-[1.04] tracking-[-0.025em] text-balance"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block text-white">
                  {segment.aspirational.primary}
                </span>
                <span className="block" style={{ color: "var(--color-blue)" }}>
                  {segment.aspirational.secondary}
                </span>
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-9 max-md:flex-col max-md:w-full">
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-white text-black hover:bg-white/90 transition-colors max-md:w-full"
                >
                  Book a demo
                  <ArrowRight size={15} aria-hidden />
                </a>
                <a
                  href="#segment-hero"
                  className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-transparent border border-white/25 text-white hover:bg-white/[0.06] hover:border-white/40 transition-colors max-md:w-full"
                >
                  Re-read the pitch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global closing band */}
      <ClosingCTABand
        primary="Built for Australian aesthetics."
        secondary="Not retro-fitted from somewhere else."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "See pricing", href: "/pricing" }}
      />

      <SiteFooter />
      <CommandPalette />
    </>
  );
}

export default SegmentDetailContent;

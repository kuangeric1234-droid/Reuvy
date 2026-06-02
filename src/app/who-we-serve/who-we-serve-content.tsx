"use client";

import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";

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
import {
  SEGMENT_BY_SLUG,
  SEGMENT_GROUPS,
  type Segment,
} from "@/lib/marketing/segments";

function SegmentRow({ segment }: { segment: Segment }) {
  const Icon = segment.icon;
  return (
    <Link
      href={`/who-we-serve/${segment.slug}`}
      className="group relative flex items-start gap-4 rounded-[12px] border border-[var(--color-greige)] bg-white px-5 py-5 hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)] transition-colors"
    >
      <span
        aria-hidden
        className="w-11 h-11 shrink-0 rounded-md grid place-items-center"
        style={{
          background: "color-mix(in srgb, var(--color-blue) 15%, white)",
        }}
      >
        <Icon size={18} className="text-[var(--color-blue-ink)]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-serif text-[19px] tracking-[-0.01em] leading-tight text-black mb-1">
          {segment.name}
        </span>
        <span className="block text-[13.5px] text-[var(--color-charcoal)] leading-snug">
          <span className="text-black/85">{segment.hookPrimary}</span>{" "}
          {segment.hookSecondary}
        </span>
      </span>
      <ArrowUpRight
        size={16}
        className="shrink-0 mt-1.5 text-[var(--color-charcoal)] group-hover:text-[var(--color-blue-ink)] transition-colors"
      />
    </Link>
  );
}

export function WhoWeServeContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        {/* HERO */}
        <section
          className="w-full"
          style={{ background: "var(--color-white)" }}
        >
          <div className="wrap section">
            <div className="max-w-[760px]">
              <Reveal y={8}>
                <div className="inline-flex mb-6">
                  <EyebrowTag icon={Users}>Who we serve</EyebrowTag>
                </div>
              </Reveal>
              <Reveal y={14} delay={0.05}>
                <TwoToneHeadline
                  as="h1"
                  primary="Built for Australian aesthetics."
                  secondary="From one chair to a multi-site group."
                />
              </Reveal>
              <Reveal y={12} delay={0.12}>
                <p className="mt-6 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]">
                  Ruevii is AHPRA-native, AU-hosted and built for the way
                  cosmetic, injectable, skin and laser clinics actually
                  practise — whether you're a solo injector or a three-site
                  group. Find your shape below.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN INDEX */}
        <section
          className="w-full"
          style={{
            background:
              "color-mix(in srgb, var(--color-paper) 80%, white)",
          }}
        >
          <div className="wrap section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              {SEGMENT_GROUPS.map((group) => (
                <div key={group.key} className="flex flex-col gap-6">
                  <Reveal y={10}>
                    <div>
                      <div className="inline-flex mb-4">
                        <EyebrowTag>{group.label.toUpperCase()}</EyebrowTag>
                      </div>
                      <p className="font-serif text-[clamp(22px,2.4vw,30px)] tracking-[-0.015em] leading-[1.15] text-black max-w-[36ch]">
                        {group.tagline}
                      </p>
                    </div>
                  </Reveal>

                  <Stagger className="flex flex-col gap-3" stagger={0.06}>
                    {group.slugs.map((slug) => {
                      const segment = SEGMENT_BY_SLUG[slug];
                      if (!segment) return null;
                      return (
                        <StaggerItem key={slug}>
                          <SegmentRow segment={segment} />
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ClosingCTABand
        primary="Find the version of Ruevii"
        secondary="that fits your clinic."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "See pricing", href: "/pricing" }}
      />

      <SiteFooter />
      <CommandPalette />
    </>
  );
}

export default WhoWeServeContent;

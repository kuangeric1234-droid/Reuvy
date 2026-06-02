"use client";

import {
  ClipboardCheck,
  Video,
  Syringe,
  FileCheck,
  ShieldCheck,
  Server,
  Headphones,
  Scale,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import {
  ClosingCTABand,
  EyebrowTag,
  FeatureCard,
  HighlightBlock,
  ProblemCard,
  StatBand,
  TwoToneHeadline,
} from "@/components/ui";

import { PageHero } from "./_components/page-hero";
import { SectionReveal } from "./_components/section-reveal";
import { AuditTrailMock } from "./_components/audit-trail-mock";
import { RegisterTableMock } from "./_components/register-table-mock";

const PILLARS = [
  {
    icon: ClipboardCheck,
    title: "Mandatory clinical gating",
    body:
      "Treatments can't be booked or charged until a valid consultation and consent are on the record.",
  },
  {
    icon: Video,
    title: "In-person & video consults only",
    body:
      "AHPRA-compliant face-to-face or secure telehealth. No async prescribing — ever.",
  },
  {
    icon: Syringe,
    title: "S4 drug register",
    body:
      "Every scheduled drug logged against patient, prescriber and batch automatically.",
  },
  {
    icon: FileCheck,
    title: "Immutable audit trail",
    body:
      "Append-only log across every clinical and financial action — tamper-evident.",
  },
  {
    icon: ShieldCheck,
    title: "Consent enforcement",
    body:
      "Plaintiff-proof: block treatment until consent is signed and stored to the record.",
  },
] as const;

const RESIDENCY_CARDS = [
  {
    icon: Server,
    title: "Sydney AWS region",
    body:
      "Patient records, photos and audit logs live in ap-southeast-2 — never replicated offshore.",
  },
  {
    icon: Headphones,
    title: "AU-only support team",
    body:
      "A Sydney-based crew on your timezone. Real humans, named account manager, no overseas handoff.",
  },
  {
    icon: Scale,
    title: "AU privacy law compliant",
    body:
      "Privacy Act 1988 and the Australian Privacy Principles, with HIPAA-aligned PHI encryption.",
  },
] as const;

const STATS = [
  { value: "100%", label: "AHPRA-aligned forms" },
  { value: "Append", label: "Only — audit log never deletes" },
  { value: "AU", label: "Data residency · Sydney" },
];

const QUOTE = {
  body:
    "We stopped chasing consent PDFs the day we moved across. The S4 register and audit trail mean an AHPRA review would take an afternoon, not a fortnight.",
  name: "Dr. Priya Anand",
  role: "Medical Director, Cosmetic Clinic — Surry Hills",
};

export function ComplianceContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        {/* 1. Hero (light) */}
        <PageHero />

        {/* 2. Five-pillar grid (light) */}
        <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
          <div className="wrap">
            <SectionReveal>
              <div className="flex flex-col gap-4 max-w-[58ch]">
                <EyebrowTag icon={ShieldCheck}>The five pillars</EyebrowTag>
                <TwoToneHeadline
                  as="h2"
                  primary="Compliance, baked into the workflow."
                  secondary="Not a binder on the shelf."
                />
                <p className="text-[17px] leading-[1.6] text-[var(--color-charcoal)] mt-2 max-w-[56ch]">
                  Five guardrails that run quietly underneath every booking,
                  consult, treatment and charge — so doing the right thing is
                  simply how the software works.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {PILLARS.map((p) => (
                  <FeatureCard
                    key={p.title}
                    icon={p.icon}
                    title={p.title}
                    body={p.body}
                  />
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* 3. Highlight — Audit trail (light) */}
        <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
          <div className="wrap">
            <SectionReveal>
              <HighlightBlock
                eyebrow="Tamper-evident"
                title="Every action, every actor, every timestamp."
                body="From a consent signature to a refund line, every clinical and financial action is written to an append-only log. Records lock on sign-off — nothing is ever overwritten or quietly deleted, and version history is exportable for any AHPRA review."
                bullets={[
                  "Append-only — nothing deletable, by anyone",
                  "Per-record version history with diffs",
                  "Export-ready for any AHPRA review",
                ]}
                visual={<AuditTrailMock />}
              />
            </SectionReveal>
          </div>
        </section>

        {/* 4. Highlight — S4 register (light) */}
        <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
          <div className="wrap">
            <SectionReveal>
              <HighlightBlock
                eyebrow="Controlled substances"
                title="S4 dispensing, in the app — not in a paperback book."
                body="Every scheduled drug is captured against the patient, prescriber, batch, lot and expiry the moment it's administered. End-of-month reports compile themselves; your prescriber signs once, not a hundred times."
                bullets={[
                  "Per-treatment auto-log, no double entry",
                  "Batch · lot · expiry tracked at administration",
                  "End-of-month dispensing reports for the prescriber",
                ]}
                visual={<RegisterTableMock />}
              />
            </SectionReveal>
          </div>
        </section>

        {/* 5. Stats band (dark) */}
        <StatBand stats={STATS} quote={QUOTE} />

        {/* 6. Data residency (light) */}
        <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
          <div className="wrap">
            <SectionReveal>
              <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
                <div className="flex flex-col gap-5 max-w-[52ch]">
                  <EyebrowTag>Australian-made</EyebrowTag>
                  <TwoToneHeadline
                    as="h2"
                    primary="Your data stays in Australia."
                    secondary="Sydney-based servers. AU support."
                  />
                </div>
                <p className="text-[17px] leading-[1.65] text-[var(--color-charcoal)] lg:mt-2 max-w-[54ch]">
                  Ruevii runs entirely in the AWS Sydney region. Patient
                  records, before-and-after photos, the S4 register and the
                  audit trail are stored, processed and backed up inside
                  Australia &mdash; never replicated to an overseas data
                  centre. Encrypted at rest with AES-256, in transit with
                  TLS 1.3, and aligned to HIPAA-grade controls for PHI.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="mt-12 grid gap-4 grid-cols-1 md:grid-cols-3">
                {RESIDENCY_CARDS.map((c) => (
                  <ProblemCard
                    key={c.title}
                    icon={c.icon}
                    title={c.title}
                    body={c.body}
                  />
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* 7. Closing CTA (dark) */}
        <ClosingCTABand
          primary="Compliance shouldn't be a binder of PDFs."
          secondary="It should be how your software works."
          ctaPrimary={{ label: "Book a demo", href: "/demo" }}
          ctaSecondary={{ label: "Read the AHPRA brief", href: "#" }}
        />
      </main>
      <SiteFooter />
      <CommandPalette />
    </>
  );
}

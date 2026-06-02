import type { Metadata } from "next";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  EyebrowTag,
  TwoToneHeadline,
  StatBand,
  ComparisonTable,
  ClosingCTABand,
} from "@/components/ui";

import { PricingHero, PlanCards, PricingFAQ } from "./_sections";

export const metadata: Metadata = {
  title: "Pricing · Ruevii",
  description:
    "Simple AUD pricing for Australian aesthetics clinics. Per location, per clinician. AHPRA migration included.",
};

/* ---------- Comparison rows ---------- */

const REPLACED_TOOLS = [
  { name: "Pabau / Cliniko EMR + scheduling", monthly: "$229" },
  { name: "AHPRA consent forms (paper + Jotform)", monthly: "$49" },
  { name: "SMS reminders (separate provider)", monthly: "$89" },
  { name: "Stripe / Square POS terminal plan", monthly: "$59" },
  { name: "Mailchimp / Klaviyo for campaigns", monthly: "$129" },
];

const RUEVII_INCLUDED = {
  name: "Ruevii Practice — one platform",
  included: [
    "AHPRA-aligned EMR, consent and S4 register",
    "Calendar, online booking and reminders",
    "Pay-in-conversation + in-clinic POS",
    "Lead CRM, campaigns and reviews",
    "Ruevii AI command bar across every workflow",
  ],
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <SiteNav />

      {/* 1. HERO (light) */}
      <PricingHero />

      {/* 2. PLAN CARDS (light) */}
      <PlanCards />

      {/* 3. COMPARISON TABLE (light) */}
      <section className="w-full bg-[var(--color-paper)]">
        <div className="wrap section">
          <div className="flex flex-col items-center text-center max-w-[40ch] mx-auto mb-12">
            <EyebrowTag className="mb-5">Stop the stack</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Tools you can stop"
              secondary="paying for."
            />
            <p className="mt-5 text-[16px] leading-[1.55] text-[var(--color-charcoal)] max-w-[52ch]">
              A typical Australian clinic stitches together five point tools to
              run a single Tuesday. Ruevii Practice replaces all of them — for
              less than what most clinics already spend on the EMR alone.
            </p>
          </div>

          <div className="max-w-[1080px] mx-auto">
            <ComparisonTable
              youReplace={REPLACED_TOOLS}
              ruevii={RUEVII_INCLUDED}
              rueviiMonthly="$399"
              totalLabel="Per month"
            />
          </div>
        </div>
      </section>

      {/* 4. FAQ (light) */}
      <PricingFAQ />

      {/* 5. STAT BAND (dark) */}
      <StatBand
        stats={[
          { value: "30 days", label: "Free trial — no card required" },
          { value: "100%", label: "AHPRA-aligned, audit-ready" },
          { value: "Sydney", label: "AU data residency, end to end" },
        ]}
        quote={{
          body: "We replaced four tools and one spreadsheet with Ruevii. The first month paid for the year.",
          name: "Dr. Anya Patel",
          role: "Owner, Halo Aesthetics — Sydney",
        }}
      />

      {/* 6. CLOSING CTA + FOOTER */}
      <ClosingCTABand
        primary="No setup fees."
        secondary="Just clinics that run."
        ctaPrimary={{ label: "Start free trial", href: "/demo" }}
        ctaSecondary={{ label: "Talk to sales", href: "/demo" }}
      />
      <SiteFooter />
    </main>
  );
}

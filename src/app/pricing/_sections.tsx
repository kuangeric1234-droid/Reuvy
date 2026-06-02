"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

import { EyebrowTag, TwoToneHeadline } from "@/components/ui";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* ---------- 2. HERO ---------- */

export function PricingHero() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pt-24 pb-16 md:pt-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-center text-center max-w-[44ch] mx-auto"
        >
          <EyebrowTag className="mb-6">Pricing</EyebrowTag>
          <TwoToneHeadline
            as="h1"
            primary="Simple AUD pricing."
            secondary="Per location, per clinician."
          />
          <p className="mt-6 text-[17px] leading-[1.55] text-[var(--color-charcoal)] max-w-[48ch]">
            No setup fees. No per-feature add-ons. AHPRA migration included on
            every plan. Move from Pabau or Cliniko in under two weeks.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[var(--color-charcoal)]">
            <SmallProofItem>30-day free trial</SmallProofItem>
            <Dot />
            <SmallProofItem>Cancel any time</SmallProofItem>
            <Dot />
            <SmallProofItem>Sydney support, AU hours</SmallProofItem>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SmallProofItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Check size={14} className="text-[var(--color-blue-ink)]" />
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="hidden sm:inline-block w-1 h-1 rounded-full bg-[var(--color-mute)]"
    />
  );
}

/* ---------- 3. PLAN CARDS ---------- */

type Plan = {
  key: "solo" | "practice" | "group";
  name: string;
  pitch: string;
  price: string;
  unit: string;
  note?: string;
  bullets: string[];
  cta: { label: string; href: string };
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "solo",
    name: "Solo",
    pitch: "For the single-chair injector.",
    price: "AUD $179",
    unit: "/mo per clinician",
    bullets: [
      "1 clinician",
      "AHPRA-aligned EMR + consent",
      "Calendar + online booking",
      "Stripe payments",
      "SMS reminders",
    ],
    cta: { label: "Start free trial", href: "/demo" },
  },
  {
    key: "practice",
    name: "Practice",
    pitch: "For established AU clinics.",
    price: "AUD $399",
    unit: "/mo per location",
    note: "Up to 5 clinicians, then $79/mo each extra",
    bullets: [
      "Everything in Solo",
      "Ruevii AI command bar",
      "AI Receptionist + Instant Answers",
      "Memberships + Packages + Gift cards",
      "S4 register",
      "Lead CRM",
      "Marketing campaigns",
    ],
    cta: { label: "Start free trial", href: "/demo" },
    popular: true,
  },
  {
    key: "group",
    name: "Group",
    pitch: "For multi-location aesthetics groups.",
    price: "Custom",
    unit: "talk to sales",
    bullets: [
      "Everything in Practice",
      "Multi-location reporting",
      "Role-based permissions",
      "Dedicated AU onboarding",
      "Quarterly business review",
      "Priority phone support",
    ],
    cta: { label: "Talk to sales", href: "/demo" },
  },
];

export function PlanCards() {
  return (
    <section className="w-full bg-[var(--color-paper)]" id="plans">
      <div className="wrap pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.key} plan={plan} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-[12.5px] font-mono uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
          All prices in AUD, excl. GST. Billed monthly. No setup fees.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const isPopular = plan.popular;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
      className={[
        "relative flex flex-col rounded-[12px] bg-white",
        "p-8",
        isPopular
          ? "border-2 border-[var(--color-blue)] md:-translate-y-2"
          : "border border-[var(--color-greige)]",
      ].join(" ")}
      style={
        isPopular
          ? {
              boxShadow: "0 30px 70px -40px rgba(91,119,144,0.35)",
            }
          : undefined
      }
    >
      {isPopular && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10.5px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-[var(--color-blue-ink)] text-white leading-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Most popular
        </span>
      )}

      {/* Header */}
      <header className="mb-6">
        <h3
          className="font-serif text-[26px] leading-[1.1] tracking-[-0.02em] text-black mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {plan.name}
        </h3>
        <p className="text-[14px] text-[var(--color-charcoal)] leading-snug">
          {plan.pitch}
        </p>
      </header>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-[var(--color-greige)]">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-serif text-[40px] leading-none tracking-[-0.025em] text-black tabular-nums"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {plan.price}
          </span>
          <span className="text-[14px] text-[var(--color-charcoal)]">
            {plan.unit}
          </span>
        </div>
        {plan.note && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-blue-ink)] leading-[1.4]">
            {plan.note}
          </p>
        )}
        {!plan.note && (
          <p
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-transparent leading-[1.4] select-none"
            aria-hidden
          >
            placeholder
          </p>
        )}
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-[14.5px] leading-snug text-black/85"
          >
            <span
              aria-hidden
              className="mt-0.5 inline-flex w-[18px] h-[18px] rounded-full items-center justify-center shrink-0"
              style={{
                background: "color-mix(in srgb, var(--color-blue) 18%, white)",
              }}
            >
              <Check size={11} className="text-[var(--color-blue-ink)]" strokeWidth={2.5} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={plan.cta.href}
        className={[
          "inline-flex items-center justify-center gap-2 w-full",
          "text-[14.5px] font-medium leading-none px-5 py-[14px] rounded-md transition-colors",
          isPopular
            ? "bg-black text-white hover:bg-[var(--color-ink-soft)]"
            : "bg-white text-black border border-[var(--color-greige)] hover:border-[var(--color-blue-ink)]",
        ].join(" ")}
      >
        {plan.cta.label}
        <span aria-hidden>→</span>
      </Link>
    </motion.article>
  );
}

/* ---------- 5. FAQ ---------- */

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is there a setup fee?",
    a: "No. Every plan includes onboarding, training, and AHPRA-aligned data migration from Pabau, Cliniko, Powerdiary, or paper. You pay your first monthly invoice after the 30-day free trial — nothing before.",
  },
  {
    q: "What's included in onboarding?",
    a: "Two weeks of guided setup with a Sydney-based onboarding lead. We migrate your client records, treatment history, consent forms, calendar, and S4 register; configure your services, memberships, and SMS templates; and train your full team on screen-share or on-site for Practice and Group plans.",
  },
  {
    q: "Can I switch from Pabau or Cliniko?",
    a: "Yes. We migrate clients, appointments, notes, consents, photos, and payments. Most clinics are live on Ruevii within two weeks of signing, with zero downtime on the day of cutover. We support exports from Pabau, Cliniko, Powerdiary, Nookal, and most other AU clinical systems.",
  },
  {
    q: "Where is my data stored?",
    a: "All clinical data is stored in Australia, on AWS Sydney (ap-southeast-2). Encryption at rest and in transit, with an immutable audit trail and AHPRA-aligned record retention. We never move clinical data offshore.",
  },
  {
    q: "What if I exceed my clinician seats?",
    a: "On the Practice plan, additional clinicians are $79/mo each, billed in the next monthly cycle — added or removed any time from the team settings. On Solo, you can upgrade to Practice in one click and keep your data, settings, and calendar history intact.",
  },
];

export function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-[var(--color-paper)]" id="faq">
      <div className="wrap section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          {/* LEFT — header */}
          <div className="lg:sticky lg:top-32">
            <EyebrowTag className="mb-5">FAQ</EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="The honest"
              secondary="answers."
            />
            <p className="mt-5 text-[15.5px] leading-[1.55] text-[var(--color-charcoal)] max-w-[40ch]">
              Five questions every Australian clinic asks us before they switch.
              If yours is not here, our team is one email away.
            </p>
            <Link
              href="/demo"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
            >
              Ask us anything
              <span aria-hidden>→</span>
            </Link>
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
                    <span className="font-serif text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.015em] text-black">
                      {f.q}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.24, ease: EASE }}
                      className="shrink-0 inline-flex w-9 h-9 rounded-full items-center justify-center border border-[var(--color-greige)] text-[var(--color-charcoal)]"
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
                        <p className="pb-7 pr-12 text-[15px] leading-[1.6] text-[var(--color-charcoal)] max-w-[62ch]">
                          {f.a}
                        </p>
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

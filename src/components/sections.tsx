"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Heart,
  HeartPulse,
  LineChart,
  MessagesSquare,
  PenLine,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import clsx from "clsx";
import {
  CountUp,
  Lift,
  Marquee,
  Reveal,
  Spotlight,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

/* ----------------------------- Problem Section ---------------------------- */

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
            The problem
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
            Running a clinic <span className="italic">shouldn't</span> feel this hard.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-soft)] leading-relaxed">
            Most practices stitch together six or seven tools — and pay for it in copy-paste,
            dropped charts and missed follow-ups. Reuvy is one calm system instead.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid lg:grid-cols-2 gap-6 lg:gap-8"
          delayChildren={0.05}
          stagger={0.12}
        >
          <StaggerItem>
            <Card title="The old way" subtle>
              <Stagger className="space-y-3" stagger={0.05}>
                {[
                  "Calendar app",
                  "Booking widget",
                  "Charts in Word",
                  "Stripe dashboard",
                  "Mailchimp",
                  "Spreadsheets for KPIs",
                  "WhatsApp for reminders",
                ].map((t) => (
                  <StaggerItem key={t} y={8}>
                    <div className="flex items-center justify-between rounded-lg bg-white border border-dashed border-[var(--color-line)] px-4 py-3 text-sm text-[var(--color-ink-soft)]">
                      <span>{t}</span>
                      <span className="text-xs text-[var(--color-muted)]">disconnected</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card title="The Reuvy way" highlight>
              <div className="rounded-xl bg-white border border-[var(--color-line)] p-6">
                <div className="flex items-center gap-2">
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-[var(--color-reuvy-400)] text-white text-sm">
                    R
                  </span>
                  <span className="font-serif text-lg">One platform</span>
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                    Live
                  </span>
                </div>
                <Stagger className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2" stagger={0.05}>
                  {[
                    ["Calendar", Calendar],
                    ["Booking", BadgeCheck],
                    ["EMR", ClipboardList],
                    ["Payments", CreditCard],
                    ["Marketing", MessagesSquare],
                    ["Reporting", LineChart],
                  ].map(([label, Icon]) => {
                    const I = Icon as React.ComponentType<{ size?: number }>;
                    return (
                      <StaggerItem key={label as string} y={8}>
                        <div className="flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-3 py-2.5 text-xs text-[var(--color-ink)] bg-white">
                          <I size={14} />
                          <span>{label as string}</span>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
                <p className="mt-5 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  One client record. One source of truth. One login for the whole team — and one
                  quiet, considered interface that gets out of your way.
                </p>
              </div>
            </Card>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function Card({
  title,
  children,
  subtle,
  highlight,
}: {
  title: string;
  children: React.ReactNode;
  subtle?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-3xl p-6 md:p-8 border",
        subtle && "bg-[var(--color-mist)] border-[var(--color-line)]",
        highlight && "tinted border-[var(--color-reuvy-200)]",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-[var(--color-ink)]">{title}</h3>
        {highlight && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[var(--color-reuvy-200)] text-[var(--color-reuvy-700)]">
            Reuvy
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ----------------------------- Core Features ----------------------------- */

const FEATURES = [
  {
    eyebrow: "Patient care & records",
    title: "A clinical record your team actually wants to write in.",
    body:
      "Charting, photos, consent and history in one calm timeline. Templates per treatment, version history per visit, and AHPRA-aware fields built into the form itself.",
    bullets: ["Visual treatment timelines", "Photo capture + before/after", "Consent & risks tracked"],
    visual: "emr",
  },
  {
    eyebrow: "Scheduling & payments",
    title: "Bookings that fill themselves. Payments that just happen.",
    body:
      "A public booking widget that respects your real availability, automatic SMS reminders that cut no-shows, and card-on-file checkout that takes seconds.",
    bullets: ["Online booking widget", "Card-on-file & payment plans", "Automatic reminders + waitlist"],
    visual: "booking",
  },
  {
    eyebrow: "Operations & team",
    title: "Run the whole back office without leaving Reuvy.",
    body:
      "Inventory, suppliers, staff rosters, commissions and tasks — all hanging off the same client and visit records the front desk lives in.",
    bullets: ["Inventory + auto-reorder", "Staff roster + commissions", "Task & workflow automation"],
    visual: "workflows",
  },
  {
    eyebrow: "Growth & insights",
    title: "Quiet, honest numbers — not vanity dashboards.",
    body:
      "Revenue per chair, retention by treatment, LTV by acquisition channel. Pre-built reports for the things that actually move a practice.",
    bullets: ["Revenue & retention", "Marketing attribution", "Custom reports & exports"],
    visual: "payments",
  },
] as const;

export function CoreFeatures() {
  return (
    <section id="features" className="py-24 md:py-32 tinted">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
            What's inside
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
            Everything a modern practice needs —{" "}
            <span className="italic">nothing</span> it doesn't.
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20 space-y-24 md:space-y-32">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.title} feature={f} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  flip,
  index,
}: {
  feature: (typeof FEATURES)[number];
  flip: boolean;
  index: number;
}) {
  return (
    <div
      className={clsx(
        "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center",
        flip && "lg:[&>*:first-child]:order-2",
      )}
    >
      <Reveal y={32}>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
          0{index + 1} · {feature.eyebrow}
        </p>
        <h3 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[var(--color-ink)]">
          {feature.title}
        </h3>
        <p className="mt-5 text-lg text-[var(--color-ink-soft)] leading-relaxed">{feature.body}</p>
        <Stagger className="mt-6 space-y-2.5" stagger={0.06}>
          {feature.bullets.map((b) => (
            <StaggerItem key={b} y={6}>
              <div className="flex items-center gap-3 text-[var(--color-ink-soft)]">
                <span className="grid place-items-center h-5 w-5 rounded-full bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                    <path d="M6.2 10.6L3.6 8l-1 1L6.2 12.6 13.4 5.4l-1-1z" />
                  </svg>
                </span>
                <span className="text-[15px]">{b}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <a
          href="#"
          className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-reuvy-700)] group"
        >
          Explore {feature.eyebrow.toLowerCase()}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>

      <Reveal y={40} delay={0.1}>
        <FeatureVisual variant={feature.visual} />
      </Reveal>
    </div>
  );
}

function FeatureVisual({ variant }: { variant: string }) {
  return (
    <Lift amount={-6}>
      <div className="relative">
        <motion.div
          aria-hidden
          animate={{ opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-6 rounded-[2rem] -z-10"
          style={{
            background:
              "radial-gradient(closest-side, rgba(155,183,209,0.35), transparent 75%)",
          }}
        />
        <div className="rounded-2xl bg-white border border-[var(--color-line)] shadow-[0_30px_80px_-30px_rgba(15,29,43,0.18)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--color-line)] flex items-center justify-between">
            <span className="text-xs text-[var(--color-muted)]">reuvy.app / {variant}</span>
            <span className="text-xs text-[var(--color-reuvy-700)]">Live preview</span>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-b from-white to-[var(--color-mist)]">
            {variant === "emr" && <EmrPanel />}
            {variant === "booking" && <BookingPanel />}
            {variant === "workflows" && <WorkflowPanel />}
            {variant === "payments" && <PaymentsPanel />}
          </div>
        </div>
      </div>
    </Lift>
  );
}

function EmrPanel() {
  return (
    <Stagger className="space-y-3" stagger={0.07}>
      <StaggerItem y={6}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--color-reuvy-200)]" />
          <div>
            <p className="text-sm font-medium">Sarah Chen</p>
            <p className="text-xs text-[var(--color-muted)]">Visit 04 · Hydrafacial protocol</p>
          </div>
        </div>
      </StaggerItem>
      {[
        ["Concern", "Pigmentation, mild texture"],
        ["Plan", "3× Hydrafacial + topical brightening"],
        ["Risks", "Mild erythema · sun avoidance 48h"],
      ].map(([k, v]) => (
        <StaggerItem key={k} y={6}>
          <div className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">{k}</p>
            <p className="text-sm text-[var(--color-ink)] mt-0.5">{v}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function BookingPanel() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg bg-white border border-[var(--color-line)] p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">Treatment</p>
        <p className="text-sm mt-1">Hydrafacial · 60 min</p>
      </div>
      <div className="rounded-lg bg-white border border-[var(--color-line)] p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">Clinician</p>
        <p className="text-sm mt-1">Dr. Amber Lee</p>
      </div>
      <div className="col-span-2 grid grid-cols-4 gap-2">
        {["9:00", "10:30", "12:00", "1:30"].map((t, i) => (
          <div
            key={t}
            className={clsx(
              "text-center py-2 rounded-md text-sm border",
              i === 1
                ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                : "bg-white border-[var(--color-line)]",
            )}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="col-span-2 rounded-lg bg-[var(--color-reuvy-50)] border border-[var(--color-reuvy-200)] p-3 text-xs text-[var(--color-reuvy-800)]">
        Confirmed at 10:30am · SMS sent · added to Sarah's portal.
      </div>
    </div>
  );
}

function WorkflowPanel() {
  return (
    <Stagger className="space-y-3" stagger={0.06}>
      {[
        ["Pre-visit reminder", "1 day before · SMS + email"],
        ["Aftercare", "2h after visit · curated PDF"],
        ["Review request", "+14 days · Google + internal"],
        ["Rebook", "+6 weeks · suggested time"],
      ].map(([t, s], i) => (
        <StaggerItem key={t} y={6}>
          <div className="flex items-center gap-3 rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5">
            <span className="grid place-items-center h-7 w-7 rounded-full bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)] text-xs">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm text-[var(--color-ink)]">{t}</p>
              <p className="text-xs text-[var(--color-muted)]">{s}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
              Auto
            </span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function PaymentsPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Today", "$4,820"],
          ["MTD", "$96,140"],
          ["Avg ticket", "$248"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white border border-[var(--color-line)] p-3">
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">{k}</p>
            <p className="font-serif text-xl mt-1">{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white border border-[var(--color-line)] p-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span>Last 7 days</span>
          <span className="text-[var(--color-reuvy-700)]">+12.4%</span>
        </div>
        <svg viewBox="0 0 200 60" className="mt-2 w-full h-16">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            d="M0 40 L20 38 L40 30 L60 32 L80 22 L100 26 L120 14 L140 18 L160 10 L180 14 L200 6"
            fill="none"
            stroke="var(--color-reuvy-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0 40 L20 38 L40 30 L60 32 L80 22 L100 26 L120 14 L140 18 L160 10 L180 14 L200 6 L200 60 L0 60 Z"
            fill="url(#g)"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-reuvy-400)" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------ AI Features ----------------------------- */

const AI_AGENTS = [
  {
    name: "Scribe",
    title: "Listens, drafts, never interrupts.",
    body:
      "Ambient consult notes that respect your phrasing, your templates and your compliance fields. Ready to sign in seconds.",
    Icon: PenLine,
  },
  {
    name: "Prescribing",
    title: "AHPRA-aware, doctor-led.",
    body:
      "Surfaces relevant history, allergens and contraindications before a prescription is drafted — every script reviewed by a clinician.",
    Icon: Pill,
  },
  {
    name: "Letters",
    title: "Referrals, reports and recalls — written for you.",
    body:
      "Pulls from the chart, matches the recipient's tone and format, and waits for your sign-off. Hours back, every week.",
    Icon: MessagesSquare,
  },
] as const;

export function AIFeatures() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)] flex items-center gap-2">
            <Sparkles size={12} /> Reuvy AI
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
            Three quiet agents that{" "}
            <span className="italic">give your team back its hours.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
            Reuvy AI sits inside the workflow, not on top of it — drafting, summarising and tidying
            up so your clinicians can stay present with the person in front of them.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid md:grid-cols-3 gap-4 md:gap-6" stagger={0.1}>
          {AI_AGENTS.map(({ name, title, body, Icon }) => (
            <StaggerItem key={name}>
              <Lift amount={-8}>
                <Spotlight className="rounded-3xl border border-[var(--color-line)] bg-white p-7 hover:border-[var(--color-reuvy-300)] transition-colors h-full">
                  <div className="flex items-center justify-between">
                    <span className="grid place-items-center h-11 w-11 rounded-2xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {name}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl leading-tight">{title}</h3>
                  <p className="mt-3 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                    {body}
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-reuvy-700)] group"
                  >
                    See it in motion
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                </Spotlight>
              </Lift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- Metrics ------------------------------- */

const METRICS: {
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  source: string;
}[] = [
  { value: 31, suffix: "%", label: "fewer no-shows after switching", source: "Reuvy customer panel, 2025" },
  { value: 4.2, decimals: 1, suffix: "h", label: "saved per clinician per week", source: "Avg. across 1,200 practices" },
  { value: 1.8, decimals: 1, suffix: "×", label: "higher repeat booking rate", source: "Med spa cohort · 12 months" },
  { prefix: "$", value: 0, label: "to migrate your existing data", source: "Onboarding included" },
];

export function Metrics() {
  return (
    <section id="why" className="py-24 md:py-32 bg-[var(--color-ink)] text-white relative overflow-hidden">
      {/* faint moving glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,183,209,0.25), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-300)]">
            Real outcomes
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-white">
            What practices feel <span className="italic">in the first 90 days.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.1}>
          {METRICS.map((m) => (
            <StaggerItem key={m.label}>
              <Lift amount={-6}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm h-full">
                  <p className="font-serif text-5xl lg:text-6xl text-white">
                    <CountUp
                      to={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      decimals={m.decimals ?? 0}
                    />
                  </p>
                  <p className="mt-3 text-white/85 text-[15px] leading-snug">{m.label}</p>
                  <p className="mt-4 text-xs text-white/45">{m.source}</p>
                </div>
              </Lift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ---------------------------- */

const QUOTES = [
  {
    quote:
      "We replaced four tools with Reuvy in a single weekend. The team breathed out for the first time in years.",
    name: "Amberley Hudson",
    role: "Founder, The Dream Skin Co",
    initials: "AH",
  },
  {
    quote:
      "The scribe alone gave each of our injectors back half a day a week. The booking widget paid for itself in the first month.",
    name: "Dr. Mara Klein",
    role: "Medical Director, Bloom Aesthetics",
    initials: "MK",
  },
  {
    quote:
      "It's the first practice system that actually feels considered — like someone who's worked a front desk designed it.",
    name: "Priya Natarajan",
    role: "Operations Lead, Lumen Clinic",
    initials: "PN",
  },
  {
    quote:
      "We went from spreadsheets and guesswork to knowing exactly which treatments to lean into. Margin's up 22%.",
    name: "Jonas Vidal",
    role: "Owner, Vidal Skin & Body",
    initials: "JV",
  },
] as const;

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              From the people who run them
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
              Loved by founders, <span className="italic">trusted</span> by clinicians.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span>★★★★★</span>
            <span>4.8 average · 3,500+ practices</span>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid md:grid-cols-2 gap-5" stagger={0.08}>
          {QUOTES.map((q) => (
            <StaggerItem key={q.name}>
              <Lift amount={-6}>
                <Spotlight className="rounded-3xl border border-[var(--color-line)] bg-white p-8 md:p-10 h-full transition-colors hover:border-[var(--color-reuvy-300)]">
                  <figure>
                    <blockquote className="font-serif text-2xl md:text-[28px] leading-[1.25] text-[var(--color-ink)]">
                      "{q.quote}"
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3">
                      <span className="grid place-items-center h-11 w-11 rounded-full bg-[var(--color-reuvy-200)] text-[var(--color-reuvy-800)] font-medium text-sm">
                        {q.initials}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-ink)]">{q.name}</p>
                        <p className="text-xs text-[var(--color-muted)]">{q.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Spotlight>
              </Lift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Integrations ---------------------------- */

const INTEGRATIONS_A = [
  "Stripe",
  "Xero",
  "Google Calendar",
  "HubSpot",
  "Klarna",
  "WhatsApp",
  "Zapier",
  "Healthcode",
];

const INTEGRATIONS_B = [
  "Mailchimp",
  "Twilio",
  "QuickBooks",
  "Slack",
  "Apple Pay",
  "Outlook",
  "Square",
  "Notion",
];

export function Integrations() {
  return (
    <section id="resources" className="py-20 md:py-24 tinted">
      <div className="container-x">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
            Integrations
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl">
            Plays nicely with the tools <span className="italic">you already use.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, white, transparent)" }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, white, transparent)" }}
            />
            <Marquee>
              {INTEGRATIONS_A.map((name) => (
                <IntegrationPill key={name} name={name} />
              ))}
            </Marquee>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, white, transparent)" }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, white, transparent)" }}
            />
            <Marquee reverse speed={44}>
              {INTEGRATIONS_B.map((name) => (
                <Pill key={name} name={name} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--color-line)] bg-white text-sm text-[var(--color-ink-soft)] mr-3 whitespace-nowrap">
      <span className="h-2 w-2 rounded-full bg-[var(--color-reuvy-400)]" />
      {name}
    </span>
  );
}

/* ----------------------------- Practice Types --------------------------- */

const PRACTICES = [
  { name: "Med Spa", Icon: Sparkles },
  { name: "Aesthetics Clinic", Icon: Heart },
  { name: "Dermatology", Icon: ShieldCheck },
  { name: "Physiotherapy", Icon: HeartPulse },
  { name: "Wellness & IV", Icon: Stethoscope },
  { name: "Hair Restoration", Icon: Users },
  { name: "Plastic Surgery", Icon: ClipboardList },
  { name: "Multi-location Groups", Icon: LineChart },
];

export function PracticeTypes() {
  return (
    <section id="practice-types" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              Who Reuvy is for
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
              Built for every <span className="italic">kind of practice.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--color-ink-soft)] leading-relaxed">
              Single-room studios to fifty-chair groups — Reuvy adapts to the way you actually
              work, not the other way around.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-reuvy-700)] group"
            >
              See all specialties
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>

          <Stagger className="lg:col-span-7 grid sm:grid-cols-2 gap-3" stagger={0.05}>
            {PRACTICES.map(({ name, Icon }) => (
              <StaggerItem key={name} y={10}>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 360, damping: 24 }}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-[var(--color-line)] hover:border-[var(--color-reuvy-300)] hover:bg-[var(--color-reuvy-50)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                      <Icon size={18} />
                    </span>
                    <span className="font-serif text-lg text-[var(--color-ink)]">{name}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--color-muted)] group-hover:text-[var(--color-reuvy-700)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </motion.a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ -------------------------------- */

const FAQS = [
  {
    q: "How long does it take to switch to Reuvy?",
    a: "Most single-location practices are live in 2–3 weeks. Multi-location groups take 4–6 weeks. We migrate your existing clients, treatments and visit history for you.",
  },
  {
    q: "Is Reuvy HIPAA and AHPRA compliant?",
    a: "Yes. Reuvy is HIPAA compliant, ISO 27001 certified, and built with AHPRA-aware fields baked into the consultation flow.",
  },
  {
    q: "Will it replace the rest of my software?",
    a: "Reuvy replaces your calendar, booking widget, EMR, payments, marketing, loyalty, reporting and forms. Keep your accounting and clinical imaging tools — we integrate with both.",
  },
  {
    q: "What does support look like after we go live?",
    a: "Every practice gets a named onboarding lead for the first 90 days, then ongoing access to our in-app chat, weekly office hours, and a library of short, useful guides.",
  },
  {
    q: "Can Reuvy handle multiple locations and brands?",
    a: "Yes — Reuvy is multi-tenant by design. Roll up reporting across the group, keep clinical records isolated per location, and run brand-specific marketing from one account.",
  },
  {
    q: "How is pricing structured?",
    a: "A flat monthly per-location fee plus a small per-clinician charge. No setup fees, no per-feature add-ons, no surprises.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 tinted">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Things people ask, <span className="italic">before</span> they switch.
            </h2>
            <p className="mt-5 text-[var(--color-ink-soft)]">
              Can't find what you're looking for?{" "}
              <a href="#" className="underline decoration-[var(--color-reuvy-400)] underline-offset-4">
                Talk to the team
              </a>
              .
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} y={10} delay={i * 0.04}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left py-6 group"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="font-serif text-xl md:text-2xl text-[var(--color-ink)] leading-snug">
                          {f.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1 : 1 }}
                          transition={{ type: "spring", stiffness: 380, damping: 24 }}
                          className={clsx(
                            "shrink-0 grid place-items-center h-9 w-9 rounded-full border transition-colors",
                            isOpen
                              ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                              : "border-[var(--color-line)] text-[var(--color-ink-soft)] group-hover:border-[var(--color-reuvy-400)]",
                          )}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.21, 0.61, 0.27, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-[15px] text-[var(--color-ink-soft)] leading-relaxed max-w-2xl">
                              {f.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA ------------------------------ */

export function FinalCTA() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal y={32}>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-reuvy-200)] tinted px-8 md:px-16 py-16 md:py-24">
            <motion.div
              aria-hidden
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 -right-32 h-96 w-96 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(155,183,209,0.55), transparent 70%)",
              }}
            />
            <div className="relative max-w-3xl">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
                Ready when you are
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">
                One quiet system, built for clinical care and{" "}
                <span className="italic">practice growth.</span>
              </h2>
              <p className="mt-6 text-lg text-[var(--color-ink-soft)] leading-relaxed">
                Join 3,500+ practices delivering modern care without the chaos. 30-minute demo, no
                pressure, no slides full of buzzwords.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#demo"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  className="group inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--color-reuvy-700)] transition-colors"
                >
                  Book a demo
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </motion.a>
                <motion.a
                  href="#tour"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  className="inline-flex items-center justify-center gap-2 border border-[var(--color-reuvy-300)] hover:border-[var(--color-reuvy-500)] text-[var(--color-ink)] px-6 py-3.5 rounded-full text-sm font-medium bg-white/60 transition-colors"
                >
                  Take a product tour
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

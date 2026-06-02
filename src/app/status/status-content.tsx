"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  Activity,
  Bell,
  Rss,
  Server,
  LayoutGrid,
  Globe,
  Webhook,
  MessageSquare,
  CreditCard,
  Database,
  CloudCog,
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
/*  Status semantic tokens                                                     */
/* -------------------------------------------------------------------------- */

type StatusLevel = "operational" | "degraded" | "outage";

const STATUS_TONE: Record<
  StatusLevel,
  { label: string; dot: string; bg: string; fg: string; border: string; sparkline: string }
> = {
  operational: {
    label: "Operational",
    dot: "#4a8b6a",
    bg: "color-mix(in srgb, #4a8b6a 12%, white)",
    fg: "#3e6e54",
    border: "color-mix(in srgb, #4a8b6a 32%, white)",
    sparkline: "#4a8b6a",
  },
  degraded: {
    label: "Degraded",
    dot: "#c08d3f",
    bg: "color-mix(in srgb, #c08d3f 14%, white)",
    fg: "#8a6320",
    border: "color-mix(in srgb, #c08d3f 38%, white)",
    sparkline: "#c08d3f",
  },
  outage: {
    label: "Outage",
    dot: "#9c4d4d",
    bg: "color-mix(in srgb, #9c4d4d 14%, white)",
    fg: "#7a3b3b",
    border: "color-mix(in srgb, #9c4d4d 38%, white)",
    sparkline: "#9c4d4d",
  },
};

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

type Component = {
  name: string;
  desc: string;
  icon: typeof Server;
  status: StatusLevel;
  // 12-point sparkline of response-time / uptime trend, normalised 0..1
  points: number[];
};

const COMPONENTS: Component[] = [
  {
    name: "API",
    desc: "Public REST API and webhooks dispatch.",
    icon: Server,
    status: "operational",
    points: [0.6, 0.62, 0.58, 0.55, 0.6, 0.57, 0.59, 0.56, 0.6, 0.58, 0.55, 0.57],
  },
  {
    name: "Web app",
    desc: "Practitioner dashboard at app.ruevii.com.au.",
    icon: LayoutGrid,
    status: "operational",
    points: [0.4, 0.42, 0.4, 0.38, 0.41, 0.43, 0.4, 0.39, 0.42, 0.4, 0.38, 0.4],
  },
  {
    name: "Booking widget",
    desc: "Embeddable patient-facing booking flow.",
    icon: Globe,
    status: "operational",
    points: [0.5, 0.48, 0.5, 0.49, 0.51, 0.5, 0.48, 0.5, 0.52, 0.5, 0.49, 0.5],
  },
  {
    name: "Webhooks",
    desc: "Outbound delivery to integrated systems.",
    icon: Webhook,
    status: "operational",
    points: [0.45, 0.47, 0.46, 0.48, 0.5, 0.47, 0.49, 0.48, 0.46, 0.47, 0.48, 0.46],
  },
  {
    name: "SMS (Twilio AU)",
    desc: "Two-way SMS delivery via Twilio's Sydney edge.",
    icon: MessageSquare,
    status: "operational",
    points: [0.55, 0.6, 0.62, 0.65, 0.6, 0.58, 0.62, 0.6, 0.58, 0.6, 0.58, 0.6],
  },
  {
    name: "Payments (Stripe)",
    desc: "Card-present, card-on-file and payment links.",
    icon: CreditCard,
    status: "operational",
    points: [0.5, 0.52, 0.5, 0.48, 0.51, 0.5, 0.5, 0.49, 0.5, 0.51, 0.5, 0.49],
  },
  {
    name: "Database (AWS Sydney)",
    desc: "Primary RDS cluster, ap-southeast-2.",
    icon: Database,
    status: "operational",
    points: [0.35, 0.36, 0.34, 0.35, 0.36, 0.35, 0.34, 0.36, 0.35, 0.34, 0.36, 0.35],
  },
  {
    name: "CDN",
    desc: "Static assets and image delivery at the edge.",
    icon: CloudCog,
    status: "operational",
    points: [0.4, 0.42, 0.41, 0.43, 0.41, 0.42, 0.4, 0.41, 0.43, 0.42, 0.41, 0.42],
  },
];

/* -------------------------------------------------------------------------- */
/*  Incidents                                                                  */
/* -------------------------------------------------------------------------- */

type Incident = {
  date: string;
  title: string;
  duration: string;
  status: "Resolved" | "Monitoring" | "Investigating";
  body: string;
};

const INCIDENTS: Incident[] = [
  {
    date: "2026-05-28",
    title: "Elevated booking-widget latency (ap-southeast-2)",
    duration: "22 min",
    status: "Resolved",
    body: "A CDN cache key rotation caused widget HTML to bypass edge caches between 14:08–14:30 AEST. Rolled back the change; cache hit rate recovered immediately. No booking submissions lost.",
  },
  {
    date: "2026-05-14",
    title: "SMS delivery delay (Twilio AU upstream)",
    duration: "47 min",
    status: "Resolved",
    body: "Twilio reported degraded delivery to Optus & TPG numbers between 09:12–09:59 AEST. Queued messages were delivered automatically once upstream recovered; no manual replays required.",
  },
  {
    date: "2026-04-30",
    title: "Webhook dispatch backlog",
    duration: "1 hr 14 min",
    status: "Resolved",
    body: "An off-by-one rate limiter slowed the webhook worker pool. Increased worker concurrency and shipped a fix the same evening. All events delivered, none dropped.",
  },
  {
    date: "2026-04-18",
    title: "Brief Stripe terminal pairing failures",
    duration: "9 min",
    status: "Resolved",
    body: "Stripe Terminal pairing endpoint returned 502s for a small window. Pre-paired devices were unaffected; new device pairings retried successfully after the incident.",
  },
  {
    date: "2026-04-03",
    title: "Web app slow asset loading",
    duration: "31 min",
    status: "Resolved",
    body: "A cold deploy left CDN edge caches empty in two regions. Warmed manually and added a deploy step to prime caches before traffic cuts over.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function StatusContent() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <StatusHero />
        <ComponentGrid />
        <IncidentHistory />
        <SubscribeBand />
        <ClosingCTABand
          primary="Calm software,"
          secondary="written down in public."
          ctaPrimary={{ label: "Book a demo", href: "/demo" }}
          ctaSecondary={{ label: "See roadmap", href: "/roadmap" }}
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

function StatusHero() {
  return (
    <section className="wrap pt-[72px] pb-[48px] max-md:pt-12 max-md:pb-8">
      <div className="max-w-[68ch] flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <EyebrowTag icon={Activity}>Status</EyebrowTag>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex flex-wrap items-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
            style={{
              background: STATUS_TONE.operational.bg,
              color: STATUS_TONE.operational.fg,
              borderColor: STATUS_TONE.operational.border,
            }}
          >
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[10px] h-[10px] rounded-full"
              style={{ background: STATUS_TONE.operational.dot }}
            />
            <span className="text-[15px] font-medium leading-none">
              All systems operational
            </span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          <TwoToneHeadline
            as="h1"
            primary="Live status."
            secondary="Honest, mono-typed, in your timezone."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="flex flex-wrap items-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--color-greige)] bg-white"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
              Uptime 90d
            </span>
            <span className="font-mono text-[15px] tracking-[0.02em] text-black">
              99.97%
            </span>
          </span>
          <span
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--color-greige)] bg-white"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span
              aria-hidden
              className="w-[6px] h-[6px] rounded-full"
              style={{ background: STATUS_TONE.operational.dot }}
            />
            <span className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--color-charcoal)]">
              Last checked 2 minutes ago
            </span>
          </span>
          <span
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--color-greige)] bg-white"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--color-charcoal)]">
              Region · ap-southeast-2 (Sydney)
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Component grid                                                          */
/* -------------------------------------------------------------------------- */

function ComponentGrid() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2
              className="font-serif text-[clamp(26px,3vw,40px)] tracking-[-0.015em] text-black leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Components
            </h2>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              8 services · refreshed every 60s
            </span>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2" stagger={0.05}>
          {COMPONENTS.map((c) => (
            <StaggerItem key={c.name} y={12}>
              <ComponentRow component={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ComponentRow({ component }: { component: Component }) {
  const tone = STATUS_TONE[component.status];
  const Icon = component.icon;
  return (
    <article className="flex items-center gap-4 rounded-lg bg-white border border-[var(--color-greige)] p-[18px] transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-blue)_45%,white)]">
      <span className="w-10 h-10 shrink-0 rounded-md grid place-items-center bg-[color-mix(in_srgb,var(--color-blue)_12%,white)]">
        <Icon size={16} className="text-[var(--color-blue-ink)]" aria-hidden />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <h3
            className="font-serif text-[18px] leading-[1.2] tracking-[-0.005em] text-black truncate"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {component.name}
          </h3>
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.14em] px-2 py-1 rounded-full border shrink-0"
            style={{
              fontFamily: "var(--font-mono)",
              background: tone.bg,
              color: tone.fg,
              borderColor: tone.border,
            }}
          >
            <span
              aria-hidden
              className="w-[6px] h-[6px] rounded-full"
              style={{ background: tone.dot }}
            />
            {tone.label}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-charcoal)] truncate">
          {component.desc}
        </p>
      </div>

      <Sparkline points={component.points} color={tone.sparkline} />
    </article>
  );
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const W = 80;
  const H = 20;
  const padY = 2;
  const n = points.length;
  const step = W / (n - 1);
  const usable = H - padY * 2;
  const d = points
    .map((p, i) => {
      const x = (i * step).toFixed(2);
      const y = (padY + (1 - p) * usable).toFixed(2);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  const lastX = (W).toFixed(2);
  const lastY = (padY + (1 - points[points.length - 1]) * usable).toFixed(2);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="shrink-0"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
      <circle cx={lastX} cy={lastY} r={1.8} fill={color} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Incident history                                                        */
/* -------------------------------------------------------------------------- */

function IncidentHistory() {
  return (
    <section className="bg-[var(--color-paper)] border-t border-[var(--color-greige)] section">
      <div className="wrap">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="flex flex-col gap-3 max-w-[48ch]">
              <EyebrowTag icon={Activity}>Incident history</EyebrowTag>
              <TwoToneHeadline
                as="h2"
                primary="Past 60 days,"
                secondary="resolved with a short post-mortem."
              />
            </div>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              5 incidents · all resolved
            </span>
          </div>
        </Reveal>

        <Stagger className="mt-12 flex flex-col">
          {INCIDENTS.map((inc, idx) => (
            <StaggerItem key={inc.date + inc.title} y={10}>
              <IncidentRow incident={inc} isFirst={idx === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function IncidentRow({
  incident,
  isFirst,
}: {
  incident: Incident;
  isFirst: boolean;
}) {
  return (
    <article
      className={[
        "grid gap-5 py-6 grid-cols-[160px_1fr_120px] max-md:grid-cols-1 max-md:gap-2 items-start",
        isFirst ? "border-t border-[var(--color-greige)]" : "",
        "border-b border-[var(--color-greige)]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-1">
        <span
          className="font-mono text-[12.5px] tracking-[0.04em] text-[var(--color-charcoal)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {incident.date}
        </span>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-mute)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {incident.duration}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[68ch]">
        <h3
          className="font-serif text-[19px] leading-[1.25] tracking-[-0.005em] text-black"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {incident.title}
        </h3>
        <p className="text-[14.5px] leading-[1.6] text-[var(--color-charcoal)]">
          {incident.body}
        </p>
      </div>

      <div className="md:justify-self-end">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.14em] px-2 py-1 rounded-full border"
          style={{
            fontFamily: "var(--font-mono)",
            background: STATUS_TONE.operational.bg,
            color: STATUS_TONE.operational.fg,
            borderColor: STATUS_TONE.operational.border,
          }}
        >
          <span
            aria-hidden
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: STATUS_TONE.operational.dot }}
          />
          {incident.status}
        </span>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Subscribe to updates                                                    */
/* -------------------------------------------------------------------------- */

function SubscribeBand() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section
      className="border-t border-[var(--color-greige)] section-sm"
      style={{ background: "var(--color-greige-2)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-4 max-w-[52ch]">
              <EyebrowTag icon={Bell}>Subscribe to updates</EyebrowTag>
              <TwoToneHeadline
                as="h2"
                primary="Hear it first,"
                secondary="without refreshing the page."
              />
              <p className="mt-3 text-[16.5px] leading-[1.6] text-[var(--color-charcoal)] max-w-[50ch]">
                Get an email the moment a component degrades and again when it
                recovers. We only email about real status &mdash; never product
                marketing.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3 rounded-xl bg-white border border-[var(--color-greige)] p-5"
              >
                <label
                  htmlFor="status-email"
                  className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Email address
                </label>
                <div className="flex gap-2 max-md:flex-col">
                  <input
                    id="status-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@clinic.com.au"
                    className="flex-1 px-4 py-[12px] rounded-md bg-[var(--color-paper)] border border-[var(--color-greige)] text-[15px] text-black placeholder:text-[var(--color-mute)] focus:outline-none focus:border-[var(--color-blue-ink)] focus:bg-white transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 1 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="inline-flex items-center justify-center gap-[8px] text-[15px] font-medium leading-none px-5 py-[12px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-[13px] text-[var(--color-blue-ink)]"
                  >
                    Subscribed &mdash; check your inbox for a confirmation
                    email.
                  </motion.p>
                )}
              </form>

              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="/status.rss"
                  className="inline-flex items-center gap-[8px] text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
                >
                  <Rss size={14} className="text-[var(--color-blue-ink)]" aria-hidden />
                  RSS feed
                </a>
                <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-[var(--color-mute)]" />
                <a
                  href="/status.json"
                  className="inline-flex items-center gap-[8px] text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  status.json
                </a>
                <span aria-hidden className="w-[3px] h-[3px] rounded-full bg-[var(--color-mute)]" />
                <a
                  href="mailto:status@ruevii.com.au"
                  className="inline-flex items-center gap-[8px] text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
                >
                  status@ruevii.com.au
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default StatusContent;

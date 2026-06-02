"use client";

import { motion } from "motion/react";
import {
  Code2,
  Webhook,
  Box,
  KeyRound,
  Gauge,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ClosingCTABand,
  EyebrowTag,
  FeatureCard,
  HighlightBlock,
  ProductScreenshot,
  StatBand,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const CAPABILITY_CARDS = [
  {
    icon: Code2,
    title: "REST API",
    body:
      "Every entity in the schema is queryable: clients, appointments, sales, conversations, messages, memberships and gift cards — JSON in, JSON out.",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    body:
      "Signed delivery of events: appointment.created, sale.completed, message.received and more. Retries with exponential backoff.",
  },
  {
    icon: Box,
    title: "Embeds",
    body:
      "Drop-in booking widget, payment link, and intake form — branded to your clinic and embeddable on Squarespace, Webflow or vanilla HTML.",
  },
];

const REST_BULLETS = [
  "All endpoints under /v1 — versioned, never breaking",
  "Cursor-based pagination on every list endpoint",
  "Bearer-token auth, scoped per workspace",
];

const WEBHOOK_BULLETS = [
  "HMAC-SHA256 signature in the X-Ruevii-Signature header",
  "30 event types across appointments, sales and conversations",
  "Automatic retries for 24 hours with exponential backoff",
];

const AUTH_ITEMS = [
  {
    title: "API key",
    body: "Scoped per workspace. Rotatable from the dashboard.",
  },
  {
    title: "Permissions",
    body: "Read-only, read-write, or per-resource scopes.",
  },
  {
    title: "OAuth 2.0",
    body: "On the roadmap for partner-built apps. Q4 2026.",
  },
];

const RATE_LIMITS = [
  {
    title: "Free / Pro",
    body: "60 requests per minute per API key.",
  },
  {
    title: "Practice",
    body: "600 requests per minute, burst to 1,200 for 10 seconds.",
  },
  {
    title: "Enterprise",
    body: "Custom limits — talk to your account manager.",
  },
];

type SdkStatus = "Beta" | "Coming soon" | "Planned";
const SDKS: { lang: string; status: SdkStatus; note: string }[] = [
  {
    lang: "TypeScript",
    status: "Beta",
    note: "npm i @ruevii/sdk · typed end-to-end against our OpenAPI schema",
  },
  {
    lang: "Python",
    status: "Coming soon",
    note: "pip install ruevii · for back-office scripts and data pipelines",
  },
  {
    lang: "Ruby",
    status: "Planned",
    note: "Q1 2027 — vote on the roadmap to bump priority",
  },
];

const STATUS_PILL_TONE: Record<SdkStatus, string> = {
  Beta:
    "bg-[color-mix(in_srgb,var(--color-blue)_22%,white)] text-[var(--color-blue-ink)] border-[color-mix(in_srgb,var(--color-blue)_45%,white)]",
  "Coming soon":
    "bg-[var(--color-greige-2)] text-[var(--color-charcoal)] border-[var(--color-greige)]",
  Planned:
    "bg-white text-[var(--color-mute)] border-[var(--color-greige)]",
};

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function DevelopersContent() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <ScrollProgress />
      <SiteNav />

      <DevHero />
      <CapabilityRow />
      <RestApiHighlight />
      <WebhooksHighlight />
      <AuthAndLimits />
      <DevStatBand />
      <SdkRoadmap />

      <ClosingCTABand
        primary="Build on a calmer clinic stack."
        secondary="Ship in an afternoon."
        ctaPrimary={{ label: "Get an API key", href: "#" }}
        ctaSecondary={{ label: "Read the docs", href: "#" }}
      />

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Hero                                                                    */
/* -------------------------------------------------------------------------- */

function DevHero() {
  return (
    <section className="w-full bg-[var(--color-paper)] relative overflow-hidden">
      <div className="wrap pt-[88px] pb-[64px] md:pt-[120px] md:pb-[88px] relative">
        <div className="flex flex-col items-start max-w-[820px]">
          <Reveal>
            <EyebrowTag icon={Code2} className="mb-6">
              Developers
            </EyebrowTag>
          </Reveal>
          <Reveal delay={0.05}>
            <TwoToneHeadline
              as="h1"
              primary="Build on Ruevii."
              secondary="REST API, webhooks, embeds."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]">
              Public REST API, signed webhooks, and embeddable booking widgets.
              Authenticated with API keys, OAuth coming soon. Built for clinic
              partners, agencies and in-house product teams.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <motion.a
                href="#"
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[var(--color-ink-soft)] transition-colors"
              >
                Get an API key
                <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-white text-black border border-[var(--color-greige)] hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)] transition-colors"
              >
                Read the docs
              </motion.a>
            </div>
          </Reveal>

          {/* tiny tech meta strip */}
          <Reveal delay={0.24}>
            <div
              className="mt-10 inline-flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] font-mono uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]"
                />
                v1 stable
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]"
                />
                AU data residency
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]"
                />
                OpenAPI 3.1
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Capability row                                                          */
/* -------------------------------------------------------------------------- */

function CapabilityRow() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap section-sm pb-[88px]">
        <Stagger
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          stagger={0.07}
        >
          {CAPABILITY_CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <FeatureCard icon={c.icon} title={c.title} body={c.body} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. REST API highlight                                                      */
/* -------------------------------------------------------------------------- */

function RestApiHighlight() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-[64px] md:pb-[96px]">
        <Reveal>
          <HighlightBlock
            eyebrow="REST"
            title="Real columns, real enums, real responses."
            body="Every endpoint mirrors the production schema. No translation layer, no opaque IDs — appointments hang off resources, clients are keyed by client_uuid, and money is integer cents. The same shapes your dashboard reads."
            bullets={REST_BULLETS}
            visual={<RestApiCodeMock />}
          />
        </Reveal>
      </div>
    </section>
  );
}

function RestApiCodeMock() {
  return (
    <ProductScreenshot url="v1/appointments">
      <div
        className="bg-[var(--color-ink)] text-[#f4f3ee] font-mono text-[12px] leading-[1.65] p-5 overflow-hidden"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Request line */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-1.5 py-[2px] rounded-sm bg-[var(--color-blue)] text-[var(--color-ink)] text-[10px] font-medium tracking-[0.05em]">
            GET
          </span>
          <span className="text-white/90">/v1/appointments</span>
          <span className="text-white/35">?limit=2</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-white/35">Authorization:</span>
          <span className="text-[var(--color-blue)]/90">
            Bearer rk_live_a1b2…c9d0
          </span>
        </div>

        <div className="h-px bg-white/10 mb-4" />

        {/* Response */}
        <div className="flex items-center gap-2 mb-3 text-white/50">
          <span className="inline-flex items-center px-1.5 py-[2px] rounded-sm bg-white/10 text-[10px] tracking-[0.05em]">
            200 OK
          </span>
          <span className="text-white/35">application/json</span>
        </div>

        <pre className="whitespace-pre text-[11.5px] leading-[1.55] text-[#e6e5df]">{`{
  "data": [
    {
      "id": "apt_4f7c2a",
      "starts_at": "2026-06-04T10:30:00+10:00",
      "ends_at":   "2026-06-04T11:15:00+10:00",
      "status":    "confirmed",
      "client_uuid": "c_8a1d…",
      "resource_id": "res_nurse_eliza",
      "service_id": 142,
      "title": "Anti-wrinkle review — upper face"
    },
    {
      "id": "apt_4f7c2b",
      "starts_at": "2026-06-04T11:30:00+10:00",
      "ends_at":   "2026-06-04T12:00:00+10:00",
      "status":    "completed",
      "client_uuid": "c_91b2…",
      "resource_id": "res_room_2",
      "service_id": 207,
      "title": "Skin consult"
    }
  ],
  "next_cursor": "eyJpZCI6ImFwdF80ZjdjMmIifQ"
}`}</pre>

        <div className="h-px bg-white/10 my-5" />

        {/* POST sales response */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-1.5 py-[2px] rounded-sm bg-[var(--color-blue-ink)] text-white text-[10px] tracking-[0.05em]">
            POST
          </span>
          <span className="text-white/90">/v1/sales</span>
          <span className="text-white/35">→ 201 Created</span>
        </div>

        <pre className="whitespace-pre text-[11.5px] leading-[1.55] text-[#e6e5df]">{`{
  "id":            "sale_2e9a",
  "sale_number":   "S-10428",
  "client_uuid":   "c_8a1d…",
  "subtotal_cents": 47818,
  "gst_cents":       4782,
  "total_cents":    52600,
  "status":        "COMPLETED",
  "payment_method":"EFT_POS",
  "paid_at":       "2026-06-02T14:08:11+10:00"
}`}</pre>
      </div>
    </ProductScreenshot>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Webhooks highlight                                                      */
/* -------------------------------------------------------------------------- */

function WebhooksHighlight() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-[64px] md:pb-[96px]">
        <Reveal>
          <HighlightBlock
            eyebrow="Events"
            title="Subscribe to what your stack cares about."
            body="Webhooks fire the moment something changes in a clinic. Subscribe per event type, verify the signature, and let your stack react — sync to a data warehouse, post to Slack, or trigger your own automations."
            bullets={WEBHOOK_BULLETS}
            visual={<WebhookCodeMock />}
          />
        </Reveal>
      </div>
    </section>
  );
}

function WebhookCodeMock() {
  return (
    <ProductScreenshot url="webhooks/deliveries">
      <div
        className="bg-[var(--color-ink)] text-[#f4f3ee] font-mono text-[12px] leading-[1.65] p-5"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-3 text-white/50">
          <Webhook size={12} className="text-[var(--color-blue)]" />
          <span className="text-white/80">POST</span>
          <span className="text-white/60">https://your-api.com/webhooks</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-[10.5px]">
          <span className="text-white/35">X-Ruevii-Event:</span>
          <span className="text-[var(--color-blue)]/90">appointment.created</span>
          <span className="text-white/35">X-Ruevii-Signature:</span>
          <span className="text-white/70">t=1717294091,v1=8f3c…</span>
        </div>

        <div className="h-px bg-white/10 mb-4" />

        <pre className="whitespace-pre text-[11.5px] leading-[1.55] text-[#e6e5df]">{`{
  "id":         "evt_01HQ9Z…",
  "type":       "appointment.created",
  "created_at": "2026-06-02T09:14:33+10:00",
  "clinic_id":  "cli_skin_co_syd",
  "data": {
    "id":          "apt_4f7c2a",
    "starts_at":   "2026-06-04T10:30:00+10:00",
    "ends_at":     "2026-06-04T11:15:00+10:00",
    "status":      "pending",
    "client_uuid": "c_8a1d…",
    "resource_id": "res_nurse_eliza",
    "service_id":  142,
    "title":       "Anti-wrinkle review — upper face",
    "ai_noshow_tier": "LOW"
  }
}`}</pre>

        <div className="h-px bg-white/10 my-5" />

        {/* Event list preview */}
        <div className="text-white/50 mb-2 text-[10.5px] tracking-[0.06em] uppercase">
          Recent events
        </div>
        <ul className="space-y-1.5">
          {[
            { type: "sale.completed", id: "evt_01HQ9Y…", status: "200" },
            { type: "message.received", id: "evt_01HQ9X…", status: "200" },
            { type: "appointment.no_show", id: "evt_01HQ9W…", status: "200" },
            { type: "payment_request.paid", id: "evt_01HQ9V…", status: "200" },
          ].map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-3 px-2 py-1.5 rounded bg-white/[0.04]"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue)] shrink-0" />
                <span className="truncate text-[var(--color-blue)]/90">
                  {row.type}
                </span>
              </span>
              <span className="text-white/40 text-[10.5px] tabular-nums">
                {row.id}
              </span>
              <span className="text-white/70 text-[10.5px] tabular-nums shrink-0">
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ProductScreenshot>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Auth + rate limits                                                      */
/* -------------------------------------------------------------------------- */

function AuthAndLimits() {
  return (
    <section className="w-full">
      <div
        className="wrap"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      />
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper) 0%, color-mix(in srgb, var(--color-blue) 7%, var(--color-paper)) 100%)",
        }}
      >
        <div className="wrap section">
          <Reveal>
            <EyebrowTag className="mb-6">Auth</EyebrowTag>
          </Reveal>
          <Reveal delay={0.05}>
            <TwoToneHeadline
              as="h2"
              primary="Auth that's boring, by design."
              secondary="Rate limits that scale with you."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* AUTH METHODS */}
            <Reveal>
              <article
                className="rounded-[12px] bg-white border border-[var(--color-greige)] p-7 flex flex-col h-full"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className="inline-flex w-9 h-9 rounded-md items-center justify-center"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-blue) 15%, white)",
                    }}
                  >
                    <KeyRound
                      size={16}
                      className="text-[var(--color-blue-ink)]"
                    />
                  </span>
                  <h3
                    className="font-serif text-[20px] leading-tight text-black"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Authentication
                  </h3>
                </div>
                <ul className="flex flex-col divide-y divide-[var(--color-greige)]">
                  {AUTH_ITEMS.map((it) => (
                    <li
                      key={it.title}
                      className="py-3.5 flex items-start gap-4"
                    >
                      <span
                        className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] pt-1 w-[110px] shrink-0"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {it.title}
                      </span>
                      <span className="text-[14px] leading-[1.55] text-[var(--color-charcoal)] flex-1">
                        {it.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            {/* RATE LIMITS */}
            <Reveal delay={0.08}>
              <article
                className="rounded-[12px] bg-white border border-[var(--color-greige)] p-7 flex flex-col h-full"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className="inline-flex w-9 h-9 rounded-md items-center justify-center"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-blue) 15%, white)",
                    }}
                  >
                    <Gauge
                      size={16}
                      className="text-[var(--color-blue-ink)]"
                    />
                  </span>
                  <h3
                    className="font-serif text-[20px] leading-tight text-black"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Rate limits
                  </h3>
                </div>
                <ul className="flex flex-col divide-y divide-[var(--color-greige)]">
                  {RATE_LIMITS.map((it) => (
                    <li
                      key={it.title}
                      className="py-3.5 flex items-start gap-4"
                    >
                      <span
                        className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] pt-1 w-[110px] shrink-0"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {it.title}
                      </span>
                      <span className="text-[14px] leading-[1.55] text-[var(--color-charcoal)] flex-1">
                        {it.body}
                      </span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-5 pt-4 border-t border-[var(--color-greige)] text-[12.5px] text-[var(--color-charcoal)] font-mono"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  429 responses include{" "}
                  <span className="text-[var(--color-blue-ink)]">
                    Retry-After
                  </span>{" "}
                  in seconds.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Stat band (dark)                                                        */
/* -------------------------------------------------------------------------- */

function DevStatBand() {
  return (
    <StatBand
      stats={[
        { value: "99.95%", label: "Uptime · last 12 months" },
        { value: "<200ms", label: "p50 response · AU edge" },
        { value: "AU-hosted", label: "Sydney region · data residency" },
      ]}
      quote={{
        body:
          "We wired our reporting pipeline against the Ruevii API in an afternoon. Schemas matched the docs exactly — the only surprise was how little there was to debug.",
        name: "Tom Bridges",
        role: "Engineering lead, Atelier Cosmetic Group",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  7. SDK roadmap                                                             */
/* -------------------------------------------------------------------------- */

function SdkRoadmap() {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap section">
        <Reveal>
          <EyebrowTag icon={Terminal} className="mb-6">
            SDKs
          </EyebrowTag>
        </Reveal>
        <Reveal delay={0.05}>
          <TwoToneHeadline
            as="h2"
            primary="Type-safe clients."
            secondary="Generated from the schema you read."
          />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 text-[17px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]">
            Use the SDK in your language of choice, or call the REST API
            directly. Each SDK is generated from the same OpenAPI spec so the
            types match the wire format exactly.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 rounded-[12px] bg-white border border-[var(--color-greige)] overflow-hidden">
            <ul className="divide-y divide-[var(--color-greige)]">
              {SDKS.map((s, i) => (
                <li
                  key={s.lang}
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[180px_1fr_auto] gap-3 md:gap-6 items-center px-5 md:px-7 py-5"
                >
                  <div className="flex items-center gap-3 col-span-1">
                    <span
                      className="inline-flex w-9 h-9 rounded-md items-center justify-center shrink-0"
                      style={{
                        background:
                          "color-mix(in srgb, var(--color-blue) 12%, white)",
                      }}
                    >
                      <span
                        className="font-mono text-[12px] font-medium text-[var(--color-blue-ink)]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span
                      className="font-serif text-[19px] tracking-[-0.01em] text-black"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {s.lang}
                    </span>
                  </div>
                  <p
                    className="hidden md:block text-[14px] text-[var(--color-charcoal)] leading-snug font-mono"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {s.note}
                  </p>
                  <span
                    className={[
                      "inline-flex items-center justify-self-end px-2.5 py-1 rounded-full border font-mono text-[10.5px] uppercase tracking-[0.14em] leading-none",
                      STATUS_PILL_TONE[s.status],
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {s.status === "Beta" && (
                      <Zap size={10} className="mr-1.5" />
                    )}
                    {s.status}
                  </span>

                  {/* mobile-only note row */}
                  <p
                    className="md:hidden col-span-2 mt-1 text-[12.5px] text-[var(--color-charcoal)] leading-snug font-mono"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

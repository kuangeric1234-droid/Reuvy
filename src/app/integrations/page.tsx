import type { Metadata } from "next";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  EyebrowTag,
  TwoToneHeadline,
  ClosingCTABand,
} from "@/components/ui";

import { IntegrationsDirectory, RequestIntegrationForm } from "./_sections";

export const metadata: Metadata = {
  title: "Integrations · Ruevii",
  description:
    "Stripe, Tyro, Xero, Twilio, Google Workspace — connected. Plus a REST API and webhooks for everything else. Built for Australian clinics.",
};

/* -------------------------------------------------------------------------- */
/*  Sample JSON for the API mock — uses real schema columns from              */
/*  docs/marketing/schema-reference.md (appointments, sales).                 */
/* -------------------------------------------------------------------------- */

const SAMPLE_REQUEST = `POST /v1/appointments HTTP/1.1
Host: api.ruevii.app
Authorization: Bearer rvi_live_••••a1f3
Content-Type: application/json

{
  "clinic_id": "c_8f3a1b",
  "client_uuid": "DEMO-001",
  "resource_id": "res_nurse_amelia",
  "service_id": "svc_anti_wrinkle_3_area",
  "title": "Anti-wrinkle · 3 area",
  "starts_at": "2026-06-14T10:30:00+10:00",
  "ends_at":   "2026-06-14T11:15:00+10:00",
  "status": "confirmed"
}`;

const SAMPLE_RESPONSE = `HTTP/1.1 201 Created
Content-Type: application/json
Idempotency-Key: req_01HZW…

{
  "id": "apt_01HZW7K2P8",
  "clinic_id": "c_8f3a1b",
  "client_uuid": "DEMO-001",
  "status": "confirmed",
  "starts_at": "2026-06-14T10:30:00+10:00",
  "ai_noshow_risk": 0.12,
  "ai_noshow_tier": "LOW",
  "total_cents": 49500,
  "gst_cents": 4500,
  "created_at": "2026-06-02T04:17:51Z"
}`;

const SAMPLE_WEBHOOK = `event: appointment.confirmed
id: evt_01HZW7K6QR
{ "id": "apt_01HZW7K2P8", "status": "confirmed",
  "client_uuid": "DEMO-001", "starts_at": "…" }`;

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <SiteNav />

      {/* 1. HERO (light) */}
      <section className="w-full bg-[var(--color-paper)]">
        <div className="wrap pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="flex flex-col items-center text-center max-w-[46ch] mx-auto">
            <EyebrowTag className="mb-6">Integrations</EyebrowTag>
            <TwoToneHeadline
              as="h1"
              primary="Plays nicely"
              secondary="with the rest of your stack."
            />
            <p className="mt-6 text-[17px] leading-[1.55] text-[var(--color-charcoal)] max-w-[52ch]">
              Stripe, Tyro, Xero, Twilio, Google Workspace — connected.
              Plus a REST API and webhooks for everything else.
            </p>
          </div>
        </div>
      </section>

      {/* 2 + 3. CATEGORY FILTER + INTEGRATION GRID (light, client) */}
      <IntegrationsDirectory />

      {/* 4. API + WEBHOOKS (DARK) */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--color-ink)",
          color: "var(--color-white)",
        }}
      >
        {/* faint dusty-blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(155,183,209,0.14) 0%, rgba(15,15,14,0) 55%)",
          }}
        />
        <div className="wrap section relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-20 items-center">
            {/* LEFT — copy */}
            <div className="max-w-[40ch]">
              <span
                className="inline-flex items-center gap-[8px] rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] leading-none border border-white/15 text-white/80 mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span
                  aria-hidden
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ background: "var(--color-blue)" }}
                />
                Developers
              </span>

              <h2
                className="font-serif font-normal text-[clamp(32px,4.4vw,58px)] leading-[1.04] tracking-[-0.025em] text-balance"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block text-white">Build on Ruevii.</span>
                <span className="block" style={{ color: "var(--color-blue)" }}>
                  REST API, webhooks, embeds.
                </span>
              </h2>

              <p className="mt-6 text-[15.5px] leading-[1.6] text-white/70 max-w-[44ch]">
                Every record in the app — clients, appointments, sales,
                messages — is reachable via a versioned REST API. Webhooks fire
                in under 200&nbsp;ms. Idempotency-keys included.
              </p>

              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {[
                  "Bearer auth · per-clinic scopes",
                  "Webhooks · signed + retried",
                  "Idempotency-keys on writes",
                  "Sandbox tenant for staging",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[13.5px] text-white/80 leading-snug"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 w-[5px] h-[5px] rounded-full shrink-0"
                      style={{ background: "var(--color-blue)" }}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="/developers"
                  className="inline-flex items-center justify-center gap-[9px] text-[14.5px] font-medium leading-none px-5 py-[13px] rounded-md bg-white text-black hover:bg-white/90 transition-colors"
                >
                  View API docs
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center text-[14.5px] font-medium leading-none px-5 py-[13px] rounded-md bg-transparent border border-white/25 text-white hover:bg-white/[0.06] hover:border-white/40 transition-colors"
                >
                  Get an API key
                </a>
              </div>
            </div>

            {/* RIGHT — code snippet mock */}
            <CodeSnippetMock
              request={SAMPLE_REQUEST}
              response={SAMPLE_RESPONSE}
              webhook={SAMPLE_WEBHOOK}
            />
          </div>
        </div>
      </section>

      {/* 5. REQUEST AN INTEGRATION (light, client) */}
      <RequestIntegrationForm />

      {/* 6. CLOSING CTA + FOOTER */}
      <ClosingCTABand
        primary="One platform."
        secondary="Connected to everything else."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "See pricing", href: "/pricing" }}
      />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Code-snippet mock — stylised "Ruevii API" terminal/IDE frame.             */
/*  Pure server component (no interaction needed).                            */
/* -------------------------------------------------------------------------- */

function CodeSnippetMock({
  request,
  response,
  webhook,
}: {
  request: string;
  response: string;
  webhook: string;
}) {
  return (
    <div
      className="w-full rounded-[12px] overflow-hidden border border-white/10"
      style={{
        background: "color-mix(in srgb, var(--color-ink) 88%, white)",
        boxShadow: "0 40px 100px -40px rgba(0,0,0,0.55)",
      }}
    >
      {/* Top chrome */}
      <div
        className="relative flex items-center h-[40px] px-3 border-b border-white/10"
        style={{
          background: "color-mix(in srgb, var(--color-ink) 75%, white)",
        }}
      >
        <div aria-hidden className="flex items-center gap-[6px]">
          <span className="w-[10px] h-[10px] rounded-full bg-white/15" />
          <span className="w-[10px] h-[10px] rounded-full bg-white/15" />
          <span className="w-[10px] h-[10px] rounded-full bg-white/15" />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-[4px] rounded-full border border-white/10"
          style={{
            background: "color-mix(in srgb, var(--color-ink) 65%, white)",
          }}
        >
          <span
            aria-hidden
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: "var(--color-blue)" }}
          />
          <span
            className="font-mono text-[11px] leading-none text-white/75"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            api.ruevii.app / v1
          </span>
        </div>
        <div
          className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/45"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          200 OK · 87 ms
        </div>
      </div>

      {/* Body: request / response side-by-side, webhook below */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <CodeBlock
          label="Request"
          method="POST"
          methodTone="var(--color-blue)"
          code={request}
          className="md:border-r md:border-white/10"
        />
        <CodeBlock
          label="Response"
          method="201"
          methodTone="#9bc99b"
          code={response}
        />
      </div>

      {/* Webhook row */}
      <div
        className="border-t border-white/10 px-5 py-4"
        style={{
          background: "color-mix(in srgb, var(--color-ink) 80%, black)",
        }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Webhook · live tail
          </span>
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#9bc99b" }}
          />
        </div>
        <pre
          className="font-mono text-[11.5px] leading-[1.55] text-white/70 overflow-x-auto"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <code>{webhook}</code>
        </pre>
      </div>
    </div>
  );
}

function CodeBlock({
  label,
  method,
  methodTone,
  code,
  className,
}: {
  label: string;
  method: string;
  methodTone: string;
  code: string;
  className?: string;
}) {
  return (
    <div className={["p-5", className ?? ""].join(" ")}>
      <div className="flex items-center gap-2 mb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.14em] px-1.5 py-[3px] rounded-sm leading-none"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-ink)",
            background: methodTone,
          }}
        >
          {method}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </span>
      </div>
      <pre
        className="font-mono text-[12px] leading-[1.6] text-white/80 overflow-x-auto"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

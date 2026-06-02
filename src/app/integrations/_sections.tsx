"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  Mail,
  MessageSquare,
  ShieldCheck,
  Wallet,
  Workflow,
} from "lucide-react";

import { EyebrowTag, TwoToneHeadline } from "@/components/ui";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Types + data                                                              */
/* -------------------------------------------------------------------------- */

export type IntegrationCategory =
  | "all"
  | "payments"
  | "accounting"
  | "calendar"
  | "messaging"
  | "marketing"
  | "identity";

type Integration = {
  name: string;
  category: Exclude<IntegrationCategory, "all">;
  description: string;
  /** Hex used for the lock-up tile background. Kept editorial / muted. */
  tone: string;
  /** Optional foreground override for the initial. Defaults to white. */
  ink?: string;
  /** Region badge — surfaces AU-flavour without shouting. */
  region?: "AU" | "Global";
};

const INTEGRATIONS: Integration[] = [
  // Payments
  {
    name: "Stripe",
    category: "payments",
    description: "Card-on-file, deposits, refunds and pay-in-conversation links.",
    tone: "#635bff",
    region: "Global",
  },
  {
    name: "Tyro",
    category: "payments",
    description: "AU EFTPOS terminals — auto-reconciled into every sale.",
    tone: "#0f2c4d",
    region: "AU",
  },
  {
    name: "Square",
    category: "payments",
    description: "Tap-to-pay on iPhone and Square Reader for in-room checkout.",
    tone: "#0f0f0e",
    region: "Global",
  },
  {
    name: "Klarna",
    category: "payments",
    description: "Pay-in-four BNPL surfaced at checkout for treatment plans.",
    tone: "#ffa8cd",
    ink: "#0f0f0e",
    region: "Global",
  },

  // Accounting
  {
    name: "Xero",
    category: "accounting",
    description: "Daily sales, GST and Stripe payouts pushed to your AU ledger.",
    tone: "#13b5ea",
    region: "AU",
  },
  {
    name: "MYOB",
    category: "accounting",
    description: "Two-way contact and invoice sync for MYOB AccountRight & Business.",
    tone: "#6d2c8f",
    region: "AU",
  },
  {
    name: "QuickBooks",
    category: "accounting",
    description: "Map services to chart-of-accounts and post journals nightly.",
    tone: "#2ca01c",
    region: "Global",
  },

  // Calendar
  {
    name: "Google Calendar",
    category: "calendar",
    description: "Two-way sync per clinician — out-of-clinic blocks honoured live.",
    tone: "#1a73e8",
    region: "Global",
  },
  {
    name: "Outlook Calendar",
    category: "calendar",
    description: "Microsoft 365 + Exchange sync with private-event masking.",
    tone: "#0078d4",
    region: "Global",
  },
  {
    name: "Apple Calendar",
    category: "calendar",
    description: "iCloud subscriptions for read-only viewing on your phone.",
    tone: "#0f0f0e",
    region: "Global",
  },

  // Messaging
  {
    name: "Twilio",
    category: "messaging",
    description: "AU-routed SMS reminders, 10DLC compliance and delivery receipts.",
    tone: "#f22f46",
    region: "Global",
  },
  {
    name: "Telnyx",
    category: "messaging",
    description: "Inbound voice + AI receptionist with live call transcription.",
    tone: "#00e3aa",
    ink: "#0f0f0e",
    region: "Global",
  },
  {
    name: "SendGrid",
    category: "messaging",
    description: "Transactional email — confirmations, receipts, aftercare notes.",
    tone: "#1a82e2",
    region: "Global",
  },

  // Marketing
  {
    name: "Mailchimp",
    category: "marketing",
    description: "Segment lists by treatment, lifecycle stage and last visit.",
    tone: "#ffe01b",
    ink: "#0f0f0e",
    region: "Global",
  },
  {
    name: "Klaviyo",
    category: "marketing",
    description: "Behaviour-triggered flows for memberships, packages and gifts.",
    tone: "#171614",
    region: "Global",
  },
  {
    name: "HubSpot",
    category: "marketing",
    description: "Two-way lead + deal sync with AI score pushed as a property.",
    tone: "#ff7a59",
    region: "Global",
  },

  // Identity
  {
    name: "Google Workspace",
    category: "identity",
    description: "SSO, directory and Drive uploads for treatment photo backup.",
    tone: "#ea4335",
    region: "Global",
  },
  {
    name: "Microsoft 365",
    category: "identity",
    description: "Entra ID SSO, SCIM provisioning and OneDrive photo backup.",
    tone: "#0078d4",
    region: "Global",
  },
  {
    name: "Slack",
    category: "identity",
    description: "Pipe missed calls, no-shows and big sales into a clinic channel.",
    tone: "#4a154b",
    region: "Global",
  },
];

const CATEGORY_FILTERS: { key: IntegrationCategory; label: string; icon?: typeof CreditCard }[] = [
  { key: "all", label: "All" },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "accounting", label: "Accounting", icon: Wallet },
  { key: "calendar", label: "Calendar", icon: Calendar },
  { key: "messaging", label: "Messaging", icon: MessageSquare },
  { key: "marketing", label: "Marketing", icon: Mail },
  { key: "identity", label: "Identity", icon: ShieldCheck },
];

const CATEGORY_LABEL: Record<Exclude<IntegrationCategory, "all">, string> = {
  payments: "Payments",
  accounting: "Accounting",
  calendar: "Calendar",
  messaging: "Messaging",
  marketing: "Marketing",
  identity: "Identity",
};

/* -------------------------------------------------------------------------- */
/*  Filter row + Grid                                                         */
/* -------------------------------------------------------------------------- */

export function IntegrationsDirectory() {
  const [active, setActive] = useState<IntegrationCategory>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? INTEGRATIONS
        : INTEGRATIONS.filter((it) => it.category === active),
    [active],
  );

  return (
    <section className="w-full bg-[var(--color-paper)]">
      {/* Sticky-ish filter row */}
      <div className="wrap pt-4 pb-8">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
            {INTEGRATIONS.length} integrations · live
          </p>
          <div className="relative flex flex-wrap items-center gap-1.5">
            {CATEGORY_FILTERS.map((f) => {
              const isOn = f.key === active;
              const Icon = f.icon;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  aria-pressed={isOn}
                  className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] leading-none transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {isOn && (
                    <motion.span
                      layoutId="integrations-filter-pill"
                      className="absolute inset-0 rounded-full bg-black"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={[
                      "relative inline-flex items-center gap-1.5",
                      isOn ? "text-white" : "text-[var(--color-charcoal)] hover:text-black",
                    ].join(" ")}
                  >
                    {Icon ? <Icon size={13} /> : null}
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap pb-24 md:pb-32">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: EASE }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((it, i) => (
              <IntegrationCard key={it.name} integration={it} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function IntegrationCard({
  integration,
  index,
}: {
  integration: Integration;
  index: number;
}) {
  const { name, description, tone, ink, region, category } = integration;
  const initial = name[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: EASE, delay: Math.min(index * 0.02, 0.18) }}
      whileHover={{ y: -2 }}
      className="group relative flex flex-col rounded-[12px] bg-white border border-[var(--color-greige)] p-5 hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)] transition-colors"
      style={{ willChange: "transform" }}
    >
      {/* Lock-up */}
      <header className="flex items-start gap-3 mb-4">
        <span
          aria-hidden
          className="inline-flex w-10 h-10 rounded-md items-center justify-center font-mono text-[15px] leading-none shrink-0"
          style={{
            background: tone,
            color: ink ?? "#ffffff",
            fontFamily: "var(--font-mono)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          {initial}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className="font-serif text-[17px] leading-[1.15] tracking-[-0.01em] text-black truncate"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {name}
            </h3>
            {region ? (
              <span
                className="font-mono text-[9.5px] uppercase tracking-[0.14em] px-1.5 py-[3px] rounded-sm text-[var(--color-charcoal)] border border-[var(--color-greige)] leading-none shrink-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {region}
              </span>
            ) : null}
          </div>
          <p
            className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] leading-none"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {CATEGORY_LABEL[category]}
          </p>
        </div>
      </header>

      {/* Body */}
      <p className="text-[13.5px] leading-[1.5] text-[var(--color-charcoal)] mb-5 flex-1">
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-greige-2)]">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Connect
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-mute)] leading-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          1-click
        </span>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Request an integration form                                               */
/* -------------------------------------------------------------------------- */

export function RequestIntegrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [integration, setIntegration] = useState("");
  const [role, setRole] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Stubbed — would POST to /v1/integration_requests in production.
    setSubmitted(true);
  }

  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start max-w-[1100px] mx-auto">
          {/* LEFT — copy */}
          <div>
            <EyebrowTag className="mb-5" icon={Workflow}>
              Don&rsquo;t see it?
            </EyebrowTag>
            <TwoToneHeadline
              as="h2"
              primary="Tell us what you need."
              secondary="Our team prioritises by clinic vote."
            />
            <p className="mt-5 text-[15.5px] leading-[1.55] text-[var(--color-charcoal)] max-w-[42ch]">
              Every quarter we ship the three integrations most-requested by AU
              clinics. Drop your vote — we&rsquo;ll email you the day it ships.
            </p>
          </div>

          {/* RIGHT — form */}
          <form
            onSubmit={onSubmit}
            className="rounded-[12px] bg-white border border-[var(--color-greige)] p-6 md:p-8"
            style={{ boxShadow: "0 30px 80px -50px rgba(20,20,18,0.18)" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="flex flex-col items-start gap-4 py-4"
                >
                  <span
                    aria-hidden
                    className="inline-flex w-10 h-10 rounded-full items-center justify-center"
                    style={{
                      background: "color-mix(in srgb, var(--color-blue) 20%, white)",
                    }}
                  >
                    <Check size={18} className="text-[var(--color-blue-ink)]" />
                  </span>
                  <div>
                    <h3
                      className="font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-black mb-1.5"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Vote received.
                    </h3>
                    <p className="text-[14.5px] leading-snug text-[var(--color-charcoal)]">
                      We&rsquo;ll email <span className="text-black">{email || "you"}</span> the
                      moment <span className="text-black">{integration || "that integration"}</span> ships.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex flex-col gap-4"
                >
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="you@clinic.com.au"
                    required
                    value={email}
                    onChange={setEmail}
                  />
                  <Field
                    label="Integration name"
                    name="integration"
                    placeholder="e.g. Halaxy, Genie Solutions"
                    required
                    value={integration}
                    onChange={setIntegration}
                  />
                  <SelectField
                    label="Your role"
                    name="role"
                    required
                    value={role}
                    onChange={setRole}
                    options={[
                      "Practice owner",
                      "Practice manager",
                      "Cosmetic doctor",
                      "Cosmetic nurse",
                      "Front-of-house",
                    ]}
                  />
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full text-[14.5px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[var(--color-ink-soft)] active:translate-y-px transition-colors"
                  >
                    Submit request
                    <ArrowRight size={14} />
                  </button>
                  <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-charcoal)] leading-none text-center">
                    No spam. One email when it ships.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-white border border-[var(--color-greige)] px-3.5 py-3 text-[14.5px] text-black placeholder:text-[var(--color-mute)] focus:outline-none focus:border-[var(--color-blue-ink)] transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]">
        {label}
      </span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-white border border-[var(--color-greige)] px-3 py-3 text-[14.5px] text-black focus:outline-none focus:border-[var(--color-blue-ink)] transition-colors appearance-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 7' fill='none'><path d='M1 1l5 5 5-5' stroke='%234d4d4c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          backgroundSize: "11px",
          paddingRight: "36px",
        }}
      >
        <option value="" disabled>
          Select your role…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

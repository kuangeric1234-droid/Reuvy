import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Lift, Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Pricing — Reuvy",
  description: "Simple, flat pricing per location, plus a small per-clinician charge.",
};

const PLANS = [
  {
    name: "Studio",
    price: "$249",
    cadence: "per month, per location",
    tagline: "For solo practitioners and single-room studios.",
    features: [
      "1 location, up to 3 clinicians",
      "Calendar, online booking, payments",
      "EMR, forms, before/after",
      "SMS + email reminders",
      "Email support",
    ],
    cta: "Start free trial",
    accent: false,
  },
  {
    name: "Practice",
    price: "$449",
    cadence: "per month, per location",
    tagline: "For growing practices that need the whole platform.",
    features: [
      "Up to 10 clinicians per location",
      "Everything in Studio",
      "Scribe AI + Letters AI",
      "Campaigns, loyalty, gift cards",
      "Insights Plus reporting",
      "Dedicated onboarding",
      "Priority support",
    ],
    cta: "Book a demo",
    accent: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "for multi-location groups",
    tagline: "For groups, franchises and enterprise.",
    features: [
      "Unlimited locations and clinicians",
      "Everything in Practice",
      "Cross-location reporting",
      "SSO + advanced permissions",
      "Custom integrations",
      "Named account manager",
      "Quarterly business reviews",
    ],
    cta: "Talk to sales",
    accent: false,
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-x text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              Pricing
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Simple, honest, <span className="italic">per-location.</span>
            </h1>
            <p className="mt-7 max-w-xl mx-auto text-lg text-[var(--color-ink-soft)] leading-relaxed">
              No setup fees, no per-feature add-ons, no surprises. Migration and onboarding always
              included.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <Stagger className="grid md:grid-cols-3 gap-5" stagger={0.1}>
            {PLANS.map((p) => (
              <StaggerItem key={p.name} y={16}>
                <Lift amount={-6}>
                  <div
                    className={
                      "relative rounded-3xl p-8 h-full flex flex-col " +
                      (p.accent
                        ? "bg-[var(--color-ink)] text-white border border-[var(--color-ink)] shadow-[0_30px_80px_-30px_rgba(15,29,43,0.35)]"
                        : "bg-white text-[var(--color-ink)] border border-[var(--color-line)]")
                    }
                  >
                    {p.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-[var(--color-reuvy-400)] text-[var(--color-ink)]">
                        {p.badge}
                      </span>
                    )}
                    <p className={"text-xs uppercase tracking-[0.18em] " + (p.accent ? "text-[var(--color-reuvy-300)]" : "text-[var(--color-reuvy-700)]")}>
                      {p.name}
                    </p>
                    <p className="mt-3 font-serif text-5xl tracking-tight">{p.price}</p>
                    <p className={"text-sm mt-1 " + (p.accent ? "text-white/65" : "text-[var(--color-muted)]")}>
                      {p.cadence}
                    </p>
                    <p className={"mt-5 text-[15px] leading-relaxed " + (p.accent ? "text-white/85" : "text-[var(--color-ink-soft)]")}>
                      {p.tagline}
                    </p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <span
                            className={
                              "grid place-items-center h-5 w-5 rounded-full mt-0.5 shrink-0 " +
                              (p.accent
                                ? "bg-[var(--color-reuvy-400)] text-[var(--color-ink)]"
                                : "bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]")
                            }
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span className={p.accent ? "text-white/90" : "text-[var(--color-ink-soft)]"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/demo"
                      className={
                        "mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors " +
                        (p.accent
                          ? "bg-white text-[var(--color-ink)] hover:bg-[var(--color-reuvy-100)]"
                          : "bg-[var(--color-ink)] text-white hover:bg-[var(--color-reuvy-700)]")
                      }
                    >
                      {p.cta} <ArrowRight size={14} />
                    </a>
                  </div>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16 text-center max-w-xl mx-auto" delay={0.1}>
            <p className="text-sm text-[var(--color-muted)]">
              All plans include unlimited clients, free data migration, and a named onboarding lead
              for the first 90 days. 30-day money-back guarantee.
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

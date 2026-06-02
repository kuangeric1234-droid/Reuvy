"use client";

import { TrendingUp, MapPin, ShieldCheck, KeySquare, Database } from "lucide-react";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import { TwoToneHeadline } from "@/components/ui/two-tone-headline";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const BULLETS = [
  {
    icon: MapPin,
    title: "Multi-location consolidated reporting",
    body: "Roll revenue, no-shows, commissions and inventory up across every clinic — or drill into one.",
  },
  {
    icon: KeySquare,
    title: "Role-based permissions",
    body: "Front desk, injector, prescriber, owner: each role sees exactly what they need, nothing more.",
  },
  {
    icon: ShieldCheck,
    title: "AHPRA audit trail",
    body: "Append-only log on every clinical and financial action — tamper-evident, ready for a review.",
  },
  {
    icon: Database,
    title: "AU data residency",
    body: "All patient data hosted in Sydney (ap-southeast-2). Encrypted at rest, backed up daily.",
  },
];

/**
 * ScaleBand — LIGHT band. Headline + reporting dashboard mock on the left,
 * 4 capability bullets on the right. Closes the "built to grow with you"
 * narrative before the testimonial + integrations sections.
 */
export function ScaleBand() {
  return (
    <section
      aria-label="Built to scale with your group"
      className="w-full border-t border-[var(--color-greige)]"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="wrap section">
        <div className="max-w-[760px] mb-12">
          <Reveal>
            <div className="inline-flex">
              <EyebrowTag icon={TrendingUp}>BUILT TO SCALE</EyebrowTag>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="mt-6">
            <TwoToneHeadline
              as="h2"
              primary="Built to scale"
              secondary="with your group."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[48ch]">
              Whether you&apos;re a solo injector or a 12-location group, Ruevii grows with
              you. One workspace, location-aware reporting, role-scoped access, and
              compliance baked in — not bolted on.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-[60px] items-center">
          {/* Reporting dashboard mock */}
          <Reveal delay={0.12}>
            <ProductScreenshot url="reports / revenue">
              <ReportingMock />
            </ProductScreenshot>
          </Reveal>

          {/* Bullets */}
          <Stagger className="flex flex-col" stagger={0.08}>
            {BULLETS.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem key={title}>
                <div
                  className={`flex gap-4 py-5 ${
                    i === 0 ? "" : "border-t border-[var(--color-greige)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className="inline-flex w-10 h-10 rounded-md items-center justify-center flex-none"
                    style={{
                      background: "color-mix(in srgb, var(--color-blue) 15%, white)",
                    }}
                  >
                    <Icon size={18} className="text-[var(--color-blue-ink)]" />
                  </span>
                  <div>
                    <h3
                      className="font-serif text-[18px] leading-[1.2] tracking-[-0.01em] text-black mb-1.5"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.55] text-[var(--color-charcoal)]">
                      {body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Reporting mock ----------------------------- */

function ReportingMock() {
  const bars = [
    { label: "MON", v: 0.42 },
    { label: "TUE", v: 0.68 },
    { label: "WED", v: 0.55 },
    { label: "THU", v: 0.81 },
    { label: "FRI", v: 0.93 },
    { label: "SAT", v: 0.74 },
  ];
  const max = Math.max(...bars.map((b) => b.v));

  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-3">
        <div>
          <h4
            className="font-serif text-[20px] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Group revenue · this week
          </h4>
          <p className="text-[12.5px] text-[var(--color-charcoal)] mt-1">
            Across 4 locations · all practitioners · live
          </p>
        </div>
        <div className="flex gap-2">
          {["Mel CBD", "Brighton", "Sydney CBD", "Bondi"].map((l, i) => (
            <span
              key={l}
              className={`font-mono text-[10.5px] uppercase tracking-[0.06em] rounded-full px-2.5 py-1 border ${
                i === 0
                  ? "border-[color-mix(in_srgb,var(--color-blue)_55%,white)] bg-[#f1f5f9] text-[var(--color-blue-ink)]"
                  : "border-[var(--color-greige)] text-[var(--color-charcoal)] bg-white"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {[
          { k: "$48,210", v: "Week to date", d: "+12%" },
          { k: "$8.94k", v: "Avg / day", d: "+6%" },
          { k: "342", v: "Treatments", d: "+18" },
          { k: "94%", v: "Confirmation rate", d: "+3pt" },
        ].map((m) => (
          <div
            key={m.v}
            className="border border-[var(--color-greige)] rounded-md p-3 bg-white"
          >
            <div
              className="font-serif text-[19px] leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {m.k}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--color-charcoal)]">
                {m.v}
              </span>
              <span className="font-mono text-[10px] text-[#4d7a5e]">{m.d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="border border-[var(--color-greige)] rounded-md p-4 bg-white">
        <div className="flex items-end gap-3 h-[160px] pl-2">
          {bars.map((b, i) => (
            <div key={b.label} className="flex-1 flex flex-col items-center gap-2 h-full">
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full rounded-t-[3px]"
                  style={{
                    height: `${(b.v / max) * 100}%`,
                    background:
                      i === bars.length - 2
                        ? "var(--color-blue-ink)"
                        : "color-mix(in srgb, var(--color-blue) 38%, white)",
                  }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.06em] text-[var(--color-charcoal)]">
                {b.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 font-mono text-[11px] text-[var(--color-mute)] flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-blue-ink)]" />
          Friday peak · ${" "}10,840 across the group
        </div>
      </div>
    </div>
  );
}

export default ScaleBand;

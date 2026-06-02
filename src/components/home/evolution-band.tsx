"use client";

import { Layers } from "lucide-react";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import { TwoToneHeadline } from "@/components/ui/two-tone-headline";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

/**
 * EvolutionBand — LIGHT band, single big statement + a wide EMR dashboard mock.
 * Sits between the Problem band (dark) and the Features band.
 */
export function EvolutionBand() {
  return (
    <section
      aria-label="One platform that evolves with your clinic"
      className="w-full"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="wrap section">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <div className="inline-flex">
              <EyebrowTag icon={Layers}>ONE PLATFORM</EyebrowTag>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-6">
            <TwoToneHeadline
              as="h2"
              primary="Your clinic evolves."
              secondary="Your software should too."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <p className="text-[19px] leading-[1.55] text-[var(--color-charcoal)] max-w-[56ch] mx-auto">
              Ruevii is one system for the whole practice — patients, calendar, charting,
              payments, inventory and AI. Add a second location, a new injector, a
              membership program. The software keeps up; you keep your weekends.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <ProductScreenshot url="dashboard">
            <EMRDashboardMock />
          </ProductScreenshot>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- EMR Dashboard mock --------------------------- */

function EMRDashboardMock() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[440px]">
      {/* Sidebar */}
      <aside className="border-r border-[var(--color-greige)] p-4 bg-[color-mix(in_srgb,var(--color-paper)_55%,white)]">
        <div className="flex items-center gap-2 mb-5 pl-1">
          <span className="w-6 h-6 rounded-md bg-black grid place-items-center text-white text-[11px]">
            R
          </span>
          <span className="font-serif text-[15px]">Lumière</span>
        </div>
        <nav className="flex flex-col gap-[2px]">
          {[
            ["Today", true],
            ["Calendar", false],
            ["Clients", false],
            ["Charting", false],
            ["Payments", false],
            ["Inventory", false],
            ["Conversations", false],
            ["Reports", false],
          ].map(([label, active]) => (
            <span
              key={label as string}
              className={`px-3 py-[7px] rounded-md text-[13px] ${
                active
                  ? "bg-white border border-[var(--color-greige)] text-black"
                  : "text-[var(--color-charcoal)] hover:bg-white/70"
              }`}
            >
              {label}
            </span>
          ))}
        </nav>
        <div className="mt-6 border-t border-[var(--color-greige)] pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-mute)]">
            Locations
          </span>
          <div className="mt-2 text-[12.5px] text-[var(--color-charcoal)]">Melbourne · CBD</div>
          <div className="mt-1 text-[12.5px] text-[var(--color-charcoal)]">Brighton</div>
        </div>
      </aside>

      {/* Main panel */}
      <div className="p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
          <div>
            <h3
              className="font-serif text-[22px] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tuesday, 4 June
            </h3>
            <p className="text-[13px] text-[var(--color-charcoal)] mt-1">
              28 appointments · 4 practitioners · 12 forms outstanding
            </p>
          </div>
          <span className="font-mono text-[11px] text-[var(--color-blue-ink)] tracking-[0.06em] border border-[color-mix(in_srgb,var(--color-blue)_55%,white)] bg-[#f1f5f9] rounded-full px-3 py-1">
            ALL SYSTEMS GREEN
          </span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { k: "$8,420", v: "Today · revenue", tone: "ok" },
            { k: "94%", v: "Confirmed appts", tone: "ok" },
            { k: "3", v: "S4 administered", tone: "blue" },
            { k: "2", v: "Waitlist standby", tone: "warn" },
          ].map((m) => (
            <div
              key={m.v}
              className="border border-[var(--color-greige)] rounded-md p-3 bg-white"
            >
              <div
                className="font-serif text-[22px] leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {m.k}
              </div>
              <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--color-charcoal)]">
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* Two columns: schedule + activity */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4">
          <div className="border border-[var(--color-greige)] rounded-md bg-white">
            <div className="px-4 py-3 border-b border-[var(--color-greige)] flex items-center justify-between">
              <span className="font-medium text-[13px]">Today&apos;s schedule</span>
              <span className="font-mono text-[10.5px] text-[var(--color-mute)]">3 / 28</span>
            </div>
            {[
              ["09:00", "Mia Albescu", "Anti-wrinkle review", "DR LANE"],
              ["10:30", "James Park", "Lip filler 1.0ml", "DR LANE"],
              ["11:15", "Lara Mensah", "Skin needling", "RN PARK"],
            ].map((r, i) => (
              <div
                key={i}
                className={`grid grid-cols-[58px_1fr_auto] gap-3 items-center px-4 py-[10px] text-[13px] ${
                  i === 0 ? "" : "border-t border-[var(--color-greige)]"
                }`}
              >
                <span className="font-mono text-[11px] text-[var(--color-charcoal)]">{r[0]}</span>
                <span>
                  <b className="font-semibold">{r[1]}</b>
                  <span className="block text-[12px] text-[var(--color-charcoal)]">{r[2]}</span>
                </span>
                <span className="font-mono text-[10.5px] text-[var(--color-blue-ink)] tracking-wide">
                  {r[3]}
                </span>
              </div>
            ))}
          </div>

          <Stagger className="border border-[var(--color-greige)] rounded-md bg-white" stagger={0.07}>
            <div className="px-4 py-3 border-b border-[var(--color-greige)]">
              <span className="font-medium text-[13px]">Recent activity</span>
            </div>
            {[
              ["09:02", "Consent signed · Mia"],
              ["09:14", "S4 logged · BTX-4471"],
              ["09:18", "Photo set · post-tx"],
              ["09:25", "Stripe · $396 settled"],
            ].map((r, i) => (
              <StaggerItem key={i}>
                <div
                  className={`grid grid-cols-[58px_1fr] gap-3 items-center px-4 py-[10px] text-[12.5px] ${
                    i === 0 ? "" : "border-t border-[var(--color-greige)]"
                  }`}
                >
                  <span className="font-mono text-[11px] text-[var(--color-charcoal)]">{r[0]}</span>
                  <span className="text-[var(--color-charcoal)]">{r[1]}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  );
}

export default EvolutionBand;

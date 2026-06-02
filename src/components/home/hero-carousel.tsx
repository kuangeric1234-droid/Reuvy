"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { useCommandPalette } from "@/components/command-palette";
import { useHeroCarousel } from "@/lib/hero-carousel-store";

const EASE = [0.21, 0.61, 0.27, 1] as const;

const fmtCents = (c: number) =>
  `$${(c / 100).toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MODULES = [
  { key: "calendar", label: "Calendar" },
  { key: "booking", label: "Online Booking" },
  { key: "emr", label: "EMR" },
  { key: "workflows", label: "Workflows" },
  { key: "payments", label: "Payments" },
] as const;

type ModuleKey = (typeof MODULES)[number]["key"];

export function HeroCarousel() {
  const { active, setActive, paused, setPaused } = useHeroCarousel();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => useHeroCarousel.setState((s) => ({ active: (s.active + 1) % MODULES.length })),
      4200,
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div id="hero-carousel" className="relative mt-16 scroll-mt-24">
      {/* soft lavender backdrop glow */}
      <div
        aria-hidden
        className="absolute inset-x-[-10%] -top-10 -bottom-10 -z-10"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(155,183,209,0.22), transparent 70%)",
        }}
      />

      {/* Module tab pills (stay in container) */}
      <div className="flex flex-wrap justify-center gap-2 mb-9 relative">
        {MODULES.map((m, i) => {
          const isActive = i === active;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                "relative inline-flex items-center text-[13px] font-medium px-4 py-[9px] rounded-full transition-colors",
                isActive ? "text-white" : "text-[var(--color-charcoal)] hover:text-black",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="hero-tab-pill"
                  className="absolute inset-0 rounded-full bg-black -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Triptych stage — full-bleed (extends beyond .wrap to viewport edges).
          Cards are top-anchored (not centred) so the gap under the tab pills is
          constant across modules; the stage clears the tallest card (~545px)
          plus its drop shadow so nothing is sliced by the overflow-hidden edge. */}
      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {MODULES.map((m, i) => {
          // distance from active: -2, -1, 0, 1, 2 (wrapped)
          const n = MODULES.length;
          let delta = i - active;
          if (delta > n / 2) delta -= n;
          if (delta < -n / 2) delta += n;

          // position by delta — side cards push toward viewport edges
          const config: Record<number, { x: string; scale: number; opacity: number; z: number; blur: number }> = {
            "-2": { x: "-120%", scale: 0.7, opacity: 0, z: 5, blur: 6 },
            "-1": { x: "-66%", scale: 0.86, opacity: 0.7, z: 10, blur: 0 },
            "0": { x: "0%", scale: 1, opacity: 1, z: 30, blur: 0 },
            "1": { x: "66%", scale: 0.86, opacity: 0.7, z: 10, blur: 0 },
            "2": { x: "120%", scale: 0.7, opacity: 0, z: 5, blur: 6 },
          };
          const target = config[delta] ?? { x: "180%", scale: 0.6, opacity: 0, z: 0, blur: 8 };

          return (
            <motion.div
              key={m.key}
              initial={false}
              animate={{
                x: target.x,
                scale: target.scale,
                opacity: target.opacity,
                filter: `blur(${target.blur}px)`,
                zIndex: target.z,
              }}
              transition={{ duration: 0.85, ease: EASE }}
              className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[min(820px,52vw)] max-md:w-[min(680px,88vw)]"
              style={{ pointerEvents: delta === 0 ? "auto" : "none" }}
            >
              <MockCard moduleKey={m.key} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------- Mock cards ---------------------- */

function MockCard({ moduleKey }: { moduleKey: ModuleKey }) {
  return (
    <div className="bg-white border border-[var(--color-greige)] rounded-[12px] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.02),0_40px_80px_-40px_rgba(20,20,18,0.25)] text-left">
      <AppBar moduleKey={moduleKey} />
      <div className="p-5 bg-gradient-to-b from-white to-[var(--color-paper)] min-h-[360px]">
        {moduleKey === "calendar" && <Calendar />}
        {moduleKey === "booking" && <Booking />}
        {moduleKey === "emr" && <Emr />}
        {moduleKey === "workflows" && <Workflows />}
        {moduleKey === "payments" && <Payments />}
      </div>
    </div>
  );
}

function AppBar({ moduleKey }: { moduleKey: ModuleKey }) {
  const openCmd = useCommandPalette((s) => s.open);
  const label = MODULES.find((m) => m.key === moduleKey)?.label ?? "";
  return (
    <div className="h-[42px] flex items-center gap-3 px-4 border-b border-[var(--color-greige)] bg-[var(--color-paper)]">
      <div className="flex gap-[6px]">
        <span className="w-[10px] h-[10px] rounded-full bg-[var(--color-greige)]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[var(--color-greige)]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[var(--color-greige)]" />
      </div>
      <span className="font-mono text-[11px] text-[var(--color-charcoal)] ml-2">
        ruevii.app / {moduleKey}
      </span>
      <button
        onClick={openCmd}
        className="ml-auto inline-flex items-center gap-2 h-[24px] border border-[var(--color-greige)] rounded-md px-2 bg-white text-[11px] text-[#9a988f] hover:border-[#cdcabf] transition-colors"
      >
        Search
        <span className="font-mono text-[9px] border border-[var(--color-greige)] rounded px-[5px] py-[1px] text-[var(--color-charcoal)] bg-[var(--color-paper)]">
          ⌘K
        </span>
      </button>
      <span className="w-6 h-6 rounded-full bg-[var(--color-blue)]" />
    </div>
  );
}

/* --- Module 1 — Calendar --- */
function Calendar() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  // appointments.status is lowercase per schema. resource_id resolves to initials like "DR LANE".
  const blocks = [
    { col: 0, top: 6, h: 60, title: "Anti-wrinkle review", time: "09:00", status: "confirmed", res: "DR LANE", b: true },
    { col: 1, top: 30, h: 50, title: "Lip filler 1.0ml", time: "10:30", status: "completed", res: "DR LANE" },
    { col: 2, top: 14, h: 70, title: "Skin needling", time: "11:15", status: "confirmed", res: "RN PARK" },
    { col: 3, top: 50, h: 60, title: "Video consult", time: "12:00", status: "confirmed", res: "DR LANE", b: true },
    { col: 4, top: 80, h: 50, title: "Hydrafacial", time: "13:00", status: "confirmed", res: "RN PARK" },
    { col: 0, top: 130, h: 50, title: "Initial consult", time: "14:30", status: "confirmed", res: "DR LANE" },
    { col: 2, top: 145, h: 70, title: "Re-book review", time: "15:00", status: "pending", res: "DR LANE", b: true },
    { col: 4, top: 170, h: 50, title: "Peel · TCA 15%", time: "16:00", status: "confirmed", res: "RN PARK" },
  ];
  return (
    <>
      <Header title="Monday, 02 Jun" sub="5 staff · 23 appointments" />
      <div className="mt-4 grid grid-cols-5 gap-2 h-[280px] rounded-md bg-white border border-[var(--color-greige)] p-2 relative">
        {days.map((d, i) => (
          <div key={d} className="relative border-r last:border-r-0 border-[var(--color-greige)] pt-1">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-charcoal)] mb-1 text-center">
              {d}
            </div>
            {blocks
              .filter((b) => b.col === i)
              .map((b, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + j * 0.04, duration: 0.4, ease: EASE }}
                  className="absolute left-1 right-1 rounded-[5px] text-[9.5px] leading-tight px-1.5 py-1 bg-white border border-[var(--color-greige)] text-black"
                  style={{
                    top: b.top,
                    height: b.h,
                    borderLeft: `3px solid ${b.b ? "var(--color-blue)" : "var(--color-charcoal)"}`,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-mono text-[8px] text-[var(--color-charcoal)]">
                      {b.time}
                    </span>
                    <span className="font-mono text-[7.5px] text-[var(--color-blue-ink)] tracking-wide">
                      {b.res}
                    </span>
                  </div>
                  <span className="block truncate">{b.title}</span>
                  <span className="block font-mono text-[7.5px] lowercase text-[var(--color-charcoal)] mt-0.5">
                    {b.status}
                  </span>
                </motion.div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* --- Module 2 — Online Booking (treatment chooser + slot picker + plan card) --- */
function Booking() {
  return (
    <>
      <Header title="Book a treatment" sub="Public booking widget · live preview" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="col-span-1 rounded-md border border-[var(--color-greige)] bg-white p-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-charcoal)]">
            Choose
          </p>
          <div className="mt-2 space-y-1.5">
            {[
              // services.name + duration_minutes (services.price is in DOLLARS — legacy)
              ["Anti-wrinkle review", 60, 526],
              ["Filler · Lips 1.0ml", 75, 680],
              ["Skin needling", 90, 390],
              ["Hydrafacial", 45, 220],
            ].map(([t, d, p], i) => (
              <div
                key={t as string}
                className={clsx(
                  "px-2 py-1.5 rounded-md text-[11px] border flex items-center justify-between",
                  i === 0
                    ? "border-[color-mix(in_srgb,var(--color-blue)_60%,white)] bg-[#f1f5f9] text-[var(--color-blue-ink)]"
                    : "border-[var(--color-greige)] text-[var(--color-charcoal)]",
                )}
              >
                <span className="truncate">{t}</span>
                <span className="font-mono text-[9px] shrink-0 ml-2">
                  {d} min · ${p}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 rounded-md border border-[var(--color-greige)] bg-white p-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-charcoal)]">
            Pick a slot
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["9:00", "10:30", "12:00", "1:30", "3:00", "4:30"].map((t, i) => (
              <div
                key={t}
                className={clsx(
                  "text-center py-1.5 rounded text-[10px] border font-mono",
                  i === 2
                    ? "bg-black text-white border-black"
                    : "border-[var(--color-greige)] text-[var(--color-charcoal)] bg-white",
                )}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md bg-[var(--color-paper)] border border-[var(--color-greige)] p-2 text-[10px] text-[var(--color-charcoal)]">
            Total{" "}
            <span className="font-mono text-black font-semibold ml-1 float-right">$526</span>
          </div>
          <button className="mt-2 w-full text-[11px] py-1.5 rounded-md bg-black text-white">
            Continue
          </button>
        </div>

        <div className="col-span-1 rounded-md overflow-hidden border border-[var(--color-greige)] relative">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--color-blue) 25%, white) 0%, white 100%)",
            }}
          />
          <div className="relative p-3 h-full flex flex-col">
            <p className="font-serif text-[16px] leading-tight">
              Join <em className="italic text-[var(--color-blue-ink)]">Lumière</em>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-charcoal)] mt-1">
              Membership · MONTHLY
            </p>
            <p className="mt-2 text-[10px] text-[var(--color-charcoal)] leading-relaxed">
              Auto-billed monthly. Get 10% off every visit + priority booking.
            </p>
            <span className="mt-auto inline-flex items-center gap-1 text-[10px] font-mono text-[var(--color-blue-ink)]">
              {fmtCents(9900)}/mo →
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Module 3 — EMR (client profile) --- */
function Emr() {
  return (
    <>
      <Header title="Mia Albescu · Visit 04" sub="EMR · pre-treatment assessment" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="col-span-1 rounded-md border border-[var(--color-greige)] bg-white p-3">
          <div className="w-full aspect-square rounded-md bg-[var(--color-greige)] mb-2" />
          <p className="font-mono text-[10px] text-[var(--color-charcoal)] tracking-wide">
            DEMO-001
          </p>
          <p className="text-[13px] font-semibold mt-0.5">Mia Albescu</p>
          <p className="font-mono text-[10px] text-[var(--color-charcoal)] mt-0.5">
            FEMALE · VIC
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-1 font-mono text-[9px] rounded-full px-2 py-0.5 border border-[var(--color-greige)] text-[var(--color-charcoal)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6fae8a]" /> ACTIVE
            </span>
            <span className="inline-flex items-center font-mono text-[9px] rounded-full px-2 py-0.5 border border-[var(--color-greige)] text-[var(--color-blue-ink)] bg-[#f1f5f9]">
              SKIN
            </span>
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          {[
            ["09 APR", "Anti-wrinkle — upper face", "22u · botulinum toxin"],
            ["12 MAR", "Initial consultation", "Treatment plan agreed"],
            ["12 MAR", "Skin assessment", "Baseline photo set captured"],
            ["28 FEB", "Enquiry · email", "Referred by N. Park"],
          ].map(([when, title, sub], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="rounded-md border border-[var(--color-greige)] bg-white px-3 py-2"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] text-[var(--color-charcoal)]">{when}</span>
                <span className="font-mono text-[9px] text-[var(--color-blue-ink)]">DR LANE</span>
              </div>
              <p className="text-[12px] font-medium mt-0.5">{title}</p>
              <p className="text-[10.5px] text-[var(--color-charcoal)] mt-0.5">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

/* --- Module 4 — Workflows --- */
function Workflows() {
  return (
    <>
      <Header title="Post-treatment journey" sub="Workflow · 5 steps · active" />
      <div className="mt-4 space-y-2">
        {[
          // messages.message_type + direction values (lowercase per schema)
          ["Reminder", "1 day before", "sms · outbound", true],
          ["Visit", "Today · in clinic", "system_event", true],
          ["Aftercare", "2h after · curated PDF", "email · outbound", true],
          ["Review request", "+14 days · Google + internal", "email · outbound", false],
          ["Rebook prompt", "+6 weeks · suggested time", "sms · outbound", false],
        ].map(([title, sub, meta, done], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
            className="flex items-center gap-3 rounded-md border border-[var(--color-greige)] bg-white px-3 py-2.5"
          >
            <span
              className={clsx(
                "grid place-items-center w-7 h-7 rounded-full text-[10px] font-mono shrink-0",
                done
                  ? "bg-[var(--color-blue)] text-white"
                  : "bg-white border border-[var(--color-greige)] text-[var(--color-charcoal)]",
              )}
            >
              {done ? "✓" : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium">{title as string}</p>
              <p className="text-[10.5px] text-[var(--color-charcoal)]">{sub as string}</p>
              <p className="font-mono text-[9px] text-[var(--color-charcoal)] mt-0.5 lowercase tracking-wide">
                {meta as string}
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-blue-ink)]">
              {done ? "Done" : "Queued"}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* --- Module 5 — Payments --- */
function Payments() {
  // sales.total_cents (integer cents). status = SaleStatus. payment_method = SalePaymentMethod.
  const rows: {
    sale_number: string;
    client: string;
    item: string;
    total_cents: number;
    status: "COMPLETED";
    payment_method: "EFT_POS" | "CARD_ON_FILE" | "BANK_TRANSFER" | "WALLET";
  }[] = [
    { sale_number: "S-10428", client: "Mia Albescu", item: "Anti-wrinkle 22u", total_cents: 39600, status: "COMPLETED", payment_method: "EFT_POS" },
    { sale_number: "S-10429", client: "Priya Nadar", item: "Filler · lips 1.0ml", total_cents: 52600, status: "COMPLETED", payment_method: "EFT_POS" },
    { sale_number: "S-10430", client: "Holly Tan", item: "Skin needling + LED", total_cents: 24000, status: "COMPLETED", payment_method: "CARD_ON_FILE" },
    { sale_number: "S-10431", client: "L. Greer", item: "Glow membership", total_cents: 9900, status: "COMPLETED", payment_method: "CARD_ON_FILE" },
  ];

  return (
    <>
      <Header title="Payments" sub={`Today · ${fmtCents(842000)} collected`} />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["EFT_POS", 521000],
          ["BANK_TRANSFER", 196000],
          ["CARD_ON_FILE", 125000],
        ].map(([k, v]) => (
          <div key={k as string} className="rounded-md border border-[var(--color-greige)] bg-white p-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-charcoal)]">
              {k as string}
            </p>
            <p className="font-serif text-[20px] mono mt-0.5 leading-none">{fmtCents(v as number)}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md border border-[var(--color-greige)] bg-white">
        {rows.map((r, i) => (
          <motion.div
            key={r.sale_number}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            className={clsx(
              "grid grid-cols-[78px_1fr_auto] gap-2 items-center px-3 py-2 text-[11.5px]",
              i > 0 && "border-t border-[var(--color-greige)]",
            )}
          >
            <span className="font-mono text-[10.5px] text-[var(--color-charcoal)]">
              {r.sale_number}
            </span>
            <div className="min-w-0">
              <p className="truncate">{r.client}</p>
              <p className="text-[10px] text-[var(--color-charcoal)] truncate">{r.item}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-mono font-medium">{fmtCents(r.total_cents)}</span>
              <div className="flex items-center gap-1">
                <span className="font-mono text-[8.5px] uppercase tracking-wider px-1.5 py-[1px] rounded-full bg-black text-white">
                  {r.status}
                </span>
                <span className="font-mono text-[8.5px] text-[var(--color-charcoal)]">
                  {r.payment_method}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h4 className="font-serif text-[18px] leading-tight">{title}</h4>
        <p className="text-[10.5px] text-[var(--color-charcoal)] mt-0.5 font-mono">{sub}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-black text-white">Today</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white border border-[var(--color-greige)] text-[var(--color-charcoal)]">
          Week
        </span>
      </div>
    </div>
  );
}

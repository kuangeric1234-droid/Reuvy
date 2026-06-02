"use client";

import { motion } from "motion/react";
import { ShieldCheck, Lock } from "lucide-react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

const ROWS = [
  { ts: "09:02:14", action: "Consent signed", sub: "Mia Albescu · upper face plan", actor: "DR LANE" },
  { ts: "09:14:08", action: "S4 administered", sub: "BTX-A · batch 4471 · 20U", actor: "DR LANE" },
  { ts: "09:15:32", action: "Clinical note locked", sub: "treatment record #38291", actor: "SYSTEM" },
  { ts: "09:31:50", action: "Photo set added", sub: "post-treatment · 6 frames", actor: "N. PARK" },
];

/**
 * AuditTrailMock
 * Small append-only audit panel mock used in the "Tamper-evident" highlight.
 * Mono columns: timestamp · action · actor. Tasteful tinted status pill.
 */
export function AuditTrailMock() {
  return (
    <div
      className="rounded-[10px] bg-white border border-[var(--color-greige)] p-[18px] shadow-[0_20px_50px_-36px_rgba(20,20,18,0.28)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--color-greige)]">
        <span className="font-serif text-[15px] text-black flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex w-6 h-6 rounded-md items-center justify-center"
            style={{
              background: "color-mix(in srgb, var(--color-blue) 22%, white)",
            }}
          >
            <ShieldCheck size={13} className="text-[var(--color-blue-ink)]" />
          </span>
          Audit trail
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.12em] uppercase inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] border"
          style={{
            color: "var(--color-blue-ink)",
            borderColor: "color-mix(in srgb, var(--color-blue) 55%, white)",
            background: "color-mix(in srgb, var(--color-blue) 10%, white)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-blue)" }}
          />
          Append-only
        </span>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
        }}
        className="flex flex-col"
      >
        {ROWS.map((r, i) => (
          <motion.li
            key={r.action + r.ts}
            variants={{
              hidden: { opacity: 0, x: -8 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.45, ease: EASE },
              },
            }}
            className={[
              "grid grid-cols-[78px_1fr_auto] gap-3 items-baseline py-[10px]",
              i === 0 ? "" : "border-t border-[var(--color-greige)]",
            ].join(" ")}
          >
            <span
              className="font-mono text-[11px] text-[var(--color-charcoal)] tabular-nums"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {r.ts}
            </span>
            <span className="text-[13px] leading-snug">
              <span className="font-medium text-black">{r.action}</span>
              <span className="text-[var(--color-charcoal)]"> · {r.sub}</span>
            </span>
            <span
              className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-blue-ink)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {r.actor}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <div
        className="mt-3 pt-3 border-t border-[var(--color-greige)] flex items-center gap-2 font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-charcoal)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Lock size={11} className="text-[var(--color-charcoal)]" />
        Records lock on sign-off · changes are versioned, never overwritten
      </div>
    </div>
  );
}

export default AuditTrailMock;

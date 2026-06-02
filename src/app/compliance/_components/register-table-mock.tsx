"use client";

import { motion } from "motion/react";
import { Syringe } from "lucide-react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

type Row = {
  drug: string;
  batch: string;
  patient: string;
  prescriber: string;
  time: string;
};

const ROWS: Row[] = [
  { drug: "BTX-A 100U", batch: "4471-G", patient: "M. Albescu", prescriber: "DR LANE", time: "09:14" },
  { drug: "HA dermal 1ml", batch: "DR-22914", patient: "S. Okafor", prescriber: "DR LANE", time: "10:02" },
  { drug: "Lidocaine 2%", batch: "LX-08812", patient: "J. Tan", prescriber: "DR PATEL", time: "11:47" },
  { drug: "BTX-A 100U", batch: "4471-G", patient: "K. Reilly", prescriber: "DR PATEL", time: "14:25" },
];

/**
 * RegisterTableMock
 * Compact S4 dispensing register table mock. Mono header + mono columns,
 * tinted row hover, status pill at the top. Used in the "S4 dispensing"
 * highlight block on the compliance page.
 */
export function RegisterTableMock() {
  return (
    <div
      className="rounded-[10px] bg-white border border-[var(--color-greige)] p-[18px] shadow-[0_20px_50px_-36px_rgba(20,20,18,0.28)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-greige)]">
        <span className="font-serif text-[15px] text-black flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex w-6 h-6 rounded-md items-center justify-center"
            style={{
              background: "color-mix(in srgb, var(--color-blue) 22%, white)",
            }}
          >
            <Syringe size={13} className="text-[var(--color-blue-ink)]" />
          </span>
          S4 register
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.12em] uppercase rounded-full px-2 py-[3px] border"
          style={{
            color: "var(--color-blue-ink)",
            borderColor: "color-mix(in srgb, var(--color-blue) 55%, white)",
            background: "color-mix(in srgb, var(--color-blue) 10%, white)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Today
        </span>
      </div>

      <div
        className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr_0.55fr] gap-3 font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] pb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>Drug</span>
        <span>Batch</span>
        <span>Patient</span>
        <span>Prescriber</span>
        <span className="text-right">Time</span>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
        }}
        className="flex flex-col"
      >
        {ROWS.map((r, i) => (
          <motion.li
            key={r.drug + r.time + r.patient}
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.42, ease: EASE },
              },
            }}
            className={[
              "grid grid-cols-[1.4fr_1fr_1fr_0.9fr_0.55fr] gap-3 items-baseline py-[10px] text-[12.5px]",
              i === 0 ? "border-t border-[var(--color-greige)]" : "border-t border-[var(--color-greige)]",
            ].join(" ")}
          >
            <span className="text-black font-medium">{r.drug}</span>
            <span
              className="font-mono text-[11.5px] text-[var(--color-charcoal)] tabular-nums"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {r.batch}
            </span>
            <span className="text-[var(--color-charcoal)]">{r.patient}</span>
            <span
              className="font-mono text-[10.5px] tracking-[0.06em] text-[var(--color-blue-ink)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {r.prescriber}
            </span>
            <span
              className="font-mono text-[11px] text-[var(--color-charcoal)] tabular-nums text-right"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {r.time}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <div
        className="mt-3 pt-3 border-t border-[var(--color-greige)] flex items-center justify-between font-mono text-[10.5px] tracking-[0.04em] text-[var(--color-charcoal)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>4 entries · auto-logged at administration</span>
        <span className="text-[var(--color-blue-ink)]">EOM report ready</span>
      </div>
    </div>
  );
}

export default RegisterTableMock;

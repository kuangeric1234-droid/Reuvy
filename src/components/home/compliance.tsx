"use client";

import { motion } from "motion/react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

const POINTS = [
  {
    n: "01",
    title: "Mandatory clinical gating",
    desc: "Treatments can't be booked or charged until a valid consultation and consent exist on the record.",
  },
  {
    n: "02",
    title: "In-person & video consultations",
    desc: "Run compliant initial consults face-to-face or over secure telehealth, captured to the patient file.",
  },
  {
    n: "03",
    title: "S4 drug register",
    desc: "Every scheduled drug is logged against the patient, prescriber and batch automatically.",
  },
  {
    n: "04",
    title: "Immutable audit trail",
    desc: "Who did what, when — a tamper-evident log across the whole clinic, ready for any review.",
  },
];

const AUDIT_ROWS = [
  { ts: "09:02", title: "Consent signed", sub: "· Mia Albescu", by: "DR LANE" },
  { ts: "09:14", title: "S4 administered", sub: "· BTX batch 4471", by: "DR LANE" },
  { ts: "09:15", title: "Clinical note locked", sub: "· upper face", by: "SYSTEM" },
  { ts: "09:31", title: "Photo set added", sub: "· post-treatment", by: "N. PARK" },
];

export function Compliance() {
  return (
    <section id="compliance" className="bg-[var(--color-paper)] border-y border-[var(--color-greige)] section">
      <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-[72px] items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow">AHPRA compliance</p>
          <h2 className="text-[clamp(30px,4vw,46px)]">
            Compliance that works the way <em>regulators expect</em>
          </h2>
          <p className="mt-5 text-[var(--color-charcoal)] text-[18px] max-w-[44ch]">
            Cosmetic injectables are under real scrutiny in Australia. Ruevii bakes the guidelines
            into the workflow — so doing the right thing is simply how the software works.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            className="mt-[30px] grid"
          >
            {POINTS.map((p, i) => (
              <motion.div
                key={p.n}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                }}
                className={`grid grid-cols-[30px_1fr] gap-4 py-[18px] ${i === 0 ? "" : "border-t border-[var(--color-greige)]"}`}
              >
                <span className="font-mono text-[12px] text-[var(--color-blue-ink)] pt-[3px]">{p.n}</span>
                <div>
                  <b className="font-semibold text-[16px]">{p.title}</b>
                  <p className="mt-[5px] text-[14.5px] text-[var(--color-charcoal)]">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
        >
          <div className="bg-white border border-[var(--color-greige)] rounded-[10px] shadow-[0_20px_50px_-36px_rgba(20,20,18,0.28)] p-[22px]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-greige)] mb-1">
              <span className="font-semibold text-[15px] flex items-center gap-[10px]">
                <Shield />
                Audit trail
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.04em] rounded-full px-[10px] py-1 border inline-flex items-center gap-[6px] text-[var(--color-blue-ink)] border-[color-mix(in_srgb,var(--color-blue)_60%,var(--color-white))]">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-blue)]" />
                Tamper-evident
              </span>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
            >
              {AUDIT_ROWS.map((r, i) => (
                <motion.div
                  key={r.title}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  className={`grid grid-cols-[76px_1fr_auto] gap-3 items-center py-3 text-[13px] ${
                    i === 0 ? "" : "border-t border-[var(--color-greige)]"
                  }`}
                >
                  <span className="font-mono text-[11px] text-[var(--color-charcoal)]">{r.ts}</span>
                  <span>
                    <b className="font-semibold">{r.title}</b>{" "}
                    <span className="text-[var(--color-charcoal)]">{r.sub}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-blue-ink)]">{r.by}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-4 font-mono text-[12px] text-[var(--color-charcoal)] flex gap-[9px] items-center">
              🔒 Records locked on sign-off · changes are versioned, never overwritten
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Shield() {
  return (
    <span className="w-[26px] h-[26px] rounded-md bg-[color-mix(in_srgb,var(--color-blue)_30%,var(--color-white))] grid place-items-center">
      <span
        className="w-[11px] h-[11px] bg-[var(--color-blue-ink)]"
        style={{ clipPath: "polygon(50% 0, 100% 22%, 100% 60%, 50% 100%, 0 60%, 0 22%)" }}
      />
    </span>
  );
}

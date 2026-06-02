"use client";

import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const EASE = [0.21, 0.61, 0.27, 1] as const;

/**
 * ProblemBand — DARK band, Decoda-style "your stack is duct tape" moment.
 * Headline left, stacked product-card cluster right (SMS thread, calendar slice,
 * Stripe row — each in its own white card, diagonally offset).
 */
export function ProblemBand() {
  return (
    <section
      aria-label="The problem we solve"
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--color-ink)",
        color: "#f4f3ef",
      }}
    >
      <div className="wrap section grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-[72px] items-center">
        {/* Text column */}
        <div>
          <Reveal>
            <EyebrowTagOnDark icon={AlertTriangle}>THE STACK PROBLEM</EyebrowTagOnDark>
          </Reveal>

          <Reveal delay={0.05} className="mt-6">
            <h2
              className="font-serif font-normal text-[clamp(32px,4.6vw,58px)] leading-[1.04] tracking-[-0.025em] text-balance"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="block text-white">Your clinic runs on a stack of tools,</span>
              <span className="block" style={{ color: "var(--color-blue)" }}>
                that don&apos;t talk to each other.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="mt-6">
            <p className="text-[18px] leading-[1.55] text-[#b9b6ad] max-w-[44ch]">
              Booking lives in one app. Payments in another. SMS in a third. Inventory
              somewhere on a spreadsheet. Every reconciliation is a rebuild — and every
              AHPRA audit is a paper chase. Ruevii makes the whole clinic one calm system.
            </p>
          </Reveal>

          <Stagger className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3" stagger={0.07}>
            {[
              { k: "5+", v: "point tools to glue together" },
              { k: "11 hrs", v: "lost to admin, per practitioner/wk" },
              { k: "0", v: "single source of truth" },
            ].map((m) => (
              <StaggerItem key={m.k} className="border border-[#2c2c29] rounded-md p-4 bg-[#181816]">
                <div className="font-serif text-[28px] leading-none text-white">{m.k}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8a877f]">
                  {m.v}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Stacked card cluster */}
        <div className="relative min-h-[440px] lg:min-h-[520px]">
          {/* SMS thread (top-back) */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute top-0 left-0 w-[78%] max-w-[420px]"
            style={{ transformOrigin: "top left" }}
          >
            <MockCard title="Messages · Twilio" mono="THREAD #4471">
              <div className="px-4 py-3 space-y-2">
                <div className="flex">
                  <span className="max-w-[78%] bg-[var(--color-greige-2)] rounded-[10px] rounded-bl-[3px] px-3 py-2 text-[12.5px] text-[var(--color-charcoal)]">
                    Hi! Can I move my Thursday appt to next week?
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="max-w-[78%] bg-[color-mix(in_srgb,var(--color-blue)_24%,white)] rounded-[10px] rounded-br-[3px] px-3 py-2 text-[12.5px] text-[var(--color-blue-ink)]">
                    Sure — checking the calendar now…
                  </span>
                </div>
                <div className="font-mono text-[10px] text-[var(--color-mute)] text-center pt-1">
                  switched tab → booking app
                </div>
              </div>
            </MockCard>
          </motion.div>

          {/* Calendar slice (middle) */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
            className="absolute top-[150px] right-0 w-[80%] max-w-[440px]"
            style={{ transformOrigin: "top right" }}
          >
            <MockCard title="Calendar · separate vendor" mono="WK 23 · JUN">
              <div className="grid grid-cols-[40px_repeat(3,1fr)] border-t border-[var(--color-greige)]">
                {["", "TUE", "WED", "THU"].map((d, i) => (
                  <div
                    key={i}
                    className="font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--color-charcoal)] text-center py-2 border-b border-[var(--color-greige)] bg-[var(--color-paper)]"
                  >
                    {d}
                  </div>
                ))}
                {[
                  ["09", "anti-wrinkle", "", "consult"],
                  ["10", "", "filler 1.0ml", ""],
                  ["11", "skin needling", "", "hydrafacial"],
                ].map((row, r) => (
                  <div key={r} className="contents">
                    <div className="font-mono text-[10px] text-[var(--color-mute)] text-right pr-1 pt-2 border-b border-r border-[var(--color-greige)]">
                      {row[0]}
                    </div>
                    {row.slice(1).map((cell, c) => (
                      <div
                        key={c}
                        className="min-h-[42px] p-1 border-b border-[var(--color-greige)] border-r last:border-r-0"
                      >
                        {cell && (
                          <div
                            className="text-[10.5px] rounded-[4px] px-2 py-1 bg-white border border-[var(--color-greige)]"
                            style={{ borderLeft: "3px solid var(--color-blue)" }}
                          >
                            {cell}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </MockCard>
          </motion.div>

          {/* Stripe row (bottom-front) */}
          <motion.div
            initial={{ opacity: 0, y: 32, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="absolute bottom-0 left-[8%] w-[84%] max-w-[460px]"
            style={{ transformOrigin: "bottom left" }}
          >
            <MockCard title="Stripe · payments tab" mono="CH_3O7E8K2eZv">
              <table className="w-full text-[12.5px]">
                <tbody>
                  {[
                    ["pi_3O7E8K", "Mia Albescu", "$396.00", "succeeded"],
                    ["pi_3O7E5A", "James Park", "$180.00", "succeeded"],
                    ["pi_3O7E1Q", "Lara Mensah", "$1,240.00", "succeeded"],
                  ].map((r, i) => (
                    <tr key={i} className={i === 0 ? "" : "border-t border-[var(--color-greige)]"}>
                      <td className="py-2 px-3 font-mono text-[10.5px] text-[var(--color-charcoal)]">
                        {r[0]}
                      </td>
                      <td className="py-2 px-1 text-[var(--color-charcoal)]">{r[1]}</td>
                      <td className="py-2 px-1 text-right font-mono">{r[2]}</td>
                      <td className="py-2 px-3 text-right">
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[#4d7a5e] bg-[#f1f7f2] border border-[#cfe3d6] rounded-full px-2 py-[2px]">
                          {r[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-3 py-2 border-t border-[var(--color-greige)] font-mono text-[10px] text-[var(--color-mute)]">
                no link back to the booking, the patient, or the S4 register
              </div>
            </MockCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- helpers ----------------------------- */

function EyebrowTagOnDark({
  icon: Icon,
  children,
}: {
  icon?: typeof AlertTriangle;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-[8px] rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] leading-none"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#d8d6cf",
        fontFamily: "var(--font-mono)",
      }}
    >
      {Icon ? (
        <Icon size={12} className="shrink-0" style={{ color: "var(--color-blue)" }} />
      ) : (
        <span
          aria-hidden
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{ background: "var(--color-blue)" }}
        />
      )}
      <span>{children}</span>
    </span>
  );
}

function MockCard({
  title,
  mono,
  children,
}: {
  title: string;
  mono?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[10px] bg-white border border-[var(--color-greige)] overflow-hidden"
      style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.55)" }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-greige)] bg-[color-mix(in_srgb,var(--color-paper)_65%,white)]">
        <span className="text-[12.5px] font-medium text-[var(--color-charcoal)]">{title}</span>
        {mono && (
          <span
            className="font-mono text-[10px] tracking-[0.04em] text-[var(--color-mute)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {mono}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ProblemBand;

"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

type Stat = { value: number; unit: string; label: string; decimals?: number };

const STATS: Stat[] = [
  { value: 11, unit: "hrs", label: "of admin saved per week, per practitioner" },
  { value: 38, unit: "%", label: "fewer no-shows with deposits + smart reminders" },
  { value: 24, unit: "%", label: "more rebookings from automated recall" },
  { value: 340, unit: "+", label: "Australian clinics running on Ruevii" },
];

export function Stats() {
  return (
    <section className="bg-[var(--color-paper)] border-b border-[var(--color-greige)] section-sm">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatBlock key={s.label} {...s} index={i} />
          ))}
        </div>
        <p className="mt-9 font-mono text-[12px] text-[#a6a399]">
          // Indicative figures from early Ruevii clinics. Your results will vary.
        </p>
      </div>
    </section>
  );
}

function StatBlock({ value, unit, label, decimals = 0, index }: Stat & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.21, 0.61, 0.27, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.61, 0.27, 1] }}
      className={`px-[30px] py-4 ${index > 0 ? "lg:border-l border-[var(--color-greige)]" : ""} ${
        index > 0 ? "max-lg:border-t max-lg:pt-5 max-lg:px-0" : "max-lg:px-0"
      } ${index === 0 ? "lg:pl-0" : ""}`}
    >
      <div className="font-serif text-[clamp(40px,5vw,60px)] leading-none tracking-[-0.02em] mono">
        {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}
        <span className="text-[0.5em] text-[var(--color-blue-ink)] ml-[2px]">{unit}</span>
      </div>
      <div className="mt-3 text-[14px] text-[var(--color-charcoal)] leading-[1.4] max-w-[22ch]">
        {label}
      </div>
    </motion.div>
  );
}

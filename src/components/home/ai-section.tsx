"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useCommandPalette } from "@/components/command-palette";

const EASE = [0.21, 0.61, 0.27, 1] as const;
const TYPED = "Which injectors are below target this month?";

export function AISection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [typed, setTyped] = useState("");
  const openCmd = useCommandPalette((s) => s.open);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TYPED.slice(0, i));
      if (i >= TYPED.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section id="ai" ref={ref} className="bg-[var(--color-ink)] text-[#f4f3ef] py-[120px] max-md:py-[72px]">
      <div className="wrap">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="eyebrow on-dark inline-flex"
          >
            Ruevii AI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="text-[clamp(32px,4.4vw,52px)] text-[#fafaf8]"
          >
            Ask your clinic <em style={{ color: "var(--color-blue)" }}>anything</em>. Then let it act.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-[22px] text-[#b9b6ad] text-[19px] max-w-[50ch] mx-auto"
          >
            One command bar across the whole platform. Surface the insight, draft the message, run
            the task — without digging through menus or reports.
          </motion.p>
        </div>

        <motion.button
          onClick={openCmd}
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
          whileHover={{ y: -2 }}
          className="mx-auto block max-w-[620px] w-full bg-[#181816] border border-[#2c2c29] rounded-[12px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] cursor-pointer text-left transition-transform"
        >
          <div className="flex items-center gap-3 px-5 py-[18px] border-b border-[#2c2c29]">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 fill-[var(--color-blue)]">
              <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
            </svg>
            <span className="text-[17px] text-[#fafaf8] min-h-[24px]">
              {typed}
              <span className="inline-block w-[2px] h-[20px] bg-[var(--color-blue)] ml-[2px] align-middle caret-blink" />
            </span>
            <span className="ml-auto font-mono text-[11px] text-[#8a877f] border border-[#34342f] rounded-[5px] px-2 py-[3px]">
              ⌘K
            </span>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.3 } } }}
          >
            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#6f6c64] px-5 pt-[14px] pb-2">
              Answer
            </div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              className="flex items-center gap-[14px] px-5 py-3 text-[14.5px] text-[#d8d6cf]"
            >
              <span className="w-5 h-5 rounded-[5px] border-[1.5px] border-[#44443f] flex-none" />
              <span className="text-[#8a877f] text-[13px]">
                2 of 5 injectors are tracking below target. Dr. Lane is at 82%, N. Park at 76% of June goal.
              </span>
            </motion.div>

            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#6f6c64] px-5 pt-[14px] pb-2">
              Suggested actions
            </div>
            {[
              { label: "Draft a re-book campaign for N. Park's lapsed clients", hint: "Run →", hot: true },
              { label: "Open this month's staff performance report", hint: "↵" },
              { label: "Fill 3 open slots from the waitlist", hint: "↵" },
            ].map((it) => (
              <motion.div
                key={it.label}
                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
                className={`flex items-center gap-[14px] px-5 py-3 text-[14.5px] text-[#d8d6cf] ${it.hot ? "bg-[#232320]" : ""}`}
              >
                <span
                  className={`w-5 h-5 rounded-[5px] border-[1.5px] flex-none ${
                    it.hot ? "border-[var(--color-blue)] bg-[color-mix(in_srgb,var(--color-blue)_22%,transparent)]" : "border-[#44443f]"
                  }`}
                />
                {it.label}
                <span className="ml-auto font-mono text-[11px] text-[#6f6c64]">{it.hint}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.button>

        <p className="text-center mt-10 text-[#8a877f] text-[14px]">
          Try it anywhere in Ruevii — press{" "}
          <span className="font-mono border border-[#34342f] rounded-[5px] px-2 py-[3px] text-[#d8d6cf] mx-[3px]">⌘</span>
          <span className="font-mono border border-[#34342f] rounded-[5px] px-2 py-[3px] text-[#d8d6cf] mx-[3px]">K</span>{" "}
          to open the command bar.
        </p>
      </div>
    </section>
  );
}

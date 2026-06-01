"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCommandPalette } from "@/components/command-palette";

const EASE = [0.21, 0.61, 0.27, 1] as const;

export function Hero() {
  const openCmd = useCommandPalette((s) => s.open);

  return (
    <section className="wrap pt-[84px] pb-[72px] text-center max-md:pt-14 max-md:pb-12">
      {/* Trust pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="inline-flex items-center gap-[10px] bg-white border border-[var(--color-greige)] rounded-full pl-2 pr-[14px] py-[7px] text-[13px] text-[var(--color-charcoal)] mb-[30px]"
      >
        <span className="flex">
          <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-[var(--color-greige)]" />
          <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-[color-mix(in_srgb,var(--color-blue)_60%,var(--color-greige))] -ml-[7px]" />
          <span className="w-[22px] h-[22px] rounded-full border-2 border-white bg-[var(--color-greige-2)] -ml-[7px]" />
        </span>
        Trusted by <b className="text-black font-semibold">340+ Australian clinics</b>
        <span aria-hidden className="w-[7px] h-[7px] rounded-full bg-[var(--color-blue)]" />
      </motion.div>

      {/* H1 with per-word stagger */}
      <motion.h1
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
        className="text-[clamp(40px,6vw,78px)] font-normal mx-auto max-w-[16ch] tracking-[-0.025em] leading-[1.02]"
      >
        {["The", "operating", "system", "for", "your"].map((w, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
            }}
            className="inline-block mr-[0.22em]"
          >
            {w}
          </motion.span>
        ))}
        <motion.em
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
          }}
          className="inline-block italic text-[var(--color-blue-ink)] not-italic-fallback"
          style={{ fontStyle: "italic" }}
        >
          aesthetics clinic
        </motion.em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="mx-auto mt-[26px] text-[20px] text-[var(--color-charcoal)] max-w-[52ch] leading-[1.5]"
      >
        Ruevii brings clinical records, AHPRA-compliant consults, bookings, payments and inventory
        into one calm, beautiful workspace — built natively for Australian injectable &amp; cosmetic
        clinics.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
        className="flex gap-3 justify-center mt-[34px] max-md:flex-col max-md:items-stretch"
      >
        <motion.a
          href="#pricing"
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="group inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors"
        >
          Book a demo
          <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
        </motion.a>
        <motion.a
          href="#features"
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-white border border-[var(--color-greige)] text-black hover:border-[#cdcabf] transition-colors"
        >
          Take a product tour
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-[26px] flex items-center justify-center gap-[10px] text-[13.5px] text-[var(--color-charcoal)]"
      >
        <span className="text-black tracking-[2px] text-[12px]">★★★★★</span>
        <span>
          <b className="text-black font-semibold">4.9</b> from clinic owners · AHPRA-aligned by
          design
        </span>
      </motion.div>

      {/* hero product mock */}
      <div className="relative mt-16">
        <div
          aria-hidden
          className="absolute inset-x-0 -bottom-10 h-[220px] -z-10"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0, rgba(155,183,209,0.18), transparent 70%)",
          }}
        />
        <DashboardWithSpotlight openCmd={openCmd} />
      </div>
    </section>
  );
}

function DashboardWithSpotlight({ openCmd }: { openCmd: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 160, damping: 30, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 160, damping: 30, mass: 0.5 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}px ${y}px, rgba(155,183,209,0.18), transparent 65%)`,
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={{
        opacity: 1,
        y: [0, -6, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.9, delay: 0.6, ease: EASE },
        scale: { duration: 0.9, delay: 0.6, ease: EASE },
        y: {
          duration: 7,
          delay: 1.4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      className="relative"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 rounded-[10px] z-[1] mix-blend-multiply"
      />
      <DashboardMock openCmd={openCmd} />
    </motion.div>
  );
}

function DashboardMock({ openCmd }: { openCmd: () => void }) {
  return (
    <div className="bg-white border border-[var(--color-greige)] rounded-[10px] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.02),0_24px_60px_-32px_rgba(20,20,18,0.22)] text-left mx-auto max-w-[1080px]">
      {/* app bar */}
      <div className="h-[46px] flex items-center gap-3 px-[14px] border-b border-[var(--color-greige)] bg-[var(--color-paper)]">
        <div className="flex gap-[7px]">
          <span className="w-[11px] h-[11px] rounded-full bg-[var(--color-greige)]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[var(--color-greige)]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[var(--color-greige)]" />
        </div>
        <button
          onClick={openCmd}
          className="ml-1 flex-1 max-w-[340px] h-[28px] border border-[var(--color-greige)] rounded-md bg-white flex items-center px-[10px] gap-2 text-[13px] text-[#9a988f] hover:border-[#cdcabf] transition-colors"
        >
          Search clients, treatments, invoices…
          <span className="ml-auto font-mono text-[10px] border border-[var(--color-greige)] rounded px-[6px] py-[2px] text-[var(--color-charcoal)] bg-[var(--color-paper)]">
            ⌘K
          </span>
        </button>
        <span className="ml-auto w-6 h-6 rounded-full bg-[var(--color-blue)]" />
      </div>

      {/* body */}
      <div className="grid grid-cols-1 md:grid-cols-[196px_1fr] min-h-[440px]">
        <aside className="hidden md:flex flex-col gap-[2px] border-r border-[var(--color-greige)] p-4 bg-[var(--color-paper)]">
          {[
            ["Dashboard", true],
            ["Calendar", false],
            ["Clients", false],
            ["Consults", false],
          ].map(([label, active]) => (
            <SideItem key={label as string} label={label as string} active={active as boolean} />
          ))}
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#a6a399] px-[10px] pt-3 pb-[6px]">
            Operations
          </div>
          {["Payments", "Inventory", "Marketing", "Reports"].map((l) => (
            <SideItem key={l} label={l} active={false} />
          ))}
        </aside>

        <div className="p-6 overflow-hidden">
          <div className="flex items-baseline justify-between mb-[18px]">
            <h4 className="text-[22px]">Good morning, Dr. Lane</h4>
            <span className="font-mono text-[12px] text-[var(--color-charcoal)]">TUE · 02 JUN 2026</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-[18px] max-md:grid-cols-1">
            <MStat label="Today's revenue" value="$8,420" delta="▲ 12% vs avg" />
            <MStat label="Appointments" value="19" delta="3 consults · 16 tx" />
            <MStat label="No-show risk" value="2" delta="reminders sent" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            className="flex flex-col gap-2"
          >
            <Appt time="09:00" who="Mia Albescu" what="Anti-wrinkle · upper face · review" tag="Consult" variant="b" />
            <Appt time="10:30" who="Priya Nadar" what="Dermal filler · lips 1.0ml" tag="Treatment" variant="k" />
            <Appt time="11:15" who="Holly Tan" what="Skin needling + LED" tag="Treatment" variant="default" />
            <Appt time="12:00" who="New patient · video" what="Initial cosmetic consultation" tag="Telehealth" variant="default" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SideItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={`flex items-center gap-[10px] px-[10px] py-2 rounded-md text-[13.5px] transition-colors ${
        active ? "bg-black text-white" : "text-[var(--color-charcoal)]"
      }`}
    >
      <span
        className={`w-[15px] h-[15px] rounded-[4px] border-[1.5px] shrink-0 transition-colors ${
          active ? "border-white" : "border-current opacity-55"
        }`}
      />
      {label}
    </div>
  );
}

function MStat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="border border-[var(--color-greige)] rounded-md p-[14px] bg-white">
      <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-[var(--color-charcoal)]">
        {label}
      </div>
      <div className="font-serif text-[30px] leading-none mt-[6px] mono">{value}</div>
      <div className="font-mono text-[11.5px] text-[var(--color-blue-ink)] mt-[7px]">{delta}</div>
    </div>
  );
}

function Appt({
  time,
  who,
  what,
  tag,
  variant,
}: {
  time: string;
  who: string;
  what: string;
  tag: string;
  variant: "b" | "k" | "default";
}) {
  const borderColor =
    variant === "b"
      ? "var(--color-blue)"
      : variant === "k"
        ? "var(--color-charcoal)"
        : "var(--color-greige)";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
      }}
      whileHover={{ y: -1 }}
      className="grid grid-cols-[58px_1fr_auto] items-center gap-[14px] border border-[var(--color-greige)] rounded-md p-[14px] bg-white"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <span className="font-mono text-[12px] text-[var(--color-charcoal)]">{time}</span>
      <span>
        <span className="block text-[14px] font-medium">{who}</span>
        <span className="block text-[12.5px] text-[var(--color-charcoal)] mt-[2px]">{what}</span>
      </span>
      <span className="font-mono text-[11px] border border-[var(--color-greige)] rounded-full px-[9px] py-[3px] text-[var(--color-charcoal)]">
        {tag}
      </span>
    </motion.div>
  );
}

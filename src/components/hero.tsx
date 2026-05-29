"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Calendar,
  CreditCard,
  FileText,
  Globe,
  Sparkles,
  Workflow,
} from "lucide-react";
import clsx from "clsx";
import { Stagger, StaggerItem } from "@/components/motion-primitives";

const MODULES = [
  { key: "calendar", label: "Calendar", icon: Calendar },
  { key: "booking", label: "Online Booking", icon: Globe },
  { key: "emr", label: "EMR", icon: FileText },
  { key: "workflows", label: "Workflows", icon: Workflow },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "ai", label: "AI Scribe", icon: Sparkles },
] as const;

export function Hero() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // gentle parallax on hero gradient
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  // auto-rotate the active module
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % MODULES.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
    >
      {/* parallax gradient backdrop */}
      <motion.div
        aria-hidden
        style={{ y: glowY, opacity: glowOpacity }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 600px at 80% -10%, rgba(155,183,209,0.28), transparent 60%), radial-gradient(700px 500px at 0% 10%, rgba(155,183,209,0.12), transparent 60%)",
          }}
        />
      </motion.div>

      <div className="container-x">
        <Stagger className="max-w-3xl" delayChildren={0.05} stagger={0.09}>
          <StaggerItem>
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[var(--color-reuvy-700)] bg-[var(--color-reuvy-100)] rounded-full px-3 py-1.5">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-reuvy-500)]"
              />
              Trusted by 3,500+ practices worldwide
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-tight">
              The only software<br />
              your practice<br />
              <span className="italic font-serif text-[var(--color-reuvy-700)]">
                will ever need.
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Reuvy brings clinical care, scheduling, payments and patient engagement into one
              quietly powerful platform — so your team can spend less time stitching tools
              together, and more time with the people in front of them.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <motion.a
                href="#demo"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="group inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--color-reuvy-700)] transition-colors"
              >
                Book a demo
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </motion.a>
              <motion.a
                href="#tour"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="inline-flex items-center justify-center gap-2 border border-[var(--color-line)] hover:border-[var(--color-reuvy-400)] text-[var(--color-ink)] px-6 py-3.5 rounded-full text-sm font-medium transition-colors"
              >
                Take a product tour
              </motion.a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 flex items-center gap-6 text-xs text-[var(--color-muted)]">
              <Rating />
              <span className="hidden sm:inline">★ 4.8 on Capterra, G2 & Trustpilot</span>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.21, 0.61, 0.27, 1] }}
          className="relative mt-16 md:mt-24"
        >
          <ModuleTabs active={active} setActive={setActive} />
          <DashboardMock active={active} />
        </motion.div>
      </div>
    </section>
  );
}

function Rating() {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.07, type: "spring", stiffness: 400, damping: 20 }}
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 fill-[var(--color-reuvy-500)]"
        >
          <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.5 21.7l1.8-7.3L1.6 9.5l7.5-.6L12 2z" />
        </motion.svg>
      ))}
      <span className="ml-1 text-[var(--color-ink-soft)] font-medium">4.8</span>
    </div>
  );
}

function ModuleTabs({
  active,
  setActive,
}: {
  active: number;
  setActive: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {MODULES.map((m, i) => {
        const Icon = m.icon;
        const isActive = active === i;
        return (
          <button
            key={m.key}
            onClick={() => setActive(i)}
            className={clsx(
              "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors",
              isActive
                ? "text-white border-transparent"
                : "text-[var(--color-ink-soft)] bg-white border-[var(--color-line)] hover:border-[var(--color-reuvy-400)]",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[var(--color-ink)] -z-10"
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            )}
            <Icon size={14} />
            <span className="relative">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function DashboardMock({ active }: { active: number }) {
  const current = MODULES[active];
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* breathing glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-x-10 -bottom-10 h-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,183,209,0.65), transparent)",
        }}
      />
      <div className="relative rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_30px_80px_-30px_rgba(15,29,43,0.20)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 h-9 border-b border-[var(--color-line)] bg-[var(--color-mist)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-4 text-xs text-[var(--color-muted)]">
            reuvy.app / {current.key}
          </span>
        </div>

        <div className="grid grid-cols-12">
          <aside className="hidden md:block col-span-3 lg:col-span-2 border-r border-[var(--color-line)] p-4 bg-white relative">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              const isActive = i === active;
              return (
                <div key={m.key} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-[var(--color-reuvy-100)]"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <div
                    className={clsx(
                      "relative flex items-center gap-2 px-2 py-2 rounded-lg text-xs mb-1",
                      isActive ? "text-[var(--color-reuvy-800)]" : "text-[var(--color-muted)]",
                    )}
                  >
                    <Icon size={14} />
                    <span className="truncate">{m.label}</span>
                  </div>
                </div>
              );
            })}
          </aside>

          <div className="col-span-12 md:col-span-9 lg:col-span-10 p-5 md:p-8 bg-gradient-to-b from-white to-[var(--color-mist)] min-h-[340px] md:min-h-[420px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.21, 0.61, 0.27, 1] }}
              >
                {current.key === "calendar" && <CalendarMock />}
                {current.key === "booking" && <BookingMock />}
                {current.key === "emr" && <EmrMock />}
                {current.key === "workflows" && <WorkflowsMock />}
                {current.key === "payments" && <PaymentsMock />}
                {current.key === "ai" && <AiMock />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h4 className="font-serif text-xl md:text-2xl text-[var(--color-ink)]">{title}</h4>
        <p className="text-xs text-[var(--color-muted)] mt-1">{sub}</p>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
          Today
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)]">
          Week
        </span>
      </div>
    </div>
  );
}

function CalendarMock() {
  const cols = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks = [
    { col: 0, top: 8, h: 60, label: "Sarah · Hydrafacial" },
    { col: 1, top: 25, h: 80, label: "Maya · Consult" },
    { col: 2, top: 55, h: 100, label: "Olivia · Botox" },
    { col: 3, top: 12, h: 40, label: "Liam · Review" },
    { col: 4, top: 70, h: 70, label: "Naya · Laser" },
  ];
  return (
    <>
      <MockHeader title="Monday, 12 Aug" sub="5 staff · 23 appointments" />
      <div className="grid grid-cols-5 gap-2 h-[260px] rounded-xl bg-white border border-[var(--color-line)] p-3 relative">
        {cols.map((c, i) => (
          <div key={c} className="relative border-r last:border-r-0 border-[var(--color-line)]">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-2 text-center">
              {c}
            </div>
            {blocks
              .filter((b) => b.col === i)
              .map((b, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  className="absolute left-1 right-1 rounded-md text-[10px] font-medium px-1.5 py-1 text-[var(--color-reuvy-900)] border border-[var(--color-reuvy-300)]"
                  style={{
                    top: b.top,
                    height: b.h,
                    background:
                      "linear-gradient(180deg, rgba(155,183,209,0.45), rgba(155,183,209,0.20))",
                  }}
                >
                  {b.label}
                </motion.div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

function BookingMock() {
  return (
    <>
      <MockHeader title="Book a treatment" sub="Public booking widget · live preview" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--color-line)] bg-white p-5">
          <p className="text-xs text-[var(--color-muted)]">SELECT TREATMENT</p>
          <div className="mt-3 space-y-2">
            {[
              "Hydrafacial · 60 min · $189",
              "Microneedling · 75 min · $260",
              "Botox consult · 30 min · Free",
            ].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className={clsx(
                  "px-3 py-2.5 rounded-lg text-sm border",
                  i === 0
                    ? "bg-[var(--color-reuvy-100)] border-[var(--color-reuvy-300)] text-[var(--color-reuvy-900)]"
                    : "border-[var(--color-line)] text-[var(--color-ink-soft)]",
                )}
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-[var(--color-line)] bg-white p-5">
          <p className="text-xs text-[var(--color-muted)]">PICK A TIME</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["9:00", "10:30", "12:00", "1:30", "3:00", "4:30"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={clsx(
                  "py-2 text-center text-sm rounded-md border",
                  i === 2
                    ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                    : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white",
                )}
              >
                {t}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--color-muted)]">
            Confirmed instantly. SMS reminders sent automatically.
          </p>
        </div>
      </div>
    </>
  );
}

function EmrMock() {
  return (
    <>
      <MockHeader title="Sarah Chen · Visit 04" sub="EMR · pre-treatment assessment" />
      <div className="rounded-xl border border-[var(--color-line)] bg-white p-5 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          {["Chief concern", "Skin assessment", "Treatment plan", "Consent & risks"].map(
            (s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="border border-[var(--color-line)] rounded-lg px-3 py-2.5"
              >
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
                  {s}
                </p>
                <p className="text-sm text-[var(--color-ink)] mt-1">
                  {i === 0
                    ? "Pigmentation across cheeks, mild texture irregularity."
                    : i === 1
                      ? "Fitzpatrick III · combination · barrier intact."
                      : i === 2
                        ? "3× Hydrafacial + topical brightening protocol."
                        : "Acknowledged · signed at 10:42am."}
                </p>
              </motion.div>
            ),
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="rounded-lg bg-[var(--color-reuvy-50)] border border-[var(--color-reuvy-200)] p-4"
        >
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-reuvy-700)]">
            Scribe AI suggestion
          </p>
          <p className="text-sm text-[var(--color-ink)] mt-2 leading-relaxed">
            Add SPF50 reapplication note to aftercare. Schedule review in 4 weeks.
          </p>
          <button className="mt-3 text-xs px-3 py-1.5 rounded-full bg-[var(--color-ink)] text-white">
            Insert
          </button>
        </motion.div>
      </div>
    </>
  );
}

function WorkflowsMock() {
  const steps = ["Booked", "Reminder", "Visit", "Aftercare", "Review +14d", "Rebook"];
  const completed = 3;
  return (
    <>
      <MockHeader title="Post-treatment journey" sub="Workflow · 6 steps · active" />
      <div className="rounded-xl border border-[var(--color-line)] bg-white p-5 md:p-7">
        <div className="relative">
          {/* base connector line */}
          <div className="absolute left-4 right-4 top-4 h-px bg-[var(--color-line)] hidden sm:block" />
          {/* progress connector (animated) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (completed - 1) / (steps.length - 1) }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.21, 0.61, 0.27, 1] }}
            style={{ transformOrigin: "left center" }}
            className="absolute left-4 right-4 top-4 h-px bg-[var(--color-reuvy-500)] hidden sm:block"
          />
          <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-y-5 gap-x-2">
            {steps.map((s, i) => {
              const isDone = i < completed;
              return (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    type: "spring",
                    stiffness: 340,
                    damping: 24,
                  }}
                  className="text-center"
                >
                  <div
                    className={clsx(
                      "mx-auto h-8 w-8 rounded-full grid place-items-center text-xs font-medium ring-4 ring-white",
                      isDone
                        ? "bg-[var(--color-reuvy-500)] text-white shadow-[0_4px_12px_-4px_rgba(95,134,173,0.6)]"
                        : "bg-white border border-[var(--color-line)] text-[var(--color-muted)]",
                    )}
                  >
                    {isDone ? (
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
                        <path d="M6.2 10.6L3.6 8l-1 1L6.2 12.6 13.4 5.4l-1-1z" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p
                    className={clsx(
                      "mt-2.5 text-[11px]",
                      isDone ? "text-[var(--color-ink)] font-medium" : "text-[var(--color-ink-soft)]",
                    )}
                  >
                    {s}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function PaymentsMock() {
  return (
    <>
      <MockHeader title="Payments" sub="Today · $4,820 collected" />
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { label: "Card", v: "$3,210" },
          { label: "Plan", v: "$960" },
          { label: "Gift", v: "$650" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="rounded-xl border border-[var(--color-line)] bg-white p-5"
          >
            <p className="text-xs text-[var(--color-muted)]">{c.label}</p>
            <p className="font-serif text-2xl mt-1">{c.v}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-4 rounded-xl border border-[var(--color-line)] bg-white"
      >
        {[
          ["Sarah Chen", "Hydrafacial", "$189"],
          ["Maya Patel", "Consult deposit", "$50"],
          ["Olivia Reed", "Botox · 24u", "$420"],
        ].map(([n, t, a], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="grid grid-cols-3 px-4 py-3 text-sm border-b last:border-b-0 border-[var(--color-line)]"
          >
            <span className="text-[var(--color-ink)]">{n}</span>
            <span className="text-[var(--color-ink-soft)]">{t}</span>
            <span className="text-right text-[var(--color-ink)] font-medium">{a}</span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

function AiMock() {
  const springWidth = useSpring(0, { stiffness: 80, damping: 20 });
  useEffect(() => {
    springWidth.set(66);
  }, [springWidth]);
  return (
    <>
      <MockHeader title="Scribe AI" sub="Listening · 03:42 · session in progress" />
      <div className="rounded-xl border border-[var(--color-line)] bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 grid place-items-center rounded-full bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
            <Sparkles size={18} />
            <motion.span
              animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[var(--color-reuvy-300)]"
            />
          </div>
          <div className="flex-1">
            <div className="h-2 rounded-full bg-[var(--color-reuvy-100)] overflow-hidden relative">
              <motion.div
                style={{ width: useTransform(springWidth, (v) => `${v}%`) }}
                className="h-full bg-gradient-to-r from-[var(--color-reuvy-400)] to-[var(--color-reuvy-600)] relative"
              >
                <span className="absolute inset-0 shimmer-overlay" />
              </motion.div>
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-2">
              Drafting consult note · pulling allergens · checking AHPRA fields.
            </p>
          </div>
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-[var(--color-mist)] p-3 text-[var(--color-ink-soft)]"
          >
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
              You
            </p>
            "Let's start with a half syringe in the lips and re-assess at 2 weeks…"
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-[var(--color-reuvy-50)] border border-[var(--color-reuvy-200)] p-3 text-[var(--color-ink)]"
          >
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-reuvy-700)] mb-1">
              Reuvy draft
            </p>
            Plan: 0.5ml HA filler, vermillion border. Review consult in 14 days.
          </motion.div>
        </div>
      </div>
    </>
  );
}

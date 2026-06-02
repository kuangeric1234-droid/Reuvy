"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, ChevronDown, CalendarCheck } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  EyebrowTag,
  TwoToneHeadline,
  StatBand,
  ClosingCTABand,
} from "@/components/ui";

/* ---------- Constants ---------- */

const EASE = [0.21, 0.61, 0.27, 1] as const;

const ROLES = [
  "Owner",
  "Practice Manager",
  "Cosmetic Doctor",
  "Cosmetic Nurse",
  "Front-of-House",
  "Other",
];

const CLINIC_SIZES = [
  "Solo",
  "2-5 clinicians",
  "6-10 clinicians",
  "10+ / multi-location",
];

const EXPECT_BULLETS = [
  "Quick clinic walk-through",
  "Live answer your specific questions",
  "Personalised migration plan",
  "Pricing tailored to your group",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long is the demo?",
    a: "Thirty minutes. We respect your time. We can go longer if you want, but the default is a tight, useful 30 — enough to walk the workflows that matter to your clinic.",
  },
  {
    q: "Will you push me to commit?",
    a: "No. There's no scripted pitch and no high-pressure close. We'll show you the product, answer your questions, and follow up only when you ask us to.",
  },
  {
    q: "Can I bring my team?",
    a: "Please do. Owners, practice managers, head nurses, and front-of-house are all welcome — different roles surface different questions, and the demo lands better with the whole team in the room.",
  },
  {
    q: "What if I'm mid-contract with another vendor?",
    a: "Most clinics we onboard are switching from Pabau, Cliniko, or a paper-and-spreadsheets stack. We'll plan around your contract end date and handle the data migration when you're ready to move.",
  },
];

/* ---------- Form Field primitives ---------- */

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[14px] font-medium text-black leading-none mb-2"
    >
      {children}
      {required && (
        <span aria-hidden className="text-[var(--color-blue-ink)] ml-1">
          *
        </span>
      )}
    </label>
  );
}

function Helper({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-[12px] text-[var(--color-charcoal)] leading-snug">
      {children}
    </p>
  );
}

const fieldClass = [
  "block w-full rounded-md bg-white",
  "border border-[var(--color-greige)]",
  "px-4 py-3 text-[15px] text-black",
  "placeholder:text-[var(--color-mute)]",
  "transition-shadow transition-colors",
  "focus:outline-none focus:border-[var(--color-blue-ink)]",
  "focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-blue)_45%,transparent)]",
].join(" ");

/* ---------- Page ---------- */

export default function DemoPage() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clinic, setClinic] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [size, setSize] = useState(CLINIC_SIZES[0]);
  const [stack, setStack] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Accordion state
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { name, email, clinic, role, size, stack, notes };
    // eslint-disable-next-line no-console
    console.log("[demo-request]", payload);
    setSubmitted(true);
  };

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Intercept the closing CTA's "Pick a time" anchor so it scrolls smoothly
  // back to the form at the top of the page instead of leaving #top in the URL.
  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>(
      'a[href="#top"]',
    );
    const onClick = (e: Event) => {
      e.preventDefault();
      scrollTop();
      history.replaceState(null, "", window.location.pathname);
    };
    anchors.forEach((a) => a.addEventListener("click", onClick));
    return () => {
      anchors.forEach((a) => a.removeEventListener("click", onClick));
    };
  }, []);

  return (
    <main className="bg-[var(--color-paper)] text-black">
      <SiteNav />

      {/* ============================================================ */}
      {/* 1. HERO + FORM SPLIT */}
      {/* ============================================================ */}
      <section className="relative">
        <div className="wrap pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
            {/* ---------- LEFT: copy + form ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="min-w-0"
            >
              <EyebrowTag>Book a demo</EyebrowTag>
              <div className="mt-5">
                <TwoToneHeadline
                  as="h2"
                  primary="30 minutes."
                  secondary="A real walkthrough — no slides."
                />
              </div>
              <p className="mt-5 text-[17px] leading-[1.55] text-[var(--color-charcoal)] max-w-[44ch]">
                Tailored to your clinic. With an AU-based human.
              </p>

              {/* ---------- Form card ---------- */}
              <div className="mt-10 relative">
                <AnimatePresence mode="wait" initial={false}>
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      onSubmit={handleSubmit}
                      className="rounded-2xl border border-[var(--color-greige)] bg-white p-6 md:p-8"
                      style={{
                        boxShadow:
                          "0 24px 60px -32px rgba(15,29,43,0.18)",
                      }}
                      noValidate
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="md:col-span-1">
                          <Label htmlFor="name" required>
                            Full name
                          </Label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={fieldClass}
                            placeholder="Jordan Lee"
                            autoComplete="name"
                          />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-1">
                          <Label htmlFor="email" required>
                            Work email
                          </Label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={fieldClass}
                            placeholder="jordan@clinic.com.au"
                            autoComplete="email"
                          />
                          <Helper>We&apos;ll send the calendar link here.</Helper>
                        </div>

                        {/* Clinic */}
                        <div className="md:col-span-2">
                          <Label htmlFor="clinic" required>
                            Clinic name
                          </Label>
                          <input
                            id="clinic"
                            type="text"
                            required
                            value={clinic}
                            onChange={(e) => setClinic(e.target.value)}
                            className={fieldClass}
                            placeholder="Bondi Skin & Laser"
                            autoComplete="organization"
                          />
                        </div>

                        {/* Role */}
                        <div className="md:col-span-1">
                          <Label htmlFor="role">Your role</Label>
                          <div className="relative">
                            <select
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className={`${fieldClass} appearance-none pr-10 cursor-pointer`}
                            >
                              {ROLES.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-charcoal)] pointer-events-none"
                            />
                          </div>
                        </div>

                        {/* Size */}
                        <div className="md:col-span-1">
                          <Label htmlFor="size">Clinic size</Label>
                          <div className="relative">
                            <select
                              id="size"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                              className={`${fieldClass} appearance-none pr-10 cursor-pointer`}
                            >
                              {CLINIC_SIZES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-charcoal)] pointer-events-none"
                            />
                          </div>
                        </div>

                        {/* Current stack */}
                        <div className="md:col-span-2">
                          <Label htmlFor="stack">
                            What are you using today?
                          </Label>
                          <input
                            id="stack"
                            type="text"
                            value={stack}
                            onChange={(e) => setStack(e.target.value)}
                            className={fieldClass}
                            placeholder="Pabau, Cliniko, paper, spreadsheets…"
                          />
                          <Helper>Optional. Helps us tailor the walkthrough.</Helper>
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2">
                          <Label htmlFor="notes">Anything else?</Label>
                          <textarea
                            id="notes"
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={`${fieldClass} resize-none`}
                            placeholder="Specific workflows you want us to focus on, multi-site requirements, S4 register questions…"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="mt-7 flex items-center gap-4 flex-col md:flex-row md:items-center">
                        <motion.button
                          type="submit"
                          whileHover={{ y: -1 }}
                          whileTap={{ y: 1 }}
                          transition={{ duration: 0.15, ease: EASE }}
                          className="inline-flex items-center justify-center gap-[10px] text-[15px] font-medium leading-none px-6 py-[15px] rounded-md bg-black text-white hover:bg-[var(--color-ink-soft)] transition-colors w-full md:w-auto"
                        >
                          Book my demo
                          <span aria-hidden>→</span>
                        </motion.button>
                        <p className="text-[12.5px] text-[var(--color-charcoal)] leading-snug">
                          We&apos;ll get back within one business day.
                        </p>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="thanks"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="rounded-2xl border border-[var(--color-greige)] bg-white p-10 md:p-12 text-center"
                      style={{
                        boxShadow:
                          "0 24px 60px -32px rgba(15,29,43,0.18)",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                        className="mx-auto w-14 h-14 rounded-full grid place-items-center bg-[color-mix(in_srgb,var(--color-blue)_20%,white)] border border-[color-mix(in_srgb,var(--color-blue)_45%,white)]"
                      >
                        <CalendarCheck
                          size={26}
                          className="text-[var(--color-blue-ink)]"
                        />
                      </motion.div>
                      <h3 className="mt-6 font-serif text-[28px] tracking-[-0.02em] leading-[1.1] text-black">
                        Thanks, {name.split(" ")[0] || "we got it"}.
                      </h3>
                      <p className="mt-3 text-[15.5px] text-[var(--color-charcoal)] leading-[1.55] max-w-[40ch] mx-auto">
                        We&apos;ll be in touch within one business day with a
                        calendar link tailored to{" "}
                        <span className="text-black font-medium">
                          {clinic || "your clinic"}
                        </span>
                        . No spam, no follow-up chase.
                      </p>
                      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                          }}
                          className="text-[13.5px] text-[var(--color-charcoal)] hover:text-black transition-colors underline underline-offset-4 decoration-[var(--color-greige)] hover:decoration-current"
                        >
                          Submit another request
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ---------- RIGHT: reassurance ---------- */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
              className="lg:sticky lg:top-[88px] min-w-0"
            >
              <div className="rounded-2xl border border-[var(--color-greige)] bg-white overflow-hidden">
                {/* What to expect */}
                <div className="p-6 md:p-7 border-b border-[var(--color-greige)]">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-4">
                    What to expect
                  </p>
                  <ol className="space-y-3">
                    {EXPECT_BULLETS.map((b, i) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[14.5px] text-black leading-snug"
                      >
                        <span
                          aria-hidden
                          className="mt-[2px] shrink-0 w-[22px] h-[22px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] border border-[color-mix(in_srgb,var(--color-blue)_40%,white)] grid place-items-center font-mono text-[10.5px] text-[var(--color-blue-ink)]"
                        >
                          {i + 1}
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Who you'll meet */}
                <div className="p-6 md:p-7 border-b border-[var(--color-greige)] bg-[color-mix(in_srgb,var(--color-paper)_70%,white)]">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-4">
                    Who you&apos;ll meet
                  </p>
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      aria-hidden
                      className="shrink-0 w-12 h-12 rounded-full grid place-items-center font-serif text-[18px] text-[var(--color-blue-ink)]"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in srgb, var(--color-blue) 38%, white) 0%, color-mix(in srgb, var(--color-blue) 12%, white) 100%)",
                        border:
                          "1px solid color-mix(in srgb, var(--color-blue) 40%, white)",
                      }}
                    >
                      SP
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] text-black font-medium leading-tight">
                        Sienna Park
                      </p>
                      <p className="text-[13px] text-[var(--color-charcoal)] mt-1 leading-snug">
                        Onboarding lead · Sydney
                      </p>
                      <p className="mt-3 text-[13.5px] text-[var(--color-charcoal)] italic leading-[1.5] border-l-2 border-[var(--color-blue)] pl-3">
                        &ldquo;I&apos;ve onboarded 60+ AU clinics this year. We&apos;ll
                        focus on the workflows that matter to yours.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trusted by pill */}
                <div className="p-6 md:p-7">
                  <div className="inline-flex items-center gap-3 rounded-full bg-[var(--color-paper)] border border-[var(--color-greige)] pl-1.5 pr-4 py-1.5">
                    <div
                      aria-hidden
                      className="flex -space-x-2"
                    >
                      {[
                        "linear-gradient(135deg,#e9d6c8,#caa787)",
                        "linear-gradient(135deg,#c8d8e9,#8aa6c2)",
                        "linear-gradient(135deg,#d6e9d8,#9ec0a3)",
                        "linear-gradient(135deg,#e9d6e5,#c08aba)",
                      ].map((g, i) => (
                        <span
                          key={i}
                          className="w-[22px] h-[22px] rounded-full border-2 border-white"
                          style={{ background: g }}
                        />
                      ))}
                    </div>
                    <span className="text-[12.5px] text-black font-medium leading-none">
                      Trusted by 340+ AU clinics
                    </span>
                  </div>
                </div>
              </div>

              {/* Small footnote under card */}
              <p className="mt-4 px-1 text-[12px] text-[var(--color-charcoal)] leading-snug">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[var(--color-blue-ink)]" />
                  Your data stays in Australia. AHPRA-native by design.
                </span>
              </p>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STAT BAND (dark) */}
      {/* ============================================================ */}
      <StatBand
        stats={[
          { value: "30 min", label: "Demo, end to end" },
          { value: "AU only", label: "Support in your timezone" },
          { value: "No push", label: "No-pressure pricing chat" },
        ]}
        quote={{
          body: "We came in expecting a sales call. Got a useful walk-through and a migration plan instead. Switched the following month.",
          name: "Dr. Amelia Chen",
          role: "Owner · Velvet Aesthetics, Melbourne",
        }}
      />

      {/* ============================================================ */}
      {/* 3. FAQ-LITE */}
      {/* ============================================================ */}
      <section className="bg-[var(--color-paper)]">
        <div className="wrap py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-[88px]">
              <EyebrowTag>Quick answers</EyebrowTag>
              <div className="mt-5">
                <TwoToneHeadline
                  as="h3"
                  primary="Before you book,"
                  secondary="the obvious questions."
                />
              </div>
              <p className="mt-5 text-[15.5px] leading-[1.6] text-[var(--color-charcoal)] max-w-[36ch]">
                If something isn&apos;t here, ask it in the &ldquo;Anything else?&rdquo;
                box on the form.
              </p>
            </div>

            <div className="border-t border-[var(--color-greige)]">
              {FAQS.map((f, i) => {
                const isOpen = openIdx === i;
                return (
                  <div
                    key={f.q}
                    className="border-b border-[var(--color-greige)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    >
                      <span className="font-serif text-[20px] md:text-[22px] tracking-[-0.015em] text-black leading-tight">
                        {f.q}
                      </span>
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="shrink-0 w-8 h-8 rounded-full border border-[var(--color-greige)] grid place-items-center text-[var(--color-charcoal)] group-hover:border-[var(--color-blue-ink)] group-hover:text-[var(--color-blue-ink)] transition-colors"
                      >
                        <span className="text-[16px] leading-none -mt-px">+</span>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-12 text-[15px] leading-[1.6] text-[var(--color-charcoal)] max-w-[60ch]">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CLOSING CTA BAND */}
      {/* ============================================================ */}
      <ClosingCTABand
        primary="Ready when you are."
        secondary="Book your 30-minute demo."
        ctaPrimary={{ label: "Pick a time", href: "#top" }}
        ctaSecondary={{ label: "See pricing", href: "/pricing" }}
      />

      <SiteFooter />
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FEATURES, FEATURE_BY_SLUG, type Feature } from "@/lib/site-data";
import {
  Lift,
  Reveal,
  Spotlight,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

export function FeaturePage({ slug }: { slug: string }) {
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) return null;
  const Icon = feature.icon;
  const related = FEATURES.filter(
    (f) => f.category === feature.category && f.slug !== feature.slug,
  ).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 75% -10%, rgba(155,183,209,0.28), transparent 60%), radial-gradient(700px 400px at 0% 0%, rgba(155,183,209,0.10), transparent 60%)",
          }}
        />
        <div className="container-x">
          <Reveal>
            <Link
              href="/features"
              className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6"
            >
              ← All features
            </Link>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-reuvy-200)] bg-[var(--color-reuvy-50)] px-3 py-1.5 text-xs text-[var(--color-reuvy-700)]">
                  <Icon size={14} />
                  {feature.name}
                  {feature.badge && (
                    <span className="ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--color-reuvy-500)] text-white">
                      {feature.badge}
                    </span>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                  {feature.tagline}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-7 max-w-xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
                  {feature.description}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="/demo"
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
                    href="/tour"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className="inline-flex items-center justify-center gap-2 border border-[var(--color-line)] hover:border-[var(--color-reuvy-400)] text-[var(--color-ink)] px-6 py-3.5 rounded-full text-sm font-medium transition-colors"
                  >
                    Take a product tour
                  </motion.a>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-5" delay={0.2} y={32}>
              <Lift amount={-6}>
                <div className="relative">
                  <motion.div
                    aria-hidden
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-6 rounded-[2rem] -z-10 blur-2xl"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(155,183,209,0.4), transparent 75%)",
                    }}
                  />
                  <div className="rounded-2xl bg-white border border-[var(--color-line)] shadow-[0_30px_80px_-30px_rgba(15,29,43,0.20)] overflow-hidden">
                    <div className="px-5 py-3 border-b border-[var(--color-line)] flex items-center justify-between">
                      <span className="text-xs text-[var(--color-muted)]">
                        reuvy.app / {feature.slug}
                      </span>
                      <span className="text-xs text-[var(--color-reuvy-700)]">Live preview</span>
                    </div>
                    <div className="p-6 md:p-8 bg-gradient-to-b from-white to-[var(--color-mist)]">
                      <AbstractPreview feature={feature} />
                    </div>
                  </div>
                </div>
              </Lift>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 md:py-28 tinted">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              What you get
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl">
              {feature.name}, <span className="italic">in detail.</span>
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.07}>
            {feature.highlights.map((h, i) => (
              <StaggerItem key={h}>
                <Lift amount={-4}>
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 h-full">
                    <span className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                      <CheckCircle2 size={16} />
                    </span>
                    <p className="mt-4 font-serif text-xl leading-tight text-[var(--color-ink)]">
                      {h}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      {flavorFor(feature, i)}
                    </p>
                  </div>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              How it works
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Drop it in. <span className="italic">Done in a day.</span>
            </h2>
            <p className="mt-5 text-lg text-[var(--color-ink-soft)] leading-relaxed">
              {feature.name} sits inside the same client record your front desk already lives in.
              No fresh tab to learn, no parallel database to reconcile — it just plugs into the
              workflow you already run.
            </p>
          </Reveal>
          <Stagger className="lg:col-span-7 space-y-3" stagger={0.08}>
            {[
              ["Connect", "Reuvy migrates your data and configures " + feature.name.toLowerCase() + " in the background."],
              ["Train", "30-minute walkthrough with your onboarding lead. No PDF stack required."],
              ["Live", "Your team starts using it the same week — measurable outcomes inside 30 days."],
            ].map(([t, d], i) => (
              <StaggerItem key={t} y={8}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--color-line)] bg-white">
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-[var(--color-ink)] text-white text-sm font-medium shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-serif text-xl text-[var(--color-ink)]">{t}</p>
                    <p className="mt-1 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                      {d}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 md:py-24 bg-[var(--color-ink)] text-white">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-300)]">
              In the field
            </p>
            <blockquote className="mt-6 font-serif text-3xl md:text-4xl leading-[1.2]">
              "{feature.name} replaced the half-dozen workarounds we'd built up over the years.
              It's calmer, it's faster, and honestly it's nicer to use."
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <span className="grid place-items-center h-11 w-11 rounded-full bg-[var(--color-reuvy-400)] text-[var(--color-ink)] font-medium">
                AH
              </span>
              <div>
                <p className="text-sm font-medium">Amberley Hudson</p>
                <p className="text-xs text-white/55">Founder, The Dream Skin Co</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">
              More from <span className="italic">{categoryLabel(feature.category)}.</span>
            </h2>
          </Reveal>

          <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.07}>
            {related.map((f) => {
              const RIcon = f.icon;
              return (
                <StaggerItem key={f.slug}>
                  <Lift amount={-6}>
                    <Spotlight>
                      <Link
                        href={`/features/${f.slug}`}
                        className="block rounded-2xl border border-[var(--color-line)] bg-white p-6 h-full hover:border-[var(--color-reuvy-300)] transition-colors group"
                      >
                        <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                          <RIcon size={16} />
                        </span>
                        <p className="mt-4 font-serif text-xl text-[var(--color-ink)]">{f.name}</p>
                        <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                          {f.tagline}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-ink)] group-hover:gap-1.5 transition-all">
                          Explore <ArrowUpRight size={12} />
                        </span>
                      </Link>
                    </Spotlight>
                  </Lift>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal y={32}>
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-reuvy-200)] tinted px-8 md:px-16 py-16 md:py-20">
              <motion.div
                aria-hidden
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -right-32 h-96 w-96 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(155,183,209,0.55), transparent 70%)",
                }}
              />
              <div className="relative max-w-2xl">
                <h2 className="text-4xl md:text-5xl">
                  Ready to see {feature.name} <span className="italic">in your practice?</span>
                </h2>
                <p className="mt-5 text-lg text-[var(--color-ink-soft)]">
                  30-minute personalised demo. No slides, no buzzwords, just a real walk through
                  the parts you care about.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="/demo"
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
                    href="/tour"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className="inline-flex items-center justify-center gap-2 border border-[var(--color-reuvy-300)] hover:border-[var(--color-reuvy-500)] text-[var(--color-ink)] px-6 py-3.5 rounded-full text-sm font-medium bg-white/60 transition-colors"
                  >
                    Take a product tour
                  </motion.a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function categoryLabel(cat: Feature["category"]) {
  switch (cat) {
    case "care":
      return "Care";
    case "scheduling":
      return "Scheduling & payments";
    case "management":
      return "Management";
    case "marketing":
      return "Marketing";
  }
}

function flavorFor(feature: Feature, i: number) {
  const blurbs = [
    "Designed to feel native to your existing workflow — no parallel system to maintain.",
    "Configured during onboarding to match exactly how your practice already operates.",
    "Updates push to every staff member instantly, with role-aware permissions out of the box.",
    "Reports straight into the Reuvy dashboards your team checks every morning.",
  ];
  return blurbs[i % blurbs.length];
}

function AbstractPreview({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
          <Icon size={18} />
        </span>
        <div>
          <p className="text-sm font-medium text-[var(--color-ink)]">{feature.name}</p>
          <p className="text-xs text-[var(--color-muted)]">{feature.tagline}</p>
        </div>
      </div>
      {feature.highlights.slice(0, 3).map((h) => (
        <div
          key={h}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white border border-[var(--color-line)] text-sm text-[var(--color-ink)]"
        >
          <CheckCircle2 size={14} className="text-[var(--color-reuvy-600)]" />
          {h}
        </div>
      ))}
      <div className="rounded-lg bg-[var(--color-reuvy-50)] border border-[var(--color-reuvy-200)] p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-reuvy-700)]">
          Reuvy
        </p>
        <p className="text-sm text-[var(--color-ink)] mt-1">
          Ready to use. Already in sync with the rest of your practice.
        </p>
      </div>
    </div>
  );
}

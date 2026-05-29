"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import {
  FEATURED_PICKS,
  FEATURE_BY_SLUG,
  FEATURE_CATEGORIES,
  PRACTICES,
  PRACTICE_GROUPS,
  RESOURCES,
  WHY_US,
} from "@/lib/site-data";

type MenuKey = "features" | "who" | "why" | "resources" | null;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = (k: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const NAV: { key: Exclude<MenuKey, null>; label: string }[] = [
    { key: "features", label: "Features" },
    { key: "who", label: "Who we're for" },
    { key: "why", label: "Why us" },
    { key: "resources", label: "Resources" },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.21, 0.61, 0.27, 1] }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[var(--color-line)]"
          : "bg-transparent",
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" onMouseEnter={() => setOpen(null)}>
          <LogoMark />
          <span className="font-serif text-xl tracking-tight text-[var(--color-ink)]">Reuvy</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.key}
              onMouseEnter={() => openMenu(n.key)}
              onFocus={() => openMenu(n.key)}
              onClick={() => setOpen(open === n.key ? null : n.key)}
              className={clsx(
                "inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md transition-colors",
                open === n.key
                  ? "text-[var(--color-ink)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
              )}
              aria-expanded={open === n.key}
            >
              {n.label}
              <motion.span
                animate={{ rotate: open === n.key ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>
          ))}
          <Link
            href="/pricing"
            onMouseEnter={() => setOpen(null)}
            className="text-sm px-3 py-2 rounded-md text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] px-3 py-2"
          >
            Log in
          </Link>
          <Link
            href="/tour"
            className="text-sm text-[var(--color-ink)] hover:text-[var(--color-reuvy-700)] px-4 py-2 border border-[var(--color-line)] rounded-full hover:border-[var(--color-reuvy-400)] transition-colors"
          >
            Take a tour
          </Link>
          <Link
            href="/demo"
            className="text-sm text-white bg-[var(--color-ink)] hover:bg-[var(--color-reuvy-700)] px-4 py-2 rounded-full transition-colors"
          >
            Book a demo
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setMobile((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-[var(--color-ink)]"
        >
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MEGA PANEL — floats below nav as a self-contained overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.61, 0.27, 1] }}
            onMouseEnter={() => openMenu(open)}
            className="hidden lg:block absolute left-0 right-0 top-full px-4"
          >
            <div className="container-x">
              <div className="mx-auto max-w-[1200px] rounded-2xl border border-[var(--color-line)] bg-white/95 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(15,29,43,0.25)] p-6 md:p-8">
                {open === "features" && <FeaturesPanel onNavigate={() => setOpen(null)} />}
                {open === "who" && <WhoPanel onNavigate={() => setOpen(null)} />}
                {open === "why" && <WhyPanel onNavigate={() => setOpen(null)} />}
                {open === "resources" && <ResourcesPanel onNavigate={() => setOpen(null)} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden border-t border-[var(--color-line)] bg-white max-h-[80vh] overflow-y-auto"
          >
            <MobileMenu close={() => setMobile(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* --------------------------- Features Panel --------------------------- */

function FeaturesPanel({ onNavigate }: { onNavigate: () => void }) {
  const [tab, setTab] = useState<"featured" | "care" | "scheduling" | "management" | "marketing">(
    "featured",
  );
  const cat = FEATURE_CATEGORIES.find((c) => c.key === tab);

  return (
    <div className="grid grid-cols-12 gap-6 min-h-[420px]">
      {/* Left side tabs */}
      <aside className="col-span-3 rounded-2xl bg-[var(--color-reuvy-50)] p-2">
        {[
          { key: "featured", label: "Featured", icon: Sparkles },
          ...FEATURE_CATEGORIES.map((c) => ({ key: c.key, label: c.label, icon: c.icon })),
        ].map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onMouseEnter={() => setTab(t.key as typeof tab)}
              onClick={() => setTab(t.key as typeof tab)}
              className={clsx(
                "relative w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                isActive
                  ? "text-[var(--color-reuvy-900)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="features-tab"
                  className="absolute inset-0 rounded-xl bg-white shadow-[0_4px_18px_-8px_rgba(15,29,43,0.18)] border border-[var(--color-reuvy-200)] -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="flex items-center gap-2.5">
                <Icon size={16} className={isActive ? "text-[var(--color-reuvy-700)]" : ""} />
                {t.label}
              </span>
              <ChevronDown size={14} className="-rotate-90 opacity-50" />
            </button>
          );
        })}
      </aside>

      {/* Right content */}
      <div className="col-span-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-12 gap-6 h-full"
          >
            {/* Featured tab */}
            {tab === "featured" && (
              <>
                <div className="col-span-8">
                  <Banner label="Quietly powerful. Built for every part of your practice." />
                  <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
                    {FEATURED_PICKS.map((slug) => {
                      const f = FEATURE_BY_SLUG[slug];
                      if (!f) return null;
                      const Icon = f.icon;
                      return (
                        <Link
                          key={slug}
                          href={`/features/${slug}`}
                          onClick={onNavigate}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-reuvy-50)] transition-colors"
                        >
                          <span className="mt-0.5 grid place-items-center h-9 w-9 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)] group-hover:bg-[var(--color-reuvy-200)] transition-colors">
                            <Icon size={16} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-[var(--color-ink)]">
                              {f.name}
                            </span>
                            <span className="block text-xs text-[var(--color-muted)] mt-0.5 truncate">
                              {f.tagline}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <LatestReleaseCard
                  title="Insights Plus"
                  badge="NEW"
                  blurb="Real-time visibility into bookings, revenue and practitioner performance."
                  href="/features/insights-plus"
                  spotlight="Spotlight feature"
                />
              </>
            )}

            {tab !== "featured" && cat && (
              <>
                <div className="col-span-8 space-y-5">
                  <Banner label={cat.tagline} icon={cat.icon} />
                  <div className="grid grid-cols-2 gap-6">
                    {cat.sections.map((section) => (
                      <div key={section.title}>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-2 px-3">
                          {section.title}
                        </p>
                        <div className="space-y-0.5">
                          {section.slugs.map((slug) => {
                            const f = FEATURE_BY_SLUG[slug];
                            if (!f) return null;
                            const Icon = f.icon;
                            return (
                              <Link
                                key={slug}
                                href={`/features/${slug}`}
                                onClick={onNavigate}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-reuvy-50)] transition-colors"
                              >
                                <span className="mt-0.5 grid place-items-center h-8 w-8 rounded-lg bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)] shrink-0">
                                  <Icon size={14} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-medium text-[var(--color-ink)]">
                                    {f.name}
                                  </span>
                                  <span className="block text-xs text-[var(--color-muted)] mt-0.5 truncate">
                                    {f.tagline}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <LatestReleaseCard
                  title={cat.latest.title}
                  badge={cat.latest.badge}
                  blurb={cat.latest.blurb}
                  href={cat.latest.href}
                  spotlight={cat.latest.badge === "NEW" ? "Latest release" : "Spotlight feature"}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Banner({ label, icon: Icon }: { label: string; icon?: React.ComponentType<{ size?: number }> }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-reuvy-200)] bg-[var(--color-reuvy-50)] px-4 py-3 text-sm text-[var(--color-reuvy-900)]">
      {Icon ? (
        <span className="grid place-items-center h-6 w-6 rounded-md bg-white text-[var(--color-reuvy-700)] border border-[var(--color-reuvy-200)]">
          <Icon size={12} />
        </span>
      ) : (
        <Sparkles size={14} className="text-[var(--color-reuvy-600)]" />
      )}
      {label}
    </div>
  );
}

function LatestReleaseCard({
  title,
  badge,
  blurb,
  href,
  spotlight,
}: {
  title: string;
  badge: string;
  blurb: string;
  href: string;
  spotlight: string;
}) {
  return (
    <Link
      href={href}
      className="col-span-4 group rounded-2xl border border-[var(--color-line)] bg-gradient-to-b from-[var(--color-reuvy-50)] to-white p-5 hover:border-[var(--color-reuvy-300)] transition-colors"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        Latest release
      </p>
      <div className="mt-3 aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--color-reuvy-200)] to-[var(--color-reuvy-400)] relative overflow-hidden">
        {/* abstract preview */}
        <div className="absolute inset-3 rounded-lg bg-white/90 p-3 flex flex-col gap-1.5">
          <div className="h-1.5 w-12 rounded-full bg-[var(--color-reuvy-300)]" />
          <div className="h-1 w-20 rounded-full bg-[var(--color-line)]" />
          <div className="mt-2 grid grid-cols-3 gap-1 flex-1">
            <div className="rounded bg-[var(--color-reuvy-100)]" />
            <div className="rounded bg-[var(--color-reuvy-200)]" />
            <div className="rounded bg-[var(--color-reuvy-100)]" />
            <div className="rounded bg-[var(--color-reuvy-200)] col-span-2" />
            <div className="rounded bg-[var(--color-reuvy-100)]" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="font-serif text-lg text-[var(--color-ink)]">{title}</span>
        <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-reuvy-500)] text-white">
          {badge}
        </span>
      </div>
      <span className="mt-1 inline-block text-[10px] uppercase tracking-[0.16em] text-[var(--color-reuvy-700)]">
        {spotlight}
      </span>
      <p className="mt-2 text-xs text-[var(--color-ink-soft)] leading-relaxed">{blurb}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-ink)] group-hover:gap-1.5 transition-all">
        Learn more <ArrowRight size={12} />
      </span>
    </Link>
  );
}

/* ----------------------------- Who Panel ----------------------------- */

function WhoPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-6">
        {PRACTICE_GROUPS.slice(0, 6).map((g) => (
          <div key={g.key}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-3">
              {g.label}
            </p>
            <div className="space-y-1">
              {PRACTICES.filter((p) => p.group === g.key).map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    href={`/who-we-re-for/${p.slug}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[var(--color-reuvy-50)] text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  >
                    <Icon size={13} className="text-[var(--color-reuvy-600)] opacity-70" />
                    {p.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-3 rounded-2xl border border-[var(--color-line)] bg-gradient-to-b from-[var(--color-reuvy-50)] to-white p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">By size</p>
        <div className="mt-3 space-y-1">
          {PRACTICES.filter((p) => p.group === "size").map((p) => (
            <Link
              key={p.slug}
              href={`/who-we-re-for/${p.slug}`}
              onClick={onNavigate}
              className="block px-2.5 py-2 rounded-lg hover:bg-white text-sm text-[var(--color-ink)]"
            >
              {p.name}
            </Link>
          ))}
        </div>
        <Link
          href="/who-we-re-for"
          onClick={onNavigate}
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-ink)] hover:gap-1.5 transition-all"
        >
          All specialties <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

/* ----------------------------- Why Panel ----------------------------- */

function WhyPanel({ onNavigate }: { onNavigate: () => void }) {
  const cols: { title: string; items: { label: string; href: string; desc: string }[] }[] = [
    { title: "Compare & value", items: WHY_US.compare },
    { title: "Implementation", items: WHY_US.implementation },
    { title: "Security", items: WHY_US.security },
    { title: "Company", items: WHY_US.company },
  ];
  return (
    <div className="grid grid-cols-4 gap-6">
      {cols.map((c) => (
        <div key={c.title}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-3">
            {c.title}
          </p>
          <div className="space-y-1">
            {c.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="group block p-2.5 rounded-lg hover:bg-[var(--color-reuvy-50)]"
              >
                <p className="text-sm font-medium text-[var(--color-ink)]">{item.label}</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Resources Panel ------------------------- */

function ResourcesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-3">
          Popular
        </p>
        <div className="space-y-1">
          {RESOURCES.popular.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={onNavigate}
              className="block px-2.5 py-2 rounded-lg hover:bg-[var(--color-reuvy-50)] text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>
      {[
        { title: "Tools", items: RESOURCES.tools },
        { title: "Education", items: RESOURCES.education },
        { title: "Referrals", items: RESOURCES.referrals },
      ].map((c) => (
        <div key={c.title} className="col-span-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-3">
            {c.title}
          </p>
          <div className="space-y-1">
            {c.items.map((it) => {
              const Icon = it.icon;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[var(--color-reuvy-50)] text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                >
                  <Icon size={14} className="text-[var(--color-reuvy-600)] opacity-70" />
                  {it.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Mobile menu ---------------------------- */

function MobileMenu({ close }: { close: () => void }) {
  return (
    <div className="container-x py-6 space-y-2">
      <details className="group rounded-xl border border-[var(--color-line)]">
        <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium">
          Features <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          {Object.values(FEATURE_BY_SLUG).map((f) => (
            <Link
              key={f.slug}
              href={`/features/${f.slug}`}
              onClick={close}
              className="text-xs text-[var(--color-ink-soft)]"
            >
              {f.name}
            </Link>
          ))}
        </div>
      </details>

      <details className="group rounded-xl border border-[var(--color-line)]">
        <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium">
          Who we're for <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4 grid grid-cols-2 gap-2">
          {PRACTICES.slice(0, 16).map((p) => (
            <Link
              key={p.slug}
              href={`/who-we-re-for/${p.slug}`}
              onClick={close}
              className="text-xs text-[var(--color-ink-soft)]"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </details>

      <Link
        href="/why-us"
        onClick={close}
        className="block p-4 rounded-xl border border-[var(--color-line)] text-sm font-medium"
      >
        Why us
      </Link>
      <Link
        href="/resources"
        onClick={close}
        className="block p-4 rounded-xl border border-[var(--color-line)] text-sm font-medium"
      >
        Resources
      </Link>
      <Link
        href="/pricing"
        onClick={close}
        className="block p-4 rounded-xl border border-[var(--color-line)] text-sm font-medium"
      >
        Pricing
      </Link>

      <div className="flex gap-3 pt-3">
        <Link
          href="/login"
          onClick={close}
          className="flex-1 text-center text-sm py-3 border border-[var(--color-line)] rounded-full"
        >
          Log in
        </Link>
        <Link
          href="/demo"
          onClick={close}
          className="flex-1 text-center text-sm py-3 bg-[var(--color-ink)] text-white rounded-full"
        >
          Book a demo
        </Link>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid place-items-center h-8 w-8 rounded-full bg-[var(--color-reuvy-400)] text-white font-serif text-base shadow-[inset_0_-6px_12px_rgba(255,255,255,0.25)]"
    >
      R
    </span>
  );
}

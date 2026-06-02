"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronRight,
  Sparkles,
  Heart,
  HeartPulse,
  Brain,
  Scan,
  Stethoscope,
  Briefcase,
  Building2,
  MapPin,
  UserCheck,
  Users,
  Syringe,
  Award,
  Trophy,
  ShieldCheck,
  FileCheck,
  ClipboardCheck,
  ScrollText,
  Calculator,
  Database,
  Headphones,
  GraduationCap,
  ArrowLeftRight,
  Building,
  Flag,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { FEATURE_CATEGORIES, LATEST_RELEASE } from "@/lib/marketing/features";
import {
  SEGMENT_BY_SLUG,
  SEGMENT_GROUPS,
  type Segment,
} from "@/lib/marketing/segments";
import { useHeroCarousel } from "@/lib/hero-carousel-store";

type DropdownKey = "features" | "who" | "why" | "resources" | null;

const NAV_LINKS: { label: string; key: DropdownKey; href?: string }[] = [
  { label: "Features", key: "features" },
  { label: "Who we're for", key: "who" },
  { label: "Why us", key: "why" },
  { label: "Resources", key: "resources" },
  { label: "Pricing", key: null, href: "#pricing" },
];

/* ---------- Who we serve (AU-only segments) ---------- */
type WhoNavGroup = {
  key: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  slugs: string[];
};

// Tab metadata for the mega-menu — backed by SEGMENT_GROUPS in segments.ts.
const WHO_NAV_GROUPS: WhoNavGroup[] = SEGMENT_GROUPS.map((g) => ({
  key: g.key,
  label: g.label,
  tagline: g.tagline,
  icon: g.key === "clinic-type" ? Sparkles : Building,
  slugs: g.slugs,
}));

/* ---------- Why us (AHPRA-flavoured) ---------- */
type WhyItem = { name: string; icon: LucideIcon; hint?: string };
type WhyColumn = { title: string; items: WhyItem[] };

const WHY_COLUMNS: WhyColumn[] = [
  {
    title: "Compare & value",
    items: [
      { name: "Customer stories", icon: Trophy, hint: "AU clinics that switched" },
      { name: "Compare Ruevii", icon: ArrowLeftRight, hint: "Pabau · Cliniko · Powerdiary" },
      { name: "Savings calculator", icon: Calculator, hint: "Time + revenue gains" },
    ],
  },
  {
    title: "AHPRA & compliance",
    items: [
      { name: "AHPRA-native by design", icon: Flag, hint: "Built for AU regulation" },
      { name: "S4 drug register", icon: Syringe, hint: "In-app dispensing log" },
      { name: "Consent enforcement", icon: ClipboardCheck, hint: "Block treatment until signed" },
      { name: "Immutable audit trail", icon: FileCheck, hint: "Every action, append-only" },
      { name: "HIPAA-aligned", icon: ShieldCheck, hint: "PHI-grade encryption" },
    ],
  },
  {
    title: "Implementation & support",
    items: [
      { name: "Data migration", icon: Database, hint: "We move it for you" },
      { name: "On-site training", icon: GraduationCap, hint: "We come to your clinic" },
      { name: "AU onboarding crew", icon: Headphones, hint: "Sydney-based, your timezone" },
      { name: "Named account manager", icon: UserCheck, hint: "One human, every quarter" },
      { name: "Switch from Pabau", icon: ArrowLeftRight, hint: "Step-by-step migration" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About Ruevii", icon: Sparkles },
      { name: "Sydney HQ", icon: MapPin, hint: "AU data residency" },
      { name: "Careers", icon: Briefcase, hint: "We're hiring in AU" },
      { name: "Roadmap", icon: ScrollText, hint: "What's shipping next" },
      { name: "Status", icon: Activity, hint: "Uptime & incidents" },
    ],
  },
];

/* ---------- Resources ---------- */
type ResourceLink = { name: string; icon: LucideIcon };
type ResourceColumn = { title: string; items: ResourceLink[] };

const RESOURCE_COLUMNS: ResourceColumn[] = [
  {
    title: "Guides & tools",
    items: [
      { name: "AU Aesthetics Playbook", icon: ScrollText },
      { name: "AHPRA consent templates", icon: ClipboardCheck },
      { name: "Treatment record templates", icon: FileCheck },
      { name: "Pricing strategy guide", icon: Calculator },
      { name: "Migration checklist", icon: ArrowLeftRight },
    ],
  },
  {
    title: "Education",
    items: [
      { name: "Blog", icon: ScrollText },
      { name: "Ruevii Academy", icon: GraduationCap },
      { name: "Knowledge base", icon: Database },
      { name: "Product updates", icon: Sparkles },
      { name: "Webinars", icon: Users },
    ],
  },
  {
    title: "Referrals",
    items: [
      { name: "Refer-a-friend", icon: Users },
      { name: "Build with Ruevii", icon: ScrollText },
      { name: "Become a partner", icon: Award },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Visit support centre", icon: Headphones },
      { name: "System status", icon: Activity },
      { name: "Contact sales", icon: UserCheck },
    ],
  },
];

type PopularResource = { title: string; kind: "Ebook" | "Template" | "Guide"; accent: string };
const POPULAR_RESOURCES: PopularResource[] = [
  { title: "AU Cosmetic Trends 2026", kind: "Ebook", accent: "from-[var(--color-blue)]/35" },
  { title: "Med Spa Business Guide", kind: "Ebook", accent: "from-[var(--color-blue)]/25" },
  { title: "AHPRA Consent Template", kind: "Template", accent: "from-[var(--color-blue)]/20" },
  { title: "S4 Register Template", kind: "Template", accent: "from-[var(--color-blue)]/30" },
];

const PANEL_EASE = [0.21, 0.61, 0.27, 1] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openKey, setOpenKey] = useState<DropdownKey>(null);
  const [activeTab, setActiveTab] = useState<string>(
    FEATURE_CATEGORIES?.[0]?.key ?? "featured",
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hover grace: keep panel open while cursor briefly leaves the trigger area
  const openMenu = (k: DropdownKey) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenKey(k);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 180);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const close = () => {
    cancelClose();
    setOpenKey(null);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-[border-color,background] duration-200",
        "backdrop-blur-[12px] backdrop-saturate-[140%]",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] border-b border-[var(--color-greige)]"
          : "bg-[color-mix(in_srgb,var(--color-paper)_80%,transparent)] border-b border-transparent",
      )}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <div className="wrap relative flex items-center h-[68px]">
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="flex items-center gap-[9px] font-serif text-[25px] tracking-[-0.02em] text-black shrink-0"
        >
          <LogoMark />
          Ruevii
        </Link>

        {/* CENTER: nav links (absolutely centered) */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
          {NAV_LINKS.map((l) => {
            const isOpen = l.key !== null && openKey === l.key;
            if (l.key === null) {
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onMouseEnter={() => openMenu(null)}
                  className="text-[15px] text-[var(--color-charcoal)] hover:text-black transition-colors py-2"
                >
                  {l.label}
                </a>
              );
            }
            return (
              <button
                key={l.label}
                type="button"
                onMouseEnter={() => openMenu(l.key)}
                onFocus={() => openMenu(l.key)}
                onClick={() => setOpenKey(isOpen ? null : l.key)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={clsx(
                  "text-[15px] inline-flex items-center gap-[5px] py-2 transition-colors",
                  isOpen ? "text-black" : "text-[var(--color-charcoal)] hover:text-black",
                )}
              >
                {l.label}
                <span
                  className={clsx(
                    "text-[9px] opacity-50 transition-transform",
                    isOpen && "rotate-180",
                  )}
                >
                  ▾
                </span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT: CTAs */}
        <div className="ml-auto hidden lg:flex items-center gap-1.5">
          <a
            href="#"
            className="text-[15px] px-4 py-[13px] text-black hover:opacity-60 transition-opacity"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors active:translate-y-px"
          >
            Book a demo
          </a>
        </div>

        <button
          onClick={() => setMobile((v) => !v)}
          className="ml-auto lg:hidden inline-flex items-center text-[15px] font-medium leading-none px-4 py-[11px] rounded-md border border-[var(--color-greige)] bg-white text-black hover:border-[#cdcabf] transition-colors"
        >
          Menu
        </button>
      </div>

      {/* MEGA PANELS */}
      <AnimatePresence>
        {openKey === "features" && (
          <FeaturesPanel
            key="features"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={close}
            onHoverIn={cancelClose}
            onHoverOut={scheduleClose}
          />
        )}
        {openKey === "who" && (
          <WhoPanel
            key="who"
            onClose={close}
            onHoverIn={cancelClose}
            onHoverOut={scheduleClose}
          />
        )}
        {openKey === "why" && (
          <WhyPanel
            key="why"
            onClose={close}
            onHoverIn={cancelClose}
            onHoverOut={scheduleClose}
          />
        )}
        {openKey === "resources" && (
          <ResourcesPanel
            key="resources"
            onClose={close}
            onHoverIn={cancelClose}
            onHoverOut={scheduleClose}
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      {mobile && (
        <div className="lg:hidden border-t border-[var(--color-greige)] bg-[var(--color-paper)]">
          <div className="wrap py-5 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href ?? "#"}
                onClick={() => setMobile(false)}
                className="py-3 text-[15px] text-black"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-4 mt-2 border-t border-[var(--color-greige)]">
              <a
                href="#"
                onClick={() => setMobile(false)}
                className="flex-1 text-center text-[14px] py-3 rounded-md border border-[var(--color-greige)] bg-white"
              >
                Log in
              </a>
              <a
                href="#pricing"
                onClick={() => setMobile(false)}
                className="flex-1 text-center text-[14px] py-3 rounded-md bg-black text-white"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Features Mega Panel ---------- */

function FeaturesPanel({
  activeTab,
  setActiveTab,
  onClose,
  onHoverIn,
  onHoverOut,
}: {
  activeTab: string;
  setActiveTab: (k: string) => void;
  onClose: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  const setActiveBySlug = useHeroCarousel((s) => s.setActiveBySlug);
  const categories = FEATURE_CATEGORIES;
  const current =
    categories.find((c) => c.key === activeTab) ?? categories[0];

  const onItemClick = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const matched = setActiveBySlug(slug);
    // scroll to the hero carousel section, not to top
    const target = document.getElementById(matched ? "hero-carousel" : "features");
    target?.scrollIntoView({ behavior: "smooth", block: matched ? "center" : "start" });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: PANEL_EASE }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60] hidden lg:block"
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div
        className="bg-white border border-[var(--color-greige)] rounded-2xl overflow-hidden"
        style={{
          width: "min(1180px, 94vw)",
          boxShadow: "0 30px 80px -30px rgba(15,29,43,0.25)",
        }}
      >
        <div className="flex">
          {/* LEFT RAIL — tabs */}
          <div className="w-[260px] shrink-0 p-3 relative">
            {categories.map((c) => {
              const isActive = c.key === (current?.key ?? activeTab);
              return (
                <button
                  key={c.key}
                  type="button"
                  onMouseEnter={() => setActiveTab(c.key)}
                  onFocus={() => setActiveTab(c.key)}
                  onClick={() => setActiveTab(c.key)}
                  className="relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-[14px] transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="features-tab-pill"
                      className="absolute inset-0 rounded-lg bg-[color-mix(in_srgb,var(--color-blue)_22%,white)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-2.5 flex-1 min-w-0">
                    <span
                      className={clsx(
                        "truncate font-medium",
                        isActive ? "text-[var(--color-blue-ink)]" : "text-black",
                      )}
                    >
                      {c.label}
                    </span>
                    <ChevronRight
                      size={14}
                      className={clsx(
                        "ml-auto shrink-0 opacity-50",
                        isActive
                          ? "text-[var(--color-blue-ink)] opacity-80"
                          : "text-[var(--color-charcoal)]",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* DIVIDER */}
          <div className="w-px bg-[var(--color-greige)]" />

          {/* PANEL BODY */}
          <div className="flex-1 min-w-0 flex">
            {/* Feature grid section */}
            <div className="flex-1 min-w-0 p-6">
              {current?.tagline && (
                <div className="mb-5 rounded-xl px-4 py-3 bg-[color-mix(in_srgb,var(--color-blue)_8%,white)] border border-[color-mix(in_srgb,var(--color-blue)_18%,white)]">
                  <p className="font-serif text-[18px] tracking-[-0.01em] text-black leading-tight">
                    {current.tagline}
                  </p>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={current?.key ?? "empty"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{
                    duration: 0.18,
                    ease: PANEL_EASE,
                    delayChildren: 0.05,
                    staggerChildren: 0.04,
                  }}
                  className="grid grid-cols-3 gap-x-3 gap-y-0.5"
                >
                  {(current?.features ?? []).map((f) => {
                    const Icon = f.icon;
                    const desc = f.oneLiner;
                    return (
                      <motion.a
                        key={f.slug ?? f.name}
                        href="#hero-carousel"
                        onClick={onItemClick(f.slug)}
                        variants={{
                          hidden: { opacity: 0, y: 6 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.2, ease: PANEL_EASE }}
                        className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[var(--color-greige-2)] transition-colors"
                      >
                        <span className="w-8 h-8 shrink-0 rounded-md grid place-items-center bg-[color-mix(in_srgb,var(--color-blue)_15%,white)]">
                          {Icon && (
                            <Icon
                              size={15}
                              className="text-[var(--color-blue-ink)]"
                            />
                          )}
                        </span>
                        <span className="flex-1 min-w-0 pt-px">
                          <span className="block text-[13px] font-medium text-black leading-tight">
                            {f.name}
                          </span>
                          {desc && (
                            <span className="block text-[11.5px] text-[var(--color-charcoal)] leading-snug mt-[2px] line-clamp-2">
                              {desc}
                            </span>
                          )}
                        </span>
                      </motion.a>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SPOTLIGHT */}
            <div className="w-[260px] shrink-0 border-l border-[var(--color-greige)] p-5 flex flex-col">
              <div
                className="rounded-xl overflow-hidden border border-[var(--color-greige)] mb-4"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in srgb, var(--color-blue) 32%, white) 0%, white 75%)",
                }}
              >
                <div className="aspect-[5/3] p-4 flex flex-col justify-end">
                  <div className="bg-white/85 backdrop-blur-[2px] rounded-lg border border-[var(--color-greige)] p-2.5 shadow-[0_8px_24px_-12px_rgba(15,29,43,0.25)]">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]/25" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]/15" />
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--color-greige)] mb-1.5 w-3/4" />
                    <div className="h-1.5 rounded-full bg-[var(--color-greige)] mb-1.5 w-1/2" />
                    <div className="h-1.5 rounded-full bg-[var(--color-greige)] w-5/6" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-blue-ink)]">
                  Spotlight feature
                </span>
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[var(--color-blue)] text-white">
                  New
                </span>
              </div>

              <h4 className="font-serif text-[19px] tracking-[-0.01em] leading-tight text-black mb-1.5">
                {LATEST_RELEASE?.title ?? "Latest release"}
              </h4>
              <p className="text-[12.5px] text-[var(--color-charcoal)] leading-relaxed">
                {LATEST_RELEASE?.blurb ?? ""}
              </p>

              {LATEST_RELEASE?.href && (
                <a
                  href={LATEST_RELEASE.href}
                  className="mt-4 inline-flex items-center gap-1 text-[12.5px] text-black font-medium hover:opacity-60 transition-opacity"
                >
                  Read the changelog
                  <ChevronRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Who we're for Mega Panel ---------- */

function WhoPanel({
  onClose,
  onHoverIn,
  onHoverOut,
}: {
  onClose: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  const [tab, setTab] = useState(WHO_NAV_GROUPS[0].key);
  const current = WHO_NAV_GROUPS.find((g) => g.key === tab) ?? WHO_NAV_GROUPS[0];
  const CurrentIcon = current.icon;
  const segments: Segment[] = current.slugs
    .map((s) => SEGMENT_BY_SLUG[s])
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: PANEL_EASE }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60] hidden lg:block"
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div
        className="bg-white border border-[var(--color-greige)] rounded-2xl overflow-hidden"
        style={{
          width: "min(880px, 92vw)",
          boxShadow: "0 30px 80px -30px rgba(15,29,43,0.25)",
        }}
      >
        <div className="flex">
          {/* LEFT RAIL — group tabs */}
          <div className="w-[240px] shrink-0 p-3 relative">
            {WHO_NAV_GROUPS.map((g) => {
              const isActive = g.key === current.key;
              const Icon = g.icon;
              return (
                <button
                  key={g.key}
                  type="button"
                  onMouseEnter={() => setTab(g.key)}
                  onFocus={() => setTab(g.key)}
                  onClick={() => setTab(g.key)}
                  className="relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-[14px] transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="who-tab-pill"
                      className="absolute inset-0 rounded-lg bg-[color-mix(in_srgb,var(--color-blue)_22%,white)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-2.5 flex-1 min-w-0">
                    <Icon
                      size={15}
                      className={clsx(
                        "shrink-0",
                        isActive
                          ? "text-[var(--color-blue-ink)]"
                          : "text-[var(--color-charcoal)]",
                      )}
                    />
                    <span
                      className={clsx(
                        "truncate font-medium",
                        isActive ? "text-[var(--color-blue-ink)]" : "text-black",
                      )}
                    >
                      {g.label}
                    </span>
                    <ChevronRight
                      size={14}
                      className={clsx(
                        "ml-auto shrink-0",
                        isActive
                          ? "text-[var(--color-blue-ink)] opacity-80"
                          : "text-[var(--color-charcoal)] opacity-50",
                      )}
                    />
                  </span>
                </button>
              );
            })}

            <div className="mt-3 pt-3 border-t border-[var(--color-greige)] px-2">
              <Link
                href="/who-we-serve"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--color-blue-ink)] hover:opacity-70 transition-opacity"
              >
                See all segments
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          <div className="w-px bg-[var(--color-greige)]" />

          {/* CENTER — group items */}
          <div className="flex-1 min-w-0 p-6">
            <div className="mb-5 rounded-xl px-4 py-3 bg-[color-mix(in_srgb,var(--color-blue)_8%,white)] border border-[color-mix(in_srgb,var(--color-blue)_18%,white)] inline-flex items-center gap-2.5">
              <CurrentIcon size={16} className="text-[var(--color-blue-ink)]" />
              <p className="font-serif text-[18px] tracking-[-0.01em] text-black leading-tight">
                {current.tagline}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: PANEL_EASE }}
                className="grid grid-cols-1 gap-x-3 gap-y-1"
              >
                {segments.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      href={`/who-we-serve/${s.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[var(--color-greige-2)] transition-colors"
                    >
                      <span className="w-9 h-9 shrink-0 rounded-md grid place-items-center bg-[color-mix(in_srgb,var(--color-blue)_15%,white)]">
                        <Icon
                          size={15}
                          className="text-[var(--color-blue-ink)]"
                        />
                      </span>
                      <span className="flex-1 min-w-0 pt-px">
                        <span className="block text-[13.5px] font-medium text-black leading-tight">
                          {s.name}
                        </span>
                        <span className="block text-[11.5px] text-[var(--color-charcoal)] leading-snug mt-[3px] line-clamp-1">
                          <span className="text-black/80">{s.hookPrimary}</span>{" "}
                          {s.hookSecondary}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Why us Mega Panel (AHPRA-flavoured) ---------- */

function WhyPanel({
  onHoverIn,
  onHoverOut,
}: {
  onClose: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: PANEL_EASE }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60] hidden lg:block"
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div
        className="bg-white border border-[var(--color-greige)] rounded-2xl overflow-hidden"
        style={{
          width: "min(1180px, 96vw)",
          boxShadow: "0 30px 80px -30px rgba(15,29,43,0.25)",
        }}
      >
        <div className="flex">
          <div className="flex-1 min-w-0 grid grid-cols-4 gap-5 p-6">
            {WHY_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-3 px-1">
                  {col.title}
                </p>
                <div className="flex flex-col">
                  {col.items.map((it) => {
                    const Icon = it.icon;
                    return (
                      <a
                        key={it.name}
                        href="#"
                        className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[var(--color-greige-2)] transition-colors"
                      >
                        <span className="w-8 h-8 shrink-0 rounded-md grid place-items-center bg-[color-mix(in_srgb,var(--color-blue)_15%,white)]">
                          <Icon size={14} className="text-[var(--color-blue-ink)]" />
                        </span>
                        <span className="flex-1 min-w-0 pt-px">
                          <span className="block text-[13px] font-medium text-black leading-tight">
                            {it.name}
                          </span>
                          {it.hint && (
                            <span className="block text-[11px] text-[var(--color-charcoal)] leading-snug mt-[2px]">
                              {it.hint}
                            </span>
                          )}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="w-px bg-[var(--color-greige)]" />

          {/* SPOTLIGHT — AHPRA */}
          <div className="w-[280px] shrink-0 p-5 flex flex-col">
            <div
              className="rounded-xl overflow-hidden border border-[var(--color-greige)] mb-4 relative"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in srgb, var(--color-blue) 38%, white) 0%, white 70%)",
              }}
            >
              <div className="aspect-[5/3] p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <Flag size={16} className="text-[var(--color-blue-ink)]" />
                  <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-blue-ink)]">
                    AHPRA-native
                  </span>
                </div>
                <div className="bg-white/85 backdrop-blur-[2px] rounded-lg border border-[var(--color-greige)] p-2.5 shadow-[0_8px_24px_-12px_rgba(15,29,43,0.25)]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ShieldCheck size={11} className="text-[var(--color-blue-ink)]" />
                    <span className="font-mono text-[9px] text-[var(--color-blue-ink)]">
                      S4 register · audit-ready
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--color-greige)] mb-1.5 w-3/4" />
                  <div className="h-1.5 rounded-full bg-[var(--color-greige)] mb-1.5 w-1/2" />
                  <div className="h-1.5 rounded-full bg-[var(--color-greige)] w-5/6" />
                </div>
              </div>
            </div>

            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-blue-ink)] mb-1.5">
              The Ruevii difference
            </span>
            <h4 className="font-serif text-[19px] tracking-[-0.01em] leading-tight text-black mb-1.5">
              Built for AU regulation.
            </h4>
            <p className="text-[12.5px] text-[var(--color-charcoal)] leading-relaxed">
              Consent enforcement, S4 register and an immutable audit trail —
              baked in, not bolted on.
            </p>

            <a
              href="#"
              className="mt-4 inline-flex items-center gap-1 text-[12.5px] text-black font-medium hover:opacity-60 transition-opacity"
            >
              Read the AHPRA brief
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Resources Mega Panel ---------- */

function ResourcesPanel({
  onHoverIn,
  onHoverOut,
}: {
  onClose: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: PANEL_EASE }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60] hidden lg:block"
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div
        className="bg-white border border-[var(--color-greige)] rounded-2xl overflow-hidden"
        style={{
          width: "min(1180px, 96vw)",
          boxShadow: "0 30px 80px -30px rgba(15,29,43,0.25)",
        }}
      >
        <div className="flex">
          <div className="flex-1 min-w-0 grid grid-cols-4 gap-5 p-6">
            {RESOURCE_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-3 px-1">
                  {col.title}
                </p>
                <div className="flex flex-col">
                  {col.items.map((it) => {
                    const Icon = it.icon;
                    return (
                      <a
                        key={it.name}
                        href="#"
                        className="group flex items-center gap-2.5 p-2 rounded-lg hover:bg-[var(--color-greige-2)] transition-colors"
                      >
                        <Icon size={14} className="text-[var(--color-blue-ink)] shrink-0" />
                        <span className="text-[13px] font-medium text-black leading-tight">
                          {it.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="w-px bg-[var(--color-greige)]" />

          {/* POPULAR RESOURCES — 2x2 thumbnail grid */}
          <div className="w-[320px] shrink-0 p-5 bg-[color-mix(in_srgb,var(--color-paper)_60%,white)]">
            <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-3">
              Popular resources
            </p>
            <div className="grid grid-cols-2 gap-3">
              {POPULAR_RESOURCES.map((r) => (
                <a
                  key={r.title}
                  href="#"
                  className="group rounded-lg overflow-hidden border border-[var(--color-greige)] bg-white hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)] transition-colors"
                >
                  <div
                    className={clsx(
                      "aspect-[4/5] bg-gradient-to-br to-white relative",
                      r.accent,
                    )}
                  >
                    <span className="absolute top-2 left-2 font-mono text-[8.5px] tracking-[0.14em] uppercase px-1.5 py-[2px] rounded bg-[var(--color-blue-ink)] text-white">
                      {r.kind}
                    </span>
                    <div className="absolute inset-x-3 bottom-3 space-y-1.5">
                      <div className="h-1.5 rounded-full bg-white/80 w-3/4" />
                      <div className="h-1.5 rounded-full bg-white/60 w-1/2" />
                    </div>
                  </div>
                  <p className="px-2 py-2 text-[11.5px] font-medium text-black leading-tight">
                    {r.title}
                  </p>
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <span className="w-4 h-1 rounded-full bg-[var(--color-blue-ink)]" />
              <span className="w-1 h-1 rounded-full bg-[var(--color-greige)]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="relative w-[22px] h-[22px] rounded-[5px] bg-black grid place-items-center"
    >
      <span className="w-2 h-2 rounded-full bg-[var(--color-paper)]" />
    </span>
  );
}

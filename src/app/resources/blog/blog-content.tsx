"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  ClosingCTABand,
  EyebrowTag,
  TwoToneHeadline,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem, Lift } from "@/components/motion-primitives";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  "All",
  "AHPRA",
  "AI",
  "Operations",
  "Marketing",
  "Migration",
] as const;

type Category = (typeof CATEGORIES)[number];

type Tint =
  | "deep"
  | "mid"
  | "soft"
  | "cool"
  | "haze"
  | "ink"
  | "wash"
  | "dust"
  | "porcelain";

type Post = {
  slug: string;
  category: Exclude<Category, "All">;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tint: Tint;
};

const FEATURED: Post = {
  slug: "/resources/blog/ahpra-cosmetic-rules-2026",
  category: "AHPRA",
  title: "The AHPRA cosmetic injectable rules: what changed in 2026",
  excerpt:
    "The September 2025 guidelines reshaped how Australian clinics consult, advertise and chart cosmetic injectables. We unpack the seven changes that actually touch your Tuesday — and what we baked into Ruevii to keep your records audit-ready without slowing the room down.",
  author: "Dr. Priya Anand",
  date: "May 28, 2026",
  readTime: "9 min read",
  tint: "deep",
};

const POSTS: Post[] = [
  {
    slug: "#",
    category: "Operations",
    title: "How Sydney clinics cut no-shows with deposit policies",
    excerpt:
      "A practical playbook from four CBD clinics that dropped no-show rates below 4%.",
    author: "Lara Whitman",
    date: "May 22, 2026",
    readTime: "6 min read",
    tint: "mid",
  },
  {
    slug: "/resources/blog/ruevii-ai-command-bar",
    category: "AI",
    title: "Why we built Ruevii AI as a command bar, not a chatbot",
    excerpt:
      "Chatbots wait for you. Command bars get out of the way. A note on the interface choice.",
    author: "Ethan Park",
    date: "May 19, 2026",
    readTime: "7 min read",
    tint: "haze",
  },
  {
    slug: "/resources/blog/s4-register-audit-checklist",
    category: "AHPRA",
    title: "S4 register audits: what to expect from the AHPRA assessor",
    excerpt:
      "An ex-assessor walks through the documents, the questions and the common failure points.",
    author: "Megan O'Brien, RN",
    date: "May 14, 2026",
    readTime: "8 min read",
    tint: "cool",
  },
  {
    slug: "/resources/blog/pricing-memberships-aud",
    category: "Marketing",
    title: "Pricing memberships in your aesthetics clinic — AUD edition",
    excerpt:
      "Three membership models we see working in Australian clinics, with real per-month numbers.",
    author: "Lara Whitman",
    date: "May 9, 2026",
    readTime: "10 min read",
    tint: "soft",
  },
  {
    slug: "#",
    category: "Operations",
    title: "Hiring a cosmetic nurse in 2026: a step-by-step guide",
    excerpt:
      "From scope-of-practice checks to the trial-shift questions that surface real injectors.",
    author: "Megan O'Brien, RN",
    date: "May 3, 2026",
    readTime: "11 min read",
    tint: "dust",
  },
  {
    slug: "/resources/blog/pabau-to-ruevii-migration",
    category: "Migration",
    title: "From Pabau to Ruevii in 14 days: the migration we ran",
    excerpt:
      "Day-by-day notes from a Bondi cosmetic clinic moving 6,400 patient records across.",
    author: "Ethan Park",
    date: "April 27, 2026",
    readTime: "12 min read",
    tint: "ink",
  },
  {
    slug: "/resources/blog/data-residency-au",
    category: "Operations",
    title: "Why AU data residency matters for cosmetic clinics",
    excerpt:
      "Where your patient photos live is now a Privacy Act question. A short primer on Sydney-hosted PHI.",
    author: "Dr. Priya Anand",
    date: "April 21, 2026",
    readTime: "6 min read",
    tint: "wash",
  },
  {
    slug: "#",
    category: "AHPRA",
    title: "The clinic owner's guide to consent capture",
    excerpt:
      "What a plaintiff-proof consent record actually looks like in 2026 — and how to capture it without slowing the consult.",
    author: "Dr. Priya Anand",
    date: "April 16, 2026",
    readTime: "9 min read",
    tint: "porcelain",
  },
  {
    slug: "#",
    category: "Marketing",
    title: "Reviews, referrals and the AHPRA testimonial rule",
    excerpt:
      "How to grow word-of-mouth in cosmetic medicine without breaking AHPRA's advertising guidance.",
    author: "Lara Whitman",
    date: "April 11, 2026",
    readTime: "7 min read",
    tint: "mid",
  },
];

/* -------------------------------------------------------------------------- */
/*  Gradient placeholder — dusty-blue tinted family                            */
/* -------------------------------------------------------------------------- */

const TINT_STYLES: Record<Tint, string> = {
  deep: "linear-gradient(155deg, color-mix(in srgb, var(--color-blue) 65%, white) 0%, color-mix(in srgb, var(--color-blue) 22%, var(--color-paper)) 55%, var(--color-paper) 100%)",
  mid: "linear-gradient(150deg, color-mix(in srgb, var(--color-blue) 48%, white) 0%, color-mix(in srgb, var(--color-blue) 12%, white) 60%, white 100%)",
  soft: "linear-gradient(160deg, color-mix(in srgb, var(--color-blue) 30%, white) 0%, color-mix(in srgb, var(--color-blue) 6%, white) 70%, white 100%)",
  cool: "linear-gradient(135deg, color-mix(in srgb, var(--color-blue-ink) 38%, white) 0%, color-mix(in srgb, var(--color-blue) 18%, white) 55%, var(--color-paper) 100%)",
  haze: "linear-gradient(170deg, color-mix(in srgb, var(--color-blue) 22%, var(--color-paper)) 0%, var(--color-paper) 65%, color-mix(in srgb, var(--color-blue) 8%, white) 100%)",
  ink: "linear-gradient(140deg, color-mix(in srgb, var(--color-blue-ink) 55%, white) 0%, color-mix(in srgb, var(--color-blue-ink) 22%, var(--color-paper)) 55%, var(--color-paper) 100%)",
  wash: "linear-gradient(180deg, color-mix(in srgb, var(--color-blue) 18%, white) 0%, white 50%, color-mix(in srgb, var(--color-blue) 8%, var(--color-paper)) 100%)",
  dust: "linear-gradient(145deg, color-mix(in srgb, var(--color-blue) 42%, var(--color-paper)) 0%, color-mix(in srgb, var(--color-blue) 14%, var(--color-paper)) 70%, var(--color-paper) 100%)",
  porcelain:
    "linear-gradient(165deg, color-mix(in srgb, var(--color-blue) 15%, white) 0%, white 55%, color-mix(in srgb, var(--color-blue) 25%, white) 100%)",
};

function GradientArt({
  tint,
  category,
  className,
}: {
  tint: Tint;
  category: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative w-full h-full overflow-hidden",
        "border border-[var(--color-greige)]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ background: TINT_STYLES[tint] }}
    >
      {/* soft grain / wash overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 10%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(80% 60% at 10% 100%, rgba(91,119,144,0.18) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      {/* faint horizon line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 h-px"
        style={{
          top: "62%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(15,15,14,0.12) 35%, rgba(15,15,14,0.12) 65%, transparent 100%)",
        }}
      />
      {/* category badge */}
      <span
        className="absolute top-3 left-3 inline-flex items-center gap-[7px] px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-[2px] border border-white/60 mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span
          aria-hidden
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]"
        />
        {category}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <ScrollProgress />
      <SiteNav />

      {/* 1. HERO ------------------------------------------------------------ */}
      <BlogHero />

      {/* 2. FILTER PILLS --------------------------------------------------- */}
      <FilterPills
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* 3. FEATURED POST -------------------------------------------------- */}
      <FeaturedPost post={FEATURED} />

      {/* 4. RECENT POSTS GRID --------------------------------------------- */}
      <RecentGrid posts={POSTS} />

      {/* 5. NEWSLETTER STRIP ---------------------------------------------- */}
      <NewsletterStrip />

      {/* 6. CLOSING CTA --------------------------------------------------- */}
      <ClosingCTABand
        primary="Run your clinic on a calmer system."
        secondary="Let the writing prove it."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "See pricing", href: "/pricing" }}
      />

      <SiteFooter />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                   */
/* -------------------------------------------------------------------------- */

function BlogHero() {
  return (
    <section className="w-full bg-[var(--color-paper)] relative overflow-hidden">
      <div className="wrap pt-[88px] pb-[56px] md:pt-[120px] md:pb-[72px] relative">
        <div className="flex flex-col items-start max-w-[760px]">
          <Reveal>
            <EyebrowTag className="mb-6">Blog</EyebrowTag>
          </Reveal>
          <Reveal delay={0.05}>
            <TwoToneHeadline
              as="h1"
              primary="Notes from Australian aesthetics."
              secondary="Ops, AI and the future of clinic care."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[58ch]">
              Practical writing for practice owners, cosmetic nurses, doctors
              and front-of-house staff.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FilterPills({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-2 md:pb-3">
        <div
          role="tablist"
          aria-label="Filter posts by category"
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORIES.map((cat, i) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(cat)}
                className={[
                  "relative inline-flex items-center gap-[7px] px-3.5 py-2 rounded-full",
                  "text-[13px] leading-none transition-colors",
                  isActive
                    ? "bg-black text-white border border-black"
                    : "bg-white text-[var(--color-charcoal)] border border-[var(--color-greige)] hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)] hover:text-black",
                ].join(" ")}
              >
                {i > 0 && (
                  <span
                    aria-hidden
                    className={[
                      "w-1.5 h-1.5 rounded-full",
                      isActive ? "bg-white" : "bg-[var(--color-blue-ink)]",
                    ].join(" ")}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pt-10 pb-16 md:pt-14 md:pb-20">
        <Reveal>
          <div className="flex items-end justify-between mb-6">
            <EyebrowTag>Featured</EyebrowTag>
            <span
              className="hidden md:inline-flex mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Issue 014
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Lift amount={-3}>
            <a
              href={post.slug}
              className="group block rounded-xl overflow-hidden border border-[var(--color-greige)] bg-white transition-colors hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)]"
              style={{
                boxShadow: "0 20px 60px -32px rgba(15,29,43,0.18)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
                {/* LEFT — text */}
                <div className="p-7 md:p-10 lg:p-12 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {post.category}
                    </span>
                    <span
                      aria-hidden
                      className="w-1 h-1 rounded-full bg-[var(--color-greige)]"
                    />
                    <span
                      className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {post.date}
                    </span>
                  </div>

                  <h2
                    className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.02em] text-black mb-5 text-balance"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {post.title}
                  </h2>

                  <p className="text-[16px] leading-[1.6] text-[var(--color-charcoal)] max-w-[58ch]">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AuthorAvatar name={post.author} />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[13.5px] font-medium text-black">
                          {post.author}
                        </span>
                        <span className="text-[12px] text-[var(--color-charcoal)]">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-black opacity-70 group-hover:opacity-100 transition-opacity">
                      Read story
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                      />
                    </span>
                  </div>
                </div>

                {/* RIGHT — gradient art */}
                <div className="relative min-h-[280px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[var(--color-greige)]">
                  <GradientArt
                    tint={post.tint}
                    category={post.category}
                    className="absolute inset-0 border-0"
                  />
                  {/* a soft mock chip layered in */}
                  <div className="absolute bottom-5 right-5 left-5 lg:left-auto lg:max-w-[260px]">
                    <div className="rounded-lg bg-white/90 backdrop-blur-[3px] border border-white/70 p-3 shadow-[0_12px_30px_-18px_rgba(15,29,43,0.35)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-ink)]/70" />
                        <span
                          className="mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          AHPRA · Sept 2025
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--color-greige)] mb-1.5 w-3/4" />
                      <div className="h-1.5 rounded-full bg-[var(--color-greige)] mb-1.5 w-5/6" />
                      <div className="h-1.5 rounded-full bg-[var(--color-greige)] w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Lift>
        </Reveal>
      </div>
    </section>
  );
}

function RecentGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="w-full bg-[var(--color-paper)]">
      <div className="wrap pb-24 md:pb-28">
        <Reveal>
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div className="flex flex-col gap-3">
              <EyebrowTag>Recent</EyebrowTag>
              <h3
                className="font-serif text-[clamp(24px,2.6vw,34px)] leading-[1.1] tracking-[-0.02em] text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Fresh from the desk.
              </h3>
            </div>
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-1.5 text-[13.5px] font-medium text-black opacity-70 hover:opacity-100 transition-opacity"
            >
              View all posts
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.05}
        >
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Lift amount={-4} className="h-full">
      <a
        href={post.slug}
        className="group h-full flex flex-col rounded-xl overflow-hidden bg-white border border-[var(--color-greige)] transition-colors hover:border-[color-mix(in_srgb,var(--color-blue)_55%,white)]"
        style={{
          boxShadow: "0 12px 36px -24px rgba(15,29,43,0.18)",
        }}
      >
        <div className="relative aspect-[16/10]">
          <GradientArt
            tint={post.tint}
            category={post.category}
            className="absolute inset-0 border-0"
          />
        </div>

        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h3
            className="font-serif text-[19px] md:text-[20.5px] leading-[1.18] tracking-[-0.01em] text-black mb-2 text-balance group-hover:text-[var(--color-blue-ink)] transition-colors"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {post.title}
          </h3>
          <p className="text-[13.5px] leading-[1.55] text-[var(--color-charcoal)] line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-5 flex items-center gap-3">
            <AuthorAvatar name={post.author} size={26} />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[12.5px] font-medium text-black truncate">
                {post.author}
              </span>
              <span
                className="mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-charcoal)] truncate"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {post.date} · {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Lift>
  );
}

function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Stubbed — no real handler. Optimistically mark as submitted.
    if (email.trim().length > 0) setSubmitted(true);
  };

  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, var(--color-paper) 0%, color-mix(in srgb, var(--color-blue) 10%, var(--color-paper)) 100%)",
      }}
    >
      <div className="wrap py-20 md:py-24">
        <div
          className="rounded-2xl border border-[var(--color-greige)] bg-white p-8 md:p-12 lg:p-14 relative overflow-hidden"
          style={{
            boxShadow: "0 20px 60px -32px rgba(15,29,43,0.16)",
          }}
        >
          {/* soft accent glow */}
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-blue) 35%, transparent) 0%, transparent 65%)",
              opacity: 0.55,
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div className="flex flex-col items-start">
              <EyebrowTag icon={Mail} className="mb-5">
                The Ruevii dispatch
              </EyebrowTag>
              <h3
                className="font-serif text-[clamp(26px,3vw,40px)] leading-[1.05] tracking-[-0.02em] text-black text-balance"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="block">AHPRA changes, product updates,</span>
                <span
                  className="block"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  and the occasional opinion.
                </span>
              </h3>
              <p className="mt-5 text-[15px] leading-[1.55] text-[var(--color-charcoal)] max-w-[44ch]">
                One short email, every other Tuesday. No fluff. Unsubscribe with
                a single tap.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3 w-full"
              aria-label="Subscribe to the Ruevii dispatch"
            >
              <label
                htmlFor="newsletter-email"
                className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Email
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@your-clinic.com.au"
                  className="flex-1 h-[48px] px-4 rounded-md bg-white border border-[var(--color-greige)] text-[15px] text-black placeholder:text-[var(--color-mute)] outline-none transition-colors focus:border-[var(--color-blue-ink)]"
                  disabled={submitted}
                />
                <motion.button
                  type="submit"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1 }}
                  transition={{ duration: 0.18, ease: [0.21, 0.61, 0.27, 1] }}
                  className="inline-flex items-center justify-center gap-2 h-[48px] px-5 rounded-md bg-black text-white text-[14.5px] font-medium leading-none hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-60"
                  disabled={submitted}
                >
                  {submitted ? "Subscribed" : "Subscribe"}
                  {!submitted && <span aria-hidden>→</span>}
                </motion.button>
              </div>
              <p className="text-[12px] text-[var(--color-charcoal)] leading-relaxed">
                By subscribing you agree to receive Ruevii's bi-weekly clinic
                dispatch. Hosted in Sydney. Privacy Act 1988 compliant.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function AuthorAvatar({
  name,
  size = 32,
}: {
  name: string;
  size?: number;
}) {
  const initials = name
    .replace(/^(Dr\.|RN)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  // deterministic tint per author so avatars stay consistent across cards
  const seed = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const tints = [
    "color-mix(in srgb, var(--color-blue) 28%, white)",
    "color-mix(in srgb, var(--color-blue-ink) 22%, white)",
    "color-mix(in srgb, var(--color-blue) 40%, var(--color-paper))",
    "color-mix(in srgb, var(--color-blue-ink) 32%, var(--color-paper))",
  ];
  const bg = tints[seed % tints.length];

  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--color-greige)] text-[var(--color-blue-ink)] mono"
      style={{
        width: size,
        height: size,
        background: bg,
        fontFamily: "var(--font-mono)",
        fontSize: Math.round(size * 0.36),
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </span>
  );
}

export default BlogIndex;

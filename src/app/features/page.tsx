import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  Lift,
  Reveal,
  Spotlight,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";
import { FEATURE_CATEGORIES, FEATURE_BY_SLUG } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "All features — Reuvy",
  description: "Every Reuvy feature, organised by what it does for your practice.",
};

export default function FeaturesIndex() {
  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="container-x">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              Features
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              One quiet system. <span className="italic">Every part of your practice.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
              From the first inbound enquiry to the post-treatment recall — every interaction lives
              inside one client record, one calendar, one set of numbers.
            </p>
          </Reveal>
        </div>
      </section>

      {FEATURE_CATEGORIES.map((cat) => {
        const CatIcon = cat.icon;
        return (
          <section key={cat.key} className="py-16 md:py-20 [&:nth-child(even)]:tinted">
            <div className="container-x">
              <Reveal>
                <div className="flex items-center gap-3 text-[var(--color-reuvy-700)]">
                  <span className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--color-reuvy-100)]">
                    <CatIcon size={16} />
                  </span>
                  <p className="text-xs uppercase tracking-[0.18em]">{cat.label}</p>
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl">{cat.tagline}.</h2>
              </Reveal>

              <Stagger
                className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                stagger={0.06}
              >
                {cat.sections
                  .flatMap((s) => s.slugs)
                  .map((slug) => {
                    const f = FEATURE_BY_SLUG[slug];
                    if (!f) return null;
                    const Icon = f.icon;
                    return (
                      <StaggerItem key={slug}>
                        <Lift amount={-5}>
                          <Spotlight>
                            <Link
                              href={`/features/${slug}`}
                              className="block rounded-2xl border border-[var(--color-line)] bg-white p-6 h-full hover:border-[var(--color-reuvy-300)] transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                                  <Icon size={16} />
                                </span>
                                {f.badge && (
                                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--color-reuvy-500)] text-white">
                                    {f.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-4 font-serif text-xl text-[var(--color-ink)]">
                                {f.name}
                              </p>
                              <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                                {f.tagline}
                              </p>
                              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-ink)] group-hover:gap-1.5 transition-all">
                                Learn more <ArrowUpRight size={12} />
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
        );
      })}
    </PageShell>
  );
}

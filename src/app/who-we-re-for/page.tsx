import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Lift, Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { PRACTICE_GROUPS, PRACTICES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Who Reuvy is for — every specialty",
  description: "Reuvy adapts to the way your practice runs — single-room studios to fifty-chair groups.",
};

export default function WhoIndex() {
  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-x">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              Who Reuvy is for
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Built for every <span className="italic">kind of practice.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {PRACTICE_GROUPS.map((g) => (
        <section key={g.key} className="py-12 md:py-16 [&:nth-child(even)]:tinted">
          <div className="container-x">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
                {g.label}
              </p>
            </Reveal>
            <Stagger className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" stagger={0.04}>
              {PRACTICES.filter((p) => p.group === g.key).map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerItem key={p.slug} y={8}>
                    <Lift amount={-4}>
                      <Link
                        href={`/who-we-re-for/${p.slug}`}
                        className="flex items-center justify-between p-5 rounded-2xl border border-[var(--color-line)] bg-white hover:border-[var(--color-reuvy-300)] hover:bg-[var(--color-reuvy-50)] transition-all group"
                      >
                        <span className="flex items-center gap-3">
                          <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                            <Icon size={16} />
                          </span>
                          <span>
                            <span className="block font-serif text-lg text-[var(--color-ink)] leading-tight">
                              {p.name}
                            </span>
                            <span className="block text-xs text-[var(--color-muted)] mt-0.5">
                              {p.tagline}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-[var(--color-muted)] group-hover:text-[var(--color-reuvy-700)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </Link>
                    </Lift>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      ))}
    </PageShell>
  );
}

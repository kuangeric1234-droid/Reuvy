import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Lift, Reveal, Stagger, StaggerItem, Spotlight } from "@/components/motion-primitives";
import { WHY_US } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Why Reuvy",
  description: "Why 3,500+ practices choose Reuvy — migration, security, support, success.",
};

const SECTIONS: { title: string; sub: string; items: { label: string; href: string; desc: string }[] }[] = [
  { title: "Compare & value", sub: "How we stack up — and what you'll save.", items: WHY_US.compare },
  { title: "Implementation", sub: "We do the heavy lifting before you go live.", items: WHY_US.implementation },
  { title: "Security & compliance", sub: "Built to the standard your industry demands.", items: WHY_US.security },
  { title: "About Reuvy", sub: "Who we are and who's building this.", items: WHY_US.company },
];

export default function WhyUsPage() {
  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-x">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              Why Reuvy
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              The work doesn't end <span className="italic">when you go live.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
              Migration, security, training, support, growth. The reasons 3,500+ practices stay with
              Reuvy aren't features — they're everything around the features.
            </p>
          </Reveal>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section
          key={s.title}
          className={"py-16 md:py-24 " + (i % 2 === 1 ? "tinted" : "")}
        >
          <div className="container-x">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">{s.title}.</h2>
              <p className="mt-3 text-[var(--color-ink-soft)]">{s.sub}</p>
            </Reveal>
            <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
              {s.items.map((item) => (
                <StaggerItem key={item.href}>
                  <Lift amount={-4}>
                    <Spotlight>
                      <Link
                        href={item.href}
                        className="block p-6 rounded-2xl border border-[var(--color-line)] bg-white hover:border-[var(--color-reuvy-300)] transition-colors group h-full"
                      >
                        <p className="font-serif text-xl text-[var(--color-ink)]">{item.label}</p>
                        <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                          {item.desc}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-ink)] group-hover:gap-1.5 transition-all">
                          Learn more <ArrowUpRight size={12} />
                        </span>
                      </Link>
                    </Spotlight>
                  </Lift>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ))}
    </PageShell>
  );
}

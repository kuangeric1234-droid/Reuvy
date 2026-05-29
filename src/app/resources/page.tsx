import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Lift, Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { RESOURCES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resources — Reuvy",
  description: "Guides, templates, education and tools to help your practice grow.",
};

export default function ResourcesPage() {
  return (
    <PageShell>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-x">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              Resources
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Useful things. <span className="italic">No filler.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
              Guides, templates and tools we've built because someone on our team needed them
              first.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <Block title="Popular reads" items={RESOURCES.popular.map((r) => ({ ...r }))} />
            <Block title="Tools & templates" items={RESOURCES.tools.map((r) => ({ ...r }))} />
            <Block title="Education" items={RESOURCES.education.map((r) => ({ ...r }))} />
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-[var(--color-line)] bg-[var(--color-reuvy-50)] p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
                Build with Reuvy
              </p>
              <h3 className="mt-3 font-serif text-3xl text-[var(--color-ink)]">
                Partner with us.
              </h3>
              <p className="mt-4 text-[var(--color-ink-soft)]">
                Refer a practice, build on the platform, or join the partner programme. Three ways
                to grow alongside Reuvy.
              </p>
              <div className="mt-6 space-y-2">
                {RESOURCES.referrals.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="block px-4 py-3 rounded-xl bg-white text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-reuvy-100)] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Block({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <Reveal>
        <h2 className="text-3xl md:text-4xl">{title}.</h2>
      </Reveal>
      <Stagger className="mt-6 grid sm:grid-cols-2 gap-3" stagger={0.05}>
        {items.map((it) => (
          <StaggerItem key={it.href} y={8}>
            <Lift amount={-4}>
              <Link
                href={it.href}
                className="block p-5 rounded-2xl border border-[var(--color-line)] bg-white hover:border-[var(--color-reuvy-300)] transition-colors"
              >
                <p className="font-serif text-lg text-[var(--color-ink)] leading-snug">{it.label}</p>
              </Link>
            </Lift>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

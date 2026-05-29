import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  Lift,
  Reveal,
  Spotlight,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";
import { PRACTICE_BY_SLUG, PRACTICES, FEATURES, FEATURE_BY_SLUG } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRACTICES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PRACTICE_BY_SLUG[slug];
  if (!p) return { title: "Not found" };
  return { title: `${p.name} software — Reuvy`, description: p.tagline };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = PRACTICE_BY_SLUG[slug];
  if (!p) notFound();
  const Icon = p.icon;

  // pick a relevant slice of features for this practice
  const featured = ["calendar", "online-booking", "emr", "payments", "campaigns", "reporting"]
    .map((s) => FEATURE_BY_SLUG[s])
    .filter(Boolean);

  return (
    <PageShell>
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 75% -10%, rgba(155,183,209,0.28), transparent 60%)",
          }}
        />
        <div className="container-x">
          <Reveal>
            <Link
              href="/who-we-re-for"
              className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] mb-6"
            >
              ← All specialties
            </Link>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-reuvy-200)] bg-[var(--color-reuvy-50)] px-3 py-1.5 text-xs text-[var(--color-reuvy-700)]">
                  <Icon size={14} />
                  {p.name}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                  Reuvy for {p.name.toLowerCase()}.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-xl text-lg text-[var(--color-ink-soft)] leading-relaxed">
                  {p.tagline}. Configured for how {p.name.toLowerCase()} practices actually run —
                  with the templates, workflows and compliance baked in from day one.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--color-reuvy-700)] transition-colors"
                  >
                    Book a demo <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/tour"
                    className="inline-flex items-center justify-center gap-2 border border-[var(--color-line)] hover:border-[var(--color-reuvy-400)] text-[var(--color-ink)] px-6 py-3.5 rounded-full text-sm font-medium transition-colors"
                  >
                    Take a tour
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-5" delay={0.2} y={32}>
              <Lift amount={-6}>
                <div className="rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_30px_80px_-30px_rgba(15,29,43,0.18)] p-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
                    Built for {p.name.toLowerCase()}
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      `Templates pre-loaded for ${p.name.toLowerCase()} workflows`,
                      "Compliance fields baked into the chart",
                      "Booking flows tuned for your typical visit",
                      "Reporting that reflects your actual KPIs",
                    ].map((line) => (
                      <div
                        key={line}
                        className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--color-mist)] text-sm text-[var(--color-ink)]"
                      >
                        <CheckCircle2 size={14} className="text-[var(--color-reuvy-600)] mt-0.5 shrink-0" />
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </Lift>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 tinted">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-reuvy-700)]">
              What {p.name.toLowerCase()} practices use
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl">
              The features that <span className="italic">do the heavy lifting.</span>
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.07}>
            {featured.map((f) => {
              const FIcon = f.icon;
              return (
                <StaggerItem key={f.slug}>
                  <Lift amount={-5}>
                    <Spotlight>
                      <Link
                        href={`/features/${f.slug}`}
                        className="block rounded-2xl border border-[var(--color-line)] bg-white p-6 h-full hover:border-[var(--color-reuvy-300)] transition-colors group"
                      >
                        <span className="grid place-items-center h-10 w-10 rounded-xl bg-[var(--color-reuvy-100)] text-[var(--color-reuvy-700)]">
                          <FIcon size={16} />
                        </span>
                        <p className="mt-4 font-serif text-xl text-[var(--color-ink)]">{f.name}</p>
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
    </PageShell>
  );
}

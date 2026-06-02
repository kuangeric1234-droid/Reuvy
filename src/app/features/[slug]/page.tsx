import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import { ClosingCTABand } from "@/components/ui";
import { FeatureDetailPage } from "@/components/feature-detail-page";
import { ALL_FEATURES, FEATURE_BY_SLUG } from "@/lib/marketing/features";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  // Slugs can repeat across categories (e.g. ruevii-ai appears in both
  // "featured" and "conversations") so dedupe before emitting params.
  const seen = new Set<string>();
  const params: Params[] = [];
  for (const f of ALL_FEATURES) {
    if (seen.has(f.slug)) continue;
    seen.add(f.slug);
    params.push({ slug: f.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) {
    return {
      title: "Feature not found — Ruevii",
    };
  }
  return {
    title: `${feature.name} — Ruevii`,
    description: feature.oneLiner,
    openGraph: {
      title: `${feature.name} — Ruevii`,
      description: feature.oneLiner,
      type: "website",
      locale: "en_AU",
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) notFound();

  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <FeatureDetailPage slug={slug} />
      </main>
      <ClosingCTABand
        primary="One platform."
        secondary="Every clinic workflow."
        ctaPrimary={{ label: "Book a demo", href: "/demo" }}
        ctaSecondary={{ label: "See pricing", href: "/#pricing" }}
      />
      <SiteFooter />
      <CommandPalette />
    </>
  );
}

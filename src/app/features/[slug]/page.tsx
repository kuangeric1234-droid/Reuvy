import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { FeaturePage } from "@/components/feature-page";
import { FEATURE_BY_SLUG, FEATURES } from "@/lib/site-data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = FEATURE_BY_SLUG[slug];
  if (!f) return { title: "Feature not found" };
  return {
    title: `${f.name} — Reuvy`,
    description: f.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) notFound();

  return (
    <PageShell>
      <FeaturePage slug={feature.slug} />
    </PageShell>
  );
}

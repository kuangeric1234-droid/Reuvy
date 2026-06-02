import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SegmentDetailContent } from "../segment-detail-content";
import { SEGMENTS, SEGMENT_BY_SLUG } from "@/lib/marketing/segments";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const segment = SEGMENT_BY_SLUG[slug];
  if (!segment) {
    return { title: "Segment not found — Ruevii" };
  }
  const description = `${segment.hookPrimary} ${segment.hookSecondary} — Ruevii for ${segment.name.toLowerCase()}. AHPRA-aligned, Australian-made.`;
  return {
    title: `${segment.name} — Ruevii`,
    description,
    openGraph: {
      title: `${segment.name} — Ruevii`,
      description,
      type: "website",
      locale: "en_AU",
    },
  };
}

export default async function SegmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!SEGMENT_BY_SLUG[slug]) notFound();

  return <SegmentDetailContent slug={slug} />;
}

import type { Metadata } from "next";
import { RoadmapContent } from "./roadmap-content";

export const metadata: Metadata = {
  title: "Roadmap — Ruevii",
  description:
    "Ruevii's public roadmap — shipped, in progress, and planned. Updated every two weeks. Prioritised by the Australian clinics that pay us.",
  openGraph: {
    title: "Roadmap — Ruevii",
    description:
      "What's shipping next at Ruevii. Updated every two weeks, voted on by Australian clinics.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RoadmapPage() {
  return <RoadmapContent />;
}

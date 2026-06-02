import type { Metadata } from "next";
import { ResourcesContent } from "./_content";

export const metadata: Metadata = {
  title: "Resources — Ruevii",
  description:
    "Guides, templates, code samples and customer stories for Australian aesthetics practices. Switch to Ruevii with confidence.",
  openGraph: {
    title: "Resources — Ruevii",
    description:
      "Guides, templates, code samples and customer stories from Australian aesthetics practices.",
    type: "website",
    locale: "en_AU",
  },
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}

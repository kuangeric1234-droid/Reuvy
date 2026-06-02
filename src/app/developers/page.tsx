import type { Metadata } from "next";
import { DevelopersContent } from "./developers-content";

export const metadata: Metadata = {
  title: "Developers — Ruevii",
  description:
    "Build on Ruevii. Public REST API, signed webhooks, and embeddable booking widgets — authenticated with API keys, AU-hosted, AHPRA-aware. Endpoints for clients, appointments, sales and conversations.",
  openGraph: {
    title: "Developers — Ruevii",
    description:
      "Public REST API, signed webhooks, and embeddable booking widgets for Australian cosmetic clinics.",
    type: "website",
    locale: "en_AU",
  },
};

export default function DevelopersPage() {
  return <DevelopersContent />;
}

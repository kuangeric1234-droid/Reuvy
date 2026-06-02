import type { Metadata } from "next";
import { HelpContent } from "./help-content";

export const metadata: Metadata = {
  title: "Help Center — Ruevii",
  description:
    "Help, when you need it — from a Sydney-based team. Articles, integrations and migration guides for Australian aesthetics clinics running on Ruevii.",
  openGraph: {
    title: "Help Center — Ruevii",
    description:
      "Articles, integrations and migration guides for Australian clinics. Sydney-based support, Mon–Fri 8am–6pm AEST.",
    type: "website",
    locale: "en_AU",
  },
};

export default function HelpCenterPage() {
  return <HelpContent />;
}

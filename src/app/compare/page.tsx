import type { Metadata } from "next";
import { CompareContent } from "./compare-content";

export const metadata: Metadata = {
  title: "Compare Ruevii — Honest tradeoffs vs. Pabau & Cliniko",
  description:
    "An honest, feature-by-feature comparison of Ruevii vs. Pabau and Cliniko. Built for Australian cosmetic, injectable and aesthetics clinics — AHPRA-native, AU-resident, AI-native.",
  openGraph: {
    title: "Compare Ruevii — Honest tradeoffs vs. Pabau & Cliniko",
    description:
      "Feature-by-feature comparison. AHPRA-native, AU data residency, AI-native — and an honest look at where Pabau or Cliniko may suit you better.",
    type: "website",
    locale: "en_AU",
  },
};

export default function ComparePage() {
  return <CompareContent />;
}

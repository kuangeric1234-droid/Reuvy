import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About — Ruevii",
  description:
    "Ruevii is built in Sydney by clinicians, designers and engineers — the practice OS we wished existed when we ran our own AU cosmetic & aesthetics clinics. Australian-made, AHPRA-native, AI-native, calm by design.",
  openGraph: {
    title: "About — Ruevii",
    description:
      "Australian-made, AHPRA-native, AI-native, calm by design. Built in Sydney for the way Australian clinics actually run.",
    type: "website",
    locale: "en_AU",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — Ruevii",
  description:
    "How Ruevii Pty Ltd collects, uses, stores and shares personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  openGraph: {
    title: "Privacy Policy — Ruevii",
    description:
      "Australian Privacy Principles (APPs) compliant policy for Ruevii customers, clinic operators and their patients.",
    type: "website",
    locale: "en_AU",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}

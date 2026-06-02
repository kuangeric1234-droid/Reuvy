import type { Metadata } from "next";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service — Ruevii",
  description:
    "The terms that govern your Ruevii subscription, including billing, customer data ownership, acceptable use and limitation of liability under the laws of New South Wales, Australia.",
  openGraph: {
    title: "Terms of Service — Ruevii",
    description:
      "Subscription, billing and acceptable-use terms for Ruevii customers.",
    type: "website",
    locale: "en_AU",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}

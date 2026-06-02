import type { Metadata } from "next";
import { ComplianceContent } from "./compliance-content";

export const metadata: Metadata = {
  title: "AHPRA Compliance — Ruevii",
  description:
    "Ruevii ships with AHPRA-aligned workflows, an S4 dispensing register, consent enforcement and an immutable audit trail — out of the box.",
  openGraph: {
    title: "AHPRA Compliance — Ruevii",
    description:
      "AHPRA-aligned workflows, S4 register, consent enforcement and an immutable audit trail. Built for Australian clinics — not bolted on.",
    type: "website",
    locale: "en_AU",
  },
};

export default function CompliancePage() {
  return <ComplianceContent />;
}

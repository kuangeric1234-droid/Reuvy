import type { Metadata } from "next";
import { SecurityContent } from "./security-content";

export const metadata: Metadata = {
  title: "Security Commitment — Ruevii",
  description:
    "How Ruevii protects clinic and patient data — encryption, access controls, audit logging, SOC 2 (in progress), AHPRA-aligned PHI handling, penetration testing and incident response.",
  openGraph: {
    title: "Security Commitment — Ruevii",
    description:
      "Encryption, access controls, audit logging, SOC 2 (in progress) and AHPRA-aligned PHI handling.",
    type: "website",
    locale: "en_AU",
  },
};

export default function SecurityPage() {
  return <SecurityContent />;
}

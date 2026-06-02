import type { Metadata } from "next";
import { SwitchFromPabauContent } from "./switch-from-pabau-content";

export const metadata: Metadata = {
  title: "Switch from Pabau to Ruevii — 14-day migration, done for you",
  description:
    "Move from Pabau to Ruevii in 14 days. Our Sydney onboarding crew handles the audit, import, training and cutover weekend — so you keep treating clients.",
  openGraph: {
    title: "Switch from Pabau to Ruevii — 14-day migration, done for you",
    description:
      "AU onboarding crew. 14 days. Done for you. We cover your Pabau subscription during migration (up to 30 days).",
    type: "website",
    locale: "en_AU",
  },
};

export default function SwitchFromPabauPage() {
  return <SwitchFromPabauContent />;
}

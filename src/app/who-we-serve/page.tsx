import type { Metadata } from "next";
import { WhoWeServeContent } from "./who-we-serve-content";

export const metadata: Metadata = {
  title: "Who we serve — Ruevii",
  description:
    "Ruevii is built for Australian aesthetics — cosmetic & injectable clinics, skin & laser clinics, cosmetic nurses, solo injectors and multi-location groups.",
  openGraph: {
    title: "Who we serve — Ruevii",
    description:
      "AHPRA-native, AU-hosted clinic software for cosmetic, injectable, skin and laser clinics — from solo injectors to multi-site groups.",
    type: "website",
    locale: "en_AU",
  },
};

export default function WhoWeServePage() {
  return <WhoWeServeContent />;
}

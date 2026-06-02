import type { Metadata } from "next";
import { StatusContent } from "./status-content";

export const metadata: Metadata = {
  title: "Status — Ruevii",
  description:
    "Live operational status for Ruevii — API, web app, booking widget, SMS, payments and infrastructure. 99.97% uptime over the last 90 days.",
  openGraph: {
    title: "Status — Ruevii",
    description:
      "Live operational status, component health, and incident history for Ruevii.",
    type: "website",
    locale: "en_AU",
  },
};

export default function StatusPage() {
  return <StatusContent />;
}

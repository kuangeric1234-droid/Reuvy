import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ruevii — The operating system for modern aesthetics clinics",
  description:
    "Ruevii brings clinical records, AHPRA-compliant consults, bookings, payments and inventory into one calm, beautiful workspace — built natively for Australian injectable & cosmetic clinics.",
  metadataBase: new URL("https://ruevii.com"),
  openGraph: {
    title: "Ruevii — The operating system for modern aesthetics clinics",
    description:
      "Calm, compliant, beautiful. Built for Australian aesthetics practice.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={geistMono.variable}>
      <body className="min-h-screen antialiased">
        <Script src="/cleanup-sw.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}

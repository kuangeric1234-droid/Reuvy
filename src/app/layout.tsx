import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reuvy — The only software your practice will ever need",
  description:
    "Reuvy unifies clinical care, scheduling, payments, and patient engagement in one quietly powerful platform built for modern practices.",
  metadataBase: new URL("https://reuvy.com"),
  openGraph: {
    title: "Reuvy — Practice software, considered.",
    description:
      "Calendar, EMR, payments, marketing, AI — one calm system for the whole practice.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Script src="/cleanup-sw.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { BlogIndex } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog — Ruevii",
  description:
    "Notes from Australian aesthetics. Practical writing on AHPRA, AI and clinic operations for practice owners, cosmetic nurses, doctors and front-of-house staff.",
  openGraph: {
    title: "Blog — Ruevii",
    description:
      "Notes from Australian aesthetics. AHPRA, AI, operations, marketing and migration writing for AU cosmetic clinics.",
    type: "website",
    locale: "en_AU",
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}

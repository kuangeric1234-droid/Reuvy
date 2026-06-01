import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Features } from "@/components/home/features";
import { Compliance } from "@/components/home/compliance";
import { AISection } from "@/components/home/ai-section";
import { Stats } from "@/components/home/stats";
import { Testimonial } from "@/components/home/testimonial";
import { Integrations } from "@/components/home/integrations";
import { FinalCTA } from "@/components/home/final-cta";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <Compliance />
        <AISection />
        <Stats />
        <Testimonial />
        <Integrations />
        <FinalCTA />
      </main>
      <SiteFooter />
      <CommandPalette />
    </>
  );
}

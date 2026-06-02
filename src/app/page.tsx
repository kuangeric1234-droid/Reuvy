import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProblemBand } from "@/components/home/problem-band";
import { EvolutionBand } from "@/components/home/evolution-band";
import { Features } from "@/components/home/features";
import { Compliance } from "@/components/home/compliance";
import { AISection } from "@/components/home/ai-section";
import { SocialProof } from "@/components/home/social-proof";
import { Stats } from "@/components/home/stats";
import { ScaleBand } from "@/components/home/scale-band";
import { Testimonial } from "@/components/home/testimonial";
import { Integrations } from "@/components/home/integrations";
import { ClosingCTABand } from "@/components/ui/closing-cta-band";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        {/* 1. Hero (light) */}
        <Hero />

        {/* 2. Trust strip (light) */}
        <TrustStrip />

        {/* 3. Problem band (dark) — the "stack of tools" moment */}
        <ProblemBand />

        {/* 4. Evolution band (light) — one platform that grows with you */}
        <EvolutionBand />

        {/* 5. Features (light) — the core capability grid */}
        <Features />

        {/* 6. Compliance (light tinted) — AHPRA-native */}
        <Compliance />

        {/* 7. AI section (dark) — Ruevii AI command bar */}
        <AISection />

        {/* 8. Social proof (light) — testimonial card row */}
        <SocialProof />

        {/* 9. Stats (light) — counting metric strip */}
        <Stats />

        {/* 10. Scale band (light) — reporting + multi-location pillars */}
        <ScaleBand />

        {/* 11. Testimonial (light) — long-form quote */}
        <Testimonial />

        {/* 12. Integrations (light) — Stripe, Tyro, Xero, ... */}
        <Integrations />

        {/* 13. Closing CTA band (dark) — final call to action */}
        <ClosingCTABand
          primary="One quiet system"
          secondary="for the whole practice."
          ctaPrimary={{ label: "Book a demo", href: "/demo" }}
          ctaSecondary={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <SiteFooter />
      <CommandPalette />
    </>
  );
}

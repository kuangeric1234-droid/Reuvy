import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/hero";
import {
  ProblemSection,
  CoreFeatures,
  AIFeatures,
  Metrics,
  Testimonials,
  Integrations,
  PracticeTypes,
  FAQ,
  FinalCTA,
} from "@/components/sections";

export default function Page() {
  return (
    <PageShell>
      <Hero />
      <ProblemSection />
      <CoreFeatures />
      <AIFeatures />
      <Metrics />
      <Testimonials />
      <Integrations />
      <PracticeTypes />
      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}

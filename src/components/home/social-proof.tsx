"use client";

import { Quote } from "lucide-react";
import { EyebrowTag } from "@/components/ui/eyebrow-tag";
import { TwoToneHeadline } from "@/components/ui/two-tone-headline";
import { Reveal, Stagger, StaggerItem, Lift } from "@/components/motion-primitives";

type TestimonialItem = {
  metric: string;
  metricLabel: string;
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    metric: "11 hrs",
    metricLabel: "admin saved / week",
    quote:
      "Ruevii replaced four systems in our first month. The front desk got their afternoons back and consent is finally airtight.",
    name: "Dr. Hannah Lane",
    role: "Founder · Lumière Aesthetics · Melbourne",
  },
  {
    metric: "−42%",
    metricLabel: "no-shows in 90 days",
    quote:
      "Deposits, smart reminders and AI receptionist together cut no-shows almost in half. The calendar is finally working for us.",
    name: "Priya Nair, RN",
    role: "Clinic owner · SKIN&CO · Sydney",
  },
  {
    metric: "$0",
    metricLabel: "AHPRA findings",
    quote:
      "Our last audit took an hour. Every consult, every consent, every S4 entry — already on the patient record, time-stamped and signed.",
    name: "Dr. Sam Whitford",
    role: "Medical director · Bayside Cosmetic · QLD",
  },
];

/**
 * SocialProof — LIGHT band. 3 testimonial cards in a row, each with a big
 * metric tile, a pull-quote, and an attribution. Matches the editorial card
 * styling used elsewhere on the page.
 */
export function SocialProof() {
  return (
    <section
      aria-label="What clinics say about Ruevii"
      className="w-full"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="wrap section">
        <div className="max-w-[760px] mb-12">
          <Reveal>
            <div className="inline-flex">
              <EyebrowTag>FROM AUSTRALIAN PRACTICES</EyebrowTag>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="mt-6">
            <TwoToneHeadline
              as="h2"
              primary="The proof is in the practice."
              secondary="Real numbers from real clinics."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[48ch]">
              Clinics across Melbourne, Sydney and Queensland are running calmer days,
              tighter compliance and stronger rebookings — without bolting on more tools.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4" stagger={0.08}>
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <Lift amount={-3} className="h-full">
                <article
                  className="h-full flex flex-col bg-white border border-[var(--color-greige)] rounded-[10px] p-7"
                  style={{ boxShadow: "0 20px 50px -36px rgba(20,20,18,0.18)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <Quote
                      size={22}
                      className="text-[var(--color-blue-ink)]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--color-mute)]">
                      VERIFIED · 2026
                    </span>
                  </div>

                  <div
                    className="font-serif text-[40px] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t.metric}
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--color-charcoal)]">
                    {t.metricLabel}
                  </div>

                  <blockquote className="mt-6 text-[15px] leading-[1.55] text-[var(--color-charcoal)]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="mt-auto pt-6 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[var(--color-greige)] flex-none" />
                    <div>
                      <div className="font-semibold text-[14px]">{t.name}</div>
                      <div className="font-mono text-[11.5px] text-[var(--color-charcoal)]">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </article>
              </Lift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default SocialProof;

"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
  href?: string;
};

const EASE = [0.21, 0.61, 0.27, 1] as const;

/**
 * FeatureCard
 * Small icon + title + desc card used in 3-up and 4-up grids on product
 * detail pages. White bg, greige border, small radius, icon in a light-blue
 * tinted square. Hover lifts -1px and softens border toward dusty blue.
 */
export function FeatureCard({ icon: Icon, title, body, href }: FeatureCardProps) {
  const Tag = href ? motion.a : motion.div;
  const interactiveProps = href
    ? {
        href,
        whileHover: { y: -1 },
        whileTap: { y: 1 },
        transition: { duration: 0.18, ease: EASE },
      }
    : {
        whileHover: { y: -1 },
        transition: { duration: 0.18, ease: EASE },
      };

  return (
    <Tag
      {...(interactiveProps as Record<string, unknown>)}
      className={[
        "group block",
        "rounded-lg bg-white",
        "border border-[var(--color-greige)]",
        "p-6",
        "transition-colors duration-200",
        "hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)]",
      ].join(" ")}
      style={{ willChange: "transform" }}
    >
      <span
        aria-hidden
        className="inline-flex w-10 h-10 rounded-md items-center justify-center mb-4"
        style={{
          background: "color-mix(in srgb, var(--color-blue) 15%, white)",
        }}
      >
        <Icon size={18} className="text-[var(--color-blue-ink)]" />
      </span>
      <h3
        className="font-serif text-[18px] leading-[1.2] tracking-[-0.01em] text-black mb-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-snug text-[var(--color-charcoal)]">
        {body}
      </p>
    </Tag>
  );
}

export default FeatureCard;

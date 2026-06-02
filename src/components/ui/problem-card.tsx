import type { LucideIcon } from "lucide-react";

type ProblemCardProps = {
  icon?: LucideIcon;
  title: string;
  body: string;
};

/**
 * ProblemCard
 * Light-bg card highlighting a problem. Slightly more spacious than FeatureCard.
 * Icon square uses a muted warning tone (rose-tinted, not loud).
 */
export function ProblemCard({ icon: Icon, title, body }: ProblemCardProps) {
  return (
    <article
      className={[
        "rounded-[10px] bg-white",
        "border border-[var(--color-greige)]",
        "p-7",
        "flex flex-col gap-4",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="relative inline-flex w-11 h-11 rounded-md items-center justify-center"
        style={{
          background: "color-mix(in srgb, #c4654f 12%, white)",
          border: "1px solid color-mix(in srgb, #c4654f 22%, white)",
        }}
      >
        {Icon && <Icon size={18} style={{ color: "#a04a36" }} />}
        <span
          aria-hidden
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{
            background: "color-mix(in srgb, #c4654f 75%, white)",
          }}
        />
      </span>
      <h3
        className="font-serif text-[19px] leading-[1.2] tracking-[-0.015em] text-black"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h3>
      <p className="text-[14.5px] leading-[1.55] text-[var(--color-charcoal)]">
        {body}
      </p>
    </article>
  );
}

export default ProblemCard;

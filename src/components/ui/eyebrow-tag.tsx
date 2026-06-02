import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type EyebrowTagProps = {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

/**
 * EyebrowTag
 * Small chip used above section headlines. Inline-flex pill on paper-tinted bg.
 * Dusty-blue dot accent before text. Optional lucide icon at the left
 * replaces the dot.
 */
export function EyebrowTag({ children, icon: Icon, className }: EyebrowTagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-[8px]",
        "rounded-full bg-[var(--color-paper)] border border-[var(--color-greige)]",
        "px-3 py-1.5",
        "text-[11px] font-mono uppercase tracking-[0.14em]",
        "text-[var(--color-charcoal)]",
        "leading-none",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {Icon ? (
        <Icon
          size={12}
          className="text-[var(--color-blue-ink)] shrink-0"
          aria-hidden
        />
      ) : (
        <span
          aria-hidden
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{ background: "var(--color-blue)" }}
        />
      )}
      <span>{children}</span>
    </span>
  );
}

export default EyebrowTag;

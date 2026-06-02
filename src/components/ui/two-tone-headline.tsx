import { createElement } from "react";

type TwoToneHeadlineProps = {
  primary: string;
  secondary: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  accent?: "charcoal" | "blue";
};

const SIZE_BY_TAG: Record<NonNullable<TwoToneHeadlineProps["as"]>, string> = {
  h1: "text-[clamp(40px,6vw,78px)]",
  h2: "text-[clamp(30px,4vw,56px)]",
  h3: "text-[clamp(22px,2.8vw,36px)]",
};

/**
 * TwoToneHeadline
 * The signature Decoda-style two-line headline. Line 1 in black,
 * line 2 in charcoal (default) or dusty blue-ink as an accent.
 * Renders as h1/h2/h3 with size scaled per tag.
 */
export function TwoToneHeadline({
  primary,
  secondary,
  as = "h2",
  className,
  accent = "charcoal",
}: TwoToneHeadlineProps) {
  const sizeClass = SIZE_BY_TAG[as];
  const accentColor =
    accent === "blue" ? "var(--color-blue-ink)" : "var(--color-charcoal)";

  const classes = [
    sizeClass,
    "font-serif",
    "font-normal",
    "tracking-[-0.025em]",
    "leading-[1.02]",
    "text-balance",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as,
    {
      className: classes,
      style: { fontFamily: "var(--font-serif)" },
    },
    createElement(
      "span",
      { className: "block text-black" },
      primary,
    ),
    createElement(
      "span",
      { className: "block", style: { color: accentColor } },
      secondary,
    ),
  );
}

export default TwoToneHeadline;

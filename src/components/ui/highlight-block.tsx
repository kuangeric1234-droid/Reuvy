import type { ReactNode } from "react";

type HighlightBlockProps = {
  eyebrow?: string;
  title: ReactNode;
  body: string;
  bullets?: string[];
  visual?: ReactNode;
};

/**
 * HighlightBlock
 * Larger bordered card used for headline capabilities (typically 2-up).
 * Optional visual slot renders on the right on wide screens, below on narrow.
 */
export function HighlightBlock({
  eyebrow,
  title,
  body,
  bullets,
  visual,
}: HighlightBlockProps) {
  const hasVisual = Boolean(visual);

  return (
    <article
      className={[
        "rounded-[12px] bg-white",
        "border border-[var(--color-greige)]",
        "p-8",
        "flex flex-col gap-7",
        hasVisual ? "lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:items-center" : "",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 min-w-0">
        {eyebrow && (
          <p
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] leading-none"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {eyebrow}
          </p>
        )}
        <h3
          className="font-serif text-[clamp(22px,2.6vw,32px)] leading-[1.08] tracking-[-0.02em] text-black"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>
        <p className="text-[15.5px] leading-[1.55] text-[var(--color-charcoal)]">
          {body}
        </p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-1 flex flex-col gap-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[14px] leading-snug text-[var(--color-charcoal)]"
              >
                <span
                  aria-hidden
                  className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
                  style={{ background: "var(--color-blue-ink)" }}
                />
                <span className="text-black/85">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasVisual && (
        <div className="min-w-0 w-full">
          {visual}
        </div>
      )}
    </article>
  );
}

export default HighlightBlock;

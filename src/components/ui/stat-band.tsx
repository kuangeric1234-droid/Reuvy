type Stat = { value: string; label: string };
type Quote = { body: string; name: string; role: string };

type StatBandProps = {
  stats: Stat[];
  quote?: Quote;
};

/**
 * StatBand
 * Dark full-width band with big numbers and an optional testimonial.
 * Stats grid is responsive (1 / 2 / 3 cols). Numbers are serif display;
 * labels are mono caps. Quote sits below in editorial italic serif.
 */
export function StatBand({ stats, quote }: StatBandProps) {
  const colsClass =
    stats.length >= 3
      ? "md:grid-cols-3"
      : stats.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  return (
    <section
      className="w-full"
      style={{
        background: "var(--color-ink)",
        color: "var(--color-white)",
      }}
    >
      <div className="wrap section">
        <div
          className={[
            "grid grid-cols-1 gap-y-10 gap-x-10",
            colsClass,
            "border-b border-white/10 pb-12",
          ].join(" ")}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-3">
              <p
                className="font-serif font-normal text-[clamp(48px,6vw,80px)] leading-[0.95] tracking-[-0.025em] text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {s.value}
              </p>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-soft)] leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {quote && (
          <figure className="mt-12 max-w-[68ch]">
            <blockquote
              className="font-serif italic text-[clamp(22px,2.6vw,28px)] leading-[1.3] tracking-[-0.01em] text-white/95"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span aria-hidden className="text-white/35 mr-1">“</span>
              {quote.body}
              <span aria-hidden className="text-white/35 ml-1">”</span>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                aria-hidden
                className="w-[28px] h-px"
                style={{ background: "var(--color-blue)" }}
              />
              <span className="text-[13.5px] text-white/85">
                <span className="font-medium text-white">{quote.name}</span>
                <span className="text-white/55"> · {quote.role}</span>
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

export default StatBand;

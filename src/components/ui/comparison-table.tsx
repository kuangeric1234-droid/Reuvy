type ReplaceItem = { name: string; monthly: string };
type RueviiSide = { name: string; included: string[] };

type ComparisonTableProps = {
  youReplace: ReplaceItem[];
  ruevii: RueviiSide;
  rueviiMonthly?: string;
  totalLabel?: string;
};

/**
 * Parses a currency string like "$249" or "AU$ 1,249.50" and returns a number.
 * Returns 0 if it cannot parse.
 */
function parseMoney(raw: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^0-9.\-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Formats a number back to a currency-ish string. Tries to preserve the
 * currency prefix from a sample (e.g. "$"). Falls back to "$".
 */
function formatMoney(n: number, sample: string): string {
  const match = sample.match(/^[^0-9.\-]+/);
  const prefix = match ? match[0].trim() : "$";
  const rounded = Math.round(n);
  return `${prefix}${rounded.toLocaleString("en-AU")}`;
}

/**
 * ComparisonTable
 * "What you're paying now vs. Ruevii" comparison.
 * Left: point tools being replaced with monthly cost.
 * Right: Ruevii's single line item with the capabilities it covers.
 * Sum row at the bottom with the savings delta.
 */
export function ComparisonTable({
  youReplace,
  ruevii,
  rueviiMonthly,
  totalLabel = "Per month",
}: ComparisonTableProps) {
  const replaceTotal = youReplace.reduce((acc, r) => acc + parseMoney(r.monthly), 0);
  const sample = youReplace[0]?.monthly ?? rueviiMonthly ?? "$0";
  const replaceTotalLabel = formatMoney(replaceTotal, sample);
  const rueviiTotalValue = rueviiMonthly ? parseMoney(rueviiMonthly) : 0;
  const savings = Math.max(0, replaceTotal - rueviiTotalValue);
  const savingsLabel = formatMoney(savings, sample);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-greige)] rounded-[12px] overflow-hidden bg-white"
    >
      {/* LEFT — tools you replace */}
      <div className="p-6 md:p-8 md:border-r border-[var(--color-greige)] flex flex-col">
        <header className="mb-5">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)] leading-none mb-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            What you're paying now
          </p>
          <h4
            className="font-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-black"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Point tools, stitched together
          </h4>
        </header>

        <ul className="flex flex-col divide-y divide-[var(--color-greige)] -mx-1">
          {youReplace.map((r) => (
            <li
              key={r.name}
              className="flex items-center justify-between gap-4 py-3 px-1"
            >
              <span className="text-[14.5px] text-black">{r.name}</span>
              <span
                className="font-mono text-[13px] text-[var(--color-charcoal)] tabular-nums"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {r.monthly}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 border-t border-[var(--color-greige)] flex items-center justify-between">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-charcoal)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {totalLabel}
          </span>
          <span
            className="font-serif text-[26px] leading-none tracking-[-0.01em] text-black tabular-nums"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {replaceTotalLabel}
          </span>
        </div>
      </div>

      {/* RIGHT — Ruevii */}
      <div
        className="p-6 md:p-8 flex flex-col"
        style={{
          background: "color-mix(in srgb, var(--color-blue) 6%, white)",
        }}
      >
        <header className="mb-5">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)] leading-none mb-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            With Ruevii
          </p>
          <h4
            className="font-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-black"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {ruevii.name}
          </h4>
        </header>

        <ul className="flex flex-col gap-2 mb-6">
          {ruevii.included.map((it) => (
            <li
              key={it}
              className="flex items-start gap-2.5 text-[14px] leading-snug text-black/85"
            >
              <span
                aria-hidden
                className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0"
                style={{ background: "var(--color-blue-ink)" }}
              />
              {it}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 border-t border-[color-mix(in_srgb,var(--color-blue)_25%,white)] flex items-center justify-between">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {rueviiMonthly ? totalLabel : `You save / ${totalLabel}`}
          </span>
          <span
            className="font-serif text-[26px] leading-none tracking-[-0.01em] text-black tabular-nums"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {rueviiMonthly ?? savingsLabel}
          </span>
        </div>

        {rueviiMonthly && savings > 0 && (
          <p
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-blue-ink)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            You save {savingsLabel}/mo
          </p>
        )}
      </div>
    </div>
  );
}

export default ComparisonTable;

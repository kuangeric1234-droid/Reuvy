import type { ReactNode } from "react";

type ProductScreenshotProps = {
  url?: string;
  children: ReactNode;
  className?: string;
};

/**
 * ProductScreenshot
 * Frame wrapper for product-UI mockups. Renders an app-shell chrome:
 * traffic-light dots on the left, URL pill centered ("ruevii.app / {url}"),
 * then the children below in a bordered white panel with a subtle drop
 * shadow. Flat editorial — no heavy gradients.
 */
export function ProductScreenshot({
  url,
  children,
  className,
}: ProductScreenshotProps) {
  const displayUrl = url ? `ruevii.app / ${url.replace(/^\/+/, "")}` : "ruevii.app";

  return (
    <div
      className={[
        "w-full rounded-[12px] overflow-hidden",
        "bg-white",
        "border border-[var(--color-greige)]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        boxShadow: "0 30px 80px -40px rgba(20,20,18,0.18)",
      }}
    >
      {/* App-shell top bar */}
      <div
        className="relative flex items-center h-[38px] px-3 border-b border-[var(--color-greige)]"
        style={{
          background: "color-mix(in srgb, var(--color-paper) 65%, white)",
        }}
      >
        {/* Traffic lights */}
        <div aria-hidden className="flex items-center gap-[6px]">
          <span
            className="w-[10px] h-[10px] rounded-full"
            style={{ background: "var(--color-mute)" }}
          />
          <span
            className="w-[10px] h-[10px] rounded-full"
            style={{ background: "var(--color-mute)" }}
          />
          <span
            className="w-[10px] h-[10px] rounded-full"
            style={{ background: "var(--color-mute)" }}
          />
        </div>

        {/* URL pill — centered absolutely */}
        <div
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center max-w-[60%] truncate px-3 py-[4px] rounded-full"
          style={{
            background: "white",
            border: "1px solid var(--color-greige)",
          }}
        >
          <span
            className="font-mono text-[11px] leading-none text-[var(--color-charcoal)] truncate"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {displayUrl}
          </span>
        </div>
      </div>

      {/* Inner panel */}
      <div
        className="rounded-[8px] m-2 bg-white border border-[var(--color-greige-2)] overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}

export default ProductScreenshot;

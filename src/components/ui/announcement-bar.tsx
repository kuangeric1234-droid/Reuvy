"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type AnnouncementBarProps = {
  children: ReactNode;
  href?: string;
  linkLabel?: string;
};

/**
 * AnnouncementBar
 * Thin top bar above the nav. Scrolls with the page (not sticky).
 * Background: very light tint of dusty blue. Mono text, optional "Read more →" link on the right.
 */
export function AnnouncementBar({
  children,
  href,
  linkLabel = "Read more",
}: AnnouncementBarProps) {
  const pathname = usePathname();
  // The embedded Sanity Studio owns the full viewport — no marketing chrome.
  if (pathname?.startsWith("/studio")) return null;

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="w-full"
      style={{
        background: "color-mix(in srgb, var(--color-blue) 10%, white)",
        borderBottom: "1px solid color-mix(in srgb, var(--color-blue) 18%, white)",
      }}
    >
      <div className="wrap relative flex items-center justify-center min-h-[36px] py-[8px] gap-3">
        <p
          className="font-mono text-[12px] leading-[1.3] tracking-[0.02em] text-[var(--color-charcoal)] text-center"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {children}
        </p>
        {href && (
          <a
            href={href}
            className="hidden sm:inline-flex items-center gap-[5px] absolute right-[40px] top-1/2 -translate-y-1/2 font-mono text-[12px] tracking-[0.02em] text-black hover:opacity-60 transition-opacity"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {linkLabel}
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default AnnouncementBar;

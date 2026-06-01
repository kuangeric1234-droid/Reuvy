"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useCommandPalette } from "@/components/command-palette";

const LINKS = [
  { label: "Product", href: "#features", caret: true },
  { label: "Features", href: "#features" },
  { label: "Compliance", href: "#compliance" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const open = useCommandPalette((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-[border-color,background] duration-200",
        "backdrop-blur-[12px] backdrop-saturate-[140%]",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] border-b border-[var(--color-greige)]"
          : "bg-[color-mix(in_srgb,var(--color-paper)_80%,transparent)] border-b border-transparent",
      )}
    >
      <div className="wrap flex items-center gap-9 h-[68px]">
        <Link href="/" className="flex items-center gap-[9px] font-serif text-[25px] tracking-[-0.02em] text-black">
          <LogoMark />
          Ruevii
        </Link>

        <nav className="hidden lg:flex items-center gap-7 ml-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] text-[var(--color-charcoal)] hover:text-black transition-colors inline-flex items-center gap-[5px]"
            >
              {l.label}
              {l.caret && <span className="text-[9px] opacity-50">▾</span>}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:flex items-center gap-1.5">
          <a href="#" className="text-[15px] px-4 py-[13px] text-black hover:opacity-60 transition-opacity">
            Log in
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[13px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors active:translate-y-px"
          >
            Book a demo
          </a>
        </div>

        <button
          onClick={() => open()}
          aria-label="Open command bar"
          title="Open command bar (⌘K)"
          className="ml-auto lg:hidden inline-flex items-center gap-2 text-[13px] px-3 py-2 rounded-md border border-[var(--color-greige)] bg-white text-[var(--color-charcoal)]"
        >
          <span className="font-mono text-[10px]">⌘K</span>
        </button>

        <button
          onClick={() => setMobile((v) => !v)}
          className="lg:hidden inline-flex items-center text-[15px] font-medium leading-none px-4 py-[11px] rounded-md border border-[var(--color-greige)] bg-white text-black hover:border-[#cdcabf] transition-colors"
        >
          Menu
        </button>
      </div>

      {mobile && (
        <div className="lg:hidden border-t border-[var(--color-greige)] bg-[var(--color-paper)]">
          <div className="wrap py-5 flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobile(false)}
                className="py-3 text-[15px] text-black"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-4 mt-2 border-t border-[var(--color-greige)]">
              <a
                href="#"
                onClick={() => setMobile(false)}
                className="flex-1 text-center text-[14px] py-3 rounded-md border border-[var(--color-greige)] bg-white"
              >
                Log in
              </a>
              <a
                href="#pricing"
                onClick={() => setMobile(false)}
                className="flex-1 text-center text-[14px] py-3 rounded-md bg-black text-white"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="relative w-[22px] h-[22px] rounded-[5px] bg-black grid place-items-center"
    >
      <span className="w-2 h-2 rounded-full bg-[var(--color-paper)]" />
    </span>
  );
}

import Link from "next/link";

const COLS = [
  {
    title: "Product",
    links: [
      ["Clinical records", "#features"],
      ["Scheduling", "#features"],
      ["Payments & POS", "#features"],
      ["Inventory", "#features"],
      ["Ruevii AI", "#ai"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Injectable clinics", "#"],
      ["Cosmetic & skin", "#"],
      ["Multi-site groups", "#"],
      ["Nurses & injectors", "#"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#"],
      ["AHPRA compliance", "#compliance"],
      ["Pricing", "#pricing"],
      ["Contact", "#"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "#"],
      ["Terms", "#"],
      ["Security", "#"],
      ["Data residency", "#"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-soft)] pt-20 pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1.6fr_repeat(4,1fr)] gap-10 pb-14 border-b border-[#2c2c29]">
          <div>
            <Link href="/" className="flex items-center gap-[9px] font-serif text-[25px] tracking-[-0.02em] text-[#fafaf8] mb-[18px]">
              <span aria-hidden className="relative w-[22px] h-[22px] rounded-[5px] bg-[#fafaf8] grid place-items-center">
                <span className="w-2 h-2 rounded-full bg-[var(--color-ink)]" />
              </span>
              Ruevii
            </Link>
            <p className="text-[14px] max-w-[30ch] leading-[1.55]">
              The operating system for modern aesthetics clinics. Clinical, compliant, and beautiful.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h6 className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#6f6c64] font-medium mb-4">
                {c.title}
              </h6>
              {c.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block text-[14px] py-[6px] text-[var(--color-soft)] hover:text-[#fafaf8] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 pt-7 text-[13px]">
          <span>© {new Date().getFullYear()} Ruevii Pty Ltd · ABN 00 000 000 000</span>
          <span className="font-mono text-[12px] flex items-center gap-[9px]">
            <span aria-hidden className="w-[22px] h-[14px] rounded-[2px] bg-[var(--color-blue)]" />
            Designed &amp; hosted in Australia
          </span>
          <span className="flex gap-[22px]">
            <a href="#" className="hover:text-[#fafaf8] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#fafaf8] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#fafaf8] transition-colors">Status</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

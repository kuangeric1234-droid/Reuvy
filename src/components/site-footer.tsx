import Image from "next/image";
import Link from "next/link";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Clinical records", "/features/clients-emr"],
      ["Scheduling", "/features/calendar"],
      ["Payments & POS", "/features/payments-pos"],
      ["Inventory", "/features/inventory"],
      ["Ruevii AI", "/features/ruevii-ai"],
      ["All features", "/#features"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Cosmetic & injectable", "/who-we-serve/cosmetic-injectables"],
      ["Skin & laser", "/who-we-serve/skin-and-laser"],
      ["Solo injectors", "/who-we-serve/solo-injector"],
      ["Single-location clinics", "/who-we-serve/single-clinic"],
      ["Multi-location groups", "/who-we-serve/multi-location"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["AHPRA compliance", "/compliance"],
      ["Compare Ruevii", "/compare"],
      ["Switch from Pabau", "/switch-from-pabau"],
      ["Pricing", "/pricing"],
      ["Book a demo", "/demo"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/resources/blog"],
      ["Help centre", "/resources/help"],
      ["Developers", "/developers"],
      ["Roadmap", "/roadmap"],
      ["Status", "/status"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Security", "/security"],
      ["Data residency", "/security#data-residency"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-soft)] pt-20 pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1.4fr_repeat(5,1fr)] gap-10 pb-14 border-b border-[#2c2c29]">
          <div>
            <Link
              href="/"
              aria-label="Ruevii — home"
              className="flex items-center mb-[18px]"
            >
              <Image
                src="/ruevii-logo-white.png"
                alt="Ruevii"
                width={92}
                height={29}
                className="h-[28px] w-auto"
              />
            </Link>
            <p className="text-[14px] max-w-[30ch] leading-[1.55]">
              The operating system for modern Australian aesthetics clinics.
              Clinical, compliant and quietly beautiful.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h6 className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#6f6c64] font-medium mb-4">
                {c.title}
              </h6>
              {c.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-[14px] py-[6px] text-[var(--color-soft)] hover:text-[#fafaf8] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 pt-7 text-[13px]">
          <span>© {new Date().getFullYear()} Ruevii Pty Ltd · ABN 00 000 000 000</span>
          <span className="font-mono text-[12px] flex items-center gap-[9px]">
            <span
              aria-hidden
              className="w-[22px] h-[14px] rounded-[2px] bg-[var(--color-blue)]"
            />
            Designed &amp; hosted in Australia
          </span>
          <span className="flex gap-[22px]">
            <Link href="/privacy" className="hover:text-[#fafaf8] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#fafaf8] transition-colors">
              Terms
            </Link>
            <Link href="/status" className="hover:text-[#fafaf8] transition-colors">
              Status
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

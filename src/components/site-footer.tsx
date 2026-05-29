import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { FEATURE_CATEGORIES, FEATURE_BY_SLUG, PRACTICES } from "@/lib/site-data";

export function SiteFooter() {
  const productSlugs = [
    "calendar",
    "online-booking",
    "emr",
    "payments",
    "scribe",
    "campaigns",
    "before-after",
    "reporting",
    "inventory",
    "mobile-app",
  ];

  const specialtySlugs = [
    "med-spa",
    "aesthetics-clinic",
    "dermatology",
    "physio",
    "wellness",
    "hair-clinic",
    "iv-therapy",
    "cosmetic-surgery",
    "mental-health",
    "enterprise",
    "solo",
  ];

  return (
    <footer className="bg-[var(--color-ink)] text-white">
      <div className="container-x py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-[var(--color-reuvy-400)] text-[var(--color-ink)] font-serif text-lg">
                R
              </span>
              <span className="font-serif text-2xl tracking-tight">Reuvy</span>
            </Link>
            <p className="mt-6 text-white/70 max-w-sm leading-relaxed">
              The quietly powerful system behind 3,500+ practices delivering modern,
              considered care.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid place-items-center h-10 w-10 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterCol title="Product">
              {productSlugs.map((slug) => {
                const f = FEATURE_BY_SLUG[slug];
                if (!f) return null;
                return (
                  <FooterLink key={slug} href={`/features/${slug}`}>
                    {f.name}
                  </FooterLink>
                );
              })}
              <FooterLink href="/features">All features</FooterLink>
            </FooterCol>

            <FooterCol title="Specialties">
              {specialtySlugs.map((slug) => {
                const p = PRACTICES.find((x) => x.slug === slug);
                if (!p) return null;
                return (
                  <FooterLink key={slug} href={`/who-we-re-for/${slug}`}>
                    {p.name}
                  </FooterLink>
                );
              })}
              <FooterLink href="/who-we-re-for">All specialties</FooterLink>
            </FooterCol>

            <FooterCol title="Discover">
              <FooterLink href="/why-us/success-stories">Success stories</FooterLink>
              <FooterLink href="/resources/blog">Blog</FooterLink>
              <FooterLink href="/resources">Guides & templates</FooterLink>
              <FooterLink href="/resources/help">Help center</FooterLink>
              <FooterLink href="/why-us/onboarding">Migration</FooterLink>
              <FooterLink href="/resources/changelog">Changelog</FooterLink>
            </FooterCol>

            <FooterCol title="Company">
              <FooterLink href="/why-us/about">About</FooterLink>
              <FooterLink href="/why-us/careers">Careers</FooterLink>
              <FooterLink href="/why-us/security">Security</FooterLink>
              <FooterLink href="/why-us/hipaa">HIPAA</FooterLink>
              <FooterLink href="/why-us/gdpr">GDPR</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/demo">Book a demo</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Reuvy. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/why-us/gdpr" className="hover:text-white">GDPR</Link>
            <Link href="/why-us/hipaa" className="hover:text-white">HIPAA</Link>
            <Link href="/why-us/terms" className="hover:text-white">Terms</Link>
            <Link href="/why-us/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/why-us/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-sans text-xs uppercase tracking-[0.18em] text-white/55">{title}</h4>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-white/80 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}

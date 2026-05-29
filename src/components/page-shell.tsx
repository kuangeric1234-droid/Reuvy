import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white">
      <SiteNav />
      {children}
      <SiteFooter />
    </main>
  );
}

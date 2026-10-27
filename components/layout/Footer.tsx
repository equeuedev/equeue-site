import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/layout/Header";
import { FOOTER_LINKS, NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark bg-charcoal text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Wordmark light />
          <p className="mt-4 max-w-xs text-white/80">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer: explore">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-lime">Explore</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/85 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer: company">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-lime">Company</h2>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/85 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-white/70">
          © 2026 E-Queue. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}

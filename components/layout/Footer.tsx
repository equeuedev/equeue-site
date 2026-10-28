import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { FooterTicker } from "@/components/layout/FooterTicker";
import { NAV_LINKS, SITE } from "@/lib/site";

const COMPANY_LINKS = [
  { label: "For clinics", href: "/for-clinics" },
  { label: "Why E-Queue", href: "/why-e-queue" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-9 items-center text-white/80 transition-colors hover:text-lime"
    >
      <span
        className="h-px w-0 bg-lime transition-all duration-300 group-hover:mr-2 group-hover:w-3"
        aria-hidden="true"
      />
      {children}
    </Link>
  );
}

/**
 * Footer: a rounded charcoal panel that rises over the page.
 * Tagline with the lime marker, a mini waiting-room display that ticks through tokens,
 * link columns, and an oversized outlined wordmark that fills with colour on hover.
 */
export function Footer() {
  return (
    <footer className="on-dark relative mt-8 overflow-hidden rounded-t-[2.5rem] bg-charcoal text-white sm:rounded-t-[3.5rem]">
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="animate-drift absolute -left-32 top-0 h-96 w-96 rounded-full bg-aubergine/50 blur-3xl" />
        <span className="animate-drift absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-lime/10 blur-3xl [animation-delay:-8s]" />
      </div>

      <Container className="relative pt-16 sm:pt-20">
        {/* Top: tagline and the mini display */}
        <div className="grid items-center gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_24rem]">
          <Reveal variant="left">
            <p className="text-sm font-semibold uppercase tracking-wider text-lime">E-Queue</p>
            <p className="mt-4 max-w-xl font-hero text-2xl uppercase leading-[1.5] tracking-wide sm:text-3xl">
              Less waiting.{" "}
              <span className="marker rounded-lg px-2 text-plum [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                More productive time.
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 font-bold text-plum transition hover:brightness-95"
              >
                Contact us
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 font-medium text-white/85 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
              >
                <Icon name="mail" className="h-4 w-4" />
                {SITE.email}
              </a>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <FooterTicker />
            <p className="mt-3 text-center text-xs text-white/60">
              Example display. Tokens and counters only, never names.
            </p>
          </Reveal>
        </div>

        {/* Links */}
        <div className="grid gap-10 pb-6 pt-12 sm:grid-cols-3">
          <nav aria-label="Footer: explore">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Explore
            </h2>
            <ul className="mt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer: company">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Company
            </h2>
            <ul className="mt-4 space-y-1">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Pilot
            </h2>
            <p className="mt-4 max-w-xs text-white/80">
              Working with a small group of pilot clinics in Lahore.
            </p>
            <Link
              href="/pilot"
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15"
            >
              <span
                className="animate-pulse-soft h-2 w-2 rounded-full bg-lime"
                aria-hidden="true"
              />
              About the pilot
            </Link>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark: outlined, fills with colour on hover */}
      <div aria-hidden="true" className="group relative select-none overflow-hidden">
        <p className="-mb-[0.18em] text-center font-display text-[22vw] font-extrabold leading-none tracking-tighter text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_rgb(255_255_255/0.2)] group-hover:text-white/5 lg:text-[16rem]">
          e-queue<span className="text-lime/80 [-webkit-text-stroke:0]">.</span>
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-charcoal">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-sm text-white/70 sm:flex-row">
          <p>© 2026 E-Queue. Made in Lahore.</p>
          <ul className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#main"
                className="group inline-flex min-h-11 items-center gap-2 hover:text-white"
              >
                Back to top
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition group-hover:-translate-y-0.5 group-hover:bg-lime group-hover:text-plum">
                  <Icon name="arrowRight" className="h-4 w-4 -rotate-90" />
                </span>
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}

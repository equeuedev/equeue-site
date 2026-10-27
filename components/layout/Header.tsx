import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/lib/site";

/** Text wordmark until the logo files are supplied. */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`font-display text-2xl font-extrabold tracking-tight ${
        light ? "text-white" : "text-aubergine"
      }`}
    >
      e-queue<span className="text-lime">.</span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-soft-grey bg-ivory/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="E-Queue home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-plum hover:text-aubergine"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" className="hidden sm:inline-flex">
            Contact us
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

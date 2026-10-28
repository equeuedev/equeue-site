import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks";

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
    <header className="sticky top-0 z-50 border-b border-soft-grey/80 bg-ivory/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" aria-label="E-Queue home" className="shrink-0 rounded-lg">
          <Wordmark />
        </Link>

        <NavLinks />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wrapper owns visibility: Button's own inline-flex would override `hidden` */}
          <span className="hidden sm:block">
            <Button href="/contact" className="gap-2 whitespace-nowrap">
              Contact us
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </span>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

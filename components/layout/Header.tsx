import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
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

/**
 * Floating, rounded navbar: a Dark Plum pill that stays at the top while the page scrolls under it.
 * Active link is a lime pill with Dark Plum text (never white on lime).
 * Below 1024px the links move to the floating bottom dock (BottomDock).
 */
export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="on-dark pointer-events-auto mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 rounded-full bg-plum/95 pl-5 pr-2 shadow-xl shadow-plum/25 ring-1 ring-white/10 backdrop-blur-md sm:pl-6">
        <Link href="/" aria-label="E-Queue home" className="shrink-0 rounded-full">
          <Wordmark light />
        </Link>

        <NavLinks />

        <Link
          href="/contact"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-lime px-5 text-sm font-bold text-plum transition hover:brightness-95 sm:px-6 sm:text-base"
        >
          Contact us
          <Icon name="arrowRight" className="hidden h-4 w-4 sm:block" />
        </Link>
      </div>
    </header>
  );
}

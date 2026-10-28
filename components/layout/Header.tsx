import Link from "next/link";
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
 * Floating, rounded navbar for desktop (1024px and up): a frosted Dark Plum (#292332) pill
 * that blurs the page as it scrolls underneath. Text links only, no icons.
 * Active link: soft lime tint with lime text, so it never looks like the solid lime Contact us button.
 * Phones and tablets have no top bar; they use the floating bottom dock (BottomDock) instead.
 */
export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 hidden px-4 pt-4 lg:block">
      <div className="on-dark pointer-events-auto mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 rounded-full bg-plum/90 pl-7 pr-2 shadow-xl shadow-plum/20 ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150">
        <Link href="/" aria-label="E-Queue home" className="shrink-0 rounded-full">
          <Wordmark light />
        </Link>

        <NavLinks />

        <Link
          href="/contact"
          className="inline-flex min-h-12 shrink-0 items-center whitespace-nowrap rounded-full bg-lime px-6 text-sm font-bold text-plum transition hover:brightness-95"
        >
          Contact us
        </Link>
      </div>
    </header>
  );
}

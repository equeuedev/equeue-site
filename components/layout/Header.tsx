import Link from "next/link";
import { NavLinks } from "@/components/layout/NavLinks";
import { NavGlow } from "@/components/layout/NavGlow";

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
 * Floating, rounded navbar for desktop (1024px and up): a frosted-glass Dark Plum (#292332) pill
 * with a heavy blur and a soft aurora glow. Text links only, no icons.
 * Active link: soft lime tint with lime text, so it never looks like the solid lime Contact us button.
 * Phones and tablets use the floating MobileDock at the top instead.
 */
export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 hidden px-4 pt-4 lg:block">
      <div className="glass-nav on-dark pointer-events-auto relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 rounded-full pl-7 pr-2">
        <NavGlow />
        <Link href="/" aria-label="E-Queue home" className="relative shrink-0 rounded-full">
          <Wordmark light />
        </Link>

        <NavLinks />

        <Link
          href="/contact"
          className="relative inline-flex min-h-12 shrink-0 items-center whitespace-nowrap rounded-full bg-lime px-6 text-sm font-bold text-plum transition hover:brightness-95"
        >
          Contact us
        </Link>
      </div>
    </header>
  );
}

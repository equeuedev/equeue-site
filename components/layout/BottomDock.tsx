"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { isActivePath } from "@/components/layout/NavLinks";
import { DOCK_LINKS } from "@/lib/site";

/**
 * Floating bottom dock for phones and tablets (below 1024px), in the style of the app tab bar:
 * Dark Plum pill, active item grows into a lime pill with its label, others show the icon only
 * (label kept for screen readers). The last slot opens the full menu drawer.
 */
export function BottomDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick links"
      className="on-dark fixed inset-x-3 bottom-3 z-40 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex h-16 max-w-md items-center gap-1 rounded-full bg-plum/95 p-1.5 shadow-2xl shadow-plum/40 ring-1 ring-white/10 backdrop-blur-md">
        {DOCK_LINKS.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li
              key={link.href}
              className={`h-full transition-[flex-grow] duration-300 ease-out ${active ? "grow-[2.4]" : "grow"}`}
              style={{ flexBasis: 0 }}
            >
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full items-center justify-center gap-2 rounded-full transition-colors ${
                  active ? "bg-lime text-plum" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.icon && <Icon name={link.icon} className="h-5 w-5 shrink-0" />}
                <span
                  className={
                    active ? "animate-fade-in whitespace-nowrap text-sm font-bold" : "sr-only"
                  }
                >
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
        <li className="h-full grow" style={{ flexBasis: 0 }}>
          <MobileMenu />
        </li>
      </ul>
    </nav>
  );
}

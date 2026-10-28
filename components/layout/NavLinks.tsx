"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_LINK, NAV_LINKS } from "@/lib/site";

/** True when `href` is the current page or one of its children (e.g. /industries/clinics). */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const LINKS = [HOME_LINK, ...NAV_LINKS];

/**
 * Desktop text links inside the floating navbar (no icons).
 * Active: lime tint with lime text and a hairline ring (12:1 contrast on Dark Plum), clearly
 * lighter than the solid lime Contact us button. Others: white text with a soft hover.
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-1">
        {LINKS.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-sm transition-colors duration-200 ${
                  active
                    ? "bg-lime/10 font-semibold text-lime ring-1 ring-inset ring-lime/35"
                    : "font-medium text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

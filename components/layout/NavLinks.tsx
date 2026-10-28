"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { HOME_LINK, NAV_LINKS } from "@/lib/site";

/** True when `href` is the current page or one of its children (e.g. /industries/clinics). */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const LINKS = [HOME_LINK, ...NAV_LINKS];

/**
 * Desktop links inside the floating navbar.
 * Active: lime pill with icon and label. Others: icon and label in white
 * (icon only from 1024px to 1279px, with the label kept for screen readers and as a tooltip).
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {LINKS.map((link) => {
          const active = isActivePath(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                title={link.label}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-12 items-center gap-2 rounded-full text-sm transition-all duration-300 ${
                  active
                    ? "bg-lime px-5 font-bold text-plum"
                    : "px-3.5 font-medium text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.icon && <Icon name={link.icon} className="h-5 w-5 shrink-0" />}
                <span className={active ? "" : "sr-only xl:not-sr-only"}>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

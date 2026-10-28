"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { isActivePath } from "@/components/layout/NavLinks";
import { DRAWER_LINKS, NAV_LINKS, SITE } from "@/lib/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menu button (last slot of the bottom dock) + slide-in drawer for screens below 1024px.
 * Rendered in a portal so the header's backdrop blur cannot clip it.
 * Dialog semantics, focus trap, Escape to close, scroll lock, focus returns to the trigger.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    // Lock page scroll behind the drawer without layout shift
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows to the desktop layout
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <div className="h-full">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex h-full w-full items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Icon name="menu" className="h-5 w-5" />
        <span className="sr-only">Menu</span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[70] lg:hidden">
            {/* Backdrop: click to close */}
            <div
              aria-hidden="true"
              onClick={close}
              className="animate-fade-in absolute inset-0 bg-plum/50 backdrop-blur-[2px]"
            />

            <div
              ref={panelRef}
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="animate-drawer-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory shadow-2xl"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-soft-grey px-4">
                <Link href="/" onClick={() => setOpen(false)} aria-label="E-Queue home">
                  <span className="font-display text-2xl font-extrabold tracking-tight text-aubergine">
                    e-queue<span className="text-lime">.</span>
                  </span>
                </Link>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft-grey bg-white text-plum hover:border-aubergine"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-5">
                <ul className="space-y-1.5">
                  {NAV_LINKS.map((link) => {
                    const active = isActivePath(pathname, link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-2.5 transition-colors ${
                            active
                              ? "border-aubergine bg-white shadow-sm"
                              : "border-transparent hover:border-soft-grey hover:bg-white"
                          }`}
                        >
                          <span
                            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              active ? "bg-aubergine text-white" : "bg-white text-aubergine"
                            }`}
                          >
                            {link.icon && <Icon name={link.icon} className="h-5 w-5" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-display text-base font-bold text-plum">
                              {link.label}
                              {active && <span className="sr-only"> (current page)</span>}
                            </span>
                            {link.description && (
                              <span className="block truncate text-sm text-grey-purple">
                                {link.description}
                              </span>
                            )}
                          </span>
                          <Icon
                            name="chevronRight"
                            className="h-5 w-5 shrink-0 text-grey-purple transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-grey-purple">
                  More
                </p>
                <ul className="mt-2 flex flex-wrap gap-2 px-1">
                  {DRAWER_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                        className="inline-flex min-h-11 items-center rounded-full border border-soft-grey bg-white px-4 text-sm font-medium text-plum hover:border-aubergine aria-[current=page]:border-aubergine aria-[current=page]:font-semibold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 border-t border-soft-grey bg-white p-4">
                <p className="text-sm text-grey-purple">
                  Setting up a clinic? Our team creates your account and trains your staff.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-aubergine px-6 text-base font-semibold text-white hover:bg-aubergine-dark"
                >
                  Contact us
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-aubergine underline underline-offset-4"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

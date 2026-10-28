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
              className="animate-fade-in absolute inset-0 bg-plum/40 backdrop-blur-md"
            />

            <div
              ref={panelRef}
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="on-dark animate-drawer-in absolute inset-y-2 right-2 flex w-[calc(100%-1rem)] max-w-sm flex-col overflow-hidden rounded-[2rem] bg-plum/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl"
            >
              {/* Aurora glow */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="animate-drift absolute -right-24 -top-24 h-72 w-72 rounded-full bg-aubergine blur-3xl" />
                <span className="animate-drift absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-lime/15 blur-3xl [animation-delay:-6s]" />
              </div>

              <div className="relative flex h-16 shrink-0 items-center justify-between px-5 pt-2">
                <Link href="/" onClick={() => setOpen(false)} aria-label="E-Queue home">
                  <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                    e-queue<span className="text-lime">.</span>
                  </span>
                </Link>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:rotate-90 hover:bg-white/20"
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

              <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-3 pb-4 pt-4">
                <ul>
                  {NAV_LINKS.map((link, index) => {
                    const active = isActivePath(pathname, link.href);
                    return (
                      <li
                        key={link.href}
                        className="animate-item-in"
                        style={{ animationDelay: `${120 + index * 60}ms` }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex min-h-16 items-center gap-4 rounded-2xl px-3 py-2 transition-colors ${
                            active
                              ? "bg-lime/10 ring-1 ring-inset ring-lime/30"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <span
                            className={`w-7 font-sans text-xs font-semibold tabular-nums ${
                              active ? "text-lime" : "text-white/50"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block font-display text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                                active ? "text-lime" : "text-white"
                              }`}
                            >
                              {link.label}
                              {active && <span className="sr-only"> (current page)</span>}
                            </span>
                            {link.description && (
                              <span className="block truncate text-sm text-white/65">
                                {link.description}
                              </span>
                            )}
                          </span>
                          <Icon
                            name="arrowRight"
                            className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                              active
                                ? "text-lime"
                                : "-translate-x-2 text-white/40 group-hover:translate-x-0 group-hover:text-white"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <ul
                  className="animate-item-in mt-5 flex flex-wrap gap-2 px-3"
                  style={{ animationDelay: `${120 + NAV_LINKS.length * 60}ms` }}
                >
                  {DRAWER_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                        className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/15 aria-[current=page]:text-lime aria-[current=page]:ring-lime/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className="animate-item-in relative shrink-0 p-4"
                style={{ animationDelay: `${180 + NAV_LINKS.length * 60}ms` }}
              >
                {/* Decorative ticket: the waiting-room display, tokens only */}
                <div
                  aria-hidden="true"
                  className="mb-3 flex items-center justify-between rounded-2xl bg-charcoal/80 px-4 py-3 ring-1 ring-white/10"
                >
                  <span>
                    <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Now serving
                    </span>
                    <span className="block font-sans text-2xl font-bold leading-tight tabular-nums text-lime">
                      A-042
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
                    <span className="animate-pulse-soft h-2 w-2 rounded-full bg-lime" />
                    Counter 02
                  </span>
                </div>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-base font-bold text-plum transition hover:brightness-95"
                >
                  Contact us
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
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

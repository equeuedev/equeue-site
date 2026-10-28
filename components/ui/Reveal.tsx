"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/** Fades and lifts its content in once it scrolls into view. Honours reduced motion (see globals.css). */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

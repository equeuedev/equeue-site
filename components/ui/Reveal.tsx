"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/** Fades and lifts its content in once it scrolls into view. Honours reduced motion (see globals.css). */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /** How it enters: lift (default), grow, slide from a side, or come into focus. */
  variant?: "up" | "scale" | "left" | "right" | "blur";
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  const variantClass = variant === "up" ? "" : `reveal-${variant}`;
  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

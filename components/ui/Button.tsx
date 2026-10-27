import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "lime" | "outline" | "outline-light";

const VARIANTS: Record<Variant, string> = {
  // White on aubergine
  primary: "bg-aubergine text-white hover:bg-aubergine-dark",
  // Dark plum on lime (never white on lime)
  lime: "bg-lime text-plum hover:brightness-95",
  outline:
    "border-2 border-aubergine text-aubergine hover:bg-aubergine hover:text-white",
  "outline-light":
    "border-2 border-white text-white hover:bg-white hover:text-aubergine",
};

type ButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

/** Link styled as a button. 44px minimum target height. */
export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}

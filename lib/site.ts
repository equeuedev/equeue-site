// Central place for site-wide constants. Edit here, not in components.

export const SITE = {
  name: "E-Queue",
  tagline: "Less waiting. More productive time.",
  // TODO: set NEXT_PUBLIC_SITE_URL in Vercel once you have the real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with the real contact details.
  email: "hello@example.com",
};

export type NavLink = { label: string; href: string };

// For now these point at sections on the Home page. When you build the
// dedicated pages (For Clinics, Industries, ...), swap the hrefs to
// "/for-clinics", "/industries", etc. Nothing else needs to change.
export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Industries", href: "/industries" },
  { label: "Appointments", href: "/appointments" },
  { label: "Pilot", href: "/pilot" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "For clinics", href: "/for-clinics" },
  { label: "Why E-Queue", href: "/why-e-queue" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

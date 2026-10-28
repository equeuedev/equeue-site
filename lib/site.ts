// Central place for site-wide constants. Edit here, not in components.

export const SITE = {
  name: "E-Queue",
  tagline: "Less waiting. More productive time.",
  // TODO: set NEXT_PUBLIC_SITE_URL on the Render static site once you have the real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with the real contact details.
  email: "hello@example.com",
};

export type NavLink = {
  label: string;
  href: string;
  /** Icon name from components/ui/Icon (used in the mobile drawer). */
  icon?: "home" | "list" | "grid" | "building" | "flag" | "help";
  /** One short line shown under the label in the mobile drawer. */
  description?: string;
};

// Main navigation (header, mobile drawer and footer "Explore").
// Appointments is intentionally not linked: PRD V1 §3 lists appointments as Out of scope.
export const NAV_LINKS: NavLink[] = [
  {
    label: "How it works",
    href: "/how-it-works",
    icon: "list",
    description: "From joining to being called",
  },
  {
    label: "Features",
    href: "/features",
    icon: "grid",
    description: "Live queue, display and token slips",
  },
  {
    label: "Industries",
    href: "/industries",
    icon: "building",
    description: "Clinics, dermatologists and more",
  },
  {
    label: "Pilot program",
    href: "/pilot",
    icon: "flag",
    description: "Be one of our first clinics in Lahore",
  },
  { label: "FAQ", href: "/faq", icon: "help", description: "Short answers to common questions" },
];

export const HOME_LINK: NavLink = { label: "Home", href: "/", icon: "home" };

/** Floating bottom dock on phones and tablets. The last slot is the Menu button. */
export const DOCK_LINKS: NavLink[] = [
  HOME_LINK,
  { label: "How it works", href: "/how-it-works", icon: "list" },
  { label: "Features", href: "/features", icon: "grid" },
  { label: "Pilot", href: "/pilot", icon: "flag" },
];

/** Secondary links shown in the mobile drawer under the main links. */
export const DRAWER_LINKS: NavLink[] = [
  { label: "For clinics", href: "/for-clinics" },
  { label: "Why E-Queue", href: "/why-e-queue" },
  { label: "About", href: "/about" },
];

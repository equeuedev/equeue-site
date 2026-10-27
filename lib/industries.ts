export type Industry = {
  slug: string;
  name: string;
  headline: string;
  oneLiner: string;
  highlights: [string, string, string];
  mockup: { service: string; counter: string; token: string };
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "clinics",
    name: "Clinics",
    headline: "E-Queue for Clinics",
    oneLiner: "Fewer crowded waiting rooms.",
    highlights: [
      "Doctor choice with a wait time per doctor",
      "Printed slips for patients without the app",
      "One fair line for walk-ins, calls and app patients",
    ],
    mockup: { service: "Ultrasound", counter: "Counter 02", token: "A-023" },
  },
  {
    slug: "dermatologists",
    name: "Dermatologists",
    headline: "E-Queue for Dermatologists",
    oneLiner: "A calmer practice, patient by patient.",
    highlights: [
      "Services mapped to your doctors",
      "A priority option for urgent cases",
      "Ratings from patients for the practice",
    ],
    mockup: { service: "Skin consultation", counter: "Room 1", token: "A-023" },
  },
  {
    slug: "salons",
    name: "Salons",
    headline: "E-Queue for Salons",
    oneLiner: "Let customers wait at a cafe, not at the door.",
    highlights: [
      "Service counters for each chair or station",
      "Walk-ins and bookings in one line",
      "Hours and breaks the system respects",
    ],
    mockup: { service: "Haircut", counter: "Chair 2", token: "A-023" },
  },
  {
    slug: "other",
    name: "Any service business",
    headline: "E-Queue for Any Service Business",
    oneLiner: "If there's a line, we can manage it.",
    highlights: [
      "Starter templates and your own services, counters and staff",
      "A public display and printed slips",
      "Analytics for owners",
    ],
    mockup: { service: "Service", counter: "Counter 01", token: "A-023" },
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

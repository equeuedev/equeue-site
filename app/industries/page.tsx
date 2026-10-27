import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { IndustrySwitcher } from "@/components/industries/IndustrySwitcher";
import { INDUSTRIES } from "@/lib/industries";
export const metadata: Metadata = {
  title: "Industries",
  description:
    "One queue system for clinics, dermatologists, salons and any business where people wait.",
};
export default function IndustriesPage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="font-hero text-4xl uppercase tracking-wide">
        One system. Every business where people wait.
      </h1>
      <p className="mt-4 text-lg text-grey-purple">Pick a template, set your services and go.</p>
      <div className="mt-10">
        <IndustrySwitcher />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {INDUSTRIES.map((industry) => (
          <Link
            className="font-semibold text-aubergine underline"
            href={`/industries/${industry.slug}`}
            key={industry.slug}
          >
            {industry.name}
          </Link>
        ))}
      </div>
    </Container>
  );
}

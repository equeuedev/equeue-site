import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
export function generateStaticParams() {
  return INDUSTRIES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  return industry
    ? {
        title: industry.name,
        description: `${industry.oneLiner} A digital queue and appointment system for ${industry.name.toLowerCase()} in Pakistan.`,
      }
    : {};
}
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="font-hero text-4xl uppercase tracking-wide">{industry.headline}</h1>
      <p className="mt-4 text-lg text-grey-purple">{industry.oneLiner}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {industry.highlights.map((item) => (
          <li className="rounded-2xl bg-white p-6 shadow-sm" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="mt-10 flex justify-between rounded-xl bg-charcoal p-6 text-white"
      >
        <span>{industry.mockup.service}</span>
        <strong>{industry.mockup.token}</strong>
        <span>{industry.mockup.counter}</span>
      </div>
      <div className="mt-10">
        <Button href="/contact">Contact us</Button>
      </div>
    </Container>
  );
}

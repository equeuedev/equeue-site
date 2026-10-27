import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FAQS } from "@/lib/faq";
export const metadata: Metadata = { title: "FAQ", description: "Answers about E-Queue queue management for clinics and service businesses." };
export default function Page() { const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }; return <Container className="py-16 sm:py-24"><h1 className="font-hero text-4xl uppercase tracking-wide">Frequently asked questions.</h1><div className="mt-10"><FaqAccordion /></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></Container>; }

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact us", description: "Tell us about your business and we'll get back to you within 1 working day." };

export default function ContactPage() {
  return <Container className="max-w-3xl py-16 sm:py-24"><h1 className="font-hero text-4xl uppercase tracking-wide text-plum">Let&apos;s cut your waiting time.</h1><p className="mt-4 text-lg text-grey-purple">Tell us about your business and we&apos;ll get back to you within 1 working day.</p><div className="mt-10"><ContactForm /></div></Container>;
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How E-Queue handles contact enquiries, queue information and privacy-first public displays.",
};

const SECTIONS = [
  ["What we collect", "When you contact E-Queue, we collect the business and contact details you choose to send through the enquiry form. We do not collect queue data through this marketing site."],
  ["Why we use it", "We use enquiry details to respond to your request, discuss the pilot and provide information about E-Queue. We do not sell personal information."],
  ["What appears publicly", "E-Queue public displays are designed to show token numbers and counters only. They should not show names or phone numbers."],
  ["Analytics", "If the site owner enables Plausible, the site may collect privacy-friendly, cookie-less page and interaction statistics. Plausible is not loaded when its domain is not configured."],
  ["Contact form providers", "Enquiries may be sent through Resend for delivery. Turnstile may be used to protect the form from abuse. These services receive only the information needed for those purposes."],
  ["Your choices", "You can ask what information we hold about your enquiry or ask us to correct or delete it by contacting us. This page is general website information and should be reviewed for the final operating policy before launch."],
] as const;

export default function PrivacyPage() {
  return (
    <Container className="max-w-4xl py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-aubergine">Privacy</p>
      <h1 className="mt-3 font-hero text-4xl uppercase tracking-wide text-plum">Privacy built into the experience.</h1>
      <p className="mt-5 max-w-2xl text-lg text-grey-purple">
        This marketing site is designed to explain E-Queue without exposing patient information. It does not provide patient accounts or store queue submissions.
      </p>
      <div className="mt-10 space-y-3">
        {SECTIONS.map(([title, body]) => (
          <details key={title} className="group rounded-2xl border border-soft-grey bg-white p-5">
            <summary className="cursor-pointer list-none pr-6 font-display text-xl font-bold text-plum marker:hidden">
              <span className="flex items-center justify-between gap-4">{title}<span aria-hidden="true" className="text-aubergine group-open:rotate-45">+</span></span>
            </summary>
            <p className="mt-4 max-w-3xl text-grey-purple">{body}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 rounded-2xl bg-ivory p-6">
        <p className="text-sm text-grey-purple">Questions about an enquiry or this website?</p>
        <div className="mt-4"><Button href="/contact">Contact us</Button></div>
      </div>
    </Container>
  );
}

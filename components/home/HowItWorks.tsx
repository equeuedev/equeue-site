import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JourneyDemo } from "@/components/home/JourneyDemo";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How it works" title="Three steps from the sofa to the doctor" />
        <JourneyDemo />
      </Container>
    </section>
  );
}

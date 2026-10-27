import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IndustrySwitcher } from "@/components/industries/IndustrySwitcher";

export function IndustriesStrip() {
  return (
    <section id="industries" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="One system. Every business where people wait."
          intro="Pick a template, set your services and go."
        />
        <div className="mt-12"><IndustrySwitcher /></div>
        <div className="mt-10">
          {/* Swap to "/industries" when that page exists */}
          <Button href="/contact" variant="outline">
            Talk to us about your business
          </Button>
        </div>
      </Container>
    </section>
  );
}

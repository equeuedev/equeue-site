import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/** Full-width aubergine band. White text, lime button with dark plum text. */
export function FinalCta() {
  return (
    <section id="pilot" className="on-dark scroll-mt-20 bg-aubergine py-16 sm:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl font-hero text-3xl uppercase tracking-wide text-white sm:text-4xl">
          Be one of our first clinics
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
          We&apos;re setting up a small number of pilot partners in Lahore, with
          on-site installation and staff training. Our goal is to take you from
          contract to live in 7 days.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="lime">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { Button } from "@/components/ui/Button";
import { IPhone } from "@/components/ui/IPhone";
import { TokenScreen } from "@/components/phone/PhoneScreens";
import { DEMO_STEPS } from "@/lib/queue-demo";

/** Aubergine panel. White text, lime button with dark plum text, tilted phone on wide screens. */
export function FinalCta() {
  return (
    <section id="pilot" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="on-dark relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-aubergine px-6 py-14 sm:rounded-[2.5rem] sm:px-12 md:grid-cols-[1fr_20rem] md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-lime/10"
          />
          <div className="relative">
            <h2 className="max-w-xl font-hero text-2xl uppercase leading-[1.5] tracking-wide text-white sm:text-3xl lg:text-4xl">
              Be one of our <Highlight>first clinics</Highlight>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              We&apos;re setting up a small number of pilot partners in Lahore, with on-site
              installation and staff training. Our goal is to take you from contract to live in 7
              days.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="lime">
                Contact us
              </Button>
            </div>
          </div>
          <div className="relative hidden h-[22rem] overflow-hidden md:block">
            <div className="mt-6 rotate-3">
              <IPhone scale={0.8}>
                <TokenScreen step={DEMO_STEPS[3]} />
              </IPhone>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

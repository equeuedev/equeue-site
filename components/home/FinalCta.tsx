import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IPhone } from "@/components/ui/IPhone";
import { Reveal } from "@/components/ui/Reveal";
import { TokenScreen } from "@/components/phone/PhoneScreens";
import { DEMO_STEPS, MY_TOKEN } from "@/lib/queue-demo";

const INCLUDED = [
  "On-site installation at your clinic",
  "Staff training for reception and doctors",
  "Token printer and waiting-room display set up with you",
];

const STEPS = [
  { title: "Talk to us", text: "A short call about your clinic, services and doctors." },
  {
    title: "We set it up",
    text: "Our team creates your clinic and first Manager, then trains staff.",
  },
  { title: "Go live", text: "Our goal is contract to live in 7 days." },
];

const CALLED_STEP = { ...DEMO_STEPS[4], grace: "4:58" };

/**
 * Closing call to action. Aubergine panel: white text, lime button with dark plum text,
 * a "called" phone with the matching display chip, and the three-step path to going live.
 * Goals are labelled as goals, never results.
 */
export function FinalCta() {
  return (
    <section id="pilot" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-aubergine sm:rounded-[2.5rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-lime/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5"
          />

          <div className="relative grid items-center gap-10 px-6 pt-12 sm:px-12 sm:pt-16 lg:grid-cols-[1fr_22rem] lg:gap-6">
            <Reveal className="pb-2 lg:pb-14">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-lime" />
                Pilot program · Lahore
              </p>
              <h2 className="mt-5 max-w-xl font-hero text-2xl uppercase leading-[1.5] tracking-wide text-white sm:text-3xl lg:text-4xl">
                Be one of our <Highlight>first clinics</Highlight>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/85">
                We&apos;re working with a small number of pilot partners to shape E-Queue. Give your
                patients their time back, and give reception one calm, live queue.
              </p>

              <ul className="mt-6 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-plum">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="lime" className="gap-2">
                  Contact us
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Button>
                <Button href="/pilot" variant="outline-light">
                  See the pilot program
                </Button>
              </div>
              <p className="mt-4 text-sm text-white/70">
                No public sign-up. Our team sets up every clinic personally.
              </p>
            </Reveal>

            {/* Visual: the moment that matters, the patient being called */}
            <div
              aria-hidden="true"
              className="relative mx-auto h-[23rem] w-full max-w-[22rem] overflow-hidden sm:h-[25rem]"
            >
              <div className="animate-float absolute left-1/2 top-4 -translate-x-1/2 rotate-3">
                <IPhone scale={0.78}>
                  <TokenScreen step={CALLED_STEP} />
                </IPhone>
              </div>
              <div className="absolute bottom-10 left-0 -rotate-6 rounded-2xl border-4 border-[#0e0a14] bg-charcoal px-4 py-3 text-center text-white shadow-2xl shadow-black/40">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Now serving
                </p>
                <p className="rounded-lg bg-lime px-2 font-sans text-2xl font-bold leading-tight tabular-nums text-plum">
                  {MY_TOKEN}
                </p>
                <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widest">
                  Counter 02
                </p>
              </div>
            </div>
          </div>

          {/* Path to going live */}
          <ol className="relative grid border-t border-white/15 bg-aubergine-dark sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 border-white/15 px-6 py-5 sm:px-8 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold tabular-nums text-aubergine">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-display font-bold text-white">{step.title}</span>
                  <span className="block text-sm text-white/80">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

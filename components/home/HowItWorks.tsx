import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IPhone } from "@/components/ui/IPhone";
import { JoinScreen, TokenScreen } from "@/components/phone/PhoneScreens";
import { DEMO_STEPS } from "@/lib/queue-demo";

const STEPS: { title: string; text: string; screen: ReactNode }[] = [
  {
    title: "Join from your phone",
    text: "Pick a clinic, choose your doctor and slide to confirm. No app? Reception prints you a token slip.",
    screen: <JoinScreen />,
  },
  {
    title: "Watch your place, not the clock",
    text: "See people ahead, your estimated wait and when to leave.",
    screen: <TokenScreen step={DEMO_STEPS[0]} />,
  },
  {
    title: "Get called, walk in",
    text: "An alert arrives, the counter is named, and a short timer holds your spot.",
    screen: <TokenScreen step={DEMO_STEPS[3]} />,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How it works" title="Three steps from the sofa to the doctor" />

        <div className="on-dark relative mt-10 overflow-hidden rounded-[2rem] bg-aubergine px-6 pt-10 sm:rounded-[2.5rem] sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-lime/10"
          />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 150} className="text-center">
                  {/* Phone is cropped by the stage on desktop; full height on mobile */}
                  <div className="h-[360px] overflow-hidden sm:h-[430px]">
                    <IPhone scale={0.82}>{step.screen}</IPhone>
                  </div>
                  <div className="pb-10 pt-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-bold text-plum">
                      {index + 1}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-white">{step.title}</h3>
                    <p className="mx-auto mt-2 max-w-xs text-white/80">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

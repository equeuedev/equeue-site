import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { IPhone } from "@/components/ui/IPhone";
import { Reveal } from "@/components/ui/Reveal";
import { TokenScreen } from "@/components/phone/PhoneScreens";
import { CounterDashboard } from "@/components/home/CounterDashboard";
import { DEMO_STEPS } from "@/lib/queue-demo";

const PATIENT_POINTS = [
  "Know exactly where you are in line.",
  "Get an alert before your turn, not after.",
  "Rate your visit once it's done.",
];

const CLINIC_POINTS = [
  "One-tap actions for call, start, complete and skip.",
  "One fair line for walk-in, phone and app patients.",
  "Waits and ratings in one dashboard, with no ranking of staff.",
];

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-aubergine text-white">
            <Icon name="check" className="h-4 w-4" />
          </span>
          <span className="font-medium text-plum">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children, className }: { children: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 rounded-full bg-lime px-3.5 py-1.5 text-xs font-bold text-plum shadow-lg ${className}`}
    >
      {children}
    </span>
  );
}

export function Benefits() {
  return (
    <section className="space-y-16 pb-16 sm:space-y-24 sm:pb-24">
      <Container>
        <div
          id="what-your-patients-get"
          className="grid scroll-mt-20 items-center gap-10 lg:grid-cols-[26rem_1fr] lg:gap-14"
        >
          <Reveal>
            <div className="on-dark relative flex h-[440px] justify-center overflow-hidden rounded-[2rem] bg-aubergine pt-8 sm:h-[470px] sm:rounded-[2.5rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-lime/10"
              />
              <IPhone scale={0.92}>
                <TokenScreen step={DEMO_STEPS[0]} />
              </IPhone>
              <Callout className="left-3 top-40 -rotate-3 sm:left-4">Live place in line</Callout>
              <Callout className="right-3 top-[21.5rem] rotate-3 sm:right-4">Leave-by time</Callout>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="What your patients get" title="Wait anywhere" />
            <Points items={PATIENT_POINTS} />
          </Reveal>
        </div>
      </Container>

      <Container>
        <div
          id="for-clinics"
          className="grid scroll-mt-20 items-center gap-10 lg:grid-cols-[1fr_38rem] lg:gap-14"
        >
          <Reveal className="lg:order-1">
            <SectionHeading
              eyebrow="For clinics"
              title="A calmer front desk, and numbers to run on"
            />
            <Points items={CLINIC_POINTS} />
          </Reveal>
          <Reveal delay={120} className="lg:order-2">
            <div className="on-dark rounded-[2rem] bg-aubergine p-4 sm:rounded-[2.5rem] sm:p-7">
              <CounterDashboard />
              <p className="mt-3 text-center text-xs text-white/70">
                Try it: press &ldquo;Call next&rdquo;. Example data.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

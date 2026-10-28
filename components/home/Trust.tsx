import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge, type IconName } from "@/components/ui/Icon";
import { IPhone } from "@/components/ui/IPhone";
import { Reveal } from "@/components/ui/Reveal";
import { TokenScreen } from "@/components/phone/PhoneScreens";
import { DEMO_STEPS } from "@/lib/queue-demo";

const POINTS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "monitor",
    title: "Tokens on the display, never names",
    text: "The public screen shows token numbers and counters only. No names or phone numbers.",
  },
  {
    icon: "shield",
    title: "Ratings belong to the clinic",
    text: "Ratings are for the clinic as a whole, never for a named doctor.",
  },
  {
    icon: "chart",
    title: "Analytics for counters, not people",
    text: "Managers see where time is lost. Individual staff are never ranked.",
  },
];

const SCREEN_ROWS = [
  ["A-041", "Now serving", "C2"],
  ["A-042", "Next", "—"],
  ["A-043", "Waiting", "—"],
];

export function Trust() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div
            aria-hidden="true"
            className="on-dark relative h-[26rem] overflow-hidden rounded-[2rem] bg-aubergine sm:rounded-[2.5rem]"
          >
            <div className="absolute left-4 top-10 w-[17rem] rounded-2xl bg-white p-4 text-plum shadow-2xl shadow-black/40 sm:left-9">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-soft-grey px-3 py-1 text-xs font-semibold">
                What the public screen shows
              </p>
              <ul className="mt-2">
                {SCREEN_ROWS.map(([token, label, counter]) => (
                  <li
                    key={token}
                    className="flex items-center gap-3 border-t border-soft-grey py-2.5 text-sm first:border-t-0"
                  >
                    <b className="w-14 font-sans tabular-nums">{token}</b>
                    <span className="flex-1 text-grey-purple">{label}</span>
                    <span className="text-xs text-grey-purple">{counter}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 border-t border-dashed border-soft-grey pt-2.5 text-xs text-grey-purple">
                Names and phone numbers are never shown.
              </p>
            </div>
            <div className="absolute -right-6 top-36 hidden rotate-3 sm:right-2 sm:block">
              <IPhone scale={0.7}>
                <TokenScreen step={DEMO_STEPS[0]} />
              </IPhone>
            </div>
            <span className="absolute right-6 top-6 rotate-3 rounded-full bg-lime px-3.5 py-1.5 text-xs font-bold text-plum shadow-lg">
              Tokens, not names
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Trust"
            title="Privacy built into the screen"
            highlight="built into the screen"
          />
          <ul className="mt-8 space-y-6">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <IconBadge name={p.icon} />
                <div>
                  <h3 className="font-display text-lg font-bold text-plum">{p.title}</h3>
                  <p className="mt-1 text-grey-purple">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

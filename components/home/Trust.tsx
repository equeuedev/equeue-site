import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge, type IconName } from "@/components/ui/Icon";
import { TrustExplorer } from "@/components/home/TrustExplorer";

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

export function Trust() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading align="center" eyebrow="Trust" title="Privacy built into the screen" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {POINTS.map((p) => (
            <li key={p.title} className="rounded-2xl border border-soft-grey bg-ivory p-6">
              <IconBadge name={p.icon} />
              <h3 className="mt-4 font-display text-xl font-bold text-plum">{p.title}</h3>
              <p className="mt-2 text-grey-purple">{p.text}</p>
            </li>
          ))}
        </ul>
        <TrustExplorer />
      </Container>
    </section>
  );
}

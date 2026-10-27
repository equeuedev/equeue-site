import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge, type IconName } from "@/components/ui/Icon";

const PROBLEMS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "door",
    title: "Patients visit just to get a token",
    text: "A trip to the clinic, only to join a line.",
  },
  {
    icon: "clock",
    title: "Nobody knows how long the wait is",
    text: "No position, no estimate, no idea when to be back.",
  },
  {
    icon: "users",
    title: "Crowded rooms, tense days",
    text: "Packed waiting areas make it harder for patients and staff.",
  },
];

export function ProblemStrip() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          title="Waiting shouldn't mean standing there"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-soft-grey bg-ivory p-6"
            >
              <IconBadge name={p.icon} />
              <h3 className="mt-4 font-display text-xl font-bold text-plum">
                {p.title}
              </h3>
              <p className="mt-2 text-grey-purple">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { OperationsDemo } from "@/components/home/OperationsDemo";

const POINTS = [
  { icon: "printer", text: "A printed token slip for patients without the app." },
  {
    icon: "monitor",
    text: 'A big-screen display showing "Now serving A-023, Counter 02".',
  },
  { icon: "door", text: 'A clear "We are closed" message when the day ends.' },
] as const;

export function WaitingRoom() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="In the waiting room"
          title="Everyone stays in the loop, even without the app"
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <OperationsDemo />
          <div className="rounded-3xl bg-ivory p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-aubergine">Try it</p>
            <h3 className="mt-3 font-display text-2xl font-bold text-plum">
              One live line for your whole team.
            </h3>
            <p className="mt-3 text-grey-purple">
              Switch between the team queue, public display and analytics views. The demo uses
              fictional data and stays local to this page.
            </p>
            <div className="mt-6 rounded-xl border border-soft-grey bg-white p-4 text-sm text-grey-purple">
              <span className="font-semibold text-plum">Privacy by design:</span> public screens
              show token numbers and counters only.
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {POINTS.map((p) => (
            <li key={p.text} className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aubergine text-white">
                <Icon name={p.icon} />
              </span>
              <p className="text-plum">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

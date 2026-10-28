import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { WaitingRoomScene } from "@/components/home/WaitingRoomScene";

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
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="In the waiting room"
            title="Everyone stays in the loop, even without the app"
          />
          <ul className="mt-8 space-y-5">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aubergine text-white">
                  <Icon name={p.icon} />
                </span>
                <p className="text-plum">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-xl border border-soft-grey bg-ivory p-4 text-sm text-grey-purple">
            <span className="font-semibold text-plum">Privacy by design:</span> public screens show
            token numbers and counters only.
          </p>
        </div>
        <WaitingRoomScene />
      </Container>
    </section>
  );
}

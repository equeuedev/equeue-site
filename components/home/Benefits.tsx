import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

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

function Points({ items, onDark = false }: { items: string[]; onDark?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              onDark ? "bg-lime text-plum" : "bg-aubergine text-white"
            }`}
          >
            <Icon name="check" className="h-4 w-4" />
          </span>
          <span className={onDark ? "text-white" : "text-plum"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Benefits() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container className="grid gap-6 lg:grid-cols-2">
        <article
          id="what-your-patients-get"
          className="scroll-mt-20 rounded-3xl border border-soft-grey bg-white p-8 sm:p-10"
        >
          <SectionHeading eyebrow="What your patients get" title="Wait anywhere" />
          <Points items={PATIENT_POINTS} />
        </article>

        <article
          id="for-clinics"
          className="on-dark scroll-mt-20 rounded-3xl bg-aubergine p-8 sm:p-10"
        >
          <SectionHeading
            onDark
            eyebrow="For clinics"
            title="A calmer front desk, and numbers to run on"
          />
          <Points items={CLINIC_POINTS} onDark />
        </article>
      </Container>
    </section>
  );
}

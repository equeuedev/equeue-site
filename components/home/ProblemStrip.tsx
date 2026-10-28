import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Tokens() {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-5">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`rounded-lg border border-soft-grey py-1.5 text-center font-sans text-sm font-bold tabular-nums ${
              i === 5 ? "bg-lime" : "bg-white"
            }`}
          >
            A-{String(30 + i).padStart(3, "0")}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ivory" />
      <span className="absolute bottom-3 left-5 rounded-full bg-aubergine px-3 py-1 text-xs font-semibold text-white">
        12 people, one room
      </span>
    </>
  );
}

function UnknownWait() {
  return (
    <>
      <span className="absolute left-5 top-4 rounded-full bg-soft-grey px-3 py-1 text-xs font-semibold text-plum">
        No idea how long
      </span>
      <p className="absolute inset-x-0 top-14 text-center font-sans text-6xl font-bold tabular-nums text-soft-grey">
        ?? min
      </p>
      <div className="absolute inset-x-6 bottom-6 h-2 rounded-full bg-soft-grey">
        <div className="h-full w-1/3 rounded-full bg-grey-purple" />
      </div>
    </>
  );
}

function FrontDesk() {
  return (
    <>
      <div className="flex gap-2.5 p-5">
        {(
          [
            ["S", "bg-aubergine"],
            ["A", "bg-grey-purple"],
            ["M", "bg-plum"],
            ["R", "bg-aubergine"],
          ] as const
        ).map(([letter, color]) => (
          <span
            key={letter}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold text-white ${color}`}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-5 top-[5.5rem] rounded-xl border border-soft-grey bg-white px-3 py-2.5 text-xs">
        <p className="font-semibold">Front desk</p>
        <p className="text-grey-purple">&ldquo;How long will it take?&rdquo; again</p>
      </div>
    </>
  );
}

const PROBLEMS: { title: string; text: string; visual: ReactNode }[] = [
  {
    title: "Patients visit just to get a token",
    text: "A trip to the clinic, only to join a line.",
    visual: <Tokens />,
  },
  {
    title: "Nobody knows how long the wait is",
    text: "No position, no estimate, no idea when to be back.",
    visual: <UnknownWait />,
  },
  {
    title: "Crowded rooms, tense days",
    text: "Packed waiting areas make it harder for patients and staff.",
    visual: <FrontDesk />,
  },
];

export function ProblemStrip() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading align="center" title="Waiting shouldn't mean standing there" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p, index) => (
            <li key={p.title}>
              <Reveal delay={index * 120} className="h-full">
                <article className="h-full rounded-3xl border border-soft-grey bg-white p-4 pb-6">
                  <div
                    aria-hidden="true"
                    className="relative h-48 overflow-hidden rounded-2xl bg-ivory"
                  >
                    {p.visual}
                  </div>
                  <h3 className="mt-5 px-2 font-display text-xl font-bold leading-snug text-plum">
                    {p.title}
                  </h3>
                  <p className="mt-2 px-2 text-grey-purple">{p.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";

type Source = "App" | "Walk-in" | "Call";
type Entry = { token: string; service: string; source: Source };

const SOURCE_STYLES: Record<Source, string> = {
  App: "bg-aubergine text-white",
  "Walk-in": "bg-soft-grey text-plum",
  Call: "bg-soft-grey text-plum",
};

const SEED: Entry[] = [
  { token: "A-038", service: "Ultrasound", source: "App" },
  { token: "A-039", service: "Check-up", source: "Walk-in" },
  { token: "A-040", service: "Lab sample", source: "Call" },
  { token: "A-041", service: "Ultrasound", source: "App" },
];
const NEXT_SOURCES: Source[] = ["Walk-in", "App", "Call"];
const BARS = [30, 48, 70, 100, 76, 52, 38, 60];

/** Example counter console. "Call next" really works so visitors can try it. Fictional data only. */
export function CounterDashboard() {
  const [queue, setQueue] = useState(SEED);
  const [serving, setServing] = useState("A-037");
  const [counter, setCounter] = useState(0);
  const served = 42 + counter;

  function callNext() {
    const [first, ...rest] = queue;
    setServing(first.token);
    const n = 42 + counter + 1;
    setQueue([
      ...rest,
      {
        token: `A-0${n}`,
        service: first.service,
        source: NEXT_SOURCES[counter % NEXT_SOURCES.length],
      },
    ]);
    setCounter(counter + 1);
  }

  return (
    <div
      role="group"
      aria-label="Example counter dashboard with fictional data"
      className="overflow-hidden rounded-2xl border border-white/20 bg-white text-plum shadow-2xl shadow-black/40"
    >
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 bg-[#efedf1] px-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d6d2da]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d6d2da]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d6d2da]" />
        <span className="ml-3 rounded-full bg-white px-3 py-0.5 text-[0.65rem] text-grey-purple">
          app.e-queue.example/counter
        </span>
      </div>

      <div className="grid sm:grid-cols-[1fr_11rem]">
        <div className="p-4">
          <dl className="grid grid-cols-3 gap-2.5">
            {(
              [
                ["Waiting now", String(queue.length + 2)],
                ["Served today", String(served)],
                ["Avg. wait", "~12 min"],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="rounded-xl bg-ivory px-3 py-2">
                <dt className="text-[0.65rem] text-grey-purple">{label}</dt>
                <dd className="text-lg font-bold tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 text-xs font-bold">Up next · one line for every source</p>
          <ul className="mt-1">
            {queue.map((entry) => (
              <li
                key={entry.token}
                className="flex items-center gap-3 border-t border-soft-grey py-2 text-xs first:border-t-0"
              >
                <b className="w-12 font-sans text-sm tabular-nums">{entry.token}</b>
                <span className="flex-1 text-grey-purple">{entry.service}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-semibold ${SOURCE_STYLES[entry.source]}`}
                >
                  {entry.source}
                </span>
              </li>
            ))}
          </ul>

          <p aria-hidden="true" className="mt-3 text-[0.65rem] text-grey-purple">
            Busiest hours
          </p>
          <div aria-hidden="true" className="mt-1 flex h-12 items-end gap-1.5">
            {BARS.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t ${h === 100 ? "bg-lime" : "bg-aubergine/85"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="on-dark bg-charcoal p-4 text-white">
          <p className="text-[0.6rem] font-semibold tracking-[0.2em] text-white/65">NOW SERVING</p>
          <p
            key={serving}
            aria-live="polite"
            className="animate-tick whitespace-nowrap font-sans text-4xl font-bold tabular-nums leading-tight text-lime"
          >
            {serving}
          </p>
          <p className="mb-3 text-[0.7rem] font-bold tracking-[0.14em]">COUNTER 02</p>
          <p className="flex justify-between border-t border-white/15 py-1.5 text-xs">
            <span>Counter 01</span>
            <b className="font-sans tabular-nums">B-014</b>
          </p>
          <p className="flex justify-between border-t border-white/15 py-1.5 text-xs">
            <span>Counter 03</span>
            <b>Free</b>
          </p>
          <button
            type="button"
            onClick={callNext}
            className="mt-3 min-h-11 w-full rounded-full bg-lime text-sm font-bold text-plum hover:brightness-95"
          >
            Call next
          </button>
        </div>
      </div>
    </div>
  );
}

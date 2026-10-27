"use client";

import { useState } from "react";

const STEPS = [
  {
    title: "Join from your phone",
    text: "Pick a clinic, choose your doctor and slide to confirm. No app? Reception prints you a token slip.",
    label: "Choose a service",
    value: "Ultrasound",
    meta: "Example Clinic · Lahore",
  },
  {
    title: "Watch your place, not the clock",
    text: "See people ahead, your estimated wait and when to leave.",
    label: "People ahead",
    value: "3 people",
    meta: "Estimated wait · 12 minutes",
  },
  {
    title: "Get called, walk in",
    text: "An alert arrives, the counter is named, and a short timer holds your spot.",
    label: "You’re next",
    value: "A-023",
    meta: "Counter 02 · Please walk in",
  },
] as const;

export function JourneyDemo() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-soft-grey bg-white shadow-lg">
      <div
        role="tablist"
        aria-label="How E-Queue works"
        className="grid border-b border-soft-grey sm:grid-cols-3"
      >
        {STEPS.map((item, index) => (
          <button
            key={item.title}
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`min-h-14 border-b-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${
              active === index
                ? "border-aubergine bg-ivory text-aubergine"
                : "border-transparent text-grey-purple hover:bg-ivory"
            }`}
          >
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lime text-xs text-plum">
              {index + 1}
            </span>
            {item.title}
          </button>
        ))}
      </div>
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-aubergine">
            Step {active + 1} of 3
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-plum">{step.title}</h3>
          <p className="mt-3 text-grey-purple">{step.text}</p>
        </div>
        <div aria-live="polite" className="rounded-2xl bg-charcoal p-6 text-white">
          <p className="text-sm text-white/70">{step.meta}</p>
          <p className="mt-5 text-sm uppercase tracking-wider text-white/70">{step.label}</p>
          <p className="mt-2 text-4xl font-bold tabular-nums text-lime">{step.value}</p>
        </div>
      </div>
    </div>
  );
}

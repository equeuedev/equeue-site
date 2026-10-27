"use client";

import { useState } from "react";

const MODES = {
  screen: {
    label: "Public screen",
    title: "Tokens, not names",
    text: "The public display shows token numbers and counters only. No names or phone numbers.",
    visual: "A-023 · Counter 02",
  },
  manager: {
    label: "Manager view",
    title: "Analytics for counters",
    text: "Managers see where time is lost. Individual staff are never ranked.",
    visual: "Counter 02 · 4 min average wait",
  },
  ratings: {
    label: "Ratings",
    title: "Ratings belong to the clinic",
    text: "Ratings are for the clinic as a whole, never for a named doctor.",
    visual: "Example Clinic · 5 ratings",
  },
} as const;

export function TrustExplorer() {
  const [mode, setMode] = useState<keyof typeof MODES>("screen");
  const content = MODES[mode];
  return (
    <div className="mt-10 grid gap-6 rounded-3xl border border-soft-grey bg-ivory p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div role="tablist" aria-label="Privacy views" className="grid gap-2">
        {(Object.keys(MODES) as Array<keyof typeof MODES>).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={mode === key}
            onClick={() => setMode(key)}
            className={`min-h-12 rounded-xl px-4 text-left font-semibold ${
              mode === key ? "bg-aubergine text-white" : "bg-white text-plum hover:bg-soft-grey"
            }`}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="rounded-2xl bg-charcoal p-7 text-white">
        <p className="text-sm uppercase tracking-wider text-lime">{content.label}</p>
        <h3 className="mt-3 font-display text-2xl font-bold">{content.title}</h3>
        <p className="mt-3 text-white/80">{content.text}</p>
        <div className="mt-7 rounded-xl border border-white/15 bg-white/10 p-4 font-sans text-lg font-bold tabular-nums text-lime">
          {content.visual}
        </div>
      </div>
    </div>
  );
}

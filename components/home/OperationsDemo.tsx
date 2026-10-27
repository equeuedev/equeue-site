"use client";

import { useEffect, useState } from "react";

type View = "queue" | "display" | "analytics";

const TOKENS = ["A-021", "A-022", "A-023", "A-024"];

export function OperationsDemo() {
  const [view, setView] = useState<View>("queue");
  const [serving, setServing] = useState(2);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (isOpen) setServing((value) => (value + 1) % TOKENS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  const token = TOKENS[serving];
  return (
    <div className="overflow-hidden rounded-3xl border border-soft-grey bg-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-soft-grey p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aubergine">E-Queue live view</p>
          <p className="mt-1 text-sm text-grey-purple">Example Clinic · Tuesday</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isOpen ? "bg-lime text-plum" : "bg-soft-grey text-plum"}`}>
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>
      <div role="tablist" aria-label="Queue views" className="grid grid-cols-3 border-b border-soft-grey">
        {([
          ["queue", "Team queue"],
          ["display", "Public display"],
          ["analytics", "Analytics"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={view === key}
            onClick={() => setView(key)}
            className={`min-h-12 border-b-2 px-2 text-sm font-semibold ${view === key ? "border-aubergine text-aubergine" : "border-transparent text-grey-purple"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="min-h-[270px] p-5 sm:p-7">
        {view === "queue" && (
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-grey-purple">Now serving</p>
                <p className="mt-1 font-sans text-5xl font-bold tabular-nums text-aubergine">{token}</p>
              </div>
              <button onClick={() => setServing((value) => (value + 1) % TOKENS.length)} className="min-h-11 rounded-full bg-aubergine px-5 py-2 text-sm font-semibold text-white">
                Call next
              </button>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl bg-ivory p-3"><strong className="block text-xl">7</strong>Waiting</div>
              <div className="rounded-xl bg-ivory p-3"><strong className="block text-xl">02</strong>Counter</div>
              <div className="rounded-xl bg-ivory p-3"><strong className="block text-xl">4m</strong>Avg wait</div>
            </div>
          </div>
        )}
        {view === "display" && (
          <div className="rounded-2xl bg-charcoal p-6 text-center text-white">
            {isOpen ? <><p className="text-sm uppercase tracking-[0.18em] text-white/70">Now serving</p><p className="mt-2 text-6xl font-bold tabular-nums text-lime">{token}</p><p className="mt-2 font-semibold">Counter 02</p></> : <><p className="text-3xl font-bold text-lime">We are closed</p><p className="mt-2 text-white/75">Please visit us during opening hours.</p></>}
            <button onClick={() => setIsOpen((value) => !value)} className="mt-5 min-h-11 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold">{isOpen ? "Preview closed state" : "Reopen preview"}</button>
          </div>
        )}
        {view === "analytics" && (
          <div>
            <p className="text-sm text-grey-purple">Today at Example Clinic</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[["24", "Served"], ["4m", "Average wait"], ["92%", "Completed"]].map(([value, label]) => <div key={label} className="rounded-xl bg-ivory p-3"><strong className="block text-2xl tabular-nums text-aubergine">{value}</strong><span className="text-sm text-grey-purple">{label}</span></div>)}
            </div>
            <div className="mt-6 flex h-16 items-end gap-2" aria-label="Illustrative hourly activity chart">
              {[32, 48, 40, 68, 54, 82, 61, 74].map((height, index) => <span key={index} className="flex-1 rounded-t bg-lime" style={{ height: `${height}%` }} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

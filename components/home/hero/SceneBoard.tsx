import type { FlowStep, Source } from "@/lib/hero-flow";

const SOURCE_STYLES: Record<Source, string> = {
  App: "bg-aubergine text-white",
  "Walk-in": "bg-soft-grey text-plum",
  Phone: "bg-soft-grey text-plum",
};

/** Reception's live queue board. Decorative; example data only. */
export function SceneBoard({ step, className = "" }: { step: FlowStep; className?: string }) {
  const called = step.counter.state === "Called";
  return (
    <div className={`rounded-2xl bg-white p-4 text-plum shadow-2xl shadow-black/30 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold">Live queue</p>
        <span className="rounded-full bg-ivory px-2.5 py-1 text-[0.65rem] font-semibold tabular-nums text-grey-purple">
          {step.queue.length} waiting
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-ivory px-3 py-2">
        <div>
          <p className="text-xs font-semibold">Counter 02</p>
          <p className="text-[0.7rem] text-grey-purple">Dr. Ali</p>
        </div>
        <div className="text-right">
          <p
            key={step.counter.token}
            className="animate-tick whitespace-nowrap font-sans text-base font-bold tabular-nums leading-tight"
          >
            {step.counter.token}
          </p>
          <span
            className={`inline-block rounded-full px-2 text-[0.6rem] font-semibold ${
              called ? "bg-lime text-plum" : "bg-aubergine text-white"
            }`}
          >
            {step.counter.state}
          </span>
        </div>
      </div>

      <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-wider text-grey-purple">
        Up next
      </p>
      <ul className="mt-1 h-[8.4rem] overflow-hidden">
        {step.queue.slice(0, 4).map((row) => (
          <li
            key={row.token}
            className={`flex items-center gap-2 border-t border-soft-grey py-1.5 text-xs first:border-t-0 ${
              row.isNew ? "animate-pop-in" : ""
            }`}
          >
            <b className="w-12 font-sans tabular-nums">{row.token}</b>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${SOURCE_STYLES[row.source]}`}
            >
              {row.source}
            </span>
            {row.isNew && (
              <span className="ml-auto text-[0.6rem] font-semibold text-success">Joined</span>
            )}
          </li>
        ))}
      </ul>

      <div
        className={`mt-2 rounded-full bg-lime py-2 text-center text-xs font-bold text-plum transition-transform duration-200 ${
          step.calling ? "scale-95 ring-4 ring-lime/40" : ""
        }`}
      >
        Call next
      </div>
    </div>
  );
}

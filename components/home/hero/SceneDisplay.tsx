import type { DemoStep } from "@/lib/queue-demo";

/**
 * Waiting-room TV: tokens and counters only, never names.
 * Charcoal Plum background with the lime "called" token. Decorative.
 */
export function SceneDisplay({ step }: { step: DemoStep }) {
  return (
    <div className="overflow-hidden rounded-2xl border-[6px] border-plum bg-charcoal text-white shadow-xl">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 p-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            Now serving
          </p>
          <p
            key={step.serving}
            className="animate-tick whitespace-nowrap font-sans text-5xl font-bold leading-none tabular-nums text-lime"
          >
            {step.serving}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest">Counter 02</p>
        </div>
        <ul className="hidden w-24 space-y-1.5 font-sans text-sm font-semibold tabular-nums @xl:block">
          {step.recent.map((call) => (
            <li
              key={`${call.token}-${call.counter}`}
              className="flex justify-between gap-2 border-b border-white/15 pb-1.5 last:border-b-0"
            >
              <span>{call.token}</span>
              <span className="text-white/70">{call.counter.replace("Counter ", "C")}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-aubergine px-4 py-2 text-xs font-medium text-white sm:px-5">
        Welcome to Example Clinic
      </div>
    </div>
  );
}

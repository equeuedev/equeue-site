import type { DemoStep } from "@/lib/queue-demo";

/**
 * Waiting-room TV: tokens and counters only, never names.
 * Charcoal Plum background with the lime "called" token. Decorative.
 */
export function SceneDisplay({ step, className = "" }: { step: DemoStep; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border-[6px] border-plum bg-charcoal text-white shadow-xl ${className}`}
    >
      <div className="p-4 text-center">
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
      </div>
      <div className="bg-aubergine px-4 py-2 text-xs font-medium text-white sm:px-5">
        Welcome to Example Clinic
      </div>
    </div>
  );
}

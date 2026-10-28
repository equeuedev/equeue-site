"use client";

import { PauseButton } from "@/components/ui/PauseButton";
import { useQueueDemo } from "@/hooks/useQueueDemo";
import { SceneSlip } from "@/components/home/hero/SceneSlip";
import { DEMO_STEPS, STATIC_STEP, STEP_INTERVAL_MS } from "@/lib/queue-demo";

/** Waiting-room stage: TV display ticking through calls, a printed slip and a join QR. Fictional data. */
export function WaitingRoomScene() {
  const { step, reducedMotion, pausedByUser, toggleUserPause, setPausedByHover } = useQueueDemo({
    stepCount: DEMO_STEPS.length,
    intervalMs: STEP_INTERVAL_MS,
    staticStep: STATIC_STEP,
  });
  const current = DEMO_STEPS[step];

  return (
    <div>
      <div
        className="on-dark relative overflow-hidden rounded-[2rem] bg-aubergine px-4 pb-32 pt-8 sm:rounded-[2.5rem] sm:px-8 sm:pb-36"
        onMouseEnter={() => setPausedByHover(true)}
        onMouseLeave={() => setPausedByHover(false)}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-lime/10"
        />
        <div aria-hidden="true" className="relative">
          <div className="rounded-2xl bg-[#0e0a14] p-2.5 shadow-2xl shadow-black/50">
            <div className="grid min-h-[13rem] grid-cols-[1fr_auto] sm:grid-cols-[1.3fr_1fr] rounded-lg bg-charcoal text-white">
              <div className="p-5 sm:p-7">
                <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-white/70">
                  NOW SERVING
                </p>
                <p
                  key={current.serving}
                  className="animate-tick whitespace-nowrap font-sans text-4xl font-bold leading-tight tabular-nums text-lime sm:text-6xl"
                >
                  {current.serving}
                </p>
                <p className="mt-1 text-sm font-bold tracking-[0.16em]">COUNTER 02</p>
              </div>
              <ul className="space-y-0 p-4 pr-5 font-sans text-sm font-semibold tabular-nums sm:p-6 sm:pr-7">
                <li className="mb-1 font-sans text-[0.6rem] tracking-[0.2em] text-white/60">
                  RECENT
                </li>
                {current.recent.map((call) => (
                  <li
                    key={`${call.token}-${call.counter}`}
                    className="flex justify-between gap-4 whitespace-nowrap border-t border-white/15 py-2"
                  >
                    <span>{call.token}</span>
                    <span className="text-white/60">{call.counter.replace("Counter ", "C")}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-1.5 rounded-md bg-aubergine px-3.5 py-2 text-xs text-white">
              Welcome to Example Clinic
            </p>
          </div>
          <div className="mx-auto h-6 w-14 bg-[#2a2232]" />
          <div className="mx-auto h-2.5 w-1/4 rounded-full bg-[#2a2232]" />

          <SceneSlip className="absolute -bottom-24 left-2 w-[110px] -rotate-6 sm:left-6" />
          <div className="absolute -bottom-24 right-2 w-32 rotate-3 rounded-2xl bg-white p-3.5 text-center text-plum shadow-xl sm:right-6 sm:w-36">
            <div
              className="mx-auto h-20 w-20 rounded-md opacity-90"
              style={{
                background: "repeating-conic-gradient(#292332 0 25%, #fff 0 50%) 0 0 / 10px 10px",
              }}
            />
            <p className="mt-2 text-[0.7rem] font-bold">Scan to join</p>
          </div>
        </div>
      </div>
      {!reducedMotion && <PauseButton paused={pausedByUser} onToggle={toggleUserPause} />}
    </div>
  );
}

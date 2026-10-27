"use client";

import { Icon } from "@/components/ui/Icon";
import { TokenChip } from "@/components/ui/TokenChip";
import { useQueueDemo } from "@/hooks/useQueueDemo";
import { SceneBoard } from "@/components/home/hero/SceneBoard";
import { SceneDisplay } from "@/components/home/hero/SceneDisplay";
import { ScenePhone } from "@/components/home/hero/ScenePhone";
import { SceneSlip } from "@/components/home/hero/SceneSlip";
import { DEMO_STEPS, SCENE_DESCRIPTION, STATIC_STEP, STEP_INTERVAL_MS } from "@/lib/queue-demo";

/**
 * Hero product scene: the customer's phone, the reception counter board and the
 * waiting-room display, all driven by one clock so they always agree.
 * The scene itself is decorative; the description and pause control are not.
 */
export function HeroScene() {
  const { step, reducedMotion, pausedByUser, toggleUserPause, setPausedByHover } = useQueueDemo({
    stepCount: DEMO_STEPS.length,
    intervalMs: STEP_INTERVAL_MS,
    staticStep: STATIC_STEP,
  });
  const current = DEMO_STEPS[step];

  return (
    <div className="relative">
      <p className="sr-only">{SCENE_DESCRIPTION}</p>

      <div
        className="on-dark relative overflow-hidden rounded-[2rem] bg-aubergine p-4 sm:p-6"
        onMouseEnter={() => setPausedByHover(true)}
        onMouseLeave={() => setPausedByHover(false)}
      >
        {/* Soft background shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-lime/10"
        />

        {/*
          The scene sizes itself to its own width (container queries), not the screen:
          under 32rem: display above phone. 32rem+: display and board beside the phone.
          36rem+: recent calls on the display. 42rem+: printed slip beside the phone.
        */}
        <div className="@container relative">
          <div
            aria-hidden="true"
            className="grid gap-4 @lg:grid-cols-[1.15fr_0.85fr] @lg:items-start"
          >
            <div className="space-y-4">
              <SceneDisplay step={current} />
              <div className="hidden @lg:block">
                <SceneBoard step={current} />
              </div>
            </div>

            <div className="relative @2xl:pr-24">
              <ScenePhone step={current} />
              <SceneSlip className="absolute bottom-8 right-0 hidden w-[100px] rotate-6 @2xl:block" />
            </div>
          </div>
        </div>
      </div>

      <TokenChip
        key={current.serving}
        token={current.serving}
        className="animate-tick absolute -left-2 -top-5 -rotate-6 text-xl shadow-lg sm:-left-4 sm:text-2xl"
      />

      {!reducedMotion && (
        <button
          type="button"
          onClick={toggleUserPause}
          aria-pressed={pausedByUser}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-grey-purple hover:text-plum"
        >
          <Icon name={pausedByUser ? "play" : "pause"} className="h-4 w-4" />
          {pausedByUser ? "Play animation" : "Pause animation"}
        </button>
      )}
    </div>
  );
}

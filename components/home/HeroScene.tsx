"use client";

import { Icon } from "@/components/ui/Icon";
import { TokenChip } from "@/components/ui/TokenChip";
import { useQueueDemo } from "@/hooks/useQueueDemo";
import { SceneBoard } from "@/components/home/hero/SceneBoard";
import { SceneDisplay } from "@/components/home/hero/SceneDisplay";
import { ScenePhone } from "@/components/home/hero/ScenePhone";
import { ScenePush } from "@/components/home/hero/ScenePush";
import { SceneSlip } from "@/components/home/hero/SceneSlip";
import { DEMO_STEPS, SCENE_DESCRIPTION, STATIC_STEP, STEP_INTERVAL_MS } from "@/lib/queue-demo";

/**
 * Full-width hero stage: a realistic phone, cropped at the bottom, with the push
 * notification, counter board, waiting-room display and printed slip around it.
 * One clock drives everything, so they always agree.
 * The scene is decorative; the description and pause control are not.
 */
export function HeroScene() {
  const { step, reducedMotion, pausedByUser, toggleUserPause, setPausedByHover } = useQueueDemo({
    stepCount: DEMO_STEPS.length,
    intervalMs: STEP_INTERVAL_MS,
    staticStep: STATIC_STEP,
  });
  const current = DEMO_STEPS[step];

  return (
    <div>
      <p className="sr-only">{SCENE_DESCRIPTION}</p>

      <div
        className="on-dark @container relative overflow-hidden rounded-[2rem] bg-aubergine sm:rounded-[2.5rem]"
        onMouseEnter={() => setPausedByHover(true)}
        onMouseLeave={() => setPausedByHover(false)}
      >
        {/* Soft background shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-lime/10"
        />

        {/*
          Sizes to its own width: under 56rem the phone stands alone (cropped);
          56rem+ the notification, board, display and slip flank it.
        */}
        <div
          aria-hidden="true"
          className="relative mx-auto h-[440px] max-w-6xl overflow-hidden px-4 pt-10 @4xl:h-[520px]"
        >
          <ScenePhone step={current} />

          <ScenePush
            step={current}
            className="absolute left-[4%] top-12 hidden w-72 -rotate-3 @4xl:block"
          />
          <SceneBoard
            step={current}
            className="absolute bottom-12 left-[3%] hidden w-64 @4xl:block"
          />
          <div className="absolute right-[8%] top-10 hidden rotate-6 @4xl:block">
            <TokenChip
              key={current.serving}
              token={current.serving}
              className="animate-tick text-2xl shadow-lg"
            />
          </div>
          <SceneDisplay
            step={current}
            className="absolute right-[3%] top-24 hidden w-72 @4xl:block"
          />
          <SceneSlip className="absolute bottom-10 right-[8%] hidden w-[110px] rotate-6 @4xl:block" />
        </div>
      </div>

      {!reducedMotion && (
        <button
          type="button"
          onClick={toggleUserPause}
          aria-pressed={pausedByUser}
          className="mx-auto mt-3 flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-grey-purple hover:text-plum"
        >
          <Icon name={pausedByUser ? "play" : "pause"} className="h-4 w-4" />
          {pausedByUser ? "Play animation" : "Pause animation"}
        </button>
      )}
    </div>
  );
}

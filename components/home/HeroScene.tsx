"use client";

import { Icon } from "@/components/ui/Icon";
import { useQueueDemo } from "@/hooks/useQueueDemo";
import { SceneBoard } from "@/components/home/hero/SceneBoard";
import { SceneDisplay } from "@/components/home/hero/SceneDisplay";
import { ScenePhone } from "@/components/home/hero/ScenePhone";
import { ScenePush } from "@/components/home/hero/ScenePush";
import { SceneSlip } from "@/components/home/hero/SceneSlip";
import {
  FLOW_COUNTER,
  FLOW_DESCRIPTION,
  FLOW_DURATIONS,
  FLOW_STATIC_STEP,
  FLOW_STEPS,
} from "@/lib/hero-flow";

/** Latest push at or before `index`, so a fading-out notification keeps its text. */
function lastPush(index: number) {
  for (let i = index; i >= 0; i -= 1) {
    const push = FLOW_STEPS[i].push;
    if (push) return push;
  }
  return FLOW_STEPS.find((step) => step.push)!.push!;
}

/**
 * Full-width hero stage that plays the complete flow:
 * join → token (with a walk-in slip) → wait anywhere → alert → called → serving → completed.
 * One clock drives the phone, push, reception board, waiting-room display and slip, so they always agree.
 * The stage is decorative; the description, step timeline and pause control are not.
 */
export function HeroScene() {
  const demo = useQueueDemo({
    stepCount: FLOW_STEPS.length,
    intervalMs: 3500,
    durations: FLOW_DURATIONS,
    staticStep: FLOW_STATIC_STEP,
  });
  const current = FLOW_STEPS[demo.step];
  const push = current.push ?? lastPush(demo.step);
  const called = current.counter.state === "Called";

  return (
    <div>
      <p className="sr-only">{FLOW_DESCRIPTION}</p>

      <div
        className="on-dark @container relative overflow-hidden rounded-[2rem] bg-aubergine sm:rounded-[2.5rem]"
        onMouseEnter={() => demo.setPausedByHover(true)}
        onMouseLeave={() => demo.setPausedByHover(false)}
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5"
        />

        {/*
          Sizes to its own width: under 56rem the phone stands alone (cropped) with the push over it;
          56rem+ the push, reception board, display and slip flank it.
        */}
        <div
          aria-hidden="true"
          className="relative mx-auto h-[460px] max-w-6xl overflow-hidden px-4 pt-10 @4xl:h-[540px]"
        >
          <ScenePhone step={current} />

          {/* Small screens: the push lands over the top of the phone, like a real banner */}
          <ScenePush
            push={push}
            visible={current.push !== null}
            className="absolute left-1/2 top-6 z-20 w-[min(17rem,calc(100%-2rem))] -translate-x-1/2 @4xl:hidden"
          />

          {/* Wide screens */}
          <ScenePush
            push={push}
            visible={current.push !== null}
            className="absolute left-[4%] top-12 hidden w-72 -rotate-3 @4xl:block"
          />
          <SceneBoard
            step={current}
            className="absolute bottom-10 left-[3%] hidden w-64 @4xl:block"
          />

          <SceneDisplay
            token={current.counter.token}
            counter={FLOW_COUNTER}
            called={called}
            className="absolute right-[3%] top-12 hidden w-72 @4xl:block"
          />

          {/* Walk-in slip prints at reception when a walk-in joins the same line */}
          <div className="absolute bottom-8 right-[9%] hidden w-[118px] @4xl:block">
            {current.slip && (
              <div key={current.slip} className="animate-print rotate-6">
                <SceneSlip token={current.slip} />
                <p className="mt-2 -rotate-6 text-center text-[0.65rem] font-semibold text-white/80">
                  Walk-in slip
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FlowTimeline demo={demo} />
    </div>
  );
}

type Demo = ReturnType<typeof useQueueDemo>;

/**
 * Step timeline under the stage. Each step is a real button, so keyboard and screen-reader users
 * can move through the flow at their own pace. The active step fills over its duration.
 */
function FlowTimeline({ demo }: { demo: Demo }) {
  const current = FLOW_STEPS[demo.step];
  return (
    <div className="mt-5">
      <ol className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {FLOW_STEPS.map((step, index) => {
          const done = index < demo.step;
          const active = index === demo.step;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => demo.goTo(index)}
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${index + 1} of ${FLOW_STEPS.length}: ${step.label}`}
                className="group flex min-h-11 w-full flex-col justify-center gap-2 rounded-lg py-1 text-left"
              >
                <span className="relative block h-1.5 w-full overflow-hidden rounded-full bg-soft-grey">
                  {(done || active) && (
                    <span
                      key={active ? `${step.id}-active` : step.id}
                      className={`absolute inset-0 origin-left rounded-full bg-aubergine ${
                        active && !demo.reducedMotion ? "animate-step-fill" : ""
                      }`}
                      style={
                        active && !demo.reducedMotion
                          ? {
                              animationDuration: `${demo.durationMs}ms`,
                              animationPlayState: demo.running ? "running" : "paused",
                            }
                          : undefined
                      }
                    />
                  )}
                </span>
                <span
                  className={`hidden text-xs sm:flex sm:items-center sm:gap-1.5 ${
                    active
                      ? "font-bold text-plum"
                      : "font-medium text-grey-purple group-hover:text-plum"
                  }`}
                >
                  <span
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] tabular-nums ${
                      active
                        ? "bg-aubergine text-white"
                        : done
                          ? "bg-lime text-plum"
                          : "bg-white text-grey-purple ring-1 ring-soft-grey"
                    }`}
                  >
                    {done ? <Icon name="check" className="h-3 w-3" /> : index + 1}
                  </span>
                  <span className="truncate">{step.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="min-h-12 text-sm text-plum sm:min-h-0">
          <span className="font-bold">
            <span className="sm:hidden">
              {demo.step + 1}/{FLOW_STEPS.length} ·{" "}
            </span>
            {current.label}.
          </span>{" "}
          <span className="text-grey-purple">{current.caption}</span>
        </p>
        {!demo.reducedMotion && (
          <button
            type="button"
            onClick={demo.toggleUserPause}
            aria-pressed={demo.pausedByUser}
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-soft-grey bg-white px-4 text-sm font-medium text-plum hover:border-aubergine"
          >
            <Icon name={demo.pausedByUser ? "play" : "pause"} className="h-4 w-4" />
            {demo.pausedByUser ? "Play" : "Pause"}
            <span className="sr-only"> animation</span>
          </button>
        )}
      </div>
    </div>
  );
}

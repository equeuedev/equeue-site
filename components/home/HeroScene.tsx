"use client";

import { useEffect, useRef } from "react";
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

/** Lime pieces that burst out of the token when the visit is Completed. */
const BURST = Array.from({ length: 12 }, (_, i) => ({
  angle: `${i * 30}deg`,
  delay: `${200 + (i % 3) * 90}ms`,
  lime: i % 2 === 0,
}));

/**
 * Live updates drawn as beams between the devices (wide screens only).
 * Coordinates are in a 1000 x 540 box that stretches with the stage.
 */
const BEAMS: Record<string, string[]> = {
  // New token travels from the phone to the reception board
  token: ["M 420 330 C 360 330, 330 300, 285 300"],
  // Call next goes out to the waiting-room display (passing behind the phone)
  called: ["M 285 460 C 520 520, 760 470, 830 300"],
};

/**
 * Full-width hero stage that plays the complete flow automatically:
 * join → token (with a walk-in slip) → wait anywhere → alert → called → serving → completed.
 * One clock drives the phone, push, reception board, waiting-room display and slip, so they always agree.
 * It enters with a staggered rise, starts when scrolled into view, and keeps playing under the pointer.
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
  const beams = BEAMS[current.id] ?? [];

  // Hold the flow while the stage is off screen, so the first step plays when people see it
  const stageRef = useRef<HTMLDivElement>(null);
  const { setOffscreen } = demo;
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [setOffscreen]);

  return (
    <div>
      <p className="sr-only">{FLOW_DESCRIPTION}</p>

      <div
        ref={stageRef}
        className="on-dark @container relative overflow-hidden rounded-[2rem] bg-aubergine sm:rounded-[2.5rem]"
      >
        {/* Soft background shapes and a slow light sweep */}
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
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-shine absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent [animation-duration:9s]" />
        </div>

        {/*
          Sizes to its own width: under 56rem the phone stands alone (cropped) with the push over it;
          56rem+ the push, reception board, display and slip flank it.
        */}
        <div
          aria-hidden="true"
          className="relative mx-auto h-[460px] max-w-6xl overflow-hidden px-4 pt-10 @4xl:h-[540px]"
        >
          {/* Beams: live updates travelling between devices */}
          <svg
            viewBox="0 0 1000 540"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full @4xl:block"
          >
            {beams.map((d, i) => (
              <path
                key={`${current.id}-${i}`}
                d={d}
                pathLength={1}
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="1"
                vectorEffect="non-scaling-stroke"
                className="animate-beam"
                style={{ animationDelay: `${300 + i * 250}ms` }}
              />
            ))}
          </svg>

          <div className="animate-rise relative [animation-delay:100ms]">
            <ScenePhone step={current} />

            {/* Completed: a short lime burst over the token */}
            {current.id === "done" && (
              <div className="pointer-events-none absolute left-1/2 top-[16.25rem] z-10">
                {BURST.map((piece) => (
                  <span
                    key={piece.angle}
                    className={`animate-burst absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-sm ${
                      piece.lime ? "bg-lime" : "bg-aubergine"
                    }`}
                    style={
                      {
                        "--angle": piece.angle,
                        animationDelay: piece.delay,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Small screens: the push lands over the top of the phone, like a real banner */}
          <ScenePush
            push={push}
            visible={current.push !== null}
            className="absolute left-1/2 top-6 z-20 w-[min(17rem,calc(100%-2rem))] -translate-x-1/2 @4xl:hidden"
          />

          {/* Wide screens: every piece rises in, then floats gently on its own rhythm */}
          <div className="animate-rise absolute left-[4%] top-12 hidden w-72 [animation-delay:450ms] @4xl:block">
            <div className="animate-float [animation-duration:7s]">
              <ScenePush push={push} visible={current.push !== null} className="-rotate-3" />
            </div>
          </div>

          <div className="animate-rise absolute bottom-10 left-[3%] hidden w-64 [animation-delay:600ms] @4xl:block">
            <div className="animate-float [animation-delay:-2s] [animation-duration:8s]">
              <SceneBoard step={current} />
            </div>
          </div>

          <div className="animate-rise absolute right-[3%] top-12 hidden w-72 [animation-delay:750ms] @4xl:block">
            <div className="animate-float [animation-delay:-4s] [animation-duration:9s]">
              <SceneDisplay token={current.counter.token} counter={FLOW_COUNTER} called={called} />
            </div>
          </div>

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
        <p key={current.id} className="animate-slide-in min-h-12 text-sm text-plum sm:min-h-0">
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

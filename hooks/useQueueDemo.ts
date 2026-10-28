"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeToMedia(query: string, onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => subscribeToMedia("(prefers-reduced-motion: reduce)", onChange),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useTabHidden() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.hidden,
    () => false,
  );
}

type Options = {
  stepCount: number;
  /** Time per step when `durations` is not given. */
  intervalMs: number;
  /** Optional time per step (ms), one entry per step. */
  durations?: number[];
  /** Step shown when motion is reduced (until the visitor picks a step). */
  staticStep: number;
};

/**
 * Drives the home demos. One clock feeds every mockup so they never disagree.
 * Stops when: the visitor pauses it, they hover the scene, the tab is hidden,
 * or they prefer reduced motion (then a single static frame is shown).
 * Pausing keeps the time left on the current step, so progress bars stay in sync.
 */
export function useQueueDemo({ stepCount, intervalMs, durations, staticStep }: Options) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [pausedByHover, setPausedByHover] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabHidden = useTabHidden();

  const running = !reducedMotion && !pausedByUser && !pausedByHover && !tabHidden;

  const durationOf = useCallback(
    (index: number) => durations?.[index] ?? intervalMs,
    [durations, intervalMs],
  );
  const stepRef = useRef(0);
  const remaining = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % stepCount) + stepCount) % stepCount;
      stepRef.current = next;
      remaining.current = durationOf(next);
      setStep(next);
    },
    [stepCount, durationOf],
  );

  useEffect(() => {
    if (!running) return;
    const current = step;
    const wait = remaining.current ?? durationOf(current);
    const startedAt = performance.now();
    const timer = window.setTimeout(() => goTo(current + 1), wait);
    return () => {
      window.clearTimeout(timer);
      // Paused mid-step: remember the time left. Step changed: goTo already reset it.
      if (stepRef.current === current) {
        remaining.current = Math.max(0, wait - (performance.now() - startedAt));
      }
    };
  }, [running, step, durationOf, goTo]);

  return {
    step: reducedMotion && !picked ? staticStep : step,
    /** Duration of the current step, for progress animations. */
    durationMs: durationOf(step),
    running,
    reducedMotion,
    pausedByUser,
    toggleUserPause: () => setPausedByUser((value) => !value),
    setPausedByHover,
    /** Jump to a step (e.g. from a timeline button). */
    goTo: (index: number) => {
      setPicked(true);
      goTo(index);
    },
  };
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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
  intervalMs: number;
  /** Step shown when motion is reduced. */
  staticStep: number;
};

/**
 * Drives the hero demo. One clock feeds every mockup so they never disagree.
 * Stops when: the visitor pauses it, they hover the scene, the tab is hidden,
 * or they prefer reduced motion (then a single static frame is shown).
 */
export function useQueueDemo({ stepCount, intervalMs, staticStep }: Options) {
  const [step, setStep] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [pausedByHover, setPausedByHover] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabHidden = useTabHidden();

  const running = !reducedMotion && !pausedByUser && !pausedByHover && !tabHidden;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % stepCount), intervalMs);
    return () => window.clearInterval(timer);
  }, [running, stepCount, intervalMs]);

  return {
    step: reducedMotion ? staticStep : step,
    reducedMotion,
    pausedByUser,
    toggleUserPause: () => setPausedByUser((value) => !value),
    setPausedByHover,
  };
}

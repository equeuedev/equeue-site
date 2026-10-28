"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const COUNTERS = ["Counter 01", "Counter 02", "Counter 03"];
const START = 38;
const STEPS = 8;

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Footer's mini waiting-room display: "Now serving" ticks through example tokens.
 * Tokens and counters only, never names (same rule as the real display).
 * Stops while off screen and shows one static token with reduced motion.
 */
export function FooterTicker() {
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const timer = window.setInterval(() => setTick((t) => (t + 1) % STEPS), 2600);
    return () => window.clearInterval(timer);
  }, [reduced, visible]);

  const step = reduced ? 4 : tick;
  const token = `A-0${START + step}`;
  const counter = COUNTERS[step % COUNTERS.length];
  // Recent calls are the three tokens before the current one
  const recent = [1, 2, 3].map((n) => {
    const s = step - n;
    return {
      token: `A-0${START + s}`,
      counter: COUNTERS[((s % COUNTERS.length) + COUNTERS.length) % COUNTERS.length],
    };
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="overflow-hidden rounded-2xl bg-[#0e0a14] p-2 shadow-2xl shadow-black/40 ring-1 ring-white/10"
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 rounded-xl bg-charcoal px-5 py-4">
        <div>
          <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60">
            <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-lime" />
            Now serving
          </p>
          <p
            key={token}
            className="animate-tick mt-1 whitespace-nowrap font-sans text-4xl font-bold leading-tight tabular-nums text-lime"
          >
            {token}
          </p>
          <p
            key={counter}
            className="animate-tick text-xs font-semibold uppercase tracking-widest text-white"
          >
            {counter}
          </p>
        </div>
        <ul className="min-w-[7.5rem] self-center text-xs font-semibold tabular-nums text-white/60">
          {recent.map((call) => (
            <li
              key={call.token}
              className="flex justify-between gap-3 border-t border-white/10 py-1.5 first:border-t-0"
            >
              <span>{call.token}</span>
              <span>{call.counter.replace("Counter ", "C")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

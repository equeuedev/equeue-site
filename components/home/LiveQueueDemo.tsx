"use client";

import { useEffect, useState } from "react";
import { PhoneToken } from "@/components/mockups/PhoneToken";
import { TokenChip } from "@/components/ui/TokenChip";

const FRAMES = [
  { token: "A-021", ahead: "3" },
  { token: "A-022", ahead: "2" },
  { token: "A-023", ahead: "1" },
  { token: "A-023", ahead: "You're next" },
];

export function LiveQueueDemo() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const timer = window.setInterval(() => {
      if (!paused) setFrame((value) => (value + 1) % FRAMES.length);
    }, 3000);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  const current = FRAMES[frame];
  return (
    <div
      className="relative mx-auto min-h-[360px] w-[280px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-hidden="true"
    >
      <PhoneToken />
      <TokenChip token={current.token} className="absolute -left-4 top-10 -rotate-6 text-2xl shadow-lg sm:-left-10 sm:text-3xl" />
      <div className="absolute bottom-8 left-1/2 w-44 -translate-x-1/2 rounded-xl bg-white p-3 text-center shadow-lg">
        <p className="text-xs text-grey-purple">People ahead</p>
        <p className="font-display text-lg font-bold text-plum">{current.ahead}</p>
      </div>
    </div>
  );
}

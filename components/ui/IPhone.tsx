import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

const FRAME_W = 300;
const FRAME_H = 652;

/**
 * Status bar: clock on the left, signal, Wi-Fi and battery on the right,
 * vertically centred on the Dynamic Island like a real device.
 */
function StatusBar({ time }: { time: string }) {
  return (
    <div className="absolute inset-x-0 top-0 z-[5] flex h-[52px] items-center justify-between pl-[30px] pr-[26px] pt-[2px] text-plum">
      <span className="w-[62px] text-center text-[14px] font-semibold tabular-nums tracking-tight">
        {time}
      </span>
      <span className="flex items-center gap-[5px]">
        {/* Cellular signal: four rising bars */}
        <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* Wi-Fi */}
        <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .3 10.4 10.4 0 0 0 .7 3.2L2 4.6a8.5 8.5 0 0 1 6-2.4Z" />
          <path d="M8 5.6c1.4 0 2.6.5 3.6 1.4L12.9 5.6A7 7 0 0 0 8 3.7a7 7 0 0 0-4.9 1.9L4.4 7A5.2 5.2 0 0 1 8 5.6Z" />
          <path d="M8 9c.5 0 1 .2 1.3.5L8 11.9 6.7 9.5C7 9.2 7.5 9 8 9Z" />
        </svg>
        {/* Battery with charge level */}
        <svg viewBox="0 0 27 13" className="h-[12px] w-[26px]">
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="12"
            rx="3.6"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <rect x="2" y="2" width="16" height="9" rx="2.2" fill="currentColor" />
          <path d="M25 4.4v4.2a2.2 2.2 0 0 0 0-4.2Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

/**
 * iPhone 17 Pro Max frame: aluminium unibody, thin bezels, Dynamic Island,
 * side buttons and Camera Control. Decorative; screens are fictional example data.
 * `scale` shrinks the whole phone (layout size included) without reflowing the screen.
 * Pass `tabs={false}` to drop the app tab bar; `activeTab` picks the highlighted tab.
 */
export function IPhone({
  children,
  scale = 1,
  tabs = true,
  activeTab = "My queue",
  time = "2:05",
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  tabs?: boolean;
  activeTab?: "Home" | "My queue" | "Clinics" | "Profile";
  time?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto shrink-0 ${className}`}
      style={{ width: FRAME_W * scale, height: FRAME_H * scale }}
    >
      <div
        className="relative origin-top-left rounded-[3.5rem] bg-gradient-to-br from-[#6c7893] via-[#1f2533] to-[#58637d] p-1 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/20"
        style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
      >
        {/* Side buttons: action, volume, power, camera control */}
        <span className="absolute -left-[3px] top-[118px] h-[30px] w-[4px] rounded-l bg-[#2e3648]" />
        <span className="absolute -left-[3px] top-[170px] h-[54px] w-[4px] rounded-l bg-[#2e3648]" />
        <span className="absolute -left-[3px] top-[234px] h-[54px] w-[4px] rounded-l bg-[#2e3648]" />
        <span className="absolute -right-[3px] top-[196px] h-[88px] w-[4px] rounded-r bg-[#2e3648]" />
        <span className="absolute -right-[3px] top-[420px] h-[64px] w-[4px] rounded-r bg-[#3b445a]" />

        <div className="absolute inset-1 rounded-[3.25rem] bg-black" />
        <div className="absolute inset-2 overflow-hidden rounded-[3rem] bg-ivory text-plum">
          {/* Dynamic Island and status bar */}
          <div className="absolute left-1/2 top-[13px] z-10 h-[27px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
          <StatusBar time={time} />

          <div className="absolute inset-0 flex flex-col px-[15px] pt-14">{children}</div>

          {tabs && (
            <div className="absolute inset-x-0 bottom-0 flex h-[78px] justify-around border-t border-soft-grey bg-white pt-2.5 text-[10px] font-semibold text-grey-purple">
              {(
                [
                  ["clock", "Home"],
                  ["list", "My queue"],
                  ["door", "Clinics"],
                  ["users", "Profile"],
                ] as const
              ).map(([icon, label]) => (
                <span
                  key={label}
                  className={`flex flex-col items-center gap-1 ${label === activeTab ? "text-aubergine" : ""}`}
                >
                  <Icon name={icon} className="h-5 w-5" />
                  {label}
                </span>
              ))}
            </div>
          )}

          <div className="absolute bottom-2 left-1/2 z-10 h-[5px] w-28 -translate-x-1/2 rounded-full bg-plum" />
          <div className="pointer-events-none absolute inset-0 z-20 rounded-[3rem] bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

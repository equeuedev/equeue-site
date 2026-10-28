import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

const FRAME_W = 300;
const FRAME_H = 652;

/**
 * iPhone 17 Pro Max frame: aluminium unibody, thin bezels, Dynamic Island,
 * side buttons and Camera Control. Decorative; screens are fictional example data.
 * `scale` shrinks the whole phone (layout size included) without reflowing the screen.
 * Pass `tabs={false}` to drop the app tab bar.
 */
export function IPhone({
  children,
  scale = 1,
  tabs = true,
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  tabs?: boolean;
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
          <div className="absolute left-1/2 top-3 z-10 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-0 z-[5] flex h-[50px] items-start justify-between px-8 pt-[15px] text-[13px] font-bold">
            <span className="tabular-nums">2:05</span>
            <span className="flex items-center gap-1">
              <span className="h-[11px] w-[17px] rounded-[2px] bg-plum/80" />
              <span className="h-[11px] w-[13px] rounded-full bg-plum/80" />
              <span className="h-[12px] w-[24px] rounded-[4px] bg-plum" />
            </span>
          </div>

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
                  className={`flex flex-col items-center gap-1 ${label === "My queue" ? "text-aubergine" : ""}`}
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

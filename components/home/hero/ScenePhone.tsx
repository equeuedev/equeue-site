import { Icon } from "@/components/ui/Icon";
import {
  LEAVE_BY,
  MY_DOCTOR,
  MY_SERVICE,
  MY_TOKEN,
  type DemoStep,
  type TokenStatus,
} from "@/lib/queue-demo";

const STATUS_STYLES: Record<TokenStatus, string> = {
  Waiting: "bg-soft-grey text-plum",
  "Next up": "bg-lime text-plum",
  Called: "bg-aubergine text-white",
};

/**
 * Realistic customer phone: titanium frame, bezel, dynamic island and status bar,
 * with the digital token, place in line and alert. Decorative (parent is aria-hidden).
 * The status-bar clock is fixed example text.
 */
export function ScenePhone({ step, className = "" }: { step: DemoStep; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[260px] rounded-[3rem] bg-gradient-to-b from-[#8d8a93] via-[#4a4650] to-[#8d8a93] p-[3px] shadow-2xl shadow-black/40 sm:w-[300px] ${className}`}
    >
      {/* Side buttons */}
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-[#4a4650]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-[#4a4650]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-[#4a4650]"
      />

      <div className="relative rounded-[2.85rem] bg-black p-[9px]">
        <div className="relative overflow-hidden rounded-[2.3rem] bg-ivory">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3.5 text-[0.7rem] font-semibold text-plum">
            <span>2:05</span>
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="h-2 w-3 rounded-[2px] bg-plum/80" />
              <span className="h-2 w-2 rounded-full bg-plum/80" />
              <span className="h-2.5 w-5 rounded-[3px] bg-plum" />
            </span>
          </div>

          <div className="px-4 pb-5 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold tracking-tight text-aubergine">
                e-queue<span className="text-lime">.</span>
              </p>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aubergine text-[0.6rem] font-semibold text-white">
                SK
              </span>
            </div>

            {/* Alert slot keeps its height so nothing jumps when the alert appears */}
            <div className="mt-3 h-11">
              {step.alert ? (
                <div
                  key={step.alert}
                  className="animate-slide-in flex h-full items-center gap-2 rounded-2xl bg-lime px-3 text-[0.7rem] font-semibold text-plum"
                >
                  <Icon name="bell" className="h-4 w-4 shrink-0" />
                  <span>{step.alert}</span>
                </div>
              ) : (
                <div className="flex h-full items-center gap-2 rounded-2xl bg-soft-grey px-3 text-[0.7rem] font-medium text-grey-purple">
                  <Icon name="bell" className="h-4 w-4 shrink-0" />
                  <span>We&apos;ll alert you before your turn.</span>
                </div>
              )}
            </div>

            <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-grey-purple">Your token</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold transition-colors duration-300 ${STATUS_STYLES[step.status]}`}
                >
                  {step.status}
                </span>
              </div>
              <p className="whitespace-nowrap text-center font-sans text-5xl font-bold leading-tight tabular-nums text-plum">
                {MY_TOKEN}
              </p>
              <p className="text-center text-xs text-plum">
                {MY_SERVICE} · {MY_DOCTOR}
              </p>

              <div className="mt-4">
                <div className="flex items-baseline justify-between text-[0.7rem] text-grey-purple">
                  <span>Your place in line</span>
                  <span className="font-semibold tabular-nums text-plum">
                    {step.ahead === 0 ? "Your turn" : `${step.ahead} ahead`}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-soft-grey">
                  <div
                    className="h-full rounded-full bg-aubergine transition-[width] duration-700 ease-out"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-2 text-center text-[0.7rem]">
                <div className="rounded-xl bg-ivory py-2">
                  <dt className="text-grey-purple">Estimated wait</dt>
                  <dd className="text-sm font-semibold tabular-nums text-plum">{step.wait}</dd>
                </div>
                <div className="rounded-xl bg-ivory py-2">
                  <dt className="text-grey-purple">Leave by</dt>
                  <dd className="text-sm font-semibold tabular-nums text-plum">{LEAVE_BY}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 rounded-full bg-aubergine py-3 text-center text-sm font-semibold text-white">
              Download token
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

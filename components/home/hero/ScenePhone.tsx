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

/** Customer's phone: digital token, place in line, alert. Decorative (parent is aria-hidden). */
export function ScenePhone({ step }: { step: DemoStep }) {
  return (
    <div className="relative mx-auto w-full max-w-[270px] rounded-[2.5rem] border-[6px] border-plum bg-white p-4 shadow-2xl">
      <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-soft-grey" />

      {/* Alert slot keeps its height so nothing jumps when the alert appears */}
      <div className="mb-3 h-14">
        {step.alert && (
          <div
            key={step.alert}
            className="animate-slide-in flex h-full items-center gap-2 rounded-2xl bg-lime px-3 text-xs font-semibold text-plum"
          >
            <Icon name="bell" className="h-4 w-4 shrink-0" />
            <span>{step.alert}</span>
          </div>
        )}
      </div>

      <p className="text-xs font-medium text-grey-purple">Your token</p>
      <p className="whitespace-nowrap font-sans text-5xl font-bold leading-tight tabular-nums text-plum">
        {MY_TOKEN}
      </p>
      <p className="text-sm text-plum">
        {MY_SERVICE} · {MY_DOCTOR}
      </p>

      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 ${STATUS_STYLES[step.status]}`}
      >
        {step.status}
      </span>

      <div className="mt-4">
        <div className="flex items-baseline justify-between text-xs text-grey-purple">
          <span>Your place in line</span>
          <span className="font-semibold tabular-nums text-plum">
            {step.ahead === 0 ? "Your turn" : `${step.ahead} ahead`}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-soft-grey">
          <div
            className="h-full rounded-full bg-aubergine transition-[width] duration-700 ease-out"
            style={{ width: `${step.progress}%` }}
          />
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between border-b border-soft-grey pb-2">
          <dt className="text-grey-purple">Estimated wait</dt>
          <dd className="font-semibold tabular-nums text-plum">{step.wait}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-grey-purple">Leave by</dt>
          <dd className="font-semibold tabular-nums text-plum">{LEAVE_BY}</dd>
        </div>
      </dl>
    </div>
  );
}

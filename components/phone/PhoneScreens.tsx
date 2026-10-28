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

function AppHeader() {
  return (
    <div className="mb-2 flex items-center justify-between">
      <p className="font-display text-lg font-extrabold tracking-tight text-aubergine">
        e-queue<span className="text-lime">.</span>
      </p>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aubergine text-[0.6rem] font-semibold text-white">
        SK
      </span>
    </div>
  );
}

/** The patient's live token screen. Driven by a DemoStep so it can stay in sync with other mockups. */
export function TokenScreen({ step }: { step: DemoStep }) {
  return (
    <>
      <AppHeader />
      {/* The alert slot keeps its height so nothing jumps when the alert appears */}
      <div className="mt-1 h-11">
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

      <div className="mt-3 rounded-3xl border border-soft-grey bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-grey-purple">Your token</p>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold transition-colors duration-300 ${STATUS_STYLES[step.status]}`}
          >
            {step.status}
          </span>
        </div>
        <p className="whitespace-nowrap text-center font-sans text-5xl font-bold leading-tight tabular-nums">
          {MY_TOKEN}
        </p>
        <p className="text-center text-xs">
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
            <dd className="text-sm font-semibold tabular-nums">{step.wait}</dd>
          </div>
          <div className="rounded-xl bg-ivory py-2">
            <dt className="text-grey-purple">Leave by</dt>
            <dd className="text-sm font-semibold tabular-nums">{LEAVE_BY}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 rounded-full bg-aubergine py-3 text-center text-sm font-semibold text-white">
        Download token
      </div>
    </>
  );
}

const SERVICES = [
  { name: "Ultrasound", meta: "Dr. Ali · about 15 min" },
  { name: "General check-up", meta: "Dr. Khan · about 10 min" },
  { name: "Lab sample", meta: "Counter 03 · about 5 min" },
];

/** Step 1 of the patient journey: choose a service and get a token. */
export function JoinScreen() {
  return (
    <>
      <AppHeader />
      <p className="mt-1 font-display text-[1.375rem] font-extrabold tracking-tight">
        Join the queue
      </p>
      <p className="mb-3 text-xs text-grey-purple">Example Clinic · 6 people waiting</p>
      {SERVICES.map((service, index) => (
        <div
          key={service.name}
          className={`mb-2 flex items-center justify-between rounded-2xl border-[1.5px] bg-white px-3.5 py-3 text-[0.85rem] font-semibold ${
            index === 0 ? "border-aubergine ring-[3px] ring-aubergine/10" : "border-soft-grey"
          }`}
        >
          <span>
            {service.name}
            <span className="block text-[0.7rem] font-medium text-grey-purple">{service.meta}</span>
          </span>
          <span
            className={`h-[18px] w-[18px] rounded-full ${
              index === 0 ? "border-[5px] border-aubergine" : "border-2 border-soft-grey"
            }`}
          />
        </div>
      ))}
      <div className="mt-2 rounded-full bg-aubergine py-3 text-center text-sm font-semibold text-white">
        Get my token
      </div>
      <p className="mt-3 text-center text-[0.7rem] text-grey-purple">
        Or scan the QR at the clinic door
      </p>
    </>
  );
}

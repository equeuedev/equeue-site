import { Icon } from "@/components/ui/Icon";
import {
  LEAVE_BY,
  MY_DOCTOR,
  MY_SERVICE,
  MY_TOKEN,
  type DemoStep,
  type TokenStatus,
} from "@/lib/queue-demo";

// Status is never colour alone: every pill carries its text label.
const STATUS_STYLES: Record<TokenStatus, string> = {
  Waiting: "bg-soft-grey text-plum",
  Called: "bg-lime text-plum",
  Serving: "bg-aubergine text-white",
  Completed: "bg-success text-white",
};

const COUNTER = "Counter 02";

/**
 * In-app top bar: wordmark on the left, Logout at the top right of every screen (PRD §3).
 * `title` adds a screen title row; `live` shows the live-update indicator and pull-to-refresh hint.
 */
function AppHeader({ title, live = false }: { title?: string; live?: boolean }) {
  return (
    <div className="mb-2">
      <div className="flex h-9 items-center justify-between">
        <p className="font-display text-lg font-extrabold tracking-tight text-aubergine">
          e-queue<span className="text-lime">.</span>
        </p>
        <span className="flex items-center gap-1.5">
          {live && (
            <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[0.6rem] font-semibold text-plum ring-1 ring-soft-grey">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ring absolute inset-0 rounded-full bg-success" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Live
            </span>
          )}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-plum ring-1 ring-soft-grey"
            title="Log out"
          >
            <Icon name="logout" className="h-4 w-4" />
          </span>
        </span>
      </div>
      {title && (
        <div className="flex items-baseline justify-between">
          <p className="font-display text-[1.2rem] font-extrabold tracking-tight">{title}</p>
          {live && <p className="text-[0.6rem] text-grey-purple">Pull down to refresh</p>}
        </div>
      )}
    </div>
  );
}

function placeLabel(step: DemoStep) {
  switch (step.status) {
    case "Waiting":
      return step.ahead === 0 ? "You're next" : `${step.ahead} ahead`;
    case "Called":
      return "Your turn";
    case "Serving":
      return "In service";
    case "Completed":
      return "Done";
  }
}

function detailCells(step: DemoStep): [string, string][] {
  switch (step.status) {
    case "Waiting":
      return [
        ["Estimated wait", step.wait],
        ["Leave by", LEAVE_BY],
      ];
    case "Called":
      return [
        ["Go to", COUNTER],
        ["Arrive within", step.grace ?? "5:00"],
      ];
    case "Serving":
      return [
        ["Counter", COUNTER],
        ["Doctor", MY_DOCTOR],
      ];
    case "Completed":
      return [
        ["Outcome", "Completed"],
        ["Counter", COUNTER],
      ];
  }
}

/** The patient's live token screen (My queue). Driven by a DemoStep so it stays in sync with other mockups. */
export function TokenScreen({ step }: { step: DemoStep }) {
  const called = step.status === "Called";
  return (
    <>
      <AppHeader title="My queue" live={step.status !== "Completed"} />
      {/* The alert slot keeps its height so nothing jumps when the alert appears */}
      <div className="h-11">
        {step.alert ? (
          <div
            key={step.alert}
            className={`animate-slide-in flex h-full items-center gap-2 rounded-2xl px-3 text-[0.7rem] font-semibold ${
              step.status === "Serving"
                ? "bg-aubergine text-white"
                : step.status === "Completed"
                  ? "bg-white text-plum ring-1 ring-soft-grey"
                  : "bg-lime text-plum"
            }`}
          >
            <Icon
              name={step.status === "Completed" ? "check" : "bell"}
              className="h-4 w-4 shrink-0"
            />
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
            key={step.status}
            className={`animate-tick rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold ${STATUS_STYLES[step.status]}`}
          >
            {step.status}
          </span>
        </div>
        <div className="relative mx-auto mt-1 w-fit">
          {called && (
            <span
              className="animate-ring absolute inset-0 rounded-2xl bg-lime"
              aria-hidden="true"
            />
          )}
          <p
            className={`relative whitespace-nowrap rounded-2xl px-3 text-center font-sans text-5xl font-bold leading-tight tabular-nums transition-colors duration-300 ${
              called ? "bg-lime text-plum" : ""
            }`}
          >
            {MY_TOKEN}
          </p>
        </div>
        <p className="mt-1 text-center text-xs">
          {MY_SERVICE} · {MY_DOCTOR}
        </p>

        <div className="mt-4">
          <div className="flex items-baseline justify-between text-[0.7rem] text-grey-purple">
            <span>Your place in line</span>
            <span className="font-semibold tabular-nums text-plum">{placeLabel(step)}</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-soft-grey">
            <div
              className="h-full rounded-full bg-aubergine transition-[width] duration-700 ease-out"
              style={{ width: `${step.progress}%` }}
            />
          </div>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-center text-[0.7rem]">
          {detailCells(step).map(([label, value]) => (
            <div key={label} className="rounded-xl bg-ivory py-2">
              <dt className="text-grey-purple">{label}</dt>
              <dd className="text-sm font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Download Token: fully highlighted, filled button */}
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-aubergine py-3 text-center text-sm font-semibold text-white">
        Download token
      </div>
    </>
  );
}

const SERVICES = [
  { name: "Ultrasound", meta: "2 waiting · about 10 min" },
  { name: "General check-up", meta: "5 waiting · about 25 min" },
];

const DOCTORS = [
  { name: "Next available doctor", meta: "Default" },
  { name: "Dr. Ali", meta: "Available" },
];

/**
 * Join sheet: choose a service and doctor, then slide to confirm.
 * The slider is the only booking control (PRD JOIN-02): no confirm button.
 * `animate` plays the slide once (used in the hero flow).
 */
export function JoinScreen({ animate = false }: { animate?: boolean }) {
  return (
    <>
      <AppHeader title="Join the queue" />
      <p className="-mt-1 mb-3 text-xs text-grey-purple">Example Clinic · Open now</p>

      <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-grey-purple">
        Service
      </p>
      {SERVICES.map((service, index) => (
        <div
          key={service.name}
          className={`mb-2 flex items-center justify-between rounded-2xl border-[1.5px] bg-white px-3.5 py-2.5 text-[0.85rem] font-semibold ${
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

      <p className="mb-1.5 mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-grey-purple">
        Doctor
      </p>
      <div className="grid grid-cols-2 gap-2">
        {DOCTORS.map((doctor, index) => (
          <div
            key={doctor.name}
            className={`rounded-2xl border-[1.5px] bg-white px-3 py-2 text-[0.72rem] font-semibold leading-tight ${
              index === 0 ? "border-aubergine ring-[3px] ring-aubergine/10" : "border-soft-grey"
            }`}
          >
            {doctor.name}
            <span className="mt-0.5 block text-[0.62rem] font-medium text-grey-purple">
              {doctor.meta}
            </span>
          </div>
        ))}
      </div>

      {/* Slide-to-confirm */}
      <div className="relative mt-4 h-12 overflow-hidden rounded-full bg-aubergine/10 ring-1 ring-aubergine/20">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-aubergine ${animate ? "animate-slide-fill" : "w-0"}`}
        />
        <p className="absolute inset-0 flex items-center justify-center pl-8 text-[0.8rem] font-semibold text-aubergine">
          Slide to get your token
        </p>
        <span
          className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full bg-lime text-plum shadow-md ${
            animate ? "animate-slide-thumb" : "left-1"
          }`}
        >
          <Icon name="arrowRight" className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-2 text-center text-[0.65rem] text-grey-purple">
        You can leave the queue at any time.
      </p>
    </>
  );
}

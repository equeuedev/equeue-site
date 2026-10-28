// The complete E-Queue flow shown in the hero stage, one step at a time.
// Example data only: no real clinic, doctor or patient, and no figures that read as results.
// Public display and slips show token and counter only (never names, phones or position).

import type { DemoStep } from "@/lib/queue-demo";

export type Source = "App" | "Walk-in" | "Phone";
export type QueueRow = { token: string; source: Source; isNew?: boolean };

export type FlowStep = {
  id: string;
  /** Short label for the timeline button. */
  label: string;
  /** One line shown under the stage while this step plays. */
  caption: string;
  durationMs: number;
  /** Clock on the phone's status bar. */
  time: string;
  /** What the patient's phone shows. */
  phone: { screen: "join" } | { screen: "token"; step: DemoStep };
  /** Counter 02 on the reception board and the waiting-room display. */
  counter: { token: string; state: "Serving" | "Called" };
  /** Up next on the reception board (oldest join first). */
  queue: QueueRow[];
  /** Push notification on the patient's phone, or null. */
  push: { title: string; body: string } | null;
  /** Walk-in token slip printed at reception, or null. */
  slip: string | null;
  /** Reception is pressing Call next in this step. */
  calling?: boolean;
};

export const FLOW_TOKEN = "A-042";
const COUNTER = "Counter 02";

function token(
  status: DemoStep["status"],
  ahead: number,
  wait: string,
  progress: number,
  alert: string | null,
  grace?: string,
): DemoStep {
  return {
    serving: "",
    ahead,
    wait,
    progress,
    status,
    alert,
    waiting: ahead + 3,
    recent: [],
    grace,
  };
}

export const FLOW_STEPS: FlowStep[] = [
  {
    id: "join",
    label: "Join",
    caption: "The patient picks a service, keeps Next available doctor, and slides to confirm.",
    durationMs: 3800,
    time: "1:58",
    phone: { screen: "join" },
    counter: { token: "A-039", state: "Serving" },
    queue: [
      { token: "A-040", source: "App" },
      { token: "A-041", source: "Phone" },
    ],
    push: null,
    slip: null,
  },
  {
    id: "token",
    label: "Get a token",
    caption:
      "Token A-042 joins the same line as walk-in and phone patients. Walk-ins get a printed slip.",
    durationMs: 3800,
    time: "1:59",
    phone: { screen: "token", step: token("Waiting", 2, "~10 min", 30, null) },
    counter: { token: "A-039", state: "Serving" },
    queue: [
      { token: "A-040", source: "App" },
      { token: "A-041", source: "Phone" },
      { token: "A-042", source: "App", isNew: true },
      { token: "A-043", source: "Walk-in", isNew: true },
    ],
    push: {
      title: "Token A-042 booked",
      body: "2 ahead of you. We'll alert you before your turn.",
    },
    slip: "A-043",
  },
  {
    id: "wait",
    label: "Wait anywhere",
    caption:
      "Their place updates live as reception calls each token. No need to sit in the waiting room.",
    durationMs: 3600,
    time: "2:12",
    phone: { screen: "token", step: token("Waiting", 1, "~5 min", 65, null) },
    counter: { token: "A-040", state: "Serving" },
    queue: [
      { token: "A-041", source: "Phone" },
      { token: "A-042", source: "App" },
      { token: "A-043", source: "Walk-in" },
    ],
    push: null,
    slip: "A-043",
  },
  {
    id: "alert",
    label: "Get alerted",
    caption: "A push alert says they're next, so they arrive just before their turn.",
    durationMs: 3600,
    time: "2:18",
    phone: {
      screen: "token",
      step: token("Waiting", 0, "~2 min", 90, "You're next. Head to Counter 02."),
    },
    counter: { token: "A-041", state: "Serving" },
    queue: [
      { token: "A-042", source: "App" },
      { token: "A-043", source: "Walk-in" },
      { token: "A-044", source: "Phone", isNew: true },
    ],
    push: { title: "You're next", body: "Head to Counter 02 now." },
    slip: "A-043",
  },
  {
    id: "called",
    label: "Called",
    caption:
      "Reception taps Call next. Phone and display show A-042 at Counter 02, with a 5 minute grace timer.",
    durationMs: 4000,
    time: "2:20",
    phone: {
      screen: "token",
      step: token("Called", 0, "Now", 100, "Counter 02 is calling you.", "4:58"),
    },
    counter: { token: FLOW_TOKEN, state: "Called" },
    queue: [
      { token: "A-043", source: "Walk-in" },
      { token: "A-044", source: "Phone" },
    ],
    push: { title: "It's your turn", body: "Counter 02 is calling A-042." },
    slip: "A-043",
    calling: true,
  },
  {
    id: "serving",
    label: "Serving",
    caption: "The patient arrives and staff start the service.",
    durationMs: 3000,
    time: "2:21",
    phone: {
      screen: "token",
      step: token("Serving", 0, "Now", 100, "You're with Dr. Ali at Counter 02."),
    },
    counter: { token: FLOW_TOKEN, state: "Serving" },
    queue: [
      { token: "A-043", source: "Walk-in" },
      { token: "A-044", source: "Phone" },
    ],
    push: null,
    slip: "A-043",
  },
  {
    id: "done",
    label: "Completed",
    caption: "Staff complete the visit. Every entry ends with exactly one outcome.",
    durationMs: 3400,
    time: "2:34",
    phone: {
      screen: "token",
      step: token("Completed", 0, "Done", 100, "Visit complete. Thank you."),
    },
    counter: { token: "A-043", state: "Serving" },
    queue: [{ token: "A-044", source: "Phone" }],
    push: null,
    slip: null,
  },
];

export const FLOW_DURATIONS = FLOW_STEPS.map((step) => step.durationMs);

/** Step shown when motion is reduced (until the visitor picks a step). */
export const FLOW_STATIC_STEP = 4;

export const FLOW_COUNTER = COUNTER;

export const FLOW_DESCRIPTION =
  "Illustration with example data showing the full E-Queue flow. A patient joins from their phone and gets token A-042. " +
  "Walk-in and phone patients join the same line, and walk-ins get a printed slip. The patient's place updates live, " +
  "a push alert says they are next, reception calls A-042 to Counter 02 and the waiting-room display shows it. " +
  "Staff start the service and complete the visit.";

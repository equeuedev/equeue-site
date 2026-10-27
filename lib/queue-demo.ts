// Example data for the hero scene. Everything here is fictional and must stay obviously so:
// no real clinic, doctor or patient names, and no figures that read as results.

export const MY_TOKEN = "A-042";
export const MY_SERVICE = "Ultrasound";
export const MY_DOCTOR = "Dr. Ali";
export const LEAVE_BY = "2:20 PM";

export type TokenStatus = "Waiting" | "Next up" | "Called";

export type DemoStep = {
  /** Token being served at Counter 02 right now. */
  serving: string;
  /** People waiting ahead of MY_TOKEN. */
  ahead: number;
  /** Estimated wait label. */
  wait: string;
  /** Progress bar fill, 0 to 100. */
  progress: number;
  status: TokenStatus;
  /** Alert shown on the phone, or null. */
  alert: string | null;
  /** Everyone waiting in the clinic (shown on the counter board). */
  waiting: number;
  /** Recent calls on the waiting-room display, newest first. */
  recent: { token: string; counter: string }[];
};

const OTHER_CALLS = [
  { token: "B-014", counter: "Counter 01" },
  { token: "B-013", counter: "Counter 03" },
];

function step(
  servingNumber: number,
  ahead: number,
  wait: string,
  progress: number,
  status: TokenStatus,
  alert: string | null,
): DemoStep {
  return {
    serving: `A-0${servingNumber}`,
    ahead,
    wait,
    progress,
    status,
    alert,
    waiting: ahead + 3,
    recent: [{ token: `A-0${servingNumber - 1}`, counter: "Counter 02" }, ...OTHER_CALLS],
  };
}

export const DEMO_STEPS: DemoStep[] = [
  step(38, 3, "~15 min", 20, "Waiting", null),
  step(39, 2, "~10 min", 45, "Waiting", null),
  step(40, 1, "~5 min", 70, "Waiting", null),
  step(41, 0, "~2 min", 90, "Next up", "You're next. Head to Counter 02."),
  step(42, 0, "Now", 100, "Called", "Counter 02 is calling you."),
];

/** Frame shown with JavaScript off or reduced motion: the "You're next" alert. */
export const STATIC_STEP = 3;

export const STEP_INTERVAL_MS = 3000;

export const SCENE_DESCRIPTION =
  "Illustration with example data. A patient with token A-042 watches their place move up the line on their phone, " +
  "while reception calls tokens from the counter board and the waiting-room display shows who is being served. " +
  "The patient gets an alert when they are next.";

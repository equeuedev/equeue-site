import type { DemoStep } from "@/lib/queue-demo";

const OTHER_COUNTERS = [
  { name: "Counter 01", doctor: "Dr. Khan", token: "B-014", state: "In service" },
  { name: "Counter 03", doctor: "Dr. Raza", token: "Free", state: "Ready" },
];

/** Reception's counter board. Decorative; example data only. */
export function SceneBoard({ step }: { step: DemoStep }) {
  const rows = [
    OTHER_COUNTERS[0],
    { name: "Counter 02", doctor: "Dr. Ali", token: step.serving, state: "In service" },
    OTHER_COUNTERS[1],
  ];

  return (
    <div className="rounded-2xl bg-white p-4 text-plum shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">Counter board</p>
        <span className="rounded-full bg-ivory px-2.5 py-1 text-[0.65rem] font-semibold tabular-nums text-grey-purple">
          {step.waiting} waiting
        </span>
      </div>

      <ul className="mt-3 divide-y divide-soft-grey">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between gap-3 py-2">
            <div>
              <p className="text-xs font-semibold">{row.name}</p>
              <p className="text-[0.7rem] text-grey-purple">{row.doctor}</p>
            </div>
            <div className="text-right">
              <p
                key={row.token}
                className="animate-tick whitespace-nowrap font-sans text-base font-bold tabular-nums leading-tight"
              >
                {row.token}
              </p>
              <p className="text-[0.7rem] text-grey-purple">{row.state}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-full bg-lime py-2 text-center text-xs font-semibold text-plum">
        Call next
      </div>
    </div>
  );
}

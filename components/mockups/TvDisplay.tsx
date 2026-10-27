/**
 * Illustrative waiting-room display: tokens and counters only, never names.
 * Charcoal Plum background, lime token. Decorative (aria-hidden).
 */
export function TvDisplay() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border-[8px] border-plum bg-charcoal text-white shadow-2xl"
    >
      <div className="grid gap-6 p-6 sm:grid-cols-[1.4fr_1fr] sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Now serving
          </p>
          <p className="mt-2 font-sans text-6xl font-bold tabular-nums text-lime sm:text-8xl">
            A-023
          </p>
          <p className="mt-2 text-lg font-semibold uppercase tracking-widest">Counter 02</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Recent calls
          </p>
          <ul className="mt-3 space-y-2 font-sans text-xl font-semibold tabular-nums">
            <li className="flex justify-between border-b border-white/15 pb-2">
              <span>A-022</span>
              <span className="text-white/70">Counter 01</span>
            </li>
            <li className="flex justify-between border-b border-white/15 pb-2">
              <span>B-014</span>
              <span className="text-white/70">Counter 03</span>
            </li>
            <li className="flex justify-between">
              <span>A-021</span>
              <span className="text-white/70">Counter 02</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-aubergine px-6 py-3 text-sm font-medium text-white sm:px-8">
        Lab closes at 4 PM today
      </div>
    </div>
  );
}

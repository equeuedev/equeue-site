/**
 * Illustrative phone screen of the customer's digital token (My Queue).
 * Decorative: hidden from screen readers. Names and numbers are examples.
 */
export function PhoneToken() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-[260px] rounded-[2.5rem] border-[6px] border-plum bg-white p-4 shadow-2xl sm:w-[290px]"
    >
      <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-soft-grey" />
      <p className="text-xs font-medium text-grey-purple">Your token</p>
      <p className="font-sans text-5xl font-bold tabular-nums text-plum">A-042</p>
      <p className="mt-1 text-sm text-plum">Ultrasound · Dr. Ali</p>

      <span className="mt-3 inline-block rounded-full bg-soft-grey px-3 py-1 text-xs font-semibold text-plum">
        Status: Waiting
      </span>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between border-b border-soft-grey pb-2">
          <dt className="text-grey-purple">People ahead</dt>
          <dd className="font-semibold tabular-nums text-plum">3</dd>
        </div>
        <div className="flex justify-between border-b border-soft-grey pb-2">
          <dt className="text-grey-purple">Estimated wait</dt>
          <dd className="font-semibold tabular-nums text-plum">~15 min</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-grey-purple">Leave by</dt>
          <dd className="font-semibold tabular-nums text-plum">2:05 PM</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-full bg-aubergine py-3 text-center text-sm font-semibold text-white">
        Download token
      </div>
    </div>
  );
}

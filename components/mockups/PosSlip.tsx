/**
 * Illustrative POS-receipt token slip (80 mm). Static identity only:
 * no position, no estimate, no counter. Decorative (aria-hidden).
 */
export function PosSlip() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-[220px] bg-white px-5 py-6 text-center text-plum shadow-xl"
      style={{
        // zig-zag top and bottom edges like torn receipt paper
        clipPath:
          "polygon(0 6px, 5% 0, 10% 6px, 15% 0, 20% 6px, 25% 0, 30% 6px, 35% 0, 40% 6px, 45% 0, 50% 6px, 55% 0, 60% 6px, 65% 0, 70% 6px, 75% 0, 80% 6px, 85% 0, 90% 6px, 95% 0, 100% 6px, 100% calc(100% - 6px), 95% 100%, 90% calc(100% - 6px), 85% 100%, 80% calc(100% - 6px), 75% 100%, 70% calc(100% - 6px), 65% 100%, 60% calc(100% - 6px), 55% 100%, 50% calc(100% - 6px), 45% 100%, 40% calc(100% - 6px), 35% 100%, 30% calc(100% - 6px), 25% 100%, 20% calc(100% - 6px), 15% 100%, 10% calc(100% - 6px), 5% 100%, 0 calc(100% - 6px))",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider">Example Clinic</p>
      <p className="mt-3 font-sans text-6xl font-bold tabular-nums">A-042</p>
      <p className="mt-2 text-sm">Ultrasound</p>
      <p className="mt-1 text-xs text-grey-purple">12 Aug 2026, 2:18 PM</p>
      <p className="mt-4 border-t border-dashed border-grey-purple pt-3 text-xs font-semibold uppercase tracking-wider">
        Watch the display
      </p>
    </div>
  );
}

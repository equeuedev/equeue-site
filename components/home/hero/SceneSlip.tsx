import { MY_SERVICE, MY_TOKEN } from "@/lib/queue-demo";

/** POS-receipt token slip: static identity only (token and service). Decorative. */
export function SceneSlip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white px-3 py-4 text-center text-plum shadow-xl ${className}`}
      style={{
        // torn-paper top and bottom edges
        clipPath:
          "polygon(0 5px, 8% 0, 16% 5px, 24% 0, 32% 5px, 40% 0, 48% 5px, 56% 0, 64% 5px, 72% 0, 80% 5px, 88% 0, 96% 5px, 100% 2px, 100% calc(100% - 5px), 96% 100%, 88% calc(100% - 5px), 80% 100%, 72% calc(100% - 5px), 64% 100%, 56% calc(100% - 5px), 48% 100%, 40% calc(100% - 5px), 32% 100%, 24% calc(100% - 5px), 16% 100%, 8% calc(100% - 5px), 0 calc(100% - 3px))",
      }}
    >
      <p className="text-[0.6rem] font-semibold uppercase tracking-wider">Example Clinic</p>
      <p className="mt-1.5 whitespace-nowrap font-sans text-2xl font-bold leading-none tabular-nums">
        {MY_TOKEN}
      </p>
      <p className="mt-1.5 text-[0.65rem]">{MY_SERVICE}</p>
      <p className="mt-2 border-t border-dashed border-grey-purple pt-1.5 text-[0.55rem] font-semibold uppercase tracking-wider">
        Watch the display
      </p>
    </div>
  );
}

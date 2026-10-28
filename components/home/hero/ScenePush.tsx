import { Icon } from "@/components/ui/Icon";

/**
 * Lock-screen style push notification (app push only, PRD).
 * `visible` fades it in and out without unmounting, so the stage never jumps.
 */
export function ScenePush({
  push,
  visible,
  className = "",
}: {
  push: { title: string; body: string };
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      className={`transition-[opacity,transform] duration-500 ease-out ${
        visible ? "opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      } ${className}`}
    >
      <div
        key={push.title}
        className={`rounded-2xl bg-white/95 p-3.5 text-plum shadow-xl ring-1 ring-black/5 backdrop-blur ${
          visible ? "animate-pop-in" : ""
        }`}
      >
        <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-wider text-grey-purple">
          <span className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-aubergine text-lime">
              <Icon name="bell" className="h-3 w-3" />
            </span>
            E-Queue
          </span>
          <span className="normal-case tracking-normal">now</span>
        </div>
        <p className="mt-2 text-sm font-bold leading-snug">{push.title}</p>
        <p className="text-xs text-grey-purple">{push.body}</p>
      </div>
    </div>
  );
}

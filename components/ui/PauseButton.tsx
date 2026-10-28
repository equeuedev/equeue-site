import { Icon } from "@/components/ui/Icon";

/** WCAG 2.2.2 pause control for looping motion. */
export function PauseButton({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className="mx-auto mt-3 flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-grey-purple hover:text-plum"
    >
      <Icon name={paused ? "play" : "pause"} className="h-4 w-4" />
      {paused ? "Play animation" : "Pause animation"}
    </button>
  );
}

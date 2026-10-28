import { Icon } from "@/components/ui/Icon";
import { MY_TOKEN, type DemoStep } from "@/lib/queue-demo";

/** Lock-screen style push notification. Always has content so it never pops in and out. */
export function ScenePush({ step, className = "" }: { step: DemoStep; className?: string }) {
  const text = step.alert ?? `${step.ahead} ahead of you · about ${step.wait.replace("~", "")}`;
  return (
    <div className={`rounded-2xl bg-white/95 p-3.5 text-plum shadow-xl ${className}`}>
      <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-wider text-grey-purple">
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-aubergine text-lime">
            <Icon name="bell" className="h-3 w-3" />
          </span>
          E-Queue
        </span>
        <span className="normal-case tracking-normal">now</span>
      </div>
      <p key={text} className="animate-slide-in mt-2 text-sm font-semibold leading-snug">
        {text}
      </p>
      <p className="text-xs text-grey-purple">Your token is {MY_TOKEN}.</p>
    </div>
  );
}

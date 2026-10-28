import { IPhone } from "@/components/ui/IPhone";
import { TokenScreen } from "@/components/phone/PhoneScreens";
import type { DemoStep } from "@/lib/queue-demo";

/** The customer's phone in the hero. Decorative (parent is aria-hidden). */
export function ScenePhone({ step, className = "" }: { step: DemoStep; className?: string }) {
  return (
    <IPhone className={className}>
      <TokenScreen step={step} />
    </IPhone>
  );
}

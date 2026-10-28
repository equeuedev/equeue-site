import { IPhone } from "@/components/ui/IPhone";
import { JoinScreen, TokenScreen } from "@/components/phone/PhoneScreens";
import type { FlowStep } from "@/lib/hero-flow";

/** The patient's phone in the hero. Decorative (parent is aria-hidden). */
export function ScenePhone({ step, className = "" }: { step: FlowStep; className?: string }) {
  return (
    <IPhone
      className={className}
      time={step.time}
      activeTab={step.phone.screen === "join" ? "Clinics" : "My queue"}
    >
      {step.phone.screen === "join" ? (
        <JoinScreen key={step.id} animate />
      ) : (
        <TokenScreen step={step.phone.step} />
      )}
    </IPhone>
  );
}

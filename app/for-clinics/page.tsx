import type { Metadata } from "next";
import { MarketingPage } from "@/components/ui/MarketingPage";
export const metadata: Metadata = {
  title: "For Clinics",
  description: "Give patients their time back and give your team one live line to manage.",
};
export default function Page() {
  return (
    <MarketingPage
      title="Run a calmer clinic."
      intro="Give patients their time back and give your team one live line to manage."
      sections={[
        {
          title: "See the whole room at a glance",
          body: "A counter board shows who's being served, who's next and who was skipped. Idle counters with patients waiting are flagged.",
        },
        {
          title: "Set it up your way",
          body: "Assign doctors to counters, and several services to one doctor. The system checks the doctor is free before every call.",
        },
        {
          title: "Walk-ins, calls and app patients in one line",
          body: "Add anyone with a single Add Customer button. Priority is a deliberate staff decision with a reason.",
        },
        {
          title: "Know where time is lost",
          body: "Waits, service times, peak hours, no-show and left rates, and a ratings summary, with the sample size on every number.",
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { MarketingPage } from "@/components/ui/MarketingPage";
export const metadata: Metadata = {
  title: "Why E-Queue",
  description: "Better than paper tokens, simpler than tools built for everyone else.",
};
export default function Page() {
  return (
    <MarketingPage
      title="Better than paper tokens. Simpler than the tools built for everyone else."
      intro="Most clinics manage waits with paper, a receptionist's memory or a WhatsApp group. E-Queue replaces the guesswork."
      sections={[
        { title: "Patients know their place", body: "Live position, wait and leave-by time." },
        { title: "Waiting room stays calm", body: "Patients wait anywhere." },
        { title: "Walk-ins treated fairly", body: "One line, clear rules." },
        { title: "Honest data", body: "Sample size on every number." },
      ]}
    />
  );
}

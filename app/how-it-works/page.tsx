import type { Metadata } from "next";
import { MarketingPage } from "@/components/ui/MarketingPage";
export const metadata: Metadata = {
  title: "How It Works",
  description: "From the first tap to a finished visit, and from contract to live.",
};
export default function Page() {
  return (
    <MarketingPage
      title="From the first tap to a finished visit."
      intro="From the first tap to a finished visit, and from contract to live."
      sections={[
        { title: "Find a clinic", body: "Find a clinic and choose a service and doctor." },
        { title: "Get your token", body: "Slide to confirm and get your digital token." },
        {
          title: "Wait wherever you like",
          body: "Watch your position and wait. Get the alert, then walk in when you're called.",
        },
        {
          title: "Live in a week (our goal)",
          body: "We create your clinic, set up your template, install the printer and display, train your team, then test and go live.",
        },
      ]}
    />
  );
}

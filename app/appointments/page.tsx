import type { Metadata } from "next";
import { MarketingPage } from "@/components/ui/MarketingPage";
export const metadata: Metadata = {
  title: "Appointments",
  description: "Let customers book ahead while walk-ins keep a fair place in the same live line.",
};
export default function Page() {
  return (
    <MarketingPage
      title="Book ahead. Or walk in. Everyone gets a fair place."
      intro="Let patients and customers book a time, while walk-ins and phone callers keep a fair spot in the same live line."
      sections={[
        { title: "Book in advance", body: "Pick a service and a time." },
        {
          title: "One live line",
          body: "Bookings, walk-ins and phone customers appear together for staff.",
        },
        {
          title: "No double handling",
          body: "The same alerts, token and display as every other customer.",
        },
      ]}
    />
  );
}

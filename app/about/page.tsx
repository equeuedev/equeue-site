import type { Metadata } from "next";
import { MarketingPage } from "@/components/ui/MarketingPage";
export const metadata: Metadata = {
  title: "About",
  description: "E-Queue is built for the line we've all stood in. Our story and values.",
};
export default function Page() {
  return (
    <MarketingPage
      title="Built for the line we've all stood in."
      intro="In Lahore, patients often visit a clinic only to get a token, then wait with no idea how long it will take."
      sections={[
        { title: "Your time matters", body: "E-Queue gives people their time back." },
        {
          title: "Clear before clever",
          body: "Short, honest experiences for businesses and customers.",
        },
        { title: "Fair to every customer", body: "One clearer, fairer way to serve people." },
      ]}
    />
  );
}

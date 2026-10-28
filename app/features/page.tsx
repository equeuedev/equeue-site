import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FeatureExplorer } from "@/components/features/FeatureExplorer";
export const metadata: Metadata = {
  title: "Features",
  description:
    "Counter board, waiting-room display, printed token slips, analytics and role-based logins. Everything a busy clinic needs.",
};
export default function FeaturesPage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="font-hero text-4xl uppercase tracking-wide">
        Everything a busy clinic needs. Nothing it doesn&apos;t.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-grey-purple">
        One clear line for your team, with the tools to keep every waiting room moving.
      </p>
      <div className="mt-10">
        <FeatureExplorer />
      </div>
      <div className="mt-10">
        <Button href="/contact">Contact us</Button>
      </div>
    </Container>
  );
}

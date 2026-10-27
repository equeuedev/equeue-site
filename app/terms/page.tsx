import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "Terms" };

// TODO: replace with the real terms.
export default function TermsPage() {
  return (
    <PlaceholderPage title="Terms" note="Placeholder. Final terms to be added before launch." />
  );
}

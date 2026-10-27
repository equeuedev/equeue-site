import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/** Temporary page body so footer and CTA links don't 404 while you build. */
export function PlaceholderPage({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold text-plum">{title}</h1>
      <p className="mt-4 max-w-xl text-lg text-grey-purple">{note}</p>
      <div className="mt-8">
        <Button href="/">Back to Home</Button>
      </div>
    </Container>
  );
}

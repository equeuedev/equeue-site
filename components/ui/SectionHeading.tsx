import { HighlightedText } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  /** Important words inside `title`, marked in lime as in the hero. */
  highlight?: string;
  intro?: string;
  align?: "left" | "center";
  /** Set true on dark (aubergine / charcoal) backgrounds. */
  onDark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  intro,
  align = "left",
  onDark = false,
}: Props) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            onDark ? "text-lime" : "text-aubergine"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-hero text-2xl uppercase leading-[1.5] tracking-wide sm:text-3xl lg:text-4xl ${
          onDark ? "text-white" : "text-plum"
        }`}
      >
        <HighlightedText text={title} highlight={highlight} />
      </h2>
      {intro && (
        <p className={`mt-4 text-lg ${onDark ? "text-white/85" : "text-grey-purple"}`}>{intro}</p>
      )}
    </Reveal>
  );
}

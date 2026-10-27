type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** Set true on dark (aubergine / charcoal) backgrounds. */
  onDark?: boolean;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", onDark = false }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
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
        className={`font-hero text-3xl uppercase tracking-wide sm:text-4xl ${
          onDark ? "text-white" : "text-plum"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg ${onDark ? "text-white/85" : "text-grey-purple"}`}>{intro}</p>
      )}
    </div>
  );
}

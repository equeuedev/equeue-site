import type { ReactNode } from "react";

/**
 * Lime marker behind important words, as in the hero. Dark plum text on lime (never white).
 * Inside a <Reveal>, the marker draws in from left to right when it scrolls into view.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="marker rounded-lg px-2 text-plum [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
      {children}
    </span>
  );
}

/** Renders `text` with the first occurrence of `highlight` marked. */
export function HighlightedText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const index = text.indexOf(highlight);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <Highlight>{highlight}</Highlight>
      {text.slice(index + highlight.length)}
    </>
  );
}

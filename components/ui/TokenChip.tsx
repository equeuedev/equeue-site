/** The signature element: a lime token chip. Dark plum text on lime. */
export function TokenChip({
  token,
  className = "",
}: {
  token: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-2xl bg-lime px-4 py-2 font-sans font-bold tabular-nums text-plum ${className}`}
    >
      {token}
    </span>
  );
}

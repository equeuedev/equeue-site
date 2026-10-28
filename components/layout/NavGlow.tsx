/**
 * Soft aurora inside the frosted navbar: two slow, heavily blurred blobs at the edges
 * (aubergine behind the logo, a faint lime near the end) so the glass never looks flat,
 * even over the plain ivory page. Kept away from the centre so link contrast holds.
 */
export function NavGlow() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
    >
      <span className="animate-drift absolute -left-10 -top-10 h-28 w-48 rounded-full bg-aubergine/70 blur-2xl" />
      <span className="animate-drift absolute -bottom-12 -right-6 h-24 w-40 rounded-full bg-lime/15 blur-2xl [animation-delay:-7s]" />
    </span>
  );
}

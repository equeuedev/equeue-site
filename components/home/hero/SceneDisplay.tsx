/**
 * Waiting-room TV: token and counter only, never names, phones, position or estimates.
 * Charcoal Plum background with the lime "called" token. Decorative.
 */
export function SceneDisplay({
  token,
  counter,
  called = false,
  className = "",
}: {
  token: string;
  counter: string;
  /** Pulse the token while it is being called. */
  called?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-2xl border-[6px] border-[#0e0a14] bg-charcoal text-white shadow-2xl shadow-black/40">
        <div
          key={called ? token : "idle"}
          className={`p-4 text-center ${called ? "animate-flash" : ""}`}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            Now serving
          </p>
          <div className="relative mx-auto mt-1 w-fit">
            {called && <span className="animate-ring absolute inset-0 rounded-xl bg-lime/60" />}
            <p
              key={token}
              className={`animate-tick relative whitespace-nowrap rounded-xl px-3 font-sans text-5xl font-bold leading-tight tabular-nums ${
                called ? "bg-lime text-plum" : "text-lime"
              }`}
            >
              {token}
            </p>
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest">{counter}</p>
        </div>
        <div className="bg-aubergine px-4 py-2 text-xs font-medium text-white">
          Welcome to Example Clinic
        </div>
      </div>
      {/* TV stand */}
      <div className="mx-auto h-4 w-10 bg-[#0e0a14]/70" />
    </div>
  );
}

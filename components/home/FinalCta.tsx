import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** Example tokens for the moving strip. Tokens only, never names (same rule as the display). */
const TOKENS = Array.from({ length: 12 }, (_, i) => `A-0${36 + i}`);
const CALLED = "A-042";

/**
 * Closing call to action, kept minimal: one headline, one line, two actions.
 * Motion is ambient only: drifting glow and a slow strip of tokens with the called one in lime.
 * Goals are labelled as goals, never results.
 */
export function FinalCta() {
  return (
    <section id="pilot" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-aubergine px-6 pb-8 pt-16 text-center sm:rounded-[2.5rem] sm:pt-20">
          {/* Ambient glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="animate-drift absolute -left-24 -top-24 h-80 w-80 rounded-full bg-plum/60 blur-3xl" />
            <span className="animate-drift absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-lime/15 blur-3xl [animation-delay:-7s]" />
          </div>

          <Reveal variant="blur" className="relative mx-auto max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
              <span
                aria-hidden="true"
                className="animate-pulse-soft h-2 w-2 rounded-full bg-lime"
              />
              Pilot program · Lahore
            </p>
            <h2 className="mt-5 font-hero text-2xl uppercase leading-[1.5] tracking-wide text-white sm:text-3xl lg:text-4xl">
              Be one of our <Highlight>first clinics</Highlight>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-lg text-white/85">
              On-site setup and staff training. Our goal is contract to live in 7 days.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" variant="lime" className="group gap-2">
                Contact us
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Link
                href="/pilot"
                className="inline-flex min-h-11 items-center px-4 text-base font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-lime"
              >
                About the pilot
              </Link>
            </div>
          </Reveal>

          {/* Slow strip of tokens; fades at both edges */}
          <div
            aria-hidden="true"
            className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          >
            <ul className="animate-marquee flex w-max gap-3">
              {[...TOKENS, ...TOKENS].map((token, i) => (
                <li
                  key={`${token}-${i}`}
                  className={`rounded-xl px-4 py-2 font-sans text-lg font-bold tabular-nums ${
                    token === CALLED ? "bg-lime text-plum" : "bg-white/10 text-white/70"
                  }`}
                >
                  {token}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

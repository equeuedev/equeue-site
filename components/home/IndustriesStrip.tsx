import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES } from "@/lib/industries";

const TINTS = ["bg-[#e9e2f0]", "bg-[#eaf3c9]", "bg-[#f0e6e3]"];

/** "A-023" becomes "A-022": the token currently being served in the example. */
function previousToken(token: string) {
  const match = token.match(/^(.*?)(\d+)$/);
  if (!match) return token;
  return `${match[1]}${String(Number(match[2]) - 1).padStart(match[2].length, "0")}`;
}

export function IndustriesStrip() {
  return (
    <section id="industries" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="One system. Every business where people wait."
          intro="Pick a template, set your services and go."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {INDUSTRIES.slice(0, 3).map((industry, index) => (
            <li key={industry.slug}>
              <Reveal delay={index * 120} className="h-full">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group block h-full rounded-3xl border border-soft-grey bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    aria-hidden="true"
                    className={`relative h-56 overflow-hidden rounded-2xl ${TINTS[index]}`}
                  >
                    <div className="absolute left-5 top-5 w-48 rounded-2xl bg-white p-3 shadow-xl transition-transform duration-300 group-hover:-rotate-2">
                      <p className="text-[0.7rem] text-grey-purple">
                        Your token · {industry.mockup.service}
                      </p>
                      <p className="whitespace-nowrap font-sans text-4xl font-bold leading-tight tabular-nums">
                        {industry.mockup.token}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-lime px-2.5 py-0.5 text-xs font-bold">
                        Next up
                      </span>
                    </div>
                    <div className="on-dark absolute bottom-5 right-5 w-36 rounded-xl bg-charcoal p-3 text-white shadow-xl transition-transform duration-300 group-hover:rotate-2">
                      <p className="text-[0.55rem] tracking-[0.2em] text-white/65">NOW SERVING</p>
                      <p className="whitespace-nowrap font-sans text-3xl font-bold leading-tight tabular-nums text-lime">
                        {previousToken(industry.mockup.token)}
                      </p>
                      <p className="text-[0.65rem] tracking-wider text-white/80">
                        {industry.mockup.counter.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-5 px-2 font-display text-xl font-bold text-plum">
                    {industry.name}
                  </h3>
                  <p className="mt-1 px-2 text-grey-purple">{industry.oneLiner}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/industries" variant="outline">
            See all industries
          </Button>
        </div>
      </Container>
    </section>
  );
}

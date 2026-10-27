import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HeroScene } from "@/components/home/HeroScene";
import { INDUSTRIES } from "@/lib/industries";

const PROOF_POINTS: { icon: IconName; text: string }[] = [
  { icon: "clock", text: "Our goal: live in 7 days" },
  { icon: "users", text: "One line for walk-ins, calls and app patients" },
  { icon: "check", text: "Built with pilot clinics in Lahore" },
];

export function Hero() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-14 pb-10 pt-12 sm:pt-16 xl:grid-cols-[0.9fr_1.1fr] xl:gap-10 xl:pb-14 xl:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-soft-grey bg-white px-4 py-1.5 text-sm font-medium text-plum">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-aubergine" />
            Queues and appointments for service institutes
          </p>

          <h1 className="mt-6 font-hero text-[clamp(1.75rem,6.5vw,3.5rem)] uppercase tracking-wide text-plum">
            Know your turn.
            <br />
            <span className="rounded-xl bg-lime px-2 [box-decoration-break:clone]">
              Own your time.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-grey-purple">
            E-Queue lets patients join the line from their phone, wait wherever they like, and
            arrive just before they&apos;re called. Your team runs walk-ins, calls and bookings from
            one live queue.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Contact us</Button>
            <Button href="#how-it-works" variant="outline">
              See how it works
            </Button>
          </div>

          <ul className="mt-8 space-y-3">
            {PROOF_POINTS.map((point) => (
              <li
                key={point.text}
                className="flex items-center gap-3 text-sm font-medium text-plum"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aubergine text-white">
                  <Icon name={point.icon} className="h-4 w-4" />
                </span>
                {point.text}
              </li>
            ))}
          </ul>
        </div>

        <HeroScene />
      </Container>

      <Container className="pb-12 xl:pb-16">
        <nav
          aria-label="Industries we serve"
          className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-soft-grey pt-6"
        >
          <span className="text-sm font-semibold text-grey-purple">Made for</span>
          {INDUSTRIES.slice(0, 3).map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border border-aubergine px-4 text-sm font-semibold text-aubergine hover:bg-aubergine hover:text-white"
            >
              {industry.name}
            </Link>
          ))}
          <Link
            href="/industries"
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-aubergine underline underline-offset-4"
          >
            Any service business
          </Link>
        </nav>
      </Container>
    </section>
  );
}

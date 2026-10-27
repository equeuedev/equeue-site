import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LiveQueueDemo } from "@/components/home/LiveQueueDemo";

export function Hero() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <h1 className="font-hero text-[clamp(1.75rem,6.5vw,3.5rem)] uppercase tracking-wide text-plum">
            Know your turn.
            <br />
            Own your time.
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
          <p className="mt-6 text-sm text-grey-purple">
            Now building with pilot clinics in Lahore.
          </p>
        </div>

        <div className="relative mx-auto">
          <LiveQueueDemo />
        </div>
      </Container>
    </section>
  );
}

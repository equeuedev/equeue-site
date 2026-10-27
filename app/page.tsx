import { Hero } from "@/components/home/Hero";
import { ProblemStrip } from "@/components/home/ProblemStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Benefits } from "@/components/home/Benefits";
import { WaitingRoom } from "@/components/home/WaitingRoom";
import { IndustriesStrip } from "@/components/home/IndustriesStrip";
import { Trust } from "@/components/home/Trust";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <Benefits />
      <WaitingRoom />
      <IndustriesStrip />
      <Trust />
      <FinalCta />
    </>
  );
}

import Board from "@/components/Board";
import Commands from "@/components/Commands";
import CtaBand from "@/components/CtaBand";
import FaqCards from "@/components/FaqCards";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MarketsPoster from "@/components/MarketsPoster";
import PosterFooter from "@/components/PosterFooter";

export default function Home() {
  return (
    <main className="poster min-h-svh">
      <Hero />
      <HowItWorks />
      <Board />
      <Commands />
      <MarketsPoster />
      <FaqCards />
      <CtaBand />
      <PosterFooter />
    </main>
  );
}

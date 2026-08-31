import { AboutHero } from "./about-hero";
import { FounderAndMission } from "./founder-and-mission";

export function AboutView() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <FounderAndMission />
    </div>
  );
}

import React from "react";
import teamImage from "../../assets/teamImage.png";
import InfiniteCards from "./InfiniteMovingCards";
import AppleCarousel from "./AppleCarousel";
import PetAppHero from "./BackgroundLines";
import ScrollAnimation from "./ScrollAnimation";
import OurMission from "./OurMission";
import { Section } from "lucide-react";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col space-y-20 px-6 md:px-20 lg:px-40 text-gray-800">
        <section>
          <PetAppHero />
        </section>

        <section>
          <AppleCarousel />
        </section>

        <section>
          <ScrollAnimation />
        </section>

        <section>
          <InfiniteCards />
        </section>

        <section>
          <OurMission />
        </section>
      </div>
    </>
  );
};

export default Landing;

import Hero from "@/components/Hero";
import Why from "@/components/sections/Why";
import StackTransition from "@/components/StackTransition";
import Spaces from "@/components/sections/Spaces";
import PlannerSection from "@/components/sections/PlannerSection";
import WhatWeHost from "@/components/sections/WhatWeHost";
import Costs from "@/components/sections/Costs";
import SiteFees from "@/components/sections/SiteFees";
import Accommodation from "@/components/sections/Accommodation";
import Gallery from "@/components/sections/Gallery";
import HowBooking from "@/components/sections/HowBooking";
import Testimonials from "@/components/sections/Testimonials";
import Questions from "@/components/sections/Questions";
import Enquiry from "@/components/sections/Enquiry";

export default function Home() {
  return (
    <main id="top">
      <StackTransition outgoing={<Hero />} incoming={<Why />} />
      <StackTransition outgoing={<Spaces />} incoming={<PlannerSection />} outgoingId="spaces" />
      <WhatWeHost />
      <StackTransition outgoing={<Costs />} incoming={<SiteFees />} outgoingId="costs" />
      <Accommodation />
      <Gallery />
      <HowBooking />
      <StackTransition
        outgoing={<Testimonials />}
        incoming={<Questions />}
        outgoingId="testimonials"
      />
      <Enquiry />
    </main>
  );
}

import Eyebrow from "@/components/Eyebrow";
import ScrollFillHeading from "@/components/ScrollFillHeading";
import Planner from "@/components/planner/Planner";

export default function PlannerSection() {
  return (
    <section id="planner" className="scroll-mt-24 bg-bone px-6 py-24 text-ink md:px-16">
      <Eyebrow>Plan Your Event</Eyebrow>
      <ScrollFillHeading as="h2" className="text-display-lg mt-6 max-w-xl">
        Will your people fit?
      </ScrollFillHeading>
      <p className="text-body mt-6 max-w-xl">
        Set your numbers and we&rsquo;ll draw it. This is the same maths we
        use when we lay out a room, so the answer you get here is the answer
        we&rsquo;d give you on the phone.
      </p>

      <div className="mt-16">
        <Planner />
      </div>
    </section>
  );
}

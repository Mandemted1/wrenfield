import Eyebrow from "@/components/Eyebrow";
import ScrollFillHeading from "@/components/ScrollFillHeading";

const STRENGTHS: { lead: string; rest: string }[] = [
  {
    lead: "One event per weekend.",
    rest: "Not one per day. The estate is yours from Friday noon until Sunday noon, which means you rehearse in the actual room, you're not rushed out at 10pm for a turnover, and nobody else's cocktail hour is audible from your ceremony.",
  },
  {
    lead: "Every price published.",
    rest: "Site fee, per-head catering, bar, service charge, tax, overtime. All of it is on this site and all of it is the number you'll actually pay. There is a fully itemised real wedding further down this page.",
  },
  {
    lead: "Bring your own caterer.",
    rest: "We have three we like and we'll happily recommend them. We take no commission and you're under no obligation. If you have a caterer you love, they're welcome, subject to insurance and a kitchen walkthrough.",
  },
  {
    lead: "Forty guests can sleep here.",
    rest: "Two cottages, the barn loft, and six rooms in the farmhouse. Wedding party stays on site, nobody drives, the morning after is slow.",
  },
];

export default function Why() {
  return (
    <section id="why" className="scroll-mt-24 flex min-h-screen flex-col justify-center bg-bone px-6 py-24 text-ink md:px-16">
      <Eyebrow>Why Wrenfield</Eyebrow>
      <ScrollFillHeading as="h2" className="text-display-lg mt-6 max-w-2xl">
        More than a pretty barn.
      </ScrollFillHeading>
      <p className="text-body mt-6 max-w-xl">
        Every venue in the Hudson Valley photographs well in September. The
        difference shows up in the parts nobody puts on a website.
      </p>

      <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {STRENGTHS.map((item) => (
          <p key={item.lead} className="text-body max-w-md">
            <span style={{ fontWeight: 400 }}>{item.lead} </span>
            {item.rest}
          </p>
        ))}
      </div>
    </section>
  );
}

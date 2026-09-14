import Image from "next/image";
import Reveal from "@/components/Reveal";

const HOST_PANELS: {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bg: "bone" | "sage";
}[] = [
  {
    id: "weddings",
    title: "Weddings",
    description:
      "One per weekend, Friday noon to Sunday noon. Ceremony in the Orchard or the Glasshouse, dinner in the Barn, and the estate stays yours the whole time. We cap at 220 seated. We have turned down larger weddings and we'll keep doing it.",
    image: "/images/host/weddings.jpg",
    alt: "A wedding reception set up in the Dairy Barn",
    bg: "bone",
  },
  {
    id: "corporate",
    title: "Corporate",
    description:
      "Offsites, strategy days and team retreats for up to 90. Fibre throughout, a proper AV rig in the Barn, breakout space in the Stone Room and Glasshouse, and forty beds so nobody commutes. Whiteboards, not trust falls.",
    image: "/images/host/corporate.jpg",
    alt: "A corporate offsite set up in the Dairy Barn",
    bg: "sage",
  },
  {
    id: "private-dinners",
    title: "Private dinners",
    description:
      "Birthdays, anniversaries, rehearsal dinners and the occasional wake. The Stone Room seats 40 around one table with a fire going. Two-hour minimum, no site fee under 25 guests.",
    image: "/images/host/private-dinners.jpg",
    alt: "A private dinner around the long table in the Stone Room",
    bg: "bone",
  },
  {
    id: "celebrations",
    title: "Celebrations",
    description:
      "Showers, engagement parties, milestone birthdays, graduations. Daytime use of the Glasshouse and Orchard without taking the full estate, which makes it considerably cheaper. Ask about weekday rates.",
    image: "/images/host/celebrations.jpg",
    alt: "A daytime celebration in the Glasshouse",
    bg: "sage",
  },
];

export default function WhatWeHost() {
  return (
    <section id="host" className="scroll-mt-24">
      {HOST_PANELS.map((panel, i) => {
        const imageFirst = i % 2 === 0;
        const bgClass = panel.bg === "sage" ? "bg-sage" : "bg-bone";

        return (
          <div key={panel.id} className={`${bgClass} px-6 py-20 text-ink md:px-16`}>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <Reveal className={`rounded-card ${imageFirst ? "md:order-1" : "md:order-2"}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-sage-lt">
                  <Image
                    src={panel.image}
                    alt={panel.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
              </Reveal>
              <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                <h3 className="text-display-lg">{panel.title}</h3>
                <p className="text-body mt-6 max-w-md">{panel.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

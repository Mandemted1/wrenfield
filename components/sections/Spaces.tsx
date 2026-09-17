import Eyebrow from "@/components/Eyebrow";
import ScrollFillHeading from "@/components/ScrollFillHeading";
import SelectableShowcase, { ShowcaseItem } from "@/components/SelectableShowcase";

const SPACES: ShowcaseItem[] = [
  {
    id: "barn",
    name: "The Dairy Barn",
    meta: "Built 1892 · Restored 2019",
    description:
      "Chestnut posts, a hayloft gallery, and twelve-foot doors at both ends that open onto the field. Radiant floor heating, so it works in February. This is where almost every dinner happens.",
    specs: [
      ["Floor area", "340 m² / 3,660 sq ft"],
      ["Seated dinner", "up to 220"],
      ["Ceremony", "up to 260"],
      ["Standing", "up to 300"],
      ["Ceiling", "28 ft at the ridge"],
      ["Heated", "Yes"],
    ],
    image: "/images/spaces/dairy-barn.jpg",
    alt: "Interior of the restored 1892 Dairy Barn",
  },
  {
    id: "glasshouse",
    name: "The Glasshouse",
    meta: "Built 2021",
    description:
      "A glass pavilion at the edge of the orchard, steel frame, fully glazed on three sides. Ceremonies when it rains, dinners when you want the light, and the room everyone drifts to after the speeches.",
    specs: [
      ["Floor area", "185 m² / 1,990 sq ft"],
      ["Seated dinner", "up to 120"],
      ["Ceremony", "up to 150"],
      ["Standing", "up to 180"],
      ["Heated", "Yes"],
      ["Blackout", "Motorised shades"],
    ],
    image: "/images/spaces/glasshouse.jpg",
    alt: "The Glasshouse, a glass pavilion at the edge of the orchard",
  },
  {
    id: "orchard",
    name: "The Orchard",
    meta: "Planted 1940s",
    description:
      "Sixty apple trees on a slope facing west. Ceremonies at golden hour, which between May and September is roughly 6:40pm. There is a rain plan and it's the Glasshouse, four minutes' walk.",
    specs: [
      ["Area", "600 m² / 6,460 sq ft"],
      ["Ceremony", "up to 200"],
      ["Standing", "up to 250"],
      ["Power", "Yes, three drops"],
      ["Rain plan", "The Glasshouse"],
    ],
    image: "/images/spaces/orchard.jpg",
    alt: "The Orchard, sixty apple trees on a west-facing slope",
  },
  {
    id: "stone",
    name: "The Stone Room",
    meta: "Built c.1905 · Former creamery",
    description:
      "Low stone walls, one long oak table, a fireplace. Rehearsal dinners, board meetings, and the dinner you have when you didn't want a big wedding.",
    specs: [
      ["Floor area", "70 m² / 750 sq ft"],
      ["Seated dinner", "up to 40"],
      ["Boardroom", "up to 22"],
      ["Standing", "up to 60"],
      ["Fireplace", "Working"],
    ],
    image: "/images/spaces/stone-room.jpg",
    alt: "The Stone Room with low stone walls and a working fireplace",
  },
];

export default function Spaces() {
  return (
    <section className="bg-bone px-6 py-24 text-ink md:px-16">
      <Eyebrow>The Spaces</Eyebrow>
      <ScrollFillHeading as="h2" className="text-display-lg mt-6 max-w-xl">
        Four rooms.
      </ScrollFillHeading>
      <p className="text-body mt-6 max-w-xl">
        Two indoor, two outdoor, all within a four-minute walk of each other.
        Most events use two or three across the day.
      </p>

      <div className="mt-16">
        <SelectableShowcase items={SPACES} tone="bone" />
      </div>
    </section>
  );
}

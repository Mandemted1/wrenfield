import ScrollFillHeading from "@/components/ScrollFillHeading";
import SelectableShowcase, { ShowcaseItem } from "@/components/SelectableShowcase";

const ROOMS: ShowcaseItem[] = [
  {
    id: "farmhouse",
    name: "The Farmhouse",
    meta: "6 rooms · sleeps 12",
    description:
      "The 1870 main house. Six doubles, three bathrooms, a kitchen you can actually cook in, and a porch. Usually the couple and immediate family.",
    specs: [["Rate", "$1,400/night, whole house"]],
    image: "/images/accommodation/farmhouse.jpg",
    alt: "The Farmhouse, the 1870 main house at Wrenfield",
  },
  {
    id: "creamery",
    name: "The Creamery Cottage",
    meta: "Sleeps 6",
    description:
      "Two bedrooms and a loft, attached to the Stone Room. Where the wedding party gets ready.",
    specs: [["Rate", "$520/night"]],
    image: "/images/accommodation/creamery-cottage.jpg",
    alt: "The Creamery Cottage attached to the Stone Room",
  },
  {
    id: "orchard-cottage",
    name: "The Orchard Cottage",
    meta: "Sleeps 6",
    description:
      "Set apart at the top of the field, the quietest building on the property.",
    specs: [["Rate", "$520/night"]],
    image: "/images/accommodation/orchard-cottage.jpg",
    alt: "The Orchard Cottage at the top of the field",
  },
  {
    id: "barn-loft",
    name: "The Barn Loft",
    meta: "Sleeps 16",
    description:
      "Eight twins under the rafters, two shared bathrooms. Cheap, warm, fine, and the reason the after-party ends when it ends.",
    specs: [["Rate", "$680/night, whole loft"]],
    image: "/images/accommodation/barn-loft.jpg",
    alt: "The Barn Loft with eight twin beds under the rafters",
  },
];

export default function Accommodation() {
  return (
    <section id="stay" className="scroll-mt-24 bg-bone px-6 py-24 text-ink md:px-16">
      <ScrollFillHeading as="h2" className="text-display-lg max-w-xl">
        Forty beds.
      </ScrollFillHeading>
      <p className="text-body mt-6 max-w-xl">
        Nobody should be driving back to a motel on the Taconic at one in the
        morning. Forty guests sleep on the estate.
      </p>

      <div className="mt-16">
        <SelectableShowcase items={ROOMS} tone="bone" />
      </div>

      <p className="text-spec mt-12 text-stone">
        Two-night minimum on wedding weekends. The whole estate sleeps 40 for
        $3,120 a night, which across 40 people is $78 each.
      </p>
    </section>
  );
}

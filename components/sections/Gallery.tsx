"use client";

import { useState } from "react";
import Image from "next/image";

type Category = "All" | "Weddings" | "Corporate" | "The estate" | "Winter";

const FILTERS: Category[] = ["All", "Weddings", "Corporate", "The estate", "Winter"];

type GalleryItem = {
  id: string;
  category: Exclude<Category, "All">;
  alt: string;
  aspect: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "gallery-01", category: "Weddings", alt: "Long-table dinner reception in the Dairy Barn", aspect: "aspect-[4/5]" },
  { id: "gallery-02", category: "The estate", alt: "The restored Dairy Barn exterior at dusk", aspect: "aspect-[4/3]" },
  { id: "gallery-03", category: "Weddings", alt: "Ceremony rows set up in the Orchard", aspect: "aspect-[3/4]" },
  { id: "gallery-04", category: "Corporate", alt: "A corporate offsite in session in the Dairy Barn", aspect: "aspect-square" },
  { id: "gallery-05", category: "Winter", alt: "The estate under snow in December", aspect: "aspect-[4/5]" },
  { id: "gallery-06", category: "Weddings", alt: "First dance under string lights in the Barn", aspect: "aspect-[4/3]" },
  { id: "gallery-07", category: "The estate", alt: "The Glasshouse at the edge of the orchard", aspect: "aspect-[3/4]" },
  { id: "gallery-08", category: "Weddings", alt: "Guests at cocktail hour in the Glasshouse", aspect: "aspect-square" },
  { id: "gallery-09", category: "Corporate", alt: "Breakout session in the Stone Room", aspect: "aspect-[4/5]" },
  { id: "gallery-10", category: "The estate", alt: "The Stone Room fireplace lit for dinner", aspect: "aspect-[4/3]" },
  { id: "gallery-11", category: "Winter", alt: "A Tuesday weekday wedding in January", aspect: "aspect-[3/4]" },
  { id: "gallery-12", category: "Weddings", alt: "Golden hour ceremony in the Orchard", aspect: "aspect-square" },
  { id: "gallery-13", category: "The estate", alt: "The Farmhouse porch in early morning light", aspect: "aspect-[4/5]" },
  { id: "gallery-14", category: "Corporate", alt: "A team retreat gathered in the Barn loft", aspect: "aspect-[4/3]" },
  { id: "gallery-15", category: "Weddings", alt: "Detail shot of table settings in the Barn", aspect: "aspect-[3/4]" },
  { id: "gallery-16", category: "Winter", alt: "The Orchard's bare trees in winter light", aspect: "aspect-square" },
  { id: "gallery-17", category: "The estate", alt: "Parking field and estate entrance", aspect: "aspect-[4/5]" },
  { id: "gallery-18", category: "Weddings", alt: "Guests dancing on the retained dance floor", aspect: "aspect-[4/3]" },
  { id: "gallery-19", category: "Corporate", alt: "Whiteboard strategy session in the Glasshouse", aspect: "aspect-[3/4]" },
  { id: "gallery-20", category: "Winter", alt: "Fireplace and candles in the Stone Room in December", aspect: "aspect-square" },
];

const INITIAL_COUNT = 12;

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = GALLERY_ITEMS.filter((item) => filter === "All" || item.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section id="gallery" className="scroll-mt-24 bg-bone px-6 py-24 text-ink md:px-16">
      <h2 className="text-display-lg">Gallery.</h2>
      <p className="text-body mt-6 max-w-xl">
        Real events, real guests, published with permission.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setShowAll(false);
            }}
            aria-pressed={filter === f}
            className={`rounded-pill border px-4 py-2 text-spec transition-colors ${
              filter === f ? "border-ink bg-ink text-bone" : "border-rule text-ink hover:border-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((item) => (
          <div
            key={item.id}
            className={`relative mb-4 break-inside-avoid overflow-hidden rounded-card bg-sage-lt ${item.aspect}`}
          >
            <Image
              src={`/images/gallery/${item.id}.jpg`}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>

      {!showAll && filtered.length > INITIAL_COUNT && (
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-spec uppercase tracking-[0.04em] text-ink underline underline-offset-4 hover:text-stone"
          >
            View more
          </button>
        </div>
      )}
    </section>
  );
}

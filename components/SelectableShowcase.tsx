"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SpecTable from "@/components/SpecTable";

export type ShowcaseItem = {
  id: string;
  name: string;
  meta?: string;
  description: string;
  specs: [string, string][];
  image: string;
  alt: string;
};

export default function SelectableShowcase({
  items,
  tone = "bone",
}: {
  items: ShowcaseItem[];
  tone?: "bone" | "sage";
}) {
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className="grid gap-10 md:grid-cols-[180px_1fr_300px] md:gap-12">
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            aria-pressed={item.id === activeId}
            className={`text-space-name text-left transition-colors ${
              item.id === activeId ? "text-ink" : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <Reveal key={active.id} className="rounded-card">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-sage-lt md:aspect-[3/4]">
          <Image
            src={active.image}
            alt={active.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </Reveal>

      <div>
        {active.meta && <p className="text-spec mb-3 text-stone">{active.meta}</p>}
        <p className="text-body mb-6">{active.description}</p>
        <SpecTable rows={active.specs} tone={tone} />
      </div>
    </div>
  );
}

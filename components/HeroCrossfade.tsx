"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const HERO_IMAGES = [
  {
    src: "/images/hero/hero-long-table-dinner.jpg",
    alt: "A long-table dinner set in the Dairy Barn",
  },
  {
    src: "/images/hero/hero-ceremony-rows.jpg",
    alt: "Ceremony rows set up in the Dairy Barn",
  },
  {
    src: "/images/hero/hero-evening-reception.jpg",
    alt: "A lit evening reception in the Dairy Barn",
  },
  {
    src: "/images/hero/hero-empty-morning.jpg",
    alt: "Empty morning light through the Dairy Barn doors",
  },
];

const HOLD_SECONDS = 3.8;
const FADE_SECONDS = 1.2;

export default function HeroCrossfade() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(new Set([0, 1]));
  const layerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function cycle(current: number) {
      timeoutId = setTimeout(() => {
        if (cancelled) return;

        const next = (current + 1) % HERO_IMAGES.length;
        const upcoming = (next + 1) % HERO_IMAGES.length;
        setMounted((prev) => new Set(prev).add(upcoming));

        gsap.to(layerRefs.current[current], {
          opacity: 0,
          duration: FADE_SECONDS,
          ease: "power1.inOut",
        });
        gsap.to(layerRefs.current[next], {
          opacity: 1,
          duration: FADE_SECONDS,
          ease: "power1.inOut",
        });

        setActive(next);
        cycle(next);
      }, HOLD_SECONDS * 1000);
    }

    cycle(active);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 bg-sage-lt">
      {HERO_IMAGES.map((img, i) =>
        mounted.has(i) ? (
          <div
            key={img.src}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : null
      )}
    </div>
  );
}

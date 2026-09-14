"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Variant = "sprig" | "branch";
type Tone = "sage" | "bone" | "ink";

const VARIANTS: Record<Variant, { viewBox: string; width: number; paths: string[] }> = {
  sprig: {
    viewBox: "0 0 160 280",
    width: 160,
    paths: [
      "M80 270 C72 220 88 170 76 120 C68 80 82 40 86 10",
      "M78 230 C55 222 40 200 44 178 C60 188 76 205 78 230 Z",
      "M82 195 C106 189 122 168 119 146 C102 155 85 172 82 195 Z",
      "M76 155 C54 150 40 130 44 110 C59 118 74 134 76 155 Z",
      "M80 118 C102 113 116 94 112 74 C96 82 82 98 80 118 Z",
      "M83 78 C66 74 55 58 58 41 C71 47 82 61 83 78 Z",
    ],
  },
  branch: {
    viewBox: "0 0 220 200",
    width: 220,
    paths: [
      "M10 190 C60 170 110 175 150 140 C175 118 195 95 210 60",
      "M55 172 C48 150 58 130 78 122 C80 144 72 164 55 172 Z",
      "M95 158 C92 134 106 115 128 110 C127 133 115 152 95 158 Z",
      "M140 130 C140 106 156 89 178 86 C175 108 161 125 140 130 Z",
      "M175 95 C178 74 194 60 214 59 C209 79 195 93 175 95 Z",
    ],
  },
};

const TONE_CLASSES: Record<Tone, string> = {
  sage: "text-sage",
  bone: "text-bone/20",
  ink: "text-ink/20",
};

export default function Botanical({
  corner,
  variant = "sprig",
  tone = "sage",
  className = "",
}: {
  corner: Corner;
  variant?: Variant;
  tone?: Tone;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const swayRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const { viewBox, width, paths } = VARIANTS[variant];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const validPaths = pathRefs.current.filter((p): p is SVGPathElement => p !== null);

    validPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = reduced ? "0" : `${length}`;
    });

    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(validPaths, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power1.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.fromTo(
        scrubRef.current,
        { y: -28, rotation: -1.75 },
        {
          y: 28,
          rotation: 1.75,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        swayRef.current,
        { rotation: -1.5 },
        {
          rotation: 1.5,
          duration: gsap.utils.random(9, 12),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`botanical botanical--${corner} ${TONE_CLASSES[tone]} ${className}`}
    >
      <div ref={scrubRef}>
        <div ref={swayRef}>
          <svg
            viewBox={viewBox}
            width={width}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

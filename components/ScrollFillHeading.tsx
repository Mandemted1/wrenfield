"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tag = "h1" | "h2" | "h3";

export default function ScrollFillHeading({
  children,
  className = "",
  as = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { backgroundPositionX: "0%" });
      return;
    }

    gsap.set(el, { backgroundPositionX: "100%" });

    const tween = gsap.to(el, {
      backgroundPositionX: "0%",
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 45%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const Heading = as;

  return (
    <Heading ref={ref} className={`fill-heading ${className}`}>
      {children}
    </Heading>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackTransition({
  outgoing,
  incoming,
}: {
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
}) {
  const outgoingRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outgoingEl = outgoingRef.current;
    const incomingEl = incomingRef.current;
    if (!outgoingEl || !incomingEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tween = gsap.to(outgoingEl, {
      scale: 0.96,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: incomingEl,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={outgoingRef} className="sticky top-0 min-h-screen">
        {outgoing}
      </div>
      <div ref={incomingRef} className="relative min-h-screen">
        {incoming}
      </div>
    </div>
  );
}

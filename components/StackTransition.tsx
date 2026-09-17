"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackTransition({
  outgoing,
  incoming,
  outgoingId,
}: {
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
  /**
   * Anchor id for the outgoing section. Must NOT be set on the outgoing
   * section's own root element — once scrolled past, GSAP settles it at
   * scale(0.96), which corrupts getBoundingClientRect() for anything
   * anchored there, so the same link lands in different places depending
   * on scroll history. This puts the id on the stable, untransformed
   * wrapper instead.
   */
  outgoingId?: string;
}) {
  const outgoingRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outgoingEl = outgoingRef.current;
    const incomingEl = incomingRef.current;
    if (!outgoingEl || !incomingEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The outgoing element's sticky "stuck" range is governed by this pair's
    // total height, not by this one-viewport transition — so once a tall
    // incoming section has fully covered it, it can still sit there
    // intercepting clicks meant for content further down. Drop its pointer
    // events once actually covered, regardless of reduced-motion.
    const clickGuard = ScrollTrigger.create({
      trigger: incomingEl,
      start: "top bottom",
      end: "top top",
      onLeave: () => {
        outgoingEl.style.pointerEvents = "none";
      },
      onEnterBack: () => {
        outgoingEl.style.pointerEvents = "";
      },
    });

    let tween: gsap.core.Tween | null = null;
    if (!reduced) {
      tween = gsap.to(outgoingEl, {
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
    }

    return () => {
      clickGuard.kill();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <div id={outgoingId} className={`relative ${outgoingId ? "scroll-mt-24" : ""}`}>
      <div ref={outgoingRef} className="sticky top-0 min-h-screen">
        {outgoing}
      </div>
      <div ref={incomingRef} className="relative min-h-screen">
        {incoming}
      </div>
    </div>
  );
}

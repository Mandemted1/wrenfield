"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, summary, [role="button"], label';

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const wrapper = wrapperRef.current;
    const rotator = rotatorRef.current;
    if (!wrapper || !rotator) return;

    document.documentElement.classList.add("custom-cursor-on");
    gsap.set(wrapper, { xPercent: -50, yPercent: -50 });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const moveX = gsap.quickTo(wrapper, "x", { duration: 0.45, ease: "power3" });
    const moveY = gsap.quickTo(wrapper, "y", { duration: 0.45, ease: "power3" });

    let hasMoved = false;
    let isHoveringInteractive = false;
    let idleTween: gsap.core.Tween | null = null;

    function startIdleSway() {
      if (reduced) return;
      idleTween = gsap.fromTo(
        rotator,
        { rotation: -8 },
        {
          rotation: 8,
          duration: gsap.utils.random(4, 6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }

    function handleMouseMove(e: MouseEvent) {
      moveX(e.clientX);
      moveY(e.clientY);
      if (!hasMoved) {
        hasMoved = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.25 });
      }
    }

    function handleMouseLeave() {
      gsap.to(wrapper, { opacity: 0, duration: 0.2 });
    }

    function handleOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR);
      if (!target || isHoveringInteractive) return;
      isHoveringInteractive = true;
      idleTween?.pause();
      gsap.to(rotator, { rotation: 45, scale: 1.5, duration: 0.3, ease: "power2.out" });
    }

    function handleOut(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR);
      if (!target || !isHoveringInteractive) return;

      // Only leave the "hovering" state if the pointer isn't just moving to
      // another interactive element (or a nested child of the same one) —
      // otherwise this fires repeatedly and the reset tween never settles.
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest?.(INTERACTIVE_SELECTOR)) return;

      isHoveringInteractive = false;
      gsap.to(rotator, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => idleTween?.restart(),
      });
    }

    startIdleSway();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-on");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      idleTween?.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
      style={{ mixBlendMode: "difference", willChange: "transform" }}
    >
      <div ref={rotatorRef}>
        <svg viewBox="-12 -12 24 24" width="26" height="26">
          <path
            d="M-8 -8 L8 8 M8 -8 L-8 8"
            stroke="var(--color-bone)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

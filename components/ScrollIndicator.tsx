"use client";

import { useEffect, useState } from "react";
import { getLenisInstance } from "@/lib/lenisSingleton";

const FLIP_THRESHOLD = 400;

export default function ScrollIndicator() {
  const [pointingUp, setPointingUp] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setPointingUp(window.scrollY > FLIP_THRESHOLD);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    const lenis = getLenisInstance();

    if (pointingUp) {
      const top = document.getElementById("top");
      if (lenis && top) {
        lenis.scrollTo(top);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const targetY = window.scrollY + window.innerHeight * 0.9;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={pointingUp ? "Scroll to top" : "Scroll down"}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-sage text-ink transition-colors hover:bg-sage-lt md:bottom-8 md:right-10"
    >
      <svg
        viewBox="0 0 16 16"
        className={`h-4 w-4 transition-transform duration-300 ${pointingUp ? "rotate-180" : ""}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 6 L8 11 L13 6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

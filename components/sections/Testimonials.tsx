"use client";

import { useState } from "react";

const TESTIMONIALS = [
  {
    name: "Nia and Theo",
    location: "Brooklyn, NY",
    quote:
      "We toured eleven venues. Wrenfield was the only one that told us the real number on the first visit instead of the site fee. We booked that afternoon and the final invoice was within four hundred dollars of that estimate.",
  },
  {
    name: "Sarah M.",
    location: "Head of People, Kestrel Health",
    quote:
      "We've run our leadership offsite here three years running. Ninety people, real internet, everyone sleeps on site, and nobody has to organise a single Uber. The Stone Room is the best meeting room I've ever worked in.",
  },
  {
    name: "Daniel and Priya",
    location: "Hudson, NY",
    quote:
      "It rained the entire day. They moved the ceremony to the Glasshouse in about twenty minutes and never once made us feel like the day had been ruined. The photos are better than they would have been.",
  },
  {
    name: "The Okonjo family",
    location: "Montclair, NJ",
    quote:
      "My mother's eightieth, forty of us around one table in the Stone Room with the fire lit. It cost less than a restaurant would have and it didn't feel like a restaurant.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  return (
    <section id="testimonials" className="scroll-mt-24 min-h-screen bg-bone px-6 pt-24 pb-24 text-ink md:px-16">
      <h2 className="text-display-lg">What couples say.</h2>

      <div className="mt-10 max-w-2xl">
        <p className="text-space-name">{current.name}</p>
        <p className="text-spec mt-2 text-stone">{current.location}</p>
        <p className="text-body mt-6 max-w-xl">&ldquo;{current.quote}&rdquo;</p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="text-eyebrow flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink hover:border-ink"
        >
          &lsaquo;
        </button>
        <span className="text-spec text-stone" aria-live="polite">
          {index + 1} / {TESTIMONIALS.length}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="text-eyebrow flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink hover:border-ink"
        >
          &rsaquo;
        </button>
      </div>
    </section>
  );
}

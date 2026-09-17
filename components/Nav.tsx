"use client";

import { useState } from "react";
import Logo from "./Logo";
import PillButton from "./PillButton";

const LINKS = [
  { label: "Spaces", href: "#spaces" },
  { label: "Plan your event", href: "#planner" },
  { label: "What it costs", href: "#costs" },
  { label: "Stay", href: "#stay" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bone/85 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-16">
        <a href="#top" aria-label="Wrenfield home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-spec uppercase tracking-[0.04em] text-ink hover:text-stone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href="tel:+18455550173" className="text-spec text-ink hover:text-stone">
            (845) 555-0173
          </a>
          <PillButton variant="fill" href="#contact">
            Check a date
          </PillButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="flex flex-col gap-6 border-t border-rule bg-bone px-6 py-8 lg:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-space-name text-ink"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-4">
            <a href="tel:+18455550173" className="text-spec text-ink hover:text-stone">
            (845) 555-0173
          </a>
            <PillButton variant="fill" href="#contact" onClick={() => setOpen(false)}>
              Check a date
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
}

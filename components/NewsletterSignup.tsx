"use client";

import { useState } from "react";
import Arrow from "./Arrow";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubmit() {
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className="text-spec mt-4 text-bone">
        You&rsquo;re on the list. Two emails a year, we promise.
      </p>
    );
  }

  return (
    <div>
      <div className="mt-4 flex max-w-sm items-center gap-3 border-b border-bone/40 pb-2">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="text-spec w-full bg-transparent text-bone placeholder:text-bone/50 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="Register to our newsletter"
          className="text-bone"
        >
          <Arrow />
        </button>
      </div>
      {status === "error" && (
        <p className="text-spec mt-2 text-bone/70">That email doesn&rsquo;t look right.</p>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import PillButton from "@/components/PillButton";
import {
  EVENT_TYPE_LABELS,
  LAYOUT_LABELS,
  SPACES,
  type EventType,
  type LayoutType,
  type SpaceId,
} from "@/lib/planner";

type FormState = {
  name: string;
  phone: string;
  email: string;
  date: string;
  eventType: EventType | "";
  guests: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  date: "",
  eventType: "",
  guests: "",
  notes: "",
};

const inputClass =
  "text-spec w-full border-b border-rule bg-transparent py-2 text-ink focus:border-ink focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-eyebrow text-stone">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="text-spec mt-1 block text-forest">{error}</span>}
    </label>
  );
}

export default function Enquiry() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  // Carries the planner's state into the enquiry when arriving via
  // "Email me this plan" — the one-time read is intentional (see Planner.tsx).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guests = params.get("guests");
    const type = params.get("type") as EventType | null;
    const layout = params.get("layout") as LayoutType | null;
    const space = params.get("space") as SpaceId | "auto" | null;

    if (!guests && !type) return;

    const spaceName = space && space !== "auto" ? SPACES.find((s) => s.id === space)?.name : null;
    const layoutName = layout && layout in LAYOUT_LABELS ? LAYOUT_LABELS[layout] : null;
    const planNote =
      layoutName || spaceName
        ? `From the planner: ${[layoutName, spaceName].filter(Boolean).join(", ")}.`
        : "";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({
      ...prev,
      guests: guests ?? prev.guests,
      eventType: type && type in EVENT_TYPE_LABELS ? type : prev.eventType,
      notes: planNote,
    }));
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSend() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "We need a name for the enquiry.";
    if (!form.email.trim() || !form.email.includes("@")) {
      nextErrors.email = "We'll reply here — worth double-checking it.";
    }
    if (!form.date.trim()) nextErrors.date = 'Even "sometime next September" helps.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="scroll-mt-24 bg-bone px-6 py-24 text-ink md:px-16">
        <h2 className="text-display-lg max-w-xl">Tell us the date.</h2>
        <p className="text-body mt-8 max-w-xl">
          Got it. We&rsquo;ll come back within one business day with whether
          that date is free and a real estimate for your numbers. If
          it&rsquo;s urgent, call{" "}
          <a href="tel:+18455550173" className="underline underline-offset-2 hover:text-stone">
            (845) 555-0173
          </a>
          .
        </p>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-bone px-6 py-24 text-ink md:px-16">
      <h2 className="text-display-lg max-w-xl">Tell us the date.</h2>
      <p className="text-body mt-6 max-w-xl">
        The fastest way to find out if we&rsquo;re free. One business day,
        always a real answer.
      </p>

      <div className="mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Date or month you're considering" error={errors.date}>
          <input
            type="text"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Type of event">
          <select
            value={form.eventType}
            onChange={(e) => update("eventType", e.target.value as EventType)}
            className={inputClass}
          >
            <option value="">Choose one</option>
            {(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map((type) => (
              <option key={type} value={type}>
                {EVENT_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Roughly how many guests">
          <input
            type="number"
            min={1}
            value={form.guests}
            onChange={(e) => update("guests", e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Anything you'd like us to know">
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={4}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8">
        <PillButton variant="fill" onClick={handleSend}>
          Send →
        </PillButton>
      </div>

      <p className="text-spec mt-6 text-stone">
        Or call{" "}
        <a href="tel:+18455550173" className="underline underline-offset-2 hover:text-ink">
          (845) 555-0173
        </a>
        , Monday to Saturday, 9am to 6pm. If you&rsquo;ve used the planner
        above, your layout comes through with this.
      </p>
    </section>
  );
}

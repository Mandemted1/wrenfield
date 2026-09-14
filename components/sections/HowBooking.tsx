const STEPS = [
  {
    number: "01",
    title: "Check the date",
    description:
      "Tell us the date or the month. We'll tell you within one business day whether it's free. No form-filling required to get that answer.",
  },
  {
    number: "02",
    title: "Come and walk it",
    description:
      "Ninety minutes, any day of the week, free. Bring whoever's helping you decide. We'll show you all four spaces and give you a written estimate with real numbers before you leave. Nobody will ask you to commit on the day.",
  },
  {
    number: "03",
    title: "Hold it",
    description:
      "A 25% deposit holds the date. Fully refundable for fourteen days after you pay it, no questions and no conversation about it.",
  },
  {
    number: "04",
    title: "Plan it",
    description:
      "You get a named coordinator from the day you book. Three planning sessions are included, plus a walkthrough four weeks out and the rehearsal. Balance is due thirty days before.",
  },
];

export default function HowBooking() {
  return (
    <section id="booking" className="scroll-mt-24 bg-sage px-6 py-24 text-ink md:px-16">
      <h2 className="text-display-lg max-w-xl">How booking works.</h2>

      <div className="mt-16 grid gap-10 md:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.number}>
            <div className="text-spec text-ink/60">{step.number}</div>
            <h3 className="text-space-name mt-3">{step.title}</h3>
            <p className="text-body mt-4">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import Botanical from "@/components/Botanical";

const FAQS = [
  {
    q: "Can we bring our own caterer?",
    a: "Yes. We have three we recommend and we take no commission on any of them. An outside caterer needs $2m liability insurance and a kitchen walkthrough at least thirty days out. We've never turned one down.",
  },
  {
    q: "What's the rain plan?",
    a: "The Glasshouse, which seats 150 for a ceremony and is four minutes from the Orchard. There's no extra charge and we make the call together by 10am on the day. Every couple who's had to use it has told us afterwards it was fine.",
  },
  {
    q: "What time does the music have to stop?",
    a: "Amplified music outdoors ends at 10pm, which is a local ordinance and not ours. Inside the Barn it runs until midnight, and past that it's $1,200 an hour. Most people buy one hour.",
  },
  {
    q: "Is there a noise limit inside?",
    a: "No. The Barn is 400 feet from the nearest neighbour and they're our cousins.",
  },
  {
    q: "Can we have fireworks or sparklers?",
    a: "Sparklers yes, in the gravel courtyard, with a water bucket we provide. Fireworks no, ever. The orchard is 80 years old and the fire risk between June and September is real.",
  },
  {
    q: "Do you host more than one wedding a weekend?",
    a: "No, and we won't start. One event, Friday noon to Sunday noon.",
  },
  {
    q: "What happens if we need to cancel?",
    a: "Full refund within fourteen days of the deposit. After that the deposit is non-refundable but transferable to any other available date within eighteen months. We'll work with you. We have never kept a deposit from someone in genuine trouble.",
  },
  {
    q: "Is the estate accessible?",
    a: "The Barn, Glasshouse and Stone Room are step-free with accessible bathrooms. The Orchard is a grass slope and firm underfoot when dry — we have a gravel path and golf-cart transport for anyone who needs it. Two farmhouse rooms are on the ground floor. Tell us what you need and we'll tell you honestly what works.",
  },
  {
    q: "Can we get married on a Tuesday?",
    a: "Yes, and it's $6,500. Weekday weddings are our favourite thing and nobody books them.",
  },
];

export default function Questions() {
  return (
    <section
      id="questions"
      className="relative isolate scroll-mt-24 overflow-hidden bg-sage px-6 py-24 text-ink md:px-16"
    >
      <Botanical corner="top-right" variant="branch" tone="ink" />

      <h2 className="text-display-lg">Questions and answers.</h2>

      <div className="mt-14 max-w-2xl divide-y divide-ink/15 border-t border-ink/15">
        {FAQS.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="text-space-name flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="text-eyebrow shrink-0 text-ink/60 group-open:hidden">+</span>
              <span className="text-eyebrow hidden shrink-0 text-ink/60 group-open:inline">&minus;</span>
            </summary>
            <p className="text-body mt-4 max-w-xl">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const RATE_ROWS: { label: string; peak: string; shoulder: string; winter: string }[] = [
  { label: "Saturday", peak: "$16,000", shoulder: "$11,500", winter: "$8,000" },
  { label: "Friday or Sunday", peak: "$11,000", shoulder: "$8,500", winter: "$6,000" },
  { label: "Weekday", peak: "$6,500", shoulder: "$5,500", winter: "$4,500" },
  { label: "Glasshouse only, daytime", peak: "$3,800", shoulder: "$3,200", winter: "$2,600" },
  { label: "Stone Room, private dinner", peak: "$1,400", shoulder: "$1,400", winter: "$1,200" },
];

const INCLUDED = [
  "Both indoor spaces and the Orchard",
  "Setup access from Friday noon",
  "Tables, standard chairs, linens",
  "Venue manager on site",
  "Parking for 90 cars",
  "Sound system in the Barn",
  "Rain plan at no extra cost",
];

const NOT_INCLUDED = [
  "Catering",
  "Bar",
  "Chiavari chair upgrade ($14/chair)",
  "Ceremony setup ($2,500)",
  "Overtime past midnight ($1,200/hr)",
  "Accommodation",
  "Anything you'd hire a florist, photographer or DJ for",
];

export default function SiteFees() {
  return (
    <section id="fees" className="scroll-mt-24 bg-bone px-6 py-24 text-ink md:px-16">
      <h2 className="text-display-lg max-w-xl">Site fees.</h2>
      <p className="text-body mt-6 max-w-2xl">
        The site fee buys the estate, both indoor spaces, the Orchard, setup
        from Friday noon, and a venue manager on site all day. Catering and
        bar are separate and quoted per head.
      </p>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[560px] max-w-3xl border-collapse">
          <thead>
            <tr className="border-b border-rule">
              <th className="text-eyebrow py-3 pr-4 text-left font-normal text-stone">&nbsp;</th>
              <th className="text-eyebrow py-3 px-4 text-right font-normal text-stone">
                Peak (May&ndash;Oct)
              </th>
              <th className="text-eyebrow py-3 px-4 text-right font-normal text-stone">
                Shoulder (Apr, Nov)
              </th>
              <th className="text-eyebrow py-3 pl-4 text-right font-normal text-stone">
                Winter (Dec&ndash;Mar)
              </th>
            </tr>
          </thead>
          <tbody>
            {RATE_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-rule">
                <td className="text-spec py-3 pr-4">{row.label}</td>
                <td className="text-spec py-3 px-4 text-right">{row.peak}</td>
                <td className="text-spec py-3 px-4 text-right">{row.shoulder}</td>
                <td className="text-spec py-3 pl-4 text-right">{row.winter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <div className="text-eyebrow text-stone">Included</div>
          <ul className="text-body mt-4 space-y-2">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-eyebrow text-stone">Not included</div>
          <ul className="text-body mt-4 space-y-2">
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

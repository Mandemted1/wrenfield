import Eyebrow from "@/components/Eyebrow";

type Row = { label: string; value: string; emphasis?: boolean };

const ITEMS: Row[] = [
  { label: "Site fee — Saturday, September", value: "$16,000" },
  { label: "Catering — 120 × $205", value: "$24,600" },
  { label: "Bar — 120 × $88, full open bar, 5 hours", value: "$10,560" },
  { label: "Ceremony setup — chairs, arch, sound, rain plan", value: "$2,500" },
  { label: "Chiavari chair upgrade — 120 × $14", value: "$1,680" },
  { label: "Subtotal", value: "$55,340", emphasis: true },
  { label: "Service charge — 22%", value: "$12,175" },
  { label: "Subtotal", value: "$67,515", emphasis: true },
  { label: "NY sales tax — 8.125%", value: "$5,486" },
  { label: "Overtime — 1 hour past midnight", value: "$1,200" },
  { label: "TOTAL", value: "$74,201", emphasis: true },
];

export default function Costs() {
  return (
    <section id="costs" className="scroll-mt-24 bg-forest px-6 py-24 text-bone md:px-16">
      <Eyebrow>The Part Everyone Hides</Eyebrow>
      <h2 className="text-display-lg mt-6 max-w-2xl">
        Our site fee is $16,000.
        <br />
        Your wedding will cost about $74,000.
      </h2>

      <p className="text-body mt-8 max-w-2xl text-bone/90">
        Every venue in this valley advertises the first number and lets you
        discover the second one in month four of planning. We think
        that&rsquo;s a rotten way to treat people who are about to spend a
        year&rsquo;s savings.
      </p>
      <p className="text-body mt-4 max-w-2xl text-bone/90">
        So here is a real wedding we hosted last September. 120 guests,
        Saturday, ceremony in the Orchard, dinner in the Barn. Every line,
        including the ones that are easy to forget.
      </p>

      <div className="mt-14 max-w-2xl">
        <table className="w-full border-collapse">
          <tbody>
            {ITEMS.map((row, i) => (
              <tr
                key={`${row.label}-${i}`}
                className={row.emphasis ? "border-t border-bone/40" : "border-b border-bone/15"}
              >
                <td
                  className={`text-spec py-3 pr-4 ${row.emphasis ? "text-bone" : "text-bone/80"}`}
                  style={row.emphasis ? { fontWeight: 400 } : undefined}
                >
                  {row.label}
                </td>
                <td
                  className={`text-spec py-3 text-right ${row.emphasis ? "text-bone" : "text-bone/90"}`}
                  style={row.emphasis ? { fontWeight: 400 } : undefined}
                >
                  {row.value}
                </td>
              </tr>
            ))}
            <tr className="border-t border-bone/40">
              <td className="text-spec py-3 pr-4" style={{ fontWeight: 400 }}>
                Per guest
              </td>
              <td className="text-spec py-3 text-right" style={{ fontWeight: 400 }}>
                $618
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        <p className="text-body text-bone/90">
          <span style={{ fontWeight: 400 }}>
            The service charge is the line that gets people.{" "}
          </span>
          Twenty-two percent on food and beverage is standard across this
          industry, and on a $35,000 F&amp;B spend that&rsquo;s $7,700 you
          didn&rsquo;t budget for. It is not a gratuity; it goes to the house.
          Ask every venue you tour what theirs is, and ask before you fall in
          love with the room.
        </p>
        <p className="text-body text-bone/90">
          <span style={{ fontWeight: 400 }}>What isn&rsquo;t in that number. </span>
          Photography, flowers, music, dress, rings, hair, invitations,
          transport, officiant, and the rehearsal dinner. Couples in this
          valley typically spend another $30,000 to $50,000 on those. Your
          all-in is closer to $110,000 than $74,000, and you should hear that
          from us in month one rather than month nine.
        </p>
        <p className="text-body text-bone/90">
          <span style={{ fontWeight: 400 }}>How to spend less here. </span>A
          Friday in October is $9,000 instead of $16,000. Eighty guests
          instead of 120 takes roughly $22,000 off. Beer, wine and one
          cocktail instead of a full open bar saves about $3,400. Long tables
          instead of rounds means you can seat the same people in the
          Glasshouse, which is a smaller site fee. We&rsquo;ll walk you
          through all of it and we won&rsquo;t sulk about it.
        </p>
      </div>
    </section>
  );
}

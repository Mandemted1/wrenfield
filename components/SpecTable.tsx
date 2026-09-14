type SpecRow = [string, string];

export default function SpecTable({
  rows,
  tone = "bone",
}: {
  rows: SpecRow[];
  tone?: "bone" | "sage";
}) {
  const ruleClass = tone === "sage" ? "border-ink/20" : "border-rule";
  const labelClass = tone === "sage" ? "text-ink/70" : "text-stone";

  return (
    <table className="w-full max-w-md border-collapse">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className={`border-b ${ruleClass}`}>
            <td className={`text-spec py-3 pr-4 ${labelClass}`}>{label}</td>
            <td className="text-spec py-3 text-right">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Logo({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "bone";
  className?: string;
}) {
  const color = tone === "bone" ? "text-bone" : "text-ink";

  return (
    <div className={`${color} leading-none ${className}`}>
      <div className="text-spec uppercase tracking-[0.18em]">Wrenfield</div>
      <div className={`mt-1 text-[0.625rem] uppercase tracking-[0.14em] ${color}/70`}>
        est. 1892
      </div>
    </div>
  );
}

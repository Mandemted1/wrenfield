import PillButton from "@/components/PillButton";
import SpecTable from "@/components/SpecTable";
import {
  EVENT_TYPE_LABELS,
  LAYOUT_LABELS,
  formatUSD,
  type EventType,
  type FitResult,
  type LayoutType,
  type Space,
} from "@/lib/planner";

function fitLabel(state: FitResult["state"]) {
  if (state === "comfortable") return "comfortable";
  if (state === "workable") return "workable";
  return "over capacity";
}

function FitMessage({
  fit,
  space,
  eventType,
  guests,
  alternative,
  onApplyAlternative,
}: {
  fit: FitResult;
  space: Space;
  eventType: EventType;
  guests: number;
  alternative: { space: Space; fit: FitResult } | null;
  onApplyAlternative: () => void;
}) {
  if (fit.state === "comfortable") {
    return <p className="text-body">There&rsquo;s room for this and a dance floor.</p>;
  }

  if (fit.state === "workable") {
    return (
      <p className="text-body">
        This fits, but it&rsquo;s snug. We&rsquo;d suggest long tables instead
        of rounds, or moving cocktails to the Glasshouse.
      </p>
    );
  }

  const capMessage = fit.overCap
    ? `${space.caps[eventType]} is the ceiling for ${space.name} at a ${EVENT_TYPE_LABELS[eventType].toLowerCase()}.`
    : `${space.name} is too tight for ${guests} guests with room for a proper layout.`;

  return (
    <div>
      <p className="text-body">
        {capMessage}{" "}
        {alternative && (
          <>
            {alternative.space.name} takes {alternative.space.caps[eventType]} — want to see
            that instead?
          </>
        )}
      </p>
      {alternative && (
        <div className="mt-4">
          <PillButton variant="outline" onClick={onApplyAlternative}>
            Switch to {alternative.space.name}
          </PillButton>
        </div>
      )}
    </div>
  );
}

export default function PlannerOutput({
  space,
  eventType,
  layout,
  guests,
  fit,
  tableDescription,
  cost,
  alternative,
  onApplyAlternative,
}: {
  space: Space;
  eventType: EventType;
  layout: LayoutType;
  guests: number;
  fit: FitResult;
  tableDescription: string;
  cost: { low: number; high: number };
  alternative: { space: Space; fit: FitResult } | null;
  onApplyAlternative: () => void;
}) {
  const rows: [string, string][] = [
    ["Space", space.name],
    ["Layout", LAYOUT_LABELS[layout]],
    ["Tables", tableDescription],
    ["Space per guest", `${fit.perGuest.toFixed(1)} m² — ${fitLabel(fit.state)}`],
    ["Dance floor", fit.danceFloor > 0 ? `Yes, ${fit.danceFloor} m² retained` : "No"],
    ["Estimated total", `${formatUSD(cost.low)} – ${formatUSD(cost.high)} all in (estimate)`],
  ];

  return (
    <div>
      <SpecTable rows={rows} tone="bone" />

      <div className="mt-6">
        <FitMessage
          fit={fit}
          space={space}
          eventType={eventType}
          guests={guests}
          alternative={alternative}
          onApplyAlternative={onApplyAlternative}
        />
      </div>

      <p className="text-spec mt-8 text-stone">
        These are real capacities, not marketing ones. Every number here comes
        from a plan we&rsquo;ve actually set. If you&rsquo;re within ten
        guests of a ceiling, call us — there&rsquo;s usually a way.
      </p>
    </div>
  );
}

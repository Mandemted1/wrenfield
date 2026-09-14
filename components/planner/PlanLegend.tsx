import { chairMarkPath } from "@/lib/plannerLayout";

export default function PlanLegend({
  hasDanceFloor,
  hasFocalPoint,
}: {
  hasDanceFloor: boolean;
  hasFocalPoint: boolean;
}) {
  return (
    <div className="text-spec mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-stone">
      <span className="flex items-center gap-2">
        <svg viewBox="0 0 10 10" className="h-3 w-3" aria-hidden="true">
          <circle
            cx="5"
            cy="5"
            r="4"
            fill="var(--color-sage-lt)"
            stroke="var(--color-sage)"
            strokeWidth="1.2"
          />
        </svg>
        Table
      </span>
      <span className="flex items-center gap-2">
        <svg viewBox="-1 -1 2 2" className="h-3 w-3" aria-hidden="true">
          <path
            d={chairMarkPath(0, 0, 0.75)}
            stroke="var(--color-sage)"
            strokeWidth={0.22}
            strokeLinecap="round"
          />
        </svg>
        Chair
      </span>
      {hasDanceFloor && (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 14 10" className="h-3 w-4" aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="12"
              height="8"
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="1"
              strokeDasharray="2 1.5"
            />
          </svg>
          Dance floor
        </span>
      )}
      {hasFocalPoint && (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 14 10" className="h-3 w-4" aria-hidden="true">
            <rect
              x="1"
              y="3"
              width="12"
              height="4"
              fill="var(--color-sage-lt)"
              stroke="var(--color-sage)"
              strokeWidth="1"
            />
          </svg>
          Stage / focal point
        </span>
      )}
    </div>
  );
}

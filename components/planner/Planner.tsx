"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  EVENT_TYPE_LABELS,
  LAYOUTS_BY_EVENT_TYPE,
  LAYOUT_LABELS,
  SPACES,
  computeCost,
  computeFit,
  computeTableCount,
  findAlternativeSpace,
  findBestSpace,
  type EventType,
  type LayoutType,
  type SpaceId,
} from "@/lib/planner";
import { ROOM_DIMENSIONS, generateFloorPlan } from "@/lib/plannerLayout";
import GuestSlider from "./GuestSlider";
import FloorPlanSVG from "./FloorPlanSVG";
import PlanLegend from "./PlanLegend";
import PlannerOutput from "./PlannerOutput";
import PillButton from "@/components/PillButton";

type SelectedSpace = SpaceId | "auto";

type PlannerState = {
  guests: number;
  eventType: EventType;
  layout: LayoutType;
  space: SelectedSpace;
};

const DEFAULT_STATE: PlannerState = {
  guests: 100,
  eventType: "dinner",
  layout: "rounds",
  space: "auto",
};

function readStateFromURL(): PlannerState {
  const params = new URLSearchParams(window.location.search);
  const guestsParam = Number(params.get("guests"));
  const typeParam = params.get("type");
  const layoutParam = params.get("layout");
  const spaceParam = params.get("space");

  const eventType: EventType =
    typeParam && typeParam in EVENT_TYPE_LABELS ? (typeParam as EventType) : DEFAULT_STATE.eventType;

  const validLayouts = LAYOUTS_BY_EVENT_TYPE[eventType];
  const layout: LayoutType =
    layoutParam && (validLayouts as string[]).includes(layoutParam)
      ? (layoutParam as LayoutType)
      : validLayouts[0];

  const space: SelectedSpace =
    spaceParam === "auto" || SPACES.some((s) => s.id === spaceParam)
      ? (spaceParam as SelectedSpace)
      : DEFAULT_STATE.space;

  const guests =
    Number.isFinite(guestsParam) && guestsParam >= 20 && guestsParam <= 240
      ? guestsParam
      : DEFAULT_STATE.guests;

  return { guests, eventType, layout, space };
}

export default function Planner() {
  const [state, setState] = useState<PlannerState>(DEFAULT_STATE);
  const { guests, eventType, layout, space: selectedSpace } = state;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore from URL after mount only, so the very first paint (server and
  // client) is always the valid default plan — no hydration mismatch.
  // One-time read of an external source (the URL) on mount; there is no
  // event to subscribe to instead.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readStateFromURL());
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("guests", String(guests));
      params.set("type", eventType);
      params.set("layout", layout);
      params.set("space", selectedSpace);
      const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState(null, "", url);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [guests, eventType, layout, selectedSpace]);

  const resolvedSpace = useMemo(() => {
    if (selectedSpace === "auto") return findBestSpace(eventType, layout, guests);
    return SPACES.find((s) => s.id === selectedSpace) ?? findBestSpace(eventType, layout, guests);
  }, [selectedSpace, eventType, layout, guests]);

  const fit = useMemo(
    () => computeFit(resolvedSpace, eventType, layout, guests),
    [resolvedSpace, eventType, layout, guests]
  );
  const tableInfo = useMemo(() => computeTableCount(layout, guests), [layout, guests]);
  const cost = useMemo(() => computeCost(resolvedSpace.id, guests), [resolvedSpace, guests]);

  const alternative = useMemo(() => {
    if (fit.state !== "over-capacity") return null;
    const altSpace = findAlternativeSpace(resolvedSpace.id, eventType, layout, guests);
    if (!altSpace) return null;
    return { space: altSpace, fit: computeFit(altSpace, eventType, layout, guests) };
  }, [fit.state, resolvedSpace, eventType, layout, guests]);

  const room = ROOM_DIMENSIONS[resolvedSpace.id];
  const floorPlan = useMemo(
    () => generateFloorPlan(layout, guests, room, eventType),
    [layout, guests, room, eventType]
  );

  function handleGuestsChange(next: number) {
    setState((prev) => ({ ...prev, guests: next }));
  }

  function handleEventTypeChange(next: EventType) {
    setState((prev) => {
      const validLayouts = LAYOUTS_BY_EVENT_TYPE[next];
      const nextLayout = validLayouts.includes(prev.layout) ? prev.layout : validLayouts[0];
      return { ...prev, eventType: next, layout: nextLayout };
    });
  }

  function handleLayoutChange(next: LayoutType) {
    setState((prev) => ({ ...prev, layout: next }));
  }

  function handleSpaceChange(next: SelectedSpace) {
    setState((prev) => ({ ...prev, space: next }));
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
      <div className="order-1 space-y-10">
        <GuestSlider value={guests} onChange={handleGuestsChange} />

        <div>
          <div className="text-eyebrow text-stone">What kind of event</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleEventTypeChange(type)}
                aria-pressed={type === eventType}
                className={`rounded-pill border px-4 py-2 text-spec transition-colors ${
                  type === eventType
                    ? "border-ink bg-ink text-bone"
                    : "border-rule text-ink hover:border-ink"
                }`}
              >
                {EVENT_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-eyebrow text-stone">Table layout</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {LAYOUTS_BY_EVENT_TYPE[eventType].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => handleLayoutChange(l)}
                aria-pressed={l === layout}
                className={`rounded-pill border px-4 py-2 text-spec transition-colors ${
                  l === layout ? "border-ink bg-ink text-bone" : "border-rule text-ink hover:border-ink"
                }`}
              >
                {LAYOUT_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-eyebrow text-stone">Space</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSpaceChange("auto")}
              aria-pressed={selectedSpace === "auto"}
              className={`rounded-pill border px-4 py-2 text-spec transition-colors ${
                selectedSpace === "auto"
                  ? "border-ink bg-ink text-bone"
                  : "border-rule text-ink hover:border-ink"
              }`}
            >
              Find the best fit
            </button>
            {SPACES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSpaceChange(s.id)}
                aria-pressed={selectedSpace === s.id}
                disabled={s.caps[eventType] === 0}
                className={`rounded-pill border px-4 py-2 text-spec transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                  selectedSpace === s.id
                    ? "border-ink bg-ink text-bone"
                    : "border-rule text-ink hover:border-ink"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <PillButton variant="fill" href="#contact">
            Check if a date is free
          </PillButton>
          <PillButton variant="outline" href="#contact">
            Email me this plan
          </PillButton>
        </div>
      </div>

      <div className="order-2">
        <div className="rounded-card border border-rule bg-paper p-6 md:p-10">
          <FloorPlanSVG
            tables={floorPlan.tables}
            danceFloor={floorPlan.danceFloor}
            focalPoint={floorPlan.focalPoint}
            room={room}
            outdoor={resolvedSpace.outdoor}
          />
          <PlanLegend
            hasDanceFloor={!!floorPlan.danceFloor}
            hasFocalPoint={!!floorPlan.focalPoint}
          />
        </div>

        <div className="mt-10">
          <PlannerOutput
            space={resolvedSpace}
            eventType={eventType}
            layout={layout}
            guests={guests}
            fit={fit}
            tableDescription={tableInfo.description}
            cost={cost}
            alternative={alternative}
            onApplyAlternative={() => alternative && handleSpaceChange(alternative.space.id)}
          />
        </div>
      </div>
    </div>
  );
}

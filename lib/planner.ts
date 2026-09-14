// Planner data and maths — verbatim from the build brief section 5. Never adjust these figures.

export type EventType = "dinner" | "ceremony" | "cocktail" | "conference";

export type LayoutType =
  | "rounds"
  | "longTables"
  | "herringbone"
  | "theatre"
  | "classroom"
  | "boardroom"
  | "horseshoe"
  | "standing";

export type SpaceId = "barn" | "glasshouse" | "orchard" | "stone";

export type Space = {
  id: SpaceId;
  name: string;
  area: number;
  outdoor: boolean;
  caps: Record<EventType, number>;
};

export const SPACES: Space[] = [
  {
    id: "barn",
    name: "The Dairy Barn",
    area: 340,
    outdoor: false,
    caps: { dinner: 220, ceremony: 260, cocktail: 300, conference: 150 },
  },
  {
    id: "glasshouse",
    name: "The Glasshouse",
    area: 185,
    outdoor: false,
    caps: { dinner: 120, ceremony: 150, cocktail: 180, conference: 90 },
  },
  {
    id: "orchard",
    name: "The Orchard",
    area: 600,
    outdoor: true,
    caps: { dinner: 140, ceremony: 200, cocktail: 250, conference: 0 },
  },
  {
    id: "stone",
    name: "The Stone Room",
    area: 70,
    outdoor: false,
    caps: { dinner: 40, ceremony: 50, cocktail: 60, conference: 22 },
  },
];

export const M2_PER_GUEST: Record<LayoutType, number> = {
  rounds: 1.55,
  longTables: 1.2,
  herringbone: 1.3,
  theatre: 0.8,
  classroom: 1.65,
  boardroom: 2.1,
  horseshoe: 1.9,
  standing: 0.7,
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  dinner: "Seated dinner",
  ceremony: "Ceremony",
  cocktail: "Cocktail reception",
  conference: "Conference",
};

export const LAYOUTS_BY_EVENT_TYPE: Record<EventType, LayoutType[]> = {
  dinner: ["rounds", "longTables", "herringbone"],
  ceremony: ["theatre", "horseshoe"],
  cocktail: ["standing"],
  conference: ["theatre", "classroom", "boardroom", "horseshoe"],
};

export const LAYOUT_LABELS: Record<LayoutType, string> = {
  rounds: "Round tables",
  longTables: "Long tables",
  herringbone: "Herringbone",
  theatre: "Theatre rows",
  classroom: "Classroom",
  boardroom: "Boardroom",
  horseshoe: "Horseshoe",
  standing: "Standing",
};

export type FitState = "comfortable" | "workable" | "over-capacity";

export type FitResult = {
  required: number;
  danceFloor: number;
  usable: number;
  perGuest: number;
  ratio: number;
  hardCap: number;
  overCap: boolean;
  state: FitState;
};

export function computeFit(
  space: Space,
  eventType: EventType,
  layout: LayoutType,
  guests: number
): FitResult {
  const required = guests * M2_PER_GUEST[layout];
  const danceFloor = eventType === "dinner" ? 40 : 0;
  const usable = space.area - danceFloor;
  const perGuest = usable / guests;
  const ratio = required / usable;
  const hardCap = space.caps[eventType];
  const overCap = guests > hardCap;

  let state: FitState;
  if (overCap || ratio > 1.0) {
    state = "over-capacity";
  } else if (ratio <= 0.8) {
    state = "comfortable";
  } else {
    state = "workable";
  }

  return { required, danceFloor, usable, perGuest, ratio, hardCap, overCap, state };
}

export function computeTableCount(layout: LayoutType, guests: number): { count: number; description: string } {
  switch (layout) {
    case "rounds":
      return { count: Math.ceil(guests / 10), description: `${Math.ceil(guests / 10)} rounds of 10` };
    case "longTables":
      return { count: Math.ceil(guests / 20), description: `${Math.ceil(guests / 20)} long tables` };
    case "herringbone": {
      const arms = Math.ceil(Math.max(0, guests - 12) / 14);
      return { count: 1 + arms, description: `1 head table + ${arms} arms` };
    }
    case "theatre":
      return { count: Math.ceil(guests / 12), description: `${Math.ceil(guests / 12)} rows of 12` };
    case "classroom":
      return { count: Math.ceil(guests / 3), description: `${Math.ceil(guests / 3)} tables of 3` };
    case "boardroom":
      return { count: 1, description: "1 table" };
    case "horseshoe":
      return { count: 3, description: "3 runs" };
    case "standing":
      return { count: Math.ceil(guests / 8), description: `${Math.ceil(guests / 8)} high-tops` };
  }
}

// Real published figures from copy.md sections 08 and 09 — never invented.
export const CATERING_PER_GUEST = 205;
export const BAR_PER_GUEST = 88;
export const SERVICE_CHARGE_RATE = 0.22;
export const TAX_RATE = 0.08125;

// Site fee by space: full-estate Saturday-peak rate for Barn/Orchard bookings,
// and each space's own reduced tier for Glasshouse-only and Stone Room bookings —
// from the section 09 site fee table.
export const SITE_FEE_BY_SPACE: Record<SpaceId, number> = {
  barn: 16000,
  orchard: 16000,
  glasshouse: 3800,
  stone: 1400,
};

export function computeCost(spaceId: SpaceId, guests: number) {
  const siteFee = SITE_FEE_BY_SPACE[spaceId];
  const guestCost = guests * (CATERING_PER_GUEST + BAR_PER_GUEST);
  const subtotal = siteFee + guestCost;
  const withService = subtotal * (1 + SERVICE_CHARGE_RATE);
  const total = withService * (1 + TAX_RATE);
  const low = Math.round((total * 0.92) / 100) * 100;
  const high = Math.round((total * 1.08) / 100) * 100;
  return { total, low, high };
}

const STATE_RANK: Record<FitState, number> = { comfortable: 0, workable: 1, "over-capacity": 2 };

function rankSpaces(
  eventType: EventType,
  layout: LayoutType,
  guests: number,
  excludeId?: SpaceId
) {
  return SPACES.filter((s) => (excludeId ? s.id !== excludeId : true))
    .filter((s) => s.caps[eventType] > 0)
    .map((s) => ({ space: s, fit: computeFit(s, eventType, layout, guests) }))
    .sort((a, b) => {
      const rankDiff = STATE_RANK[a.fit.state] - STATE_RANK[b.fit.state];
      if (rankDiff !== 0) return rankDiff;
      const capDiff = Number(a.fit.overCap) - Number(b.fit.overCap);
      if (capDiff !== 0) return capDiff;
      if (a.fit.state === "over-capacity") {
        // Nothing here actually fits — recommend the least-bad option
        // (closest to fitting), not the one that's most over.
        return a.fit.ratio - b.fit.ratio;
      }
      // Among viable options, prefer the snugger fit (higher ratio) over the
      // most cavernous one — "best fit" means appropriately sized.
      return b.fit.ratio - a.fit.ratio;
    });
}

export function findBestSpace(eventType: EventType, layout: LayoutType, guests: number): Space {
  const ranked = rankSpaces(eventType, layout, guests);
  return ranked[0]?.space ?? SPACES[0];
}

export function findAlternativeSpace(
  currentId: SpaceId,
  eventType: EventType,
  layout: LayoutType,
  guests: number
): Space | null {
  const ranked = rankSpaces(eventType, layout, guests, currentId);
  return ranked[0]?.space ?? null;
}

export function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

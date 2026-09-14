import type { EventType, LayoutType } from "./planner";

export type TableShape = {
  key: string;
  kind: "round" | "rect" | "highTop" | "none";
  cx: number;
  cy: number;
  w: number;
  h: number;
  rotation: number;
  chairs: { x: number; y: number }[];
};

export type DanceFloor = { x: number; y: number; w: number; h: number };
export type FocalPoint = { x: number; y: number; w: number; h: number };

export type Room = { width: number; height: number };

// Rough proportions for the SVG only — the real capacity maths uses space.area directly.
export const ROOM_DIMENSIONS: Record<string, Room> = {
  barn: { width: 30, height: 11 },
  glasshouse: { width: 15, height: 12 },
  orchard: { width: 28, height: 20 },
  stone: { width: 10, height: 7 },
};

export function chairMarkPath(x: number, y: number, size = 0.16): string {
  return `M${x - size} ${y - size} L${x + size} ${y + size} M${x + size} ${y - size} L${x - size} ${y + size}`;
}

function chairsAroundCircle(cx: number, cy: number, r: number, count: number, maxDist?: number) {
  const chairs: { x: number; y: number }[] = [];
  const desired = r + Math.max(0.28, r * 0.35);
  const dist = maxDist ? Math.min(desired, maxDist) : desired;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    chairs.push({ x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist });
  }
  return chairs;
}

function chairsAlongRect(
  cx: number,
  cy: number,
  w: number,
  h: number,
  perSide: number,
  sides: ("top" | "bottom" | "left" | "right")[]
) {
  const chairs: { x: number; y: number }[] = [];
  const margin = 0.45;
  sides.forEach((side) => {
    for (let i = 0; i < perSide; i++) {
      const t = (i + 0.5) / perSide;
      if (side === "top") chairs.push({ x: cx - w / 2 + t * w, y: cy - h / 2 - margin });
      if (side === "bottom") chairs.push({ x: cx - w / 2 + t * w, y: cy + h / 2 + margin });
      if (side === "left") chairs.push({ x: cx - w / 2 - margin, y: cy - h / 2 + t * h });
      if (side === "right") chairs.push({ x: cx + w / 2 + margin, y: cy - h / 2 + t * h });
    }
  });
  return chairs;
}

function chairsAroundRectPerimeter(cx: number, cy: number, w: number, h: number, count: number) {
  const chairs: { x: number; y: number }[] = [];
  const margin = 0.45;
  const perimeter = 2 * (w + h);
  const capped = Math.min(count, 40);
  for (let i = 0; i < capped; i++) {
    const d = (i / capped) * perimeter;
    let x = 0;
    let y = 0;
    if (d < w) {
      x = cx - w / 2 + d;
      y = cy - h / 2 - margin;
    } else if (d < w + h) {
      x = cx + w / 2 + margin;
      y = cy - h / 2 + (d - w);
    } else if (d < 2 * w + h) {
      x = cx + w / 2 - (d - w - h);
      y = cy + h / 2 + margin;
    } else {
      x = cx - w / 2 - margin;
      y = cy + h / 2 - (d - 2 * w - h);
    }
    chairs.push({ x, y });
  }
  return chairs;
}

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function layoutRounds(guests: number, width: number, height: number): TableShape[] {
  const count = Math.ceil(guests / 10);
  const perRow = 4;
  const rows = Math.ceil(count / perRow);
  const cellW = width / (perRow + 1);
  const cellH = height / (rows + 1);
  const r = Math.min(cellW, cellH) * 0.28;
  const maxChairDist = Math.min(cellW, cellH) / 2 - 0.08;
  const tables: TableShape[] = [];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const offset = row % 2 === 1 ? cellW / 2 : 0;
    const cx = cellW * 0.75 + col * cellW + offset;
    const cy = cellH * 0.9 + row * cellH;
    const seats = Math.min(10, guests - i * 10);
    tables.push({
      key: `rounds-${i}`,
      kind: "round",
      cx,
      cy,
      w: r * 2,
      h: r * 2,
      rotation: 0,
      chairs: chairsAroundCircle(cx, cy, r, seats, maxChairDist),
    });
  }
  return tables;
}

function layoutLongTables(guests: number, width: number, height: number): TableShape[] {
  const count = Math.ceil(guests / 20);
  const gap = width / (count + 1);
  const tableW = Math.min(gap * 0.45, 1.6);
  const tableH = height * 0.7;
  const cy = height * 0.5 + 0.3;
  const tables: TableShape[] = [];
  for (let i = 0; i < count; i++) {
    const cx = gap * (i + 1);
    const seats = Math.min(20, guests - i * 20);
    const perSide = Math.ceil(seats / 2);
    tables.push({
      key: `long-${i}`,
      kind: "rect",
      cx,
      cy,
      w: tableW,
      h: tableH,
      rotation: 0,
      chairs: chairsAlongRect(cx, cy, tableW, tableH, perSide, ["left", "right"]).slice(0, seats),
    });
  }
  return tables;
}

function layoutHerringbone(guests: number, width: number, height: number): TableShape[] {
  const arms = Math.ceil(Math.max(0, guests - 12) / 14);
  const tables: TableShape[] = [];
  const headW = width * 0.3;
  const headH = 1;
  const headCx = width / 2;
  const headCy = height * 0.14;
  tables.push({
    key: "herringbone-head",
    kind: "rect",
    cx: headCx,
    cy: headCy,
    w: headW,
    h: headH,
    rotation: 0,
    chairs: chairsAlongRect(headCx, headCy, headW, headH, Math.min(12, guests), ["bottom"]),
  });

  const armW = width * 0.17;
  const armH = 0.9;
  const pairs = Math.ceil(arms / 2);
  const spineGap = (height * 0.75) / (pairs + 1);
  for (let i = 0; i < arms; i++) {
    const pairIndex = Math.floor(i / 2);
    const side = i % 2 === 0 ? -1 : 1;
    const cy = headCy + spineGap * (pairIndex + 1);
    const cx = width / 2 + side * armW * 1.1;
    const seatsRemaining = guests - 12 - i * 14;
    const seats = Math.max(1, Math.min(14, seatsRemaining));
    tables.push({
      key: `herringbone-arm-${i}`,
      kind: "rect",
      cx,
      cy,
      w: armW,
      h: armH,
      rotation: side * 30,
      chairs: chairsAlongRect(cx, cy, armW, armH, Math.max(1, Math.ceil(seats / 2)), ["top", "bottom"]),
    });
  }
  return tables;
}

function layoutTheatre(guests: number, width: number, height: number): { tables: TableShape[]; focalPoint: FocalPoint } {
  const perRow = 12;
  const rows = Math.ceil(guests / perRow);
  const rowGap = Math.min((height * 0.8) / (rows + 1), 1);
  const colGap = width / (perRow / 2 + 2);
  const chairs: { x: number; y: number }[] = [];
  let remaining = guests;

  for (let r = 0; r < rows; r++) {
    const seatsInRow = Math.min(perRow, remaining);
    remaining -= seatsInRow;
    const half = Math.ceil(seatsInRow / 2);
    const aisleGap = colGap * 0.6;
    for (let c = 0; c < seatsInRow; c++) {
      const isLeft = c < half;
      const idx = isLeft ? half - c : c - half + 1;
      const cx = isLeft ? width / 2 - aisleGap / 2 - idx * colGap : width / 2 + aisleGap / 2 + (idx - 1) * colGap;
      const cy = height * 0.32 + r * rowGap;
      chairs.push({ x: cx, y: cy });
    }
  }

  return {
    tables: [
      {
        key: "theatre-seats",
        kind: "none",
        cx: width / 2,
        cy: height / 2,
        w: 0,
        h: 0,
        rotation: 0,
        chairs,
      },
    ],
    focalPoint: { x: width * 0.35, y: height * 0.06, w: width * 0.3, h: 0.6 },
  };
}

function layoutClassroom(guests: number, width: number, height: number): TableShape[] {
  const count = Math.ceil(guests / 3);
  const perRow = 4;
  const rows = Math.ceil(count / perRow);
  const cellW = width / (perRow + 1);
  const cellH = Math.min((height * 0.8) / (rows + 1), 1.4);
  const tableW = cellW * 0.7;
  const tableH = 0.5;
  const tables: TableShape[] = [];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const cx = cellW * 0.75 + col * cellW;
    const cy = height * 0.18 + row * cellH;
    const seats = Math.min(3, guests - i * 3);
    tables.push({
      key: `classroom-${i}`,
      kind: "rect",
      cx,
      cy,
      w: tableW,
      h: tableH,
      rotation: 0,
      chairs: chairsAlongRect(cx, cy, tableW, tableH, seats, ["bottom"]),
    });
  }
  return tables;
}

function layoutBoardroom(guests: number, width: number, height: number): TableShape[] {
  const cx = width / 2;
  const cy = height / 2;
  const w = width * 0.5;
  const h = height * 0.35;
  return [
    {
      key: "boardroom-table",
      kind: "rect",
      cx,
      cy,
      w,
      h,
      rotation: 0,
      chairs: chairsAroundRectPerimeter(cx, cy, w, h, guests),
    },
  ];
}

function layoutHorseshoe(guests: number, width: number, height: number): TableShape[] {
  const legW = 0.9;
  const legH = height * 0.55;
  const topW = width * 0.45;
  const topH = 0.9;
  const leftCx = width * 0.28;
  const rightCx = width * 0.72;
  const legCy = height * 0.22 + legH / 2;
  const topCy = height * 0.05 + topH / 2;
  const seatsPerRun = Math.ceil(guests / 3);

  return [
    {
      key: "horseshoe-left",
      kind: "rect",
      cx: leftCx,
      cy: legCy,
      w: legW,
      h: legH,
      rotation: 0,
      chairs: chairsAlongRect(leftCx, legCy, legW, legH, seatsPerRun, ["right"]),
    },
    {
      key: "horseshoe-right",
      kind: "rect",
      cx: rightCx,
      cy: legCy,
      w: legW,
      h: legH,
      rotation: 0,
      chairs: chairsAlongRect(rightCx, legCy, legW, legH, seatsPerRun, ["left"]),
    },
    {
      key: "horseshoe-top",
      kind: "rect",
      cx: width / 2,
      cy: topCy,
      w: topW,
      h: topH,
      rotation: 0,
      chairs: chairsAlongRect(width / 2, topCy, topW, topH, seatsPerRun, ["bottom"]),
    },
  ];
}

function layoutStanding(guests: number, width: number, height: number): TableShape[] {
  const count = Math.ceil(guests / 8);
  const rng = seededRandom(42);
  const cols = Math.max(1, Math.ceil(Math.sqrt(count)));
  const rows = Math.ceil(count / cols);
  const cellW = width / (cols + 1);
  const cellH = height / (rows + 1);
  const tables: TableShape[] = [];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const jitterX = (rng() - 0.5) * cellW * 0.5;
    const jitterY = (rng() - 0.5) * cellH * 0.5;
    tables.push({
      key: `standing-${i}`,
      kind: "highTop",
      cx: cellW * (col + 1) + jitterX,
      cy: cellH * (row + 1) + jitterY,
      w: 0.7,
      h: 0.7,
      rotation: rng() * 20 - 10,
      chairs: [],
    });
  }
  return tables;
}

export function generateFloorPlan(
  layout: LayoutType,
  guests: number,
  room: Room,
  eventType: EventType
): { tables: TableShape[]; danceFloor: DanceFloor | null; focalPoint: FocalPoint | null } {
  const { width, height } = room;
  const danceFloorW = Math.min(width * 0.4, 8);
  const danceFloor: DanceFloor | null =
    eventType === "dinner"
      ? { x: width / 2 - danceFloorW / 2, y: height - 3.5, w: danceFloorW, h: 3 }
      : null;

  const usableHeight = danceFloor ? danceFloor.y - 0.5 : height - 0.5;

  switch (layout) {
    case "rounds":
      return { tables: layoutRounds(guests, width, usableHeight), danceFloor, focalPoint: null };
    case "longTables":
      return { tables: layoutLongTables(guests, width, usableHeight), danceFloor, focalPoint: null };
    case "herringbone":
      return { tables: layoutHerringbone(guests, width, usableHeight), danceFloor, focalPoint: null };
    case "theatre": {
      const { tables, focalPoint } = layoutTheatre(guests, width, height);
      return { tables, danceFloor: null, focalPoint };
    }
    case "classroom":
      return { tables: layoutClassroom(guests, width, height), danceFloor: null, focalPoint: null };
    case "boardroom":
      return { tables: layoutBoardroom(guests, width, height), danceFloor: null, focalPoint: null };
    case "horseshoe":
      return { tables: layoutHorseshoe(guests, width, height), danceFloor: null, focalPoint: null };
    case "standing":
      return { tables: layoutStanding(guests, width, height), danceFloor: null, focalPoint: null };
  }
}

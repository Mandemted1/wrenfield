"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { chairMarkPath, type DanceFloor, type FocalPoint, type Room, type TableShape } from "@/lib/plannerLayout";

export default function FloorPlanSVG({
  tables,
  danceFloor,
  focalPoint,
  room,
  outdoor,
}: {
  tables: TableShape[];
  danceFloor: DanceFloor | null;
  focalPoint: FocalPoint | null;
  room: Room;
  outdoor: boolean;
}) {
  const [rendered, setRendered] = useState<TableShape[]>(tables);
  const nodeRefs = useRef<Map<string, SVGGElement>>(new Map());
  const animatedKeys = useRef<Set<string>>(new Set(tables.map((t) => t.key)));

  useEffect(() => {
    setRendered((prevRendered) => {
      const newKeys = new Set(tables.map((t) => t.key));
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const leavingNow = prevRendered.filter((t) => !newKeys.has(t.key));

      leavingNow.forEach((t) => {
        const el = nodeRefs.current.get(t.key);
        animatedKeys.current.delete(t.key);
        if (el && !reduced) {
          gsap.to(el, {
            scale: 0.6,
            opacity: 0,
            duration: 0.2,
            transformOrigin: "center",
            onComplete: () => {
              nodeRefs.current.delete(t.key);
              setRendered((cur) => cur.filter((c) => c.key !== t.key));
            },
          });
        } else {
          nodeRefs.current.delete(t.key);
        }
      });

      if (reduced) return [...tables];
      return [...tables, ...leavingNow];
    });
  }, [tables]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const entering = rendered.filter((t) => !animatedKeys.current.has(t.key));
    if (entering.length === 0) return;

    entering.forEach((t) => animatedKeys.current.add(t.key));
    if (reduced) return;

    const els = entering
      .map((t) => nodeRefs.current.get(t.key))
      .filter((el): el is SVGGElement => !!el);

    if (els.length === 0) return;

    gsap.fromTo(
      els,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        stagger: 0.015,
        ease: "power2.out",
        transformOrigin: "center",
      }
    );
  }, [rendered]);

  const { width, height } = room;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Floor plan preview — a full text description of this layout follows below."
    >
      {outdoor ? (
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={width / 2 - 0.3}
          ry={height / 2 - 0.3}
          fill="none"
          stroke="var(--color-sage)"
          strokeWidth={0.15}
        />
      ) : (
        <rect
          x={0.3}
          y={0.3}
          width={width - 0.6}
          height={height - 0.6}
          fill="none"
          stroke="var(--color-sage)"
          strokeWidth={0.15}
        />
      )}

      {danceFloor && (
        <g>
          <rect
            x={danceFloor.x}
            y={danceFloor.y}
            width={danceFloor.w}
            height={danceFloor.h}
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth={0.08}
            strokeDasharray="0.35 0.25"
          />
          <text
            x={danceFloor.x + danceFloor.w / 2}
            y={danceFloor.y + danceFloor.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={0.45}
            letterSpacing={0.03}
            fill="var(--color-stone)"
          >
            DANCE FLOOR
          </text>
        </g>
      )}

      {focalPoint && (
        <rect
          x={focalPoint.x}
          y={focalPoint.y}
          width={focalPoint.w}
          height={focalPoint.h}
          fill="var(--color-sage-lt)"
          stroke="var(--color-sage)"
          strokeWidth={0.08}
        />
      )}

      {rendered.map((t) => (
        <g
          key={t.key}
          ref={(el) => {
            if (el) nodeRefs.current.set(t.key, el);
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {t.kind === "round" && (
            <circle
              cx={t.cx}
              cy={t.cy}
              r={t.w / 2}
              fill="var(--color-sage-lt)"
              stroke="var(--color-sage)"
              strokeWidth={0.1}
            />
          )}
          {(t.kind === "rect" || t.kind === "highTop") && (
            <rect
              x={t.cx - t.w / 2}
              y={t.cy - t.h / 2}
              width={t.w}
              height={t.h}
              fill="var(--color-sage-lt)"
              stroke="var(--color-sage)"
              strokeWidth={0.1}
              transform={t.rotation ? `rotate(${t.rotation} ${t.cx} ${t.cy})` : undefined}
            />
          )}
          {t.chairs.map((c, i) => (
            <path
              key={i}
              d={chairMarkPath(c.x, c.y)}
              stroke="var(--color-sage)"
              strokeWidth={0.045}
              strokeLinecap="round"
              opacity={0.55}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

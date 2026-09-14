# Wrenfield — build rules

## Content
All copy from /content/copy.md. Never invent or paraphrase. If a section
needs text that isn't there, stop and ask.

## Design
Tokens in globals.css @theme. Never hardcode a hex.
Cormorant Garamond (300/400) for display ONLY — never below 20px,
never for body, labels, table cells or UI.
Jost (300/400) for everything else.
Three backgrounds: bone, sage, forest. Sections butt with no gaps.
Body line-height 1.75. Do not tighten it.

## Botanicals
SVG with live stroke paths, never PNG.
All four layers: draw-on, parallax, scrub-rotation, idle sway.
pointer-events: none and aria-hidden="true" on every one.
Max four animating at once. Static and fully drawn under
prefers-reduced-motion — do not hide them.

## Planner
Capacity figures come from the build brief. NEVER invent or adjust them.
Hard capacity caps override the area maths.
Cost is always a range, always labelled estimate.
Defaults must render a valid plan on load.
Every over-capacity state names an alternative and offers a button
to apply it. No dead ends.
State syncs to URL query params, debounced 300ms.
Seeded RNG for standing layout — never Math.random() in render.

## Never
- No preloader
- No scroll snapping or scroll hijacking
- No custom cursor
- Sticky stacking on four transitions only, not every section
- No localStorage or sessionStorage
- No gradients except the headline text-fill
- No drop shadows

## Quality floor
Site fully usable with JavaScript disabled — planner degrades to the
static capacity tables in copy.md.
Mobile first from 375px. Visible focus rings. Alt text everywhere.
ScrollTrigger.refresh() after fonts load.
Run `npm run build` and fix all errors before calling a task done.

@AGENTS.md

A refined dark tech aesthetic fused with wabi-sabi: precision editorial layout, broken and gold-repaired. Every surface is treated as something once fractured and rejoined — never as decoration applied on top of a flat template.

## Content fundamentals

Voice is first-person, unhurried, declarative — a builder describing systems, not a resume selling them. Sentences are short and concrete ("Building: Project Projections" — not "Currently working on an exciting new venture!"). No exclamation points, no startup-pitch energy, no emoji as content. Section headers are always paired: an index label in `label` ("01 / WHO AM I?") followed by the actual title in `section-header` — never the title alone.

Numbering is literal and sequential (01 through 06) and never skipped or restyled — it is the spine that ties every section back to the nav.

Personal, unresolved or informal thoughts (mantras, half-finished notes) belong only in the Beyond the Résumé note cards, set at a slight rotation as if pinned to a desk — everywhere else the voice stays composed.

## Visual foundations

**Color.** `bg-void` is the only background a full page ever sits on. Containers sit one step up on `surface`, which is deliberately translucent (80%) so `bg-void` still reads faintly through it — never flatten it to full opacity. `text-primary` carries headlines and anything that must be read first; `text-secondary` carries everything supporting. Gold is a signal, not a fill: `gold-600` is the only gold that reads as text or a small icon (7.44:1 on `bg-void`); `gold-100` never carries text — it exists to be the light stop in a `gold-100 → gold-600` gradient, used for seams and glows. `border-slate` is a deliberately quiet border (it does not meet 3:1 against `bg-void` — that's intentional, it's a whisper, not a boundary); anywhere a border must actually be seen, use a gold fracture seam instead, never darken `border-slate` to compensate.

**Type.** Three families, three jobs, never mixed: `serif` (Instrument Serif / PP Editorial New) is for names, hero type and section headers only — `hero-title` (72px/1.0), `section-header` (40px/1.1), `nav-wordmark` (18px). `sans` (Inter / Geist Sans) is for `body` copy only (16px/1.6) — this is the one place text-secondary sets long-form reading. `mono` (JetBrains Mono / Geist Mono) is for everything that behaves like metadata: `label` (12px, all caps, +0.08em, gold-600) and `nav-link` (13px, all caps, +0.04em). If a piece of text isn't a name, a paragraph, or metadata, it doesn't have a fourth style — it borrows the nearest of these three.

**Spacing & grid.** The page is a 12-column asymmetric grid inside a `container-max` (1440px) container held at `space-64` from each edge. Sections never sit flush against each other — `space-140` always separates them. Inside a component, padding is `space-32` vertical by `space-36` horizontal. Compose the grid with deliberate offsets and overlapping planes; a symmetric, evenly-gapped layout is the one thing this system should never look like.

**Corners & borders.** `radius-sm` (4px) is standard everywhere — corners are stone-cut, not soft. Where the brief calls for a jagged or slanted edge (the hero portrait shards, a portal card's cut corner), reach for a `clip-path` polygon, never a bigger radius token — the softness budget is spent entirely on the gold seams, not the geometry. `border-hairline` (1px, `border-slate`) frames ordinary containers; `border-fracture` (1.5px, the gold gradient) is reserved for kintsugi seams and any edge that is meant to feel repaired rather than manufactured.

**Shadows & glow.** `shadow-elevated` lifts a surface off the void — use it once per raised layer, not stacked. `shadow-gold-glow` is for an active or hovered gold element (a lit tile border, the nav's live-status node). `shadow-fracture-glow` is applied as a CSS `filter: drop-shadow(...)`, never as `box-shadow` — it belongs on the gold SVG seam paths themselves and on the edges of the fractured hero portrait.

**Imagery.** The only photographic imagery this system calls for is Samuel's own hero portrait, fractured into shards — see the Hero guidelines for exactly how that's built once a real photo exists, and for `KnowledgeGraph`, the node-graph alternative that needs no photo at all. No stock photography, no illustration, no AI-generated "team photo" energy anywhere on the page.

**The page itself sits on `BackgroundFracture`** — dark stone grain plus a sparse, page-wide gold crack network, fixed behind every section — rather than a flat `bg-void` fill. Foreground seams (`FractureSeam`, the hero portrait's, `FracturedSectionStrip`'s dividers) stay brighter and denser than this ambient layer so the eye can tell "this specific thing broke" from "everything sits on broken ground."

**Motion.** Reserved for two things only: a slow ambient pulse on the nav's live-status node and any dashboard "live" indicator, and a hover lift/glow on interactive tiles and cards (border brightens toward `gold-600`, `shadow-gold-glow` fades in). Nothing auto-plays, nothing loops attention-grabbingly.

## Iconography

There is no icon font or sprite in this system — the brief calls for exactly one recurring mark (a small gold "live system" node in the nav and dashboard, as either `.ds-live-dot` or `StatusOrb`) plus the gold fracture seams themselves as the system's only other graphic language. Both are drawn as inline SVG bound to `gold-600` / the gold gradient and `shadow-fracture-glow`, never as raster icons. If a section later needs a true icon set, match this restraint: single-color line marks in `gold-600` or `text-secondary`, never filled or multi-color, and add them to a new `Icons` asset group rather than inventing a second visual language.

**On the hero portrait:** no photo of Samuel was provided to this system, so the Hero component ships with a clearly-marked placeholder in place of the fractured portrait — a gradient field cut into the same shard `clip-path`s a real photo would use, with a note in the component's guidelines on how to drop a real grayscale portrait in. Never substitute a generic face, an illustration, or an AI-generated likeness for Samuel's own photo.

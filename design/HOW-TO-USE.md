# Samuel Ehret — design folder

This is a static export of the design system built in Cowork. Drop the whole `design/` folder into your project.

## What's here

- `README.md` — the brand book: voice, color/type/spacing rules, iconography. Read this first.
- `tokens.json` — every design token (color, type, spacing, radius, shadow, border widths) as structured data.
- `tokens.css` — the same tokens compiled to CSS custom properties and the six type-style classes (`.hero-title`, `.section-header`, `.nav-wordmark`, `.body`, `.label`, `.nav-link`). Hand-generated from `tokens.json` — if you edit the tokens, keep this in sync (regenerate it, don't hand-edit both independently).
- `components/bundle.css` — shared utility classes used across previews (`.ds-card`, `.ds-hover-lift`, `.ds-live-dot`, `.ds-fracture-stroke`, `.ds-caps`, `.ds-container`, `.ds-eyebrow`, `.ds-gold-gradient-text`, `.ds-grain`).
- `components/<Name>/preview.html` — a working visual reference for each piece, and `components/<Name>/README.md` — the usage rules for it (props, do/don't).
- `inspiration/homepage-reference-mock.jpg` — the reference mock you provided; the source this system was designed to reproduce, kept here so anyone building the page can compare against it directly.

## Wiring it into a page

1. In `<head>`, load the three Google Fonts before your stylesheet:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
   ```
2. Then load `tokens.css`, then `components/bundle.css`.
3. Build each section from the matching component's `preview.html` (copy the markup, it's already using the token classes/variables) and its `README.md` (the rules for that component — sizing, what's allowed to vary, what never changes).

## Components → the reference mock's sections

- Page background → `BackgroundFracture` (mount once, fixed, behind everything)
- Nav → `NavBar` (+ `StatusOrb` if you want the static sphere instead of the pulsing `.ds-live-dot`)
- Hero left column → `Hero`; hero right column → `KnowledgeGraph` (the node graph in the mock — no photo needed) or `Hero`'s own fractured-portrait shards once a real photo of Samuel exists
- Every section's opening header → `SectionIndex`
- The five numbered gateway panels at the bottom of the mock → `FracturedSectionStrip`
- A chronological milestone timeline elsewhere on the page → `TimelineCard` + `FractureSeam` between them
- The six intellectual-territory tiles → `ThemeTile`
- The "Right Now" panel → `SnapshotPanel`
- The scattered desk notes → `NoteCard`
- Large standalone CTA cards (≤4) → `PortalCard`
- The system's own cover/title card → `Cover` (reference only, not part of the live page)

## Known gap

No real photo of Samuel has been provided yet. `Hero`'s portrait is a placeholder (marked as such in its own `README.md`) — swap in a real grayscale portrait when one exists, or use `KnowledgeGraph` instead, which needs no photo at all. Never substitute a generic or AI-generated face.

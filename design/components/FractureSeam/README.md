A single gold kintsugi seam — the connective tissue that visually weaves sections and milestone cards together down the page.

Consumer provides a path (or lets the seam run its default irregular curve) and, optionally, the two endpoints it should connect (e.g. the bottom of the hero portrait to the first timeline card).

Do:
- Always `.ds-fracture-stroke`: `stroke-width: border-fracture` (1.5px), the `gold-100 → gold-600` gradient, `filter: drop-shadow(shadow-fracture-glow)` — never a plain solid gold line, the glow is what makes it read as illuminated rather than drawn.
- Keep the path irregular — organic bézier curves, never a straight line or a perfect arc; this is a crack, not a connector arrow.
- Endpoints get a small `gold-600` dot where the seam meets a portrait, card or milestone.

Don't:
- Don't reuse this as a divider rule between unrelated content — it specifically implies "these two things are part of one broken/repaired whole."
- Don't stack more than a small handful of seams in one view; per the system's own contrast rule, a page of nothing but gold lines stops reading as kintsugi and starts reading as wallpaper.

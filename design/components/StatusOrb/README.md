A small radial-gradient sphere used as the "live system" marker in the nav bar and dashboard — a dimensional alternative to `.ds-live-dot`'s flat pulsing circle.

Consumer picks one status marker per instance of the nav or dashboard, not both: the flat `.ds-live-dot` (animated, cheaper, reads as a status light) or this orb (static, reads as a small object/ornament). Both are drawn from the same two gold tokens, so they're interchangeable without breaking the palette.

Do:
- Radial gradient from `gold-100` (light, offset toward the upper-left for a consistent light source) to `gold-600` at the edge — the same two stops as every other gold gradient in the system, just radial instead of linear.
- `shadow-gold-glow` as a `filter: drop-shadow(...)`, not `box-shadow` (it's drawn in SVG).
- Keep it small (18–24px) and paired with a `nav-link` label, exactly like `.ds-live-dot` — it's a status marker, not a hero graphic.

Don't:
- Don't animate this version — if the orb needs to read as "live," use `.ds-live-dot` instead; a pulsing radial-gradient sphere is a step toward the AI-trope territory the system explicitly avoids.
- Don't scale it up as a decorative planet/moon motif elsewhere on the page; one small orb, one place, one meaning.

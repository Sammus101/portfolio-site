Section 1 — the two-column hero. Left: index label, the name in `hero-title`, a one-line subtitle, a three-line intro. Right: the fractured portrait inside a small concept graph.

Consumer provides the name (defaults to "Samuel Ehret", breaking after the first word as shown), the subtitle line, the intro paragraph, and either a real grayscale portrait image to fill the shard clip-paths, or — the recommended default until one exists — `KnowledgeGraph` in place of the portrait entirely.

Do:
- Name in `hero-title` (serif 72px/1.0) — this is the only place that size is used on the page.
- Subtitle sits in `body` but colored `text-primary`, not `text-secondary` — it's a statement, not supporting copy; the intro paragraph below it is the one place per section that actually uses `text-secondary` at body size.
- The portrait is 5–7 irregular shards cut with `clip-path: polygon(...)`, each gap filled by a kintsugi seam (`.ds-fracture-stroke`, the gold-100→gold-600 gradient plus `shadow-fracture-glow`) — never a straight grid of rectangles.
- The concept-graph nodes (Ideas / Capital / Tech) are small `gold-600` dots on quiet `border-slate` connector lines, sitting outside the portrait, not inside it.

Don't:
- **Never fabricate or AI-generate a likeness of Samuel.** No real photo has been supplied to this system, so this component ships with a placeholder fill (a dark diagonal gradient) inside the shard clip-paths and a small "portrait pending" label. Two honest paths forward: swap in Samuel's own grayscale portrait as an image fill on the same clip-paths once one exists, or switch the whole right column to `KnowledgeGraph`, which needs no photo at all and reads just as intentionally. Never substitute a generic face or a generated one in the meantime.
- Don't let the seams cross the text column — they're scoped to the portrait's own bounding box.

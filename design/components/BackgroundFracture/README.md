The page's own base layer — dark stone grain plus a sparse gold crack network running behind every section, rather than a flat `bg-void` fill. This is what makes the whole homepage read as one fractured, gold-repaired surface instead of dark cards on a plain background.

Consumer mounts this once, `position: fixed; inset: 0; z-index: -1`, behind the scrolling page — it is not repeated per section.

Do:
- Base fill is `bg-void`; the grain is an SVG `feTurbulence` filter at ~4% alpha (matches the README's "3% SVG film grain" note) — never a raster noise image.
- Cracks use the same `.ds-fracture-stroke` treatment as everywhere else in the system (the gold-100→gold-600 gradient, `border-fracture` width, `shadow-fracture-glow` filter) at reduced opacity (~0.5) so they read as ambient, not foreground — foreground seams (`FractureSeam`, `Hero`'s portrait seams, `FracturedSectionStrip`'s dividers) stay at full opacity on top of this layer.
- Keep the crack network sparse and full-bleed — four to six long, gently curved paths across the whole viewport height, spaced irregularly. It should feel like the ground itself was the thing that broke, once, a long time ago.

Don't:
- Don't let this layer's cracks cluster near any one section — that reads as "this card is broken," which is what the foreground seams are for. This layer is ambient texture only.
- Don't raise the grain or crack opacity to compete with foreground content — `text-secondary` at 6.95:1 on `bg-void` must still hold once this layer sits underneath it.

One milestone in the Section 2 timeline ("The Spark", "Building Systems", "Shifting Capital"...), staggered rather than aligned to a straight rail, joined to its neighbors by a `FractureSeam`.

Consumer provides a short eyebrow ("Turning Point — 01"), a title, and one line of description; and a vertical offset relative to the previous card (alternate up/down, never a flat row).

Do:
- Base card is `.ds-card` (surface / border-slate / radius-sm / shadow-elevated) with `.ds-hover-lift` for the hover state — border brightens to `gold-600`, `shadow-gold-glow` fades in.
- Give each card a `clip-path` that clips one corner at a shallow angle — irregular, not a uniform bevel — so no two cards in the row read as identical shapes.
- Eyebrow in `label`, title in `section-header` sized down (28px is the card ceiling — never the full 40px section size), description in `body`/`text-secondary`.
- Connect consecutive cards with a `FractureSeam`, never a plain line or an arrow.

Don't:
- Don't align cards to a single baseline — the vertical stagger is what makes this a "non-linear journey" rather than a generic stepper.
- Don't put more than one sentence of description in a card; longer context belongs on the project or detail page this card links to.

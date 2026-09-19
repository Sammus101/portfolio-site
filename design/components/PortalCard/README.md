Section 6 — Explore. One of the four large gateway cards (Work & Projects, Ideas & Philosophy, The Bookshelf, The Experiments Lab) that close the homepage.

Consumer provides the destination name and href; the "Enter the Garden" eyebrow is shared across all four and doesn't change per card.

Do:
- `.ds-card` with `.ds-hover-lift`, sized larger than any other card on the page (these are the footer's main call to action) and given a shallow cut corner via `clip-path` — echo the same "stone-cut, never soft" language as the timeline cards, at a bigger scale.
- Destination name in `section-header` at 32px (between the timeline card's 28px and the full 40px section title — this is a bigger moment than a milestone but still not a section header itself).
- An "Explore" affordance in `nav-link`/`gold-600` with a small inline-SVG arrow, `stroke` only (no fill), matching the system's icon language.

Don't:
- Don't use a filled arrow icon or a button-shaped pill — every interactive affordance in this system is a hairline mark in gold, never a filled shape.
- Don't run more than four portal cards in one row at this size; the brief calls for exactly four, arranged so at least one can bleed toward an edge rather than sitting in a perfectly even row.

One tile in the Section 3 theme gateway — Technology, Investing, Philosophy, Science, Creativity, Business. Six tiles total in an asymmetric grid; this card is the repeatable unit.

Consumer provides the territory name and, optionally, a size hint (one tile spans two rows to break the grid's symmetry — Investing in the reference layout, but any territory can take that slot).

Do:
- `.ds-card` base; name sits bottom-aligned in `section-header`, sized down (22–28px depending on tile size — never the full 40px), with a `label` eyebrow ("Territory") above it.
- Hairline `border-slate` at rest; on hover (or for the one emphasized tile in the grid) the border goes `gold-600` and `shadow-gold-glow` fades in — this is the "dynamic gold hairline borders that light up on hover" from the brief, done with `.ds-hover-lift`.
- Keep typography minimal — name and eyebrow only, no description. The tile is a gateway, not a summary.
- Break the grid: at least one tile spans two rows or two columns; six equal squares is the one arrangement this component must never produce.

Don't:
- Don't add icons per territory unless a matching mark exists in an `Icons` asset group — an empty system defaults to type-only tiles.
- Don't set the border gold at rest for more than one tile at a time; the glow means "look here," and six lit tiles mean none of them do.

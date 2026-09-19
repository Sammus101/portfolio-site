Section 4 — Right Now. A single dashboard-style card reporting live state: what's being built, read, and explored.

Consumer provides a label/value pair per row (Building, Reading, Explorations are the reference set; add or drop rows as the actual state changes) and whether the live indicator is currently "on."

Do:
- `.ds-live-dot` plus a `label` reading "Live Laboratory State" heads the panel — the pulse is not optional, it's the entire point of a "right now" panel.
- Each field: a `label` eyebrow in `text-secondary` over a `nav-link`-styled value in `text-primary` — the same mono "readout" typography used in the nav, extended here into a dashboard.
- Separate fields with a `border-hairline`/`border-slate` top rule, not a card-per-field — this is one instrument panel, not a card grid.
- A field spanning the full width (like Explorations) is fine when its value runs long; don't truncate.

Don't:
- Don't use `body`/sans anywhere in this panel — everything here reads as a system readout, which is why it stays in `mono` end to end.
- Don't animate the values themselves; only the live-status dot pulses.

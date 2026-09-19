The homepage's closing gateway strip — one continuous panel split into flush shards (no gaps, no individual card borders), one per destination, divided by kintsugi cracks instead of a grid. Shown at three of the reference five (Resume & Playbook, Ideas & Philosophy, The Bookshelf, Ventures & Projects, The Experiments Lab).

Consumer provides, per shard: an index number, a two-line title, and a footer readout pair (defaults "interface" / "data #NN"). This is the system's primary destination-list pattern for a homepage footer or nav-summary — it supersedes `TimelineCard` and `PortalCard` for that specific job; keep using `TimelineCard` for an actual chronological timeline and `PortalCard` for a small number (≤4) of large, spaced-out gateway cards elsewhere on the page.

Do:
- One `surface` fill behind the whole strip, no per-shard background or border — shards are separated only by the crack paths, which run the full height of the strip between them (`.ds-fracture-stroke` styling, drawn once as a single SVG layer under the content).
- Per shard: a large, low-opacity (~0.55) `section-header`-sized number top of the column, the destination title in `section-header` at card scale (22px, matching `TimelineCard`), a `label` micro-index in the top-right corner, and the `interface`/`data #NN` footer pair in `label` at the bottom-left.
- One shard may carry a tiny sparkline (a plain `gold-600` polyline, no fill, no axis) bottom-right as a "live data" flourish — use it sparingly, on at most one or two shards, never on all of them.
- Let a crack bleed off the strip's own bottom-left and bottom-right corners, echoing `BackgroundFracture`'s page-wide network so the strip reads as part of the same broken surface, not a separate component dropped on top.

Don't:
- Don't add visible per-shard borders or gaps — the moment a shard gets its own outline it becomes a `TimelineCard`, which already exists for that job.
- Don't exceed about six shards at this density; past that, the numbers and footer text stop being legible and the strip needs a taller variant instead.

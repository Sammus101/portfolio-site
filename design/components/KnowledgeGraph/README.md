The recommended right-hand hero visual: a node graph of Samuel's intellectual territories orbiting a center label, in place of a photo. Use this instead of, or alongside, the `Hero` component's fractured-portrait shards — it needs no picture of Samuel at all, so it ships complete rather than as a placeholder.

Consumer provides the center label (two lines: a name and a category, e.g. "Second Brain" / "Knowledge Garden") and a list of node labels — six to eight reads well at this size; more starts to crowd the 12px mono labels.

Do:
- Two dotted `border-slate` orbit rings (`stroke-dasharray`) establish depth without adding a fourth color — orbits are structure, not decoration, so they stay quiet.
- Every node is a small `gold-600` dot on a straight `border-slate` spoke from the center; pick one or two spokes to promote to the full gold-gradient `.ds-fracture-stroke` treatment (the territories most worth highlighting), never more than a third of them, or the emphasis disappears.
- Node labels sit in `mono`/`text-secondary` at ~10px, all caps, close enough to their dot to read as attached to it.
- Center label: the name/title line in `serif`/`text-primary`, the category line in `mono`/`text-secondary` beneath it, matching the `SectionIndex` pairing pattern (title + metadata) used everywhere else.

Don't:
- Don't connect every node to every other node — this is a hub graph (spokes from one center), not a dense mesh; a mesh reads as a network diagram, not a "second brain."
- Don't use this alongside a second competing hero visual — it replaces the portrait, it doesn't sit next to it.

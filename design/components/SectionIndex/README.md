Opens every homepage section with its number, its name in `label`, and its title in `section-header`.

Provide two strings: the index label ("03 / WHAT OCCUPIES MY MIND") and the title ("Intellectual Territories"). An optional third line of `body` copy in `text-secondary` may follow, capped near 480px so it never runs the full container width.

Do:
- Keep the numbering sequential (01–06) and consistent with the nav order — never renumber a section without renumbering the rest.
- Set the index label in `label` (already all-caps and gold-600 via `.label.ds-caps`) — never restyle it in a different color or weight.
- Keep the title to a few words; it sets the whole section's register.

Don't:
- Don't use `hero-title` here — `section-header` is reserved for this exact spot, `hero-title` only for Section 1's name.
- Don't add a fourth text element; if a section needs more framing, it belongs in the section's own body copy below this header, not inside the index block.

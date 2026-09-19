The sticky/floating primary nav — wordmark left, links center-right, live-status node far right.

Consumer provides the link list (label + href) and whether the live-status node is on. Four to six links reads well at this width — the reference set is Resume, Ideas & Philosophy, Books, Projects, Experiments (folding "Philosophy" and "Now" into neighbors when a leaner nav is wanted); beyond six, drop the least essential rather than shrinking the type further.

Do:
- Wordmark in `nav-wordmark` (serif, 18px, set to caps via `.ds-caps`, never typed in caps).
- Links in `nav-link` (mono, 13px, `.ds-caps`), `text-primary` at rest; the current page's link may sit in `gold-600` instead.
- The live-status node is `.ds-live-dot` (a pulsing gold-600 circle with `shadow-gold-glow`) next to a `nav-link` label — the pulse is what says "live." `StatusOrb` (a small static gradient sphere) is the one approved substitute when a calmer, more object-like mark is wanted instead of a pulsing light; don't use a plain unanimated dot.
- Frame the bar itself with `.ds-card`'s surface/border/radius/shadow-elevated — it should read as a raised panel floating over `bg-void`, not a flush strip.

Don't:
- Don't set links in `sans`/`body` — this is metadata typography (`mono`), same family as the section index labels.
- Don't add a background blur or full-opacity fill; `surface`'s 80% opacity is what lets the page still read through it.

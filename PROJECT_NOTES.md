# Project Notes — Portfolio Site

Running log of the plan, decisions, and progress for this project. Update this
file as we go so the plan is visible in one place, in the repo, not just in
chat history.

## Direction

- Build **static-first**, but on the final intended tech stack, so we don't
  redo work later: Next.js + Tailwind CSS + shadcn/ui.
- Get the design system (colors, typography, spacing, layout) and content in
  place first, using plain static pages/components with no client-side state.
- Layer in interactivity and polish afterwards (animations, working
  menus/dialogs, a real contact form) once the static version looks right.

### Design brief (2026-09-17)

Not just a recruiter portfolio — also a living personal space (ideas,
projects, philosophy, books, experiments, learning), under Samuel's own name.

- **Aesthetic**: dark, premium, minimalist, sophisticated. Near-black/deep
  charcoal base, warm off-white type, restrained metallic gold accents.
  Underlying metaphor is wabi-sabi/kintsugi — imperfection, fractures,
  asymmetry and gaps are intentional, and gold represents repair/connection
  between separate things. Modern technologist feel, **not** a literal
  Japanese-aesthetic site — no kanji, bamboo, zen gardens, etc. Influences the
  visual language and interaction design, never becomes literal decoration.
- **Homepage** is a foyer, not a full résumé. Six sections: Who Am I (hero),
  A Life in Fragments (a journey-style timeline, not a CV), What Occupies My
  Mind (visual gateways into themes), Right Now (a living snapshot of current
  work/reading/exploring), Beyond the Résumé (personality, not LinkedIn
  material), Explore (pathways into the deeper site).
- **Future pages**: About/Resume, Work, Projects, Ideas & Philosophy, Books,
  Experiments/Playground, possibly Investing/Research, possibly a knowledge
  garden connecting ideas/projects/books/experiences. Homepage should tease
  these, not duplicate them.
- Also intended as Samuel's own playground for learning modern web dev,
  animation, SEO, AI-assisted coding, and eventually hardware/interactive
  experiments — architecture should grow, not stay a one-page static site.
- **Visual design is not locked in yet.** Samuel is polishing a design sheet
  in Figma, which will be the source of truth for colors/type/spacing/imagery.
  Until that lands: build architecture and anything design-independent now;
  hold off on actual fonts, color tokens, and icon-library choice so we don't
  theme something twice.
- **Design handoff format** (agreed since Claude has no live Figma access
  this session): a design-system sheet (exact color values, full type scale,
  spacing/radius scale, component states) plus at least one full homepage
  mockup, exported as images into a `design/` folder in this repo (plus
  token values as markdown/JSON), rather than a live Figma link.

## Progress log

- [x] Repo backed up to GitHub: https://github.com/Sammus101/portfolio-site
      (public, `master` branch tracks `origin/master`)
- [x] Node.js installed (v24.19.0 LTS, via winget) — needed to run npm/Next.js
      tooling on this machine.
- [x] Scaffold Next.js app (TypeScript, Tailwind, ESLint, App Router) —
      replaced the old plain HTML/CSS/JS scaffold.
- [x] Add shadcn/ui (`components.json`, `src/lib/utils.ts`, design tokens in
      `src/app/globals.css`) — also pulled in `lucide-react` automatically.
- [x] Rebuild the old placeholder sections (About, Projects, Contact) as
      static Next.js components — added a Hero, Header, About, Projects,
      Contact, and Footer under `src/components/site/`, composed in
      `src/app/page.tsx` as a single-page layout with anchor nav. Still uses
      the same placeholder copy as the old HTML scaffold. Used shadcn's CLI
      (`npx shadcn add card badge separator`) to pull in components matching
      this project's shadcn version (base-ui-based, not Radix — see
      `node_modules/@base-ui/react/docs/react/components/button.md`: no
      `asChild` prop, and links should be styled with `buttonVariants()`
      directly rather than wrapped in `<Button>`).
- [x] Install architecture-level libraries that don't depend on the design
      sheet, and wire up the pieces that support the new direction:
      - `motion` (Framer Motion's new name/package since its 2025 split —
        import from `motion/react`, not `framer-motion`) + a shared
        `<Reveal>` primitive at `src/components/motion/reveal.tsx` for
        consistent scroll-in animation.
      - `lenis` for smooth scroll, wired globally via
        `src/components/providers/smooth-scroll.tsx` (`<ReactLenis root>`)
        in `src/app/layout.tsx`.
      - `@vercel/analytics` + `@vercel/speed-insights`, added to
        `src/app/layout.tsx` (no-ops until actually deployed on Vercel).
      - A typed content-as-data layer under `src/content/` (`timeline.ts`,
        `themes.ts`, `right-now.ts`, `projects.ts`, `books.ts`) with
        placeholder entries, so the homepage teasers and future dedicated
        pages can read from the same source instead of duplicating copy.
      - Stub routes for every future page (`/about`, `/work`, `/projects`,
        `/ideas`, `/books`, `/experiments`), each a minimal "coming soon"
        page via `src/components/site/coming-soon.tsx`, so the site can grow
        into real routes without retrofitting later. (Investing/knowledge
        garden intentionally not stubbed yet — still "possibly".)
      - Deliberately **not** installed/decided yet: GSAP (only needed for
        the bespoke kintsugi crack/SVG animation once we know its shape),
        Phosphor icons vs. Lucide, actual fonts, and color tokens — all
        depend on the Figma design sheet.
- [ ] Nail down real design direction (colors, type scale, layout) — waiting
      on Samuel's Figma design sheet (see Design brief above).
- [ ] Rebuild the homepage against the six-section brief (Who Am I, A Life in
      Fragments, What Occupies My Mind, Right Now, Beyond the Résumé,
      Explore) once the design sheet lands — current `src/app/page.tsx` is
      still the old generic About/Projects/Contact placeholder and will be
      replaced, not extended.
- [ ] Fill in real content (bio, projects, contact info, timeline, books).
- [ ] Deploy (Vercel recommended — connects to this GitHub repo, auto-deploys
      on push).

## Libraries

Installed (architecture-level, design-independent):

| Library | Purpose | Notes |
|---|---|---|
| motion | Animation (scroll reveals, hover/press, layout transitions) | Renamed from Framer Motion in 2025; import from `motion/react` |
| lenis | Smooth/weighted scroll | Pairs with `motion`'s scroll utilities; wired globally |
| @vercel/analytics, @vercel/speed-insights | Traffic + performance visibility | Free tier, only active once deployed to Vercel |
| lucide-react | Icon set (current default) | Already used internally by shadcn/ui |
| next/font | Self-hosted Google Fonts, no layout shift | Built into Next.js, no install needed |

Under consideration, waiting on the design sheet:

| Library | Purpose | Notes |
|---|---|---|
| GSAP (now 100% free incl. all plugins, since Webflow's 2025 acquisition) | Bespoke SVG animation (kintsugi crack draw/morph) | Only add once the actual crack/seam shapes exist |
| Phosphor Icons | Alternative icon set, more weight variants | Compare against Lucide once icon style is chosen |
| react-hook-form + zod | Validated contact form | shadcn's form components are built to pair with these |
| @react-three/fiber (Three.js) | 3D/WebGL ambiance | Optional, only if a subtle background effect earns its place |

## Where to see this

- This file, in the repo root: `PROJECT_NOTES.md`
- On GitHub once pushed: https://github.com/Sammus101/portfolio-site/blob/master/PROJECT_NOTES.md

## Progress: design system + hero page (2026-09-19)

- Design system handed off in `design/` (tokens, component previews, reference mock) and wired into
  the Tailwind theme in `src/app/globals.css`. Dark-only for now; a light theme is optional later.
- Homepage hero built: nav, hero with generated `KnowledgeGraph`, five-shard gateway strip,
  mobile layout (stacked strip, Menu button below 880px).
- Cracks are filled torn-edge shapes with variable thickness (`src/lib/crack.ts`), in a matte
  antique gold (`--seam-hi` / `--seam-lo`), not the brighter text gold.
- Background is a graded CC0 rock texture (ambientCG Rock031, `public/textures/rock-dark.webp`)
  plus SVG fissures, pockets, grain and vignette (`BackgroundFracture`).
- Destinations (nav + strip) in `src/content/destinations.ts` are placeholders until the design
  settles. An AI-rendered rock background from Samuel may replace the texture.
- Next: keep refining the design, then populate the site with real content.

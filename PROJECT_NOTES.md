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

## Progress log

- [x] Repo backed up to GitHub: https://github.com/Sammus101/portfolio-site
      (public, `master` branch tracks `origin/master`)
- [x] Node.js installed (v24.19.0 LTS, via winget) — needed to run npm/Next.js
      tooling on this machine.
- [x] Scaffold Next.js app (TypeScript, Tailwind, ESLint, App Router) —
      replaced the old plain HTML/CSS/JS scaffold.
- [x] Add shadcn/ui (`components.json`, `src/lib/utils.ts`, design tokens in
      `src/app/globals.css`) — also pulled in `lucide-react` automatically.
- [ ] Rebuild the old placeholder sections (About, Projects, Contact) as
      static Next.js components.
- [ ] Nail down real design direction (colors, type scale, layout).
- [ ] Fill in real content (bio, projects, contact info).
- [ ] Add interactivity/polish (see library list below).
- [ ] Deploy (Vercel recommended — connects to this GitHub repo, auto-deploys
      on push).

## Libraries under consideration (add as needed, not all at once)

Suggested starting set once the base scaffold is in place: **Framer Motion +
lucide-react + react-hook-form + zod**. Add Three.js later only if we want a
flashier hero section.

| Library | Purpose | Notes |
|---|---|---|
| Framer Motion | Animations (fade/slide-ins, page transitions, hover effects) | Standard for React, high visual payoff for low effort |
| lucide-react | Icon set | Already used internally by shadcn/ui |
| react-intersection-observer | Trigger animations when elements scroll into view | Pairs with Framer Motion |
| @react-three/fiber (Three.js) | 3D / animated visual effects | Optional, higher effort — only for a standout hero |
| next/font | Self-hosted Google Fonts, no layout shift | Built into Next.js, no install needed |
| react-hook-form + zod | Validated contact form with minimal boilerplate | shadcn's form components are built to pair with these |
| Vercel | Hosting/deployment | Free, made by the Next.js team, auto-deploys from GitHub |

## Where to see this

- This file, in the repo root: `PROJECT_NOTES.md`
- On GitHub once pushed: https://github.com/Sammus101/portfolio-site/blob/master/PROJECT_NOTES.md

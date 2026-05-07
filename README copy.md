# MongleKids · 몽글키즈

AI creative growth companion landing page for kids ages 5–9.

A polished, conversion-focused marketing site positioning MongleKids as an AI-era childhood growth platform — not another curriculum app, not another AI tutor.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS v4 (zero-config via `@tailwindcss/vite`)
- lucide-react icons
- Pretendard (Korean web font, loaded via CDN)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle to /dist
npm run preview  # serve the production build
```

## Structure

```
src/
├── App.tsx                    # Page composition + scroll-to-section logic
├── index.css                  # Tailwind v4 theme tokens, fonts, animations
├── main.tsx
└── components/
    ├── Header.tsx             # Sticky nav + mobile menu
    ├── Hero.tsx               # Hero copy + CTA
    ├── HeroMock.tsx           # Decorative product card mock (CSS only)
    ├── Logo.tsx               # Inline SVG-style "Mongle" mascot logo
    ├── Problem.tsx            # Parent-pain section
    ├── Shift.tsx              # Education paradigm shift cards
    ├── Solution.tsx           # 4 product feature cards
    ├── Experience.tsx         # 4-step child experience flow + chat mock
    ├── ParentValue.tsx        # Premium-parent benefit list
    ├── Differentiation.tsx    # Comparison table vs. legacy edtech
    ├── Framework.tsx          # 6 future-skill pillars
    ├── BetaForm.tsx           # Waitlist form w/ client-side validation
    ├── FAQ.tsx                # Accordion FAQ
    ├── FinalCTA.tsx           # Closing CTA hero
    ├── Footer.tsx
    └── SectionHeader.tsx      # Shared section header
```

## Design notes

- Soft, premium clay aesthetic — rounded cards, blurred gradient blobs, layered "clay" shadows defined as utilities (`.clay-shadow`, `.clay-shadow-sm`).
- All visuals (mascot, hero phone mock, parent insight chip, chat bubbles) are pure CSS / inline SVG so no external image assets are required.
- Pretendard variable for Korean typography; theme tokens live in `src/index.css` under `@theme`.
- CTAs in the header, hero, mid-page, beta form, and final CTA all anchor-scroll to `#beta`. The hero secondary CTA scrolls to `#experience`.
- `BetaForm` validates name / email / age client-side and shows a polished success state on submit.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b` then `vite build` |
| `npm run typecheck` | TypeScript project references type check |
| `npm run preview` | Preview the production build |

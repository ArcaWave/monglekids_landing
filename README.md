# MongleKids · 몽글키즈

AI creative growth companion for kids 5–9.
Operated by Arcawave, Inc. — https://www.monglekids.com

## Stack

- **Vite + React 18 + TypeScript** — landing site
- **Tailwind CSS v4** — styling (clay-cloud pastel system)
- **react-router-dom v6** — client routing
- **vite-react-ssg** — static prerender at build time
- **react-helmet-async** — per-page `<head>` (title / meta / JSON-LD)
- **Vercel** — hosting (SPA fallback via `vercel.json`)
- **Supabase** — app DB (used by the mobile app, not the landing yet)

## Scripts

```bash
npm run dev         # local dev server (Vite, no prerender)
npm run build       # tsc + vite-react-ssg build (emits static HTML per route)
npm run build:spa   # legacy SPA build (no prerender), kept as a fallback
npm run preview     # preview built output
npm run typecheck   # tsc only
```

`npm run build` outputs:
- `dist/index.html` — home (`/`)
- `dist/about/index.html`
- `dist/method/index.html`
- `dist/faq/index.html`
- `dist/privacy/index.html`

Every emitted HTML contains the page's body content + per-page `<title>`,
`<meta name="description">`, Open Graph, and JSON-LD blocks. After hydration
the page behaves as a normal SPA.

## Routes

| Path         | Page                       | Notes                                  |
| ------------ | -------------------------- | -------------------------------------- |
| `/`          | `pages/HomePage.tsx`       | Marketing landing                      |
| `/about`     | `pages/AboutPage.tsx`      | Company / mission / beliefs            |
| `/method`    | `pages/MethodPage.tsx`     | Educational philosophy (STEAM · AI)    |
| `/faq`       | `pages/FAQPage.tsx`        | 12+ Q&A grouped by topic + FAQPage JSON-LD |
| `/privacy`   | `pages/PrivacyPage.tsx`    | Bilingual privacy policy (KR + EN)     |

Add a new page → create `src/pages/NewPage.tsx`, then add a route to
`src/routes.tsx` (with `Component` and `entry`). The page will be picked up
on the next `npm run build`.

## SEO

| File / module                          | What it does                                       |
| -------------------------------------- | -------------------------------------------------- |
| `src/seo/site.ts`                      | Single source of truth: brand, contact, address, sameAs, search-console verification slots |
| `src/seo/schema.ts`                    | JSON-LD generators (`Organization`, `WebSite`, `EducationalApplication`, `BreadcrumbList`, `FAQPage`, `WebPage`) |
| `src/components/SEO.tsx`               | Helmet wrapper — title, description, canonical, OG, Twitter, hreflang, JSON-LD |
| `public/robots.txt`                    | Crawler directives + sitemap link                  |
| `public/sitemap.xml`                   | Static sitemap. Update when adding routes.         |
| `public/llms.txt`                      | Brand summary for LLM crawlers (experimental)      |
| `public/og-image.svg`                  | 1200×630 OG card. **Convert to PNG before launch** for Facebook / Twitter / KakaoTalk compatibility (Discord/Slack handle SVG fine). |
| `public/og-logo.svg`                   | 512×512 square logo (used by JSON-LD `logo`)       |

### Search console registration (do once after going live)

1. **Google Search Console** — https://search.google.com/search-console
   - Add property `https://www.monglekids.com`
   - Verify with the meta tag method → copy the `content` value
   - Paste into `src/seo/site.ts` → `verification.google`
   - Submit `https://www.monglekids.com/sitemap.xml`
2. **Naver Search Advisor** — https://searchadvisor.naver.com/
   - 사이트 등록 → 메타 태그 방식 → `content` 값 복사
   - `src/seo/site.ts` → `verification.naver` 에 붙여넣기
   - `사이트맵 제출` 메뉴에서 `https://www.monglekids.com/sitemap.xml` 등록
3. **Bing Webmaster Tools** — https://www.bing.com/webmasters
   - Add site → Meta tag method → copy verification value
   - Paste into `src/seo/site.ts` → `verification.bing`
   - Bing matters because **ChatGPT Search uses Bing's index**, so this is
     the most important console for AI-search visibility.

After updating verification values, `npm run build` and deploy. The
`<meta name="*-site-verification">` tags are auto-injected by `<SEO>`.

### Updating brand metadata

`src/seo/site.ts` is the single source of truth. Update the company
address, founder name, sameAs profile URLs, contact email, and
verification values there — every page picks them up.

## Deployment (Vercel)

- **Build command**: `npm run build` (already configured in `package.json`)
- **Output directory**: `dist`
- **`vercel.json`** rewrites every unmatched route to `/index.html` so
  client-side routing works on direct page reloads. Static HTML files
  (e.g. `/about/index.html`) are served first when present, so prerendered
  pages still get their full SEO content.

## Color palette / typography

- Pretendard Variable (Korean) + Quicksand (Latin display)
- Tailwind v4 `@theme` tokens in `src/index.css`:
  - `grape` — pastel lavender (brand)
  - `peach`, `rose`, `mint`, `sun`, `sky` — pastel accents
  - `cream` — page surface
  - `ink` — text scale (900 / 800 / 700 / 600 / 500 / 400 / 300)

## i18n

- `src/i18n/dictionary.ts` — KR / EN copy for shared UI (header, footer,
  hero, sections that appear on the home page).
- `src/i18n/LanguageContext.tsx` — `useLang()` hook + `<LanguageProvider>`.
  Auto-detects from `localStorage` → `navigator.language`.
- Page-specific long-form content (`/about`, `/method`, `/faq`,
  `/privacy`) lives inline in each page file with a `COPY = { ko, en }`
  object — keeps the dictionary lean.

## TODO before going public

- [ ] Convert `public/og-image.svg` → `public/og-image.png` (1200×630) and
      flip `SITE.ogImage` back to `.png` in `src/seo/site.ts`.
- [ ] Replace placeholder `sameAs` URLs in `src/seo/site.ts` with real
      profiles (Instagram, X, LinkedIn, etc.) once they exist.
- [ ] Update placeholder office address in `src/seo/site.ts` to the real
      registered address.
- [ ] Register Google / Naver / Bing search consoles and fill in
      `SITE.verification.{google,naver,bing}`.
- [ ] After 1–2 weeks of indexing, request indexing of new pages from
      each console.

# "Still Worth It?" - Production React/Next.js Rebuild Roadmap

## Context

We designed and iterated on "Still Worth It?" as a Claude Artifact (a self-contained `.dc.html` mockup): a single-page tool that converts a price into "hours of your life" based on an hourly wage, with light/dark mode (purple accent in light, yellow in dark), a locale-detected currency picker, a ticking Lottie clock icon, hand-drawn doodle annotations (Caveat font), preset price chips, and the tagline "price tags lie. your time doesn't." The design is now finalized.

The goal of this next phase is to **rebuild it for real** as a production-grade Next.js + TypeScript + Tailwind app, deployed to GitHub Pages, with unit tests - and to do it as a **guided, incremental learning exercise**: small, ordered user stories, one phase at a time, so you understand every piece as it's built rather than receiving one giant commit. This plan is the roadmap for that sequence; implementation will proceed phase-by-phase in separate turns, pausing for your review after each one.

## Confirmed decisions (from your answers)

- **Framework**: Next.js (App Router), static export (`output: 'export'`) - no server runtime, pure static HTML/CSS/JS served from GitHub Pages.
- **Language/styling**: TypeScript (strict) + Tailwind CSS.
- **Package manager**: pnpm.
- **Testing**: Vitest + React Testing Library (unit + component tests), jsdom environment.
- **Clock animation**: kept as **real Lottie** - the previously-sourced `clock-time.json` (Miloš Molitoris, Lottie Simple License, free for personal use) bundled as a static asset, played via `lottie-web` behind a custom `useLottie` hook.
- **Repo**: name `still-worth-it`, under the **`SudirKrishnaaRS`** GitHub account. **You will create the empty repo yourself (with just a README)** - I will not create or push to any GitHub repo. Once it exists, the app will live in a **new subfolder** `still-worth-it/` inside this `money-as-hours/` working directory (that subfolder = the cloned repo = the Next.js app root), keeping the existing `Design Files/` and PDFs untouched at the parent level as reference docs only.
- **Git/push discipline**: I'll create commits locally as we go so history reads like a real project (one commit per story), but I will only `git push` when you explicitly say so - pushing is your call each time, per the ground rules I operate under.

## Known Next.js + GitHub Pages gotchas (baked into the plan so we don't hit them later)

- `next.config.ts`: `output: 'export'`, `basePath: '/still-worth-it'`, `assetPrefix: '/still-worth-it/'`, `images: { unoptimized: true }` (no image-optimization server on static hosting), `trailingSlash: true`.
- A `public/.nojekyll` file is required - otherwise GitHub Pages' Jekyll processing silently drops Next's `_next/` asset folder (classic silent-breakage bug).
- Deployment uses the official GitHub Actions trio: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, with the repo's **Pages source set to "GitHub Actions"** (a one-time manual setting you'll flip in the repo's Settings → Pages, since I can't change your repo settings for you).
- No API routes / server actions / `next/image` optimization / middleware - everything must work as static HTML+JS, which is naturally satisfied by this app's design (pure client-side state + localStorage).

## Repo / folder structure (target shape)

```
still-worth-it/                  (this IS the git repo, cloned from your GitHub repo)
├── .github/workflows/       (ci.yml, deploy.yml)
├── public/
│   ├── .nojekyll
│   └── clock-time.json      (bundled Lottie asset)
├── src/
│   ├── app/                 (layout.tsx, page.tsx, globals.css)
│   ├── components/
│   │   ├── ui/              (Button, Chip, Input, Select - generic primitives)
│   │   └── still-worth-it/  (WageSetup, PriceConverter, PresetChips, Header, Footer, AnimatedClockIcon, DoodleAnnotation, ThemeToggle)
│   ├── hooks/                (useLocalStorage, useTheme, useHourlyWage, useCurrency, useLottie)
│   ├── lib/                  (time.ts - formatDuration/contextLine, currency.ts)
│   └── types/
├── tests/ or *.test.tsx colocated next to source
├── tailwind.config.ts
├── vitest.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Phased roadmap (each phase = a short, reviewable chunk)

Every phase ends in something you can actually run/see (`pnpm dev`, `pnpm test`, or a live deploy) before we move to the next one. Concepts you'll pick up are noted per phase.

### Phase 0 - Repo handoff & project scaffolding

_Learn: Next.js project structure, static export config, TS config, pnpm, ESLint/Prettier._

1. You create the empty `still-worth-it` repo on GitHub (SudirKrishnaaRS) with a README, and share/clone it into `still-worth-it/` here.
2. Scaffold via `create-next-app` (TypeScript, Tailwind, App Router, src/ dir, no `next/image` reliance).
3. Configure `next.config.ts` for static export + GitHub Pages base path (per gotchas above).
4. Add ESLint + Prettier + `.editorconfig`, npm scripts (`dev`, `build`, `lint`, `format`, `test`).
5. First local commit ("chore: scaffold Next.js app").

### Phase 1 - Testing pipeline

_Learn: Vitest config, RTL, jsdom, writing your first assertion._

1. Install & configure Vitest + React Testing Library + jsdom.
2. Write one trivial smoke test (renders `<h1>`) to prove the pipeline works end-to-end.
3. Wire `pnpm test` and a `pnpm test:watch` script.

### Phase 2 - Design tokens & theming foundation

_Learn: Tailwind config extension, CSS custom properties as design tokens, `next/font`, Context + custom hooks, `matchMedia`/SSR-safety._

1. Port design tokens into `tailwind.config.ts` / `globals.css`: colors (purple `#6536EB` light accent, `#F5C15A` dark accent, neutrals), fonts (Plus Jakarta Sans, Inter, Caveat via `next/font/google`).
2. Build `useLocalStorage<T>` generic hook (typed, SSR/window-guard safe) - the foundational hook everything else builds on.
3. Build `ThemeProvider` + `useTheme` hook (system-preference default, localStorage override, `theme-light`/`theme-dark` class on `<html>`).
4. Build `ThemeToggle` component (sun/moon SVG icons) using it. Verify: toggling flips the whole page live.

### Phase 3 - Core reusable UI primitives

_Learn: component composition, TS prop typing/variants, accessibility (real `<button>`/`<label>`/`<select>`)._

1. `Button` (variants: sticker-CTA with offset shadow, ghost/link).
2. `Chip` (default + selected states, used for presets & the context pill).
3. `CurrencyInput` (numeric input with a currency-symbol prefix, controlled).
4. `Select` (native `<select>` wrapper, used for currency picker).
   Each gets a small colocated unit test as it's built (first real component tests).

### Phase 4 - App logic hooks & pure utilities

_Learn: hook composition on top of `useLocalStorage`, pure-function unit testing, `Intl` API._

1. `lib/time.ts`: `formatDuration(hours)` and `contextLine(hours)` - pure functions, ported from the mockup, each with a thorough unit test table (0 min, 45 min, 3.5 hrs, 2 days, etc.) - great isolated-logic testing lesson, no React involved.
2. `useHourlyWage` hook (wage + wageInput state, `confirmWage`, `resetWage`, persisted via `useLocalStorage`).
3. `lib/currency.ts` + `useCurrency` hook - port the `Intl.Locale`-based region→currency detection, manual override, localStorage persistence.
4. Hook tests via RTL's `renderHook`, mocking `localStorage` and `navigator.language`.

### Phase 5 - Feature components: setup & converter

_Learn: conditional rendering, lifting state up, composing Phase 3 primitives + Phase 4 hooks._

1. `WageSetup` (headline, inline `$`/currency input, Start button) using `Button`/`CurrencyInput` + `useHourlyWage`.
2. `PriceConverter` (amount input, big duration output, context pill) using `lib/time.ts`.
3. `PresetChips` (Coffee/Lunch/Sneakers/etc.) using `Chip`.
4. `Converter` container component switching setup ⇄ converter views. Component tests: "type 25 as wage, type 50 as price, see '2 hours' render."

### Phase 6 - Animation & delight details

_Learn: refs, `useEffect` cleanup, wrapping a third-party lib in a custom hook, hand-authored micro-interactions._

1. `useLottie` hook (loads/destroys `lottie-web` animation against a ref, cleans up on unmount).
2. `AnimatedClockIcon` using it + the bundled `clock-time.json`, recolored to the current accent via CSS.
3. `DoodleAnnotation` (hand-drawn SVG arrow + Caveat text) pointing at the CTA button.
4. Squiggle underline + fade-up entrance keyframes as Tailwind utilities.

### Phase 7 - Page assembly, layout & responsiveness

_Learn: Next.js `layout.tsx`/`page.tsx` conventions, metadata API (SEO/OG tags), responsive Tailwind breakpoints._

1. `app/layout.tsx`: fonts, `ThemeProvider`, `<title>`/description/OG metadata for "Still Worth It?".
2. `app/page.tsx`: assemble `Header` (wordmark, `AnimatedClockIcon`, currency `Select`, `ThemeToggle`), `Converter`, `Footer` (the yellow/purple italic quote).
3. Mobile pass (hide the doodle note under ~760px, stack header controls, verify at 375px width).

### Phase 8 - Full test pass & coverage

_Learn: coverage tooling, testing patterns as a whole, CI-readiness._

1. Fill any coverage gaps across hooks/components/utils identified so far.
2. Add a coverage script (`pnpm test:coverage`) and a sensible baseline threshold.

### Phase 9 - CI/CD & GitHub Pages deployment

_Learn: GitHub Actions workflow syntax, static-site deploy pipeline, real production deploy._

1. `.github/workflows/ci.yml` - lint + typecheck + test on every push/PR.
2. `.github/workflows/deploy.yml` - build the static export, deploy via `actions/deploy-pages` on push to `main`.
3. **Your one-time manual step**: repo Settings → Pages → Source = "GitHub Actions."
4. **Your call**: when ready, you push to `main` (or ask me to) and we watch the Action run and verify the live `https://sudirkrishnaars.github.io/still-worth-it/` URL.

### Phase 10 (stretch, optional) - Portfolio polish

README with screenshots/GIF + live-demo badge, `LICENSE`, Lighthouse pass, maybe a short "how it's built" section for recruiters reading your portfolio.

## Verification approach

- **Phases 0–1**: `pnpm dev` renders a blank Next.js page; `pnpm test` runs and passes the smoke test.
- **Phases 2–7**: after each story, `pnpm dev` to visually confirm in-browser against the finalized Artifact mockup as the reference; `pnpm test` stays green throughout.
- **Phase 8**: `pnpm test:coverage` report reviewed together.
- **Phase 9**: real GitHub Actions run (visible in the repo's Actions tab) + the live GitHub Pages URL loading correctly, including the base path.

## How we'll work through this

I'll implement **one phase at a time**, stop, and let you run/review/ask questions before moving to the next - that's the point of doing this story-by-story rather than all at once. Nothing gets pushed to your GitHub repo without you explicitly telling me to.

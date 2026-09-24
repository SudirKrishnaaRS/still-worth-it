# Phase Log

What each phase (= one merged PR) actually shipped. Updated as new PRs merge.

## Phase 0 - Scaffold [#1](https://github.com/SudirKrishnaaRS/still-worth-it/pull/1)

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Static export config for GitHub Pages (`basePath`, `.nojekyll`)
- ESLint + Prettier wired together
- `dev` / `build` / `preview` / `lint` / `format` scripts

## Phase 1 - Testing pipeline [#2](https://github.com/SudirKrishnaaRS/still-worth-it/pull/2)

- Vitest + React Testing Library + jsdom
- jest-dom matchers via a setup file
- First smoke test
- `test` / `test:watch` scripts

## Phase 2 - Theming foundation [#3](https://github.com/SudirKrishnaaRS/still-worth-it/pull/3)

- Light/dark design tokens (Tailwind v4 `@theme`)
- Plus Jakarta Sans, Inter, Caveat fonts
- `useLocalStorage` hook (`useSyncExternalStore`-based)
- `useTheme` hook + `ThemeProvider`, OS-preference aware
- No-flash-of-wrong-theme boot script
- `ThemeToggle` component
- +17 tests

## Phase 3 - CI/CD pipeline [#4](https://github.com/SudirKrishnaaRS/still-worth-it/pull/4)

- `ci.yml`: Lint, Typecheck, Test, Secrets - parallel, required on every PR
- `deploy.yml`: re-checks, builds, deploys to GitHub Pages on merge to `main`
- `pr-title.yml`: enforces `feature:` / `bug:` / `chore:` / `docs:` / `ci:` titles
- Gitleaks secret scanning
- Dependabot for dependencies + Actions versions
- Node version pinned via `.nvmrc`

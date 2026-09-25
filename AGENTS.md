<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Still Worth It? - project instructions

## What this is

A tool that converts a price into hours of your life, based on an hourly wage. Next.js (App Router) + TypeScript + Tailwind CSS v4, statically exported and deployed to GitHub Pages.

Being built in small, ordered phases - see `docs/IMPLEMENTATION_PLAN.md` for the roadmap and `docs/PHASES.md` for what each phase actually shipped.

## Tech stack

- Next.js 16 (App Router, static export, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
- Vitest + React Testing Library + jsdom - testing (not Jest)
- pnpm - package manager (not npm/yarn), version pinned via `packageManager`
- ESLint + Prettier - lint/format
- GitHub Actions - CI/CD, deployed to GitHub Pages
- Gitleaks - secret scanning; Dependabot - dependency updates

See `README.md`'s own Tech stack section for the fuller picture.

## Setup

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000/still-worth-it/ - note the `/still-worth-it` path prefix. The app is configured with that `basePath` everywhere, including in dev.

## Before considering any change done

Run all of these - each is also a required CI check on every PR:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format:check
```

**How to run them**: to keep the main agent's token usage down, delegate the actual running of these checks to lightweight subagents (e.g. Haiku) instead of running them directly in the main conversation. Fan them out in parallel - one subagent per check - and have each one report back only pass/fail plus a short summary of the failure, not full raw command output. The main agent only steps in to read code and fix something when a subagent reports a failure; a passing check needs no further attention.

## Quality bar

- A change is not done until `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass - not just lint.
- Every change ships with unit tests; aim for at least 90% coverage on the code it touches.
- Build for accessibility, performance, and SEO from the start, not as a follow-up pass.
- Avoid `any` in TypeScript unless there is no reasonable alternative.
- Keep implementations simple; do not over-engineer. If a more involved approach would genuinely be better, ask first and explain the advantage it brings - don't just build it.
- Write reusable, readable code - a new developer should be able to skim a file and understand what it does without digging through the rest of the codebase.
- Use clear, meaningful variable and function names; avoid cryptic abbreviations.
- Do not use em dashes (—) anywhere in this codebase or its docs - use hyphens (-) instead.
- Do not assume requirements or intent - ask a clarifying question whenever something is ambiguous, rather than guessing.
- Never commit anything to git unless explicitly asked.
- Require a minimum release age of 7 days before installing a new npm package version, as a supply-chain safeguard - most compromised releases are caught and pulled within days of publishing. Configure this via the package manager (e.g. `minimumReleaseAge: 10080` in `pnpm-workspace.yaml` for pnpm; use the equivalent setting for npm/yarn on a different project).
- Whenever a new feature is implemented, create or update `docs/feature-list.md` - one `## Feature Title` heading per feature, with its details as bullet points underneath.

## Accessibility, performance & SEO checklist

**Accessibility**

- Use real semantic HTML (`<button>`, `<a href>`, `<label>` + `<input>`) - never a `<div>`/`<span>` with `onClick`/`role` bolted on.
- Every icon-only control gets an `aria-label`.
- Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text/UI elements) in both light and dark mode.
- Everything is keyboard-operable: reachable via Tab, with a visible focus state, no keyboard traps.

**Performance**

- Default to Server Components; add `"use client"` only where interactivity actually requires it.
- Keep fonts/images optimized - fonts are already self-hosted as latin-only subsets (see `src/app/fonts/`), don't load a full font family "just in case".
- Avoid layout shift - reserve space for content that loads asynchronously.
- Check `pnpm build`'s route output size before and after adding a new dependency.

**SEO**

- Every page sets a real `<title>` and `description` via Next's Metadata API, not the framework default.
- Semantic heading hierarchy - exactly one `<h1>` per page, logical nesting after that.
- Add Open Graph / Twitter card metadata once a page is meant to be shared.

## Code conventions

- `src/app/` - Next.js App Router: layout, page, global styles/tokens.
- `src/components/` - feature components. `ui/` for generic reusable primitives (Button, Chip, ...), `still-worth-it/` for this app's own feature components.
- `src/hooks/` - reusable hooks. Colocate a `*.test.ts(x)` next to each hook/component rather than in a separate `tests/` tree.
- Tailwind v4 is CSS-first - design tokens live in `src/app/globals.css` under `@theme`, not in a `tailwind.config.ts` (this project doesn't have one). Colors respond to a `.dark` class on `<html>`, toggled by `useTheme`/`ThemeProvider` - see the comments in `src/hooks/useTheme.tsx` for why a plain `@theme` (not `@theme inline`) matters here.
- Fonts are self-hosted via `next/font/local` (`src/app/fonts/*.woff2`), not `next/font/google` - a transient Google Fonts fetch failure at build time already took down one production deploy. Don't switch this back without a strong reason.

## Testing

- Vitest + React Testing Library + jsdom. `vitest.setup.ts` adds jest-dom matchers and stubs `window.matchMedia` (jsdom doesn't implement it) - override it with `vi.spyOn` inside a specific test rather than editing the global stub.
- Test hooks with `renderHook` from `@testing-library/react`, not by mounting a throwaway component.
- `useLocalStorage` is built on `useSyncExternalStore`, not `useEffect` + `setState` - the latter trips the `react-hooks/set-state-in-effect` lint rule and, more importantly, doesn't keep multiple components reading the same key in sync within one tab.

## Commits & PRs

- PR titles must start with `feature:`, `bug:`, `chore:`, `docs:`, or `ci:`, followed by a real description - e.g. `feature: add currency picker`. Enforced by `.github/workflows/pr-title.yml`.
- Don't push or commit unless explicitly asked to - this project's owner commits and pushes themselves.

## Known gotchas

- `pnpm typecheck` runs `next typegen` first - types like `LayoutProps<"/">` don't exist until Next generates them, and a fresh clone or CI checkout won't have them yet.
- `packageManager` in `package.json` pins an exact pnpm version. `pnpm/setup@v2` in CI only supports pnpm v11+; this project is still on pnpm 10.x, so CI uses `pnpm/action-setup@v4` + `actions/setup-node@v7` instead.
- Next.js 16 uses Turbopack for `next build` by default, not just `next dev`.
- GitHub Pages serves this app from a subpath (`basePath`/`assetPrefix: "/still-worth-it"` in `next.config.ts`), and `public/.nojekyll` is required, or GitHub Pages' Jekyll processing silently drops the `_next/` folder.
- `minimumReleaseAge` in `pnpm-workspace.yaml` only blocks fresh dependency _resolution_ (`pnpm add`/`update`/`dedupe`, or an out-of-sync lockfile) - it does not affect `pnpm install --frozen-lockfile` (what CI runs), which just installs whatever the lockfile already pins. If a `pnpm add`/`dedupe` fails citing this setting on a package you didn't touch, it's usually because an unrelated already-pinned dependency (e.g. `next` itself, or one of its platform-specific optional dependencies) is younger than 7 days - wait for it to age, or temporarily set `minimumReleaseAge: 0` to finish the operation, then restore it to `10080`.

## Where to look next

- `README.md` - live URL, scripts, CI/CD overview.
- `docs/IMPLEMENTATION_PLAN.md` - the full phased roadmap.
- `docs/PHASES.md` - what each merged PR actually shipped.
- `docs/feature-list.md` - one section per feature, by name rather than by PR/phase (see Quality bar above). Doesn't exist yet until the first feature lands.

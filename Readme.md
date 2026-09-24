# Still Worth It?

> price tags lie. your time doesn't.

A tool that converts a price into hours of your life, based on your hourly wage - so you feel the real cost of a purchase before you make it.

[![CI](https://github.com/SudirKrishnaaRS/still-worth-it/actions/workflows/ci.yml/badge.svg)](https://github.com/SudirKrishnaaRS/still-worth-it/actions/workflows/ci.yml)
[![Deploy](https://github.com/SudirKrishnaaRS/still-worth-it/actions/workflows/deploy.yml/badge.svg)](https://github.com/SudirKrishnaaRS/still-worth-it/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fsudirkrishnaars.github.io%2Fstill-worth-it%2F)](https://sudirkrishnaars.github.io/still-worth-it/)
![Visitors](https://komarev.com/ghpvc/?username=sudirkrishnaars-still-worth-it&label=Visitors&color=6536eb&style=flat)

**🔗 Live: [sudirkrishnaars.github.io/still-worth-it](https://sudirkrishnaars.github.io/still-worth-it/)**

## Status

🚧 **Work in progress.** This is being built in small, ordered phases (see [docs/PHASES.md](docs/PHASES.md) for exactly what each one shipped). The live site currently reflects an early phase - a bare placeholder page with a working light/dark theme toggle - not the finished product yet.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, static export) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` config)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for unit/component tests
- [pnpm](https://pnpm.io/) as the package manager
- GitHub Actions for CI/CD, deployed to GitHub Pages

## Getting started

Requires Node (version pinned in [`.nvmrc`](.nvmrc)) and [pnpm](https://pnpm.io/installation).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/still-worth-it/](http://localhost:3000/still-worth-it/) - note the `/still-worth-it` path prefix, which mirrors the `basePath` this app is configured with for GitHub Pages.

## Available scripts

| Script              | What it does                                                                       |
| ------------------- | ---------------------------------------------------------------------------------- |
| `pnpm dev`          | Starts the dev server                                                              |
| `pnpm build`        | Produces a static export in `out/`                                                 |
| `pnpm preview`      | Serves the production build locally under `/still-worth-it`, matching GitHub Pages |
| `pnpm lint`         | ESLint                                                                             |
| `pnpm typecheck`    | Generates Next's route types, then runs `tsc --noEmit`                             |
| `pnpm test`         | Runs the test suite once                                                           |
| `pnpm test:watch`   | Runs the test suite in watch mode                                                  |
| `pnpm format`       | Formats the codebase with Prettier                                                 |
| `pnpm format:check` | Checks formatting without writing changes                                          |

## Project structure

```
src/
├── app/            # Next.js App Router: layout, page, global styles
├── components/     # Feature components (organized per-project, e.g. still-worth-it/)
└── hooks/          # Reusable hooks (useLocalStorage, useTheme, ...)
```

## CI/CD

Every PR into `main` must pass, in parallel:

- **Lint**, **Typecheck**, **Test** - the usual suspects
- **Secrets** - [Gitleaks](https://github.com/gitleaks/gitleaks) scans the diff for accidentally-committed credentials
- **Validate PR title** - see [Contributing](#contributing) below

Merging to `main` re-runs those checks as a safety net, then builds and deploys to GitHub Pages automatically.

## Contributing

This is a solo learning project, but PRs follow a couple of conventions:

- **PR titles** must start with `feature:`, `bug:`, `chore:`, `docs:`, or `ci:`, followed by a short description - e.g. `feature: add currency picker`.
- Dependencies (including GitHub Actions versions) are kept current via [Dependabot](.github/dependabot.yml).

## License

No license has been chosen yet - all rights reserved by default until one is added.

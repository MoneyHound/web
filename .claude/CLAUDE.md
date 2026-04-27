# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MoneyHound Web is an **Angular 21** multi-project CLI workspace containing two applications and four shared libraries. The workspace uses standalone components (no NgModules), the `bootstrapApplication` API, and Angular Signals for state management.

## Common Commands

```bash
yarn start              # Dev server (dashboard on localhost:4200)
yarn start:marketing    # Dev server (marketing)
yarn build              # Production build
yarn test               # Run all unit tests (Vitest)
yarn test:dashboard     # Run dashboard tests only
yarn test:ui            # Run ui library tests only
yarn watch              # Development watch build
```

Running a single test file:
```bash
ng test --include='**/my-component.spec.ts'
```

## Workspace Structure

- **`projects/dashboard/`** — Main dashboard SPA (served at `localhost:4200` by default)
- **`projects/marketing/`** — Marketing/landing page SPA
- **`projects/ui/`** — Shared UI component library
- **`projects/models/`** — Shared data models/types library
- **`projects/auth/`** — Shared authentication logic library
- **`projects/api/`** — Shared API client/service layer library

Libraries are built to `dist/` and consumed via TypeScript path aliases (`api`, `auth`, `models`, `ui`). Each library exposes its public API through a `public-api.ts` barrel file.

## Architecture

- **Standalone components** — No NgModules; components declare their own dependencies via `imports: []`
- **Signals** — Use Angular Signals (not NgRx/NGXS) for reactive state
- **RxJS** — Available for async data flows and HttpClient interop
- **Functional router API** — `provideRouter(routes)` in app configs, not `RouterModule`
- **SCSS** — All component and global styles use SCSS
- **esbuild** — Builds use `@angular/build` (esbuild-based, not Webpack)

## Conventions

- **Prettier** — 100 char line width, single quotes, Angular HTML parser for templates
- **EditorConfig** — 2-space indent, single quotes for TypeScript, trim trailing whitespace
- **Vitest + jsdom** — Test runner with `vitest/globals` types; tests use `TestBed` + `ComponentFixture`
- **Package manager** — Yarn (v1.22.22), not npm

## Backend

The backend API is a separate Python project in a sibling `api/` directory (different git repo). The `projects/api/` library in this workspace is intended to house the Angular HTTP client/service layer that communicates with it.
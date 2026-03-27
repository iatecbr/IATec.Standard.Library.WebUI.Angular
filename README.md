
# Frontend (Angular) — Development Guide

This Angular workspace contains **two projects**:

- **Library (main artifact):** `@services/example`
  - Located at: [projects/services/example](projects/services/example)
  - Anything that is a "feature", business rules, models, services, and utilities **must live here**.
  - This library will be installed/consumed by an **external platform** (e.g., microfront), so it **must not** depend on the test app configuration.

- **Support application (testing only):** `stage`
  - Located at: [projects/stage](projects/stage)
  - Used only to validate the library features visually/functionally.
  - **Integration variables and endpoints** for development must be configured **here**.

## Golden rules

1. **Never implement features in `stage`.**
	- `stage` may contain wiring (routes, demo screens, providers) to exercise the library.
	- The real logic and behavior must always live in the `@services/example` library.

2. **The library must be environment-agnostic.**
	- Avoid hardcoding URLs, keys, hosts, API paths, or any environment-specific configuration.
	- When integration is needed, expose extension points (e.g., injection via providers/tokens) and let `stage` provide the values.

3. **Integration configuration is `stage` responsibility.**
	- For development, use `stage` to point to mocks/real services.
	- Current example: `stage` reads mocks from [projects/stage/public/mock](projects/stage/public/mock) via `HttpClient` (e.g., `./mock/menus.json`).

## Where to develop (expected structure)

### Library `@services/example`

- Source code: [projects/services/example/src](projects/services/example/src)
- Entry point (public exports): [projects/services/example/src/public-api.ts](projects/services/example/src/public-api.ts)
- Features: [projects/services/example/src/lib/features](projects/services/example/src/lib/features)

Guidelines:

- Each new feature must be created under `src/lib/...` and **exported** from `public-api.ts` (directly or via barrel exports) so it is available to external consumers.
- Keep the public API stable and explicit: only export what is meant to be consumed.

### `stage` application

- Code: [projects/stage/src](projects/stage/src)
- Assets/mocks and static resources: [projects/stage/public](projects/stage/public)

Guidelines:

- `stage` is your "lab": create demo pages/components and wire the needed providers to exercise the library.
- Anything related to integration (e.g., base URL, endpoints, headers, keys, toggles) must live in `stage`.

## Recommended workflow (for LLM)

When implementing a request:

1. Identify what is **public library API** (what the microfront/external platform will import).
2. Implement the feature in `@services/example`.
3. Export the feature from the public entry point.
4. Exercise and validate the feature in `stage` (without duplicating logic).
5. If external integration is needed, configure and inject it through `stage`.

Quick checklist:

- Was the feature created/changed in `@services/example`?
- Does `public-api.ts` expose what needs to be consumed?
- Does `stage` only demo/test, without business logic?
- Were integration variables configured in `stage`?

## Commands

Run locally (from [layers/frontend](.) ):

- Install dependencies: `npm install`
- Run stage: `npm run start` (equivalent to `ng serve`)
- Build workspace: `npm run build`
- Build in watch mode (dev): `npm run watch`
- Tests: `npm run test`

Build/test directly per project:

- Build the lib: `npx ng build @services/example`
- Serve stage: `npx ng serve stage`

## Important notes

- The library artifact is built with `ng-packagr` and outputs to `dist/services/example` (see [projects/services/example/ng-package.json](projects/services/example/ng-package.json)).
- `stage` can use mocks to simulate integrations. If you switch mocks to real endpoints, do it **in `stage`**, keeping the library decoupled from the environment.

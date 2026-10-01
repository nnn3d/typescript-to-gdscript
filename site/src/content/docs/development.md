---
title: 'Development'
description: 'for contributors — building, testing, and regenerating Godot typings from source.'
---

> Brief: for contributors — building, testing, and regenerating Godot typings from source.

```bash
yarn install
(cd site && yarn install)
yarn build
yarn test:run
```

## Prerequisites

- **Node.js 22+** — the plugin uses `require(esm)` semantics (no top-level await in the plugin itself, but earlier Node versions refuse ESM via `require`).
- **Godot** on `PATH`, or reachable via `godotPath` / `GODOT_PATH` — required to run the test suite. Tests that exercise the Godot CLI integration (converter-round-trip validation, ts-plugin async Godot diagnostics, etc.) fail loudly when Godot is not resolvable; they are **not** skipped. If you need to develop without Godot installed, run just the subset of scripts that don't touch it (`yarn test:tstogd`, `yarn test:gdtots`, `yarn test:diag`, `yarn test:sourcemap`, `yarn test:godot-registry`, `yarn test:typecheck`, `yarn test:cli`) — the rest will fail with a spawn error.
- **Site dependencies** (`cd site && yarn install`) — `tests/site` also tests code from the site, and Vite compiles it with the site's `tsconfig.json`, which extends a config from the site's packages. Without them those tests fail to load.

## Test scripts

Individual test suites can be run via npm scripts:

| Script                     | Description                        |
| -------------------------- | ---------------------------------- |
| `yarn test:tstogd`         | TS-to-GD converter fixtures        |
| `yarn test:gdtots`         | GD-to-TS converter fixtures        |
| `yarn test:diag`           | Converter diagnostics              |
| `yarn test:ts-plugin`      | TypeScript language service plugin |
| `yarn test:scene-typings`  | Scene typings generation           |
| `yarn test:type-checks`    | Type check tests                   |
| `yarn test:class-typings`  | Class typings generation           |
| `yarn test:godot-docs`     | Godot docs typings generation      |
| `yarn test:godot-registry` | Godot class registry               |
| `yarn test:godot-validate` | Godot validation                   |
| `yarn test:sourcemap`      | Source map position tests          |
| `yarn test:gd-registry`    | GD-to-TS registry tests            |
| `yarn test:typecheck`      | TypeScript type-level tests        |
| `yarn test:cli`            | CLI integration tests              |

## Regenerating Godot typings

```bash
git submodule update --init
yarn generate:godot-typings
```

## Docs site and playground

The site in `site/` is the documentation, built with Astro Starlight, and hosts the in-browser playground. It has its own dependencies:

```bash
yarn install          # the converter, once
cd site && yarn install
yarn dev              # http://localhost:4321/typescript-to-gdscript/
```

The pages are Markdown files in `site/src/content/docs/`, with a `title` and a `description` in their frontmatter; `yarn dev` shows an edit as soon as you save it. Link between pages by site path, like `/typescript-to-gdscript/guide/signals/`. Images go in `site/src/assets/`. `yarn dev` and `yarn build` first bundle `typings/` for the playground. A new page shows up in the sidebar under its folder's group in `site/sidebar.ts`, or under "More" until you list it there.

Pushes to `master` deploy the site to GitHub Pages.

## Version requirements

- Node.js >= 22 (see Prerequisites above for the reason)
- TypeScript >= 5.9
- Godot >= 4.7 (for typings generation)

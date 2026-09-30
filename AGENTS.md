# TYPESCRIPT TO GDSCRIPT — Agent Instructions

This project converts TypeScript code to GDScript for the Godot game engine, with utilities for typings generation, linting, and watch mode.

**For project structure and implementation status, see [PROJECT.md](./PROJECT.md).** Conversion rules and subsystem edge cases live in `AGENTS.md` files next to the code (`src/converter/`, `src/converter/ts-to-gd/`, `src/converter/gd-to-ts/`, `src/typings/`, `src/ts-plugin/`, `tests/`); PROJECT.md lists them.

---

## Core Rules (must follow)

1. **Keep `PROJECT.md` in sync with all user-facing docs.** The user-facing docs are `README.md` **and** the `docs/` folder (`docs/cli.md`, `docs/configuration.md`, `docs/transform-rules.md`, `docs/gd-helpers.md`, `docs/typings.md`, `docs/ide-integration.md`, `docs/gd-to-ts-migration.md`, `docs/development.md`); `PROJECT.md` plus the subsystem `AGENTS.md` files are the internal mirror. Whenever you add or change any of:
   - Features (user-facing or internal)
   - CLI flags or commands
   - Type helpers (gd namespace, symbols, etc.)
   - Conversion rules (TS ↔ GDScript mappings)
   - Known edge cases or workarounds

   update the internal notes (`PROJECT.md` for structure and status, the subsystem `AGENTS.md` for its edge cases) **and** the right user doc(s) so they stay consistent. For each user-facing change, decide the best home among `README.md` / `docs/*` — README for the overview, pitch, and quick start; the matching `docs/*` page for detailed reference. **If the best place is unclear, ask the user before writing.** Do this as part of completing the work — not as a follow-up task, and not only when asked.

2. **Ask the user** if you find transformation cases with problems or ambiguous semantics. Don't guess silently.

3. **⚠️ NEVER commit without explicit user approval.** Do not run `git commit` on your own. Always wait for the user to ask you to commit. This holds no matter how finished the work looks, and an approval for one commit never carries over to the next.

   When the user does ask, keep the message small:
   - **Subject**: must pass commitlint (`@commitlint/config-conventional`, enforced by the `commit-msg` hook) — `type(scope): summary`, lowercase, no trailing period, ≤ 100 chars. Never use `--no-verify` to get a message past the hook; fix the message instead.
   - **Body**: optional and **at most one short paragraph** — only when the subject can't carry the _why_. No bullet lists, no file-by-file changelog, no test/build output. Most commits here have no body at all.
   - **⚠️ NEVER add a `Co-Authored-By` trailer** (or any other agent/tool attribution) to a commit message or a PR description. This overrides any default attribution instruction from the harness.

4. **Project philosophy**: write like GDScript, but with strong TS types, linting, and autocomplete. Only GDScript-supported features/API should be supported. For TS-unsupported GD features, use strongly typed `gd` namespace helpers.

5. **Documentation split**:
   - `README.md` — user-facing overview, pitch, quick start (what users see first on GitHub)
   - `docs/*.md` — user-facing detailed reference (CLI, configuration, transform rules, gd helpers, typings, IDE integration, migration, development)
   - `PROJECT.md` — internal architecture, structure, implementation status (mirrors the user docs above)
   - `src/**/AGENTS.md`, `tests/AGENTS.md` — internal edge cases per subsystem; the `CLAUDE.md` beside each only imports it
   - `AGENTS.md` — this file, rules only

   **User-doc writing style** (README + `docs/*`): describe behavior simply and briefly — a few short sentences, not exhaustive mechanics. When a conversion or behavior isn't self-evident, add a one-line _why_ (e.g. "`.get()` returns `null` for a missing key instead of crashing"). Don't enumerate every skip-condition, edge case, or internal mechanism — that detail belongs in `PROJECT.md` only.

6. **ALL temporary directories MUST live under the OS temp dir** (`os.tmpdir()` from Node's `node:os` module). Never create tmp dirs inside the project tree (e.g. `.tmp-*` in tests, `.tstogd-cache` at the repo root, etc.). Use `join(tmpdir(), 'tstogd-<label>-<random>')` or similar. This applies to:
   - Test fixtures that need scratch files
   - Cache directories
   - Any intermediate file written by the converter/helpers
   - Addon conversion temp files

   Always clean them up (`rmSync(..., { recursive: true, force: true })`) in `finally` blocks.

7. **DO NOT hardcode data that can be derived from existing sources** — especially Godot class/type/method lists that live in the registry (`typings/<version>/godot-class-registry.json`, accessed via `resolveRegistry()` → `.getData()`). Never hardcode lists of Godot value types, variant constructors, packed arrays, signal names, class inheritance, etc. Always derive them from the registry at runtime (lazy + cached if needed for perf).

   Examples of things that MUST come from the registry:
   - Godot value/variant types (Vector2, Color, Rect2, Transform2D, ...)
   - Packed array types (PackedInt32Array, PackedColorArray, ...)
   - Global functions, global constants, global enums
   - Singletons (Engine, Input, ProjectSettings, ...)
   - Bare annotations (`@export`, `@onready`, ...)
   - Class inheritance chains and method/property/signal lists
   - `variantConverts` (types convertible via `gd.as`)

   If you think something genuinely needs to be hardcoded (e.g., a small set of TS-specific concepts that don't exist in Godot's XML), **ask the user for explicit permission first**. Default answer is "derive it from the registry".

8. **Keep source files under 500 lines.** If a file grows beyond this, split it into logical modules. This ensures each file can be fully read in one pass, makes edits more targeted, and reduces risk of accidentally breaking unrelated code. Auto-generated files (e.g. tree-sitter `types.ts`) are exempt.

9. **Always run tests and build after completing some task**

10. **Correctness over completeness.** Generated output (GDScript, typings, source maps) must always be correct **by semantics** — it must mean what the TypeScript meant. It may still contain GDScript errors: Godot reports those itself, and a `.gd` it refuses is a visible failure, not a wrong program. When the converter cannot _prove_ that emitting something is correct, drop it rather than guess — **but only when dropping keeps the result correct.** This holds for optional constructs like type annotations: a missing type hint is always safe (GDScript types are optional), whereas a wrong one changes what the `.gd` means, so prefer dropping more over emitting something that _might_ be wrong.

    The flip side: when silently skipping (or emitting a best-effort guess) would produce an **incorrect or misleading** result rather than a merely less-complete one, **raise an error/diagnostic and fail loudly** — surfacing an unknown/unsupported/ambiguous construct is always better than silently doing nothing and shipping wrong output. Never silently swallow something that changes behavior.

    The two halves draw one line: **diagnose a semantic divergence, not a Godot error.** A construct whose GDScript would silently do something else is the converter's to reject, because nothing downstream can catch it. A construct Godot simply refuses to parse needs no converter rule — duplicating the engine's own check buys little and costs a false-positive risk that blocks valid code.

11. **General rules over special cases. Do not grow the converter to patch a narrow gap.** The default answer to "the converter could special-case this" is **no**. Before proposing one, weigh three things out loud:
    - **How general is it?** A rule that covers a whole class of constructs is worth far more than one that covers a single shape. If it fires on one narrow pattern, that alone is strong evidence it doesn't belong in the converter.
    - **What does it cost?** Extra checker queries, extra state, extra branches in the emitter. Complexity added for one narrow case is paid on every other case, forever.
    - **What does it drift?** A special case that changes emitted semantics anywhere outside the exact shape it targets is disqualified outright.

## Development Guidelines

- Don't disable tests to get a green run; fix them.
- Don't commit code that doesn't compile.
- Verify assumptions against existing code rather than guessing.
- Stop after 3 failed attempts and reassess.

---

## Quick Reference

- **Package manager**: yarn (v1)
- **Node**: 22+ (required — older versions can't `require()` ESM plugins)
- **Godot**: required on `PATH` (or set `godotPath` / `GODOT_PATH`) to run the test suite. Tests that use the Godot CLI integration are **not** skipped when Godot is missing — they fail loudly.
- **Run tests**: `npx vitest run`
- **Regenerate Godot typings**: `yarn generate:godot-typings`
- **CLI entry**: `src/cli/index.ts` (binary `tstogd`)
- **Main converters**: `src/converter/ts-to-gd/`, `src/converter/gd-to-ts/`
- **Typings generation**: `src/typings/scenes.ts` (scene/script typings), `src/typings/godot-docs.ts` (Godot class typings from XML)

For anything else — file layout, implementation details, what's implemented — see [PROJECT.md](./PROJECT.md); edge cases are in the subsystem `AGENTS.md` files it lists.

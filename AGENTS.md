# TYPESCRIPT TO GDSCRIPT — Agent Instructions

This project converts TypeScript code to GDScript for the Godot game engine, with utilities for typings generation, linting, and watch mode.

**For project structure, implementation status, conversion rules, and edge cases, see [PROJECT.md](./PROJECT.md).** Read it with the Read tool whenever you need architecture context.

---

## Core Rules (must follow)

1. **Keep `PROJECT.md` in sync with all user-facing docs.** The user-facing docs are `README.md` **and** the `docs/` folder (`docs/cli.md`, `docs/configuration.md`, `docs/transform-rules.md`, `docs/gd-helpers.md`, `docs/typings.md`, `docs/ide-integration.md`, `docs/gd-to-ts-migration.md`, `docs/development.md`); `PROJECT.md` is the internal mirror. Whenever you add or change any of:
   - Features (user-facing or internal)
   - CLI flags or commands
   - Type helpers (gd namespace, symbols, etc.)
   - Conversion rules (TS ↔ GDScript mappings)
   - Known edge cases or workarounds

   update `PROJECT.md` **and** the right user doc(s) so the two stay consistent. For each user-facing change, decide the best home among `README.md` / `docs/*` — README for the overview, pitch, and quick start; the matching `docs/*` page for detailed reference. **If the best place is unclear, ask the user before writing.** Do this as part of completing the work — not as a follow-up task, and not only when asked.

2. **Ask the user** if you find transformation cases with problems or ambiguous semantics. Don't guess silently.

3. **⚠️ NEVER commit without explicit user approval.** Do not run `git commit` on your own. Always wait for the user to ask you to commit.

4. **Project philosophy**: write like GDScript, but with strong TS types, linting, and autocomplete. Only GDScript-supported features/API should be supported. For TS-unsupported GD features, use strongly typed `gd` namespace helpers.

5. **Documentation split**:
   - `README.md` — user-facing overview, pitch, quick start (what users see first on GitHub)
   - `docs/*.md` — user-facing detailed reference (CLI, configuration, transform rules, gd helpers, typings, IDE integration, migration, development)
   - `PROJECT.md` — internal architecture, structure, edge cases (mirrors the user docs above)
   - `AGENTS.md` — this file, rules only

   **User-doc writing style** (README + `docs/*`): describe behavior simply and briefly — a few short sentences, not exhaustive mechanics. When a conversion or behavior isn't self-evident, add a one-line _why_ (e.g. "`.get()` returns `null` for a missing key instead of crashing"). Don't enumerate every skip-condition, edge case, or internal mechanism — that detail belongs in `PROJECT.md` only.

6. **⚠️ ALL temporary directories MUST live under the OS temp dir** (`os.tmpdir()` from Node's `node:os` module). Never create tmp dirs inside the project tree (e.g. `.tmp-*` in tests, `.tstogd-cache` at the repo root, etc.). Use `join(tmpdir(), 'tstogd-<label>-<random>')` or similar. This applies to:
   - Test fixtures that need scratch files
   - Cache directories
   - Any intermediate file written by the converter/helpers
   - Addon conversion temp files

   Always clean them up (`rmSync(..., { recursive: true, force: true })`) in `finally` blocks.

7. **⚠️ DO NOT hardcode data that can be derived from existing sources** — especially Godot class/type/method lists that live in the registry (`typings/<version>/godot-class-registry.json`, accessed via `resolveRegistry()` → `.getData()`). Never hardcode lists of Godot value types, variant constructors, packed arrays, signal names, class inheritance, etc. Always derive them from the registry at runtime (lazy + cached if needed for perf).

   Examples of things that MUST come from the registry:
   - Godot value/variant types (Vector2, Color, Rect2, Transform2D, ...)
   - Packed array types (PackedInt32Array, PackedColorArray, ...)
   - Global functions, global constants, global enums
   - Singletons (Engine, Input, ProjectSettings, ...)
   - Bare annotations (`@export`, `@onready`, ...)
   - Class inheritance chains and method/property/signal lists
   - `variantConverts` (types convertible via `gd.as`)

   If you think something genuinely needs to be hardcoded (e.g., a small set of TS-specific concepts that don't exist in Godot's XML), **ask the user for explicit permission first**. Default answer is "derive it from the registry".

8. **⚠️ Keep source files under 500 lines.** If a file grows beyond this, split it into logical modules. This ensures each file can be fully read in one pass, makes edits more targeted, and reduces risk of accidentally breaking unrelated code. Auto-generated files (e.g. tree-sitter `types.ts`) are exempt.

9. **Always run tests and build after completing some task**

10. **⚠️ Use Claude plans, not standalone `.md` design/spec files.** When brainstorming or planning an implementation, write the output as a Claude plan (via `EnterPlanMode` → plan file under `~/.claude/plans/`). Do not create `.md` design/spec files in the project tree (e.g. `docs/superpowers/specs/*.md`). Claude plans are visible in the Claude app and are the canonical place for planning artifacts. If a spec `.md` file already exists and the information has been captured in a Claude plan, delete the `.md` file.

11. **⚠️ Correctness over completeness.** Generated output (GDScript, typings, source maps) must always be valid. When the converter cannot _prove_ that emitting something is correct, drop it rather than guess — **but only when dropping keeps the result correct.** This holds for optional constructs like type annotations: a missing type hint is always safe (GDScript types are optional), whereas a wrong one breaks the `.gd`, so prefer dropping more over emitting something that _might_ be invalid.

    The flip side: when silently skipping (or emitting a best-effort guess) would produce an **incorrect or misleading** result rather than a merely less-complete one, **raise an error/diagnostic and fail loudly** — surfacing an unknown/unsupported/ambiguous construct is always better than silently doing nothing and shipping wrong output. Never silently swallow something that changes behavior.

## Development Guidelines

### Philosophy

#### Core Beliefs

- **Incremental progress over big bangs** - Small changes that compile and pass tests
- **Learning from existing code** - Study and plan before implementing
- **Pragmatic over dogmatic** - Adapt to project reality
- **Clear intent over clever code** - Be boring and obvious

#### Simplicity

- **Single responsibility** per function/class
- **Avoid premature abstractions**
- **No clever tricks** - choose the boring solution
- If you need to explain it, it's too complex

### Technical Standards

#### Architecture Principles

- **Composition over inheritance** - Use dependency injection
- **Interfaces over singletons** - Enable testing and flexibility
- **Explicit over implicit** - Clear data flow and dependencies
- **Test-driven when possible** - Never disable tests, fix them

#### Error Handling

- **Fail fast** with descriptive messages
- **Include context** for debugging
- **Handle errors** at appropriate level
- **Never** silently swallow exceptions

### Project Integration

#### Learn the Codebase

- Find similar features/components
- Identify common patterns and conventions
- Use same libraries/utilities when possible
- Follow existing test patterns

#### Tooling

- Use project's existing build system
- Use project's existing test framework
- Use project's formatter/linter settings
- Don't introduce new tools without strong justification

#### Code Style

- Follow existing conventions in the project
- Refer to linter configurations and .editorconfig, if present
- Text files should always end with an empty line

### MCP Tool Use

- Use Context7 to validate current documentation about software libraries
- Use searxng if your primary Web Search or Fetch tools fail
- Use Tavily ONLY when searxng doesn't give you enough information

### Important Reminders

**NEVER**:

- Use `--no-verify` to bypass commit hooks
- Disable tests instead of fixing them
- Commit code that doesn't compile
- Make assumptions - verify with existing code

**ALWAYS**:

- Commit working code incrementally
- Update plan documentation as you go
- Learn from existing implementations
- Stop after 3 failed attempts and reassess

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

For anything else — file layout, implementation details, what's implemented, edge cases — see [PROJECT.md](./PROJECT.md).

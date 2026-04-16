# TYPESCRIPT TO GDSCRIPT — Claude Instructions

This project converts TypeScript code to GDScript for the Godot game engine, with utilities for typings generation, linting, and watch mode.

**For project structure, implementation status, conversion rules, and edge cases, see [PROJECT.md](./PROJECT.md).** Read it with the Read tool whenever you need architecture context.

---

## Core Rules (must follow)

1. **Always update both README.md and PROJECT.md** when adding or changing:
   - Features (user-facing or internal)
   - CLI flags or commands
   - Type helpers (gd namespace, symbols, etc.)
   - Conversion rules (TS ↔ GDScript mappings)
   - Known edge cases or workarounds

   Do this as part of completing the feature — not as a follow-up task, and not only when asked.

2. **Ask the user** if you find transformation cases with problems or ambiguous semantics. Don't guess silently.

3. **⚠️ NEVER commit without explicit user approval.** Do not run `git commit` on your own. Always wait for the user to ask you to commit.

4. **Project philosophy**: write like GDScript, but with strong TS types, linting, and autocomplete. Only GDScript-supported features/API should be supported. For TS-unsupported GD features, use strongly typed `gd` namespace helpers.

5. **Documentation split**:
   - `README.md` — user-facing docs (what users see on GitHub)
   - `PROJECT.md` — internal architecture, structure, edge cases
   - `CLAUDE.md` — this file, rules only

6. **⚠️ ALL temporary directories MUST live under the OS temp dir** (`os.tmpdir()` from Node's `node:os` module). Never create tmp dirs inside the project tree (e.g. `.tmp-*` in tests, `.ts2gd-cache` at the repo root, etc.). Use `join(tmpdir(), 'ts2gd-<label>-<random>')` or similar. This applies to:
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

---

## Quick Reference

- **Package manager**: yarn (v1)
- **Run tests**: `npx vitest run`
- **Regenerate Godot typings**: `yarn generate:godot-typings`
- **CLI entry**: `src/cli/index.ts` (binary `ts2gd`)
- **Main converters**: `src/converter/ts-to-gd/`, `src/converter/gd-to-ts/`
- **Typings generation**: `src/typings/scenes.ts` (scene/script typings), `src/typings/godot-docs.ts` (Godot class typings from XML)

For anything else — file layout, implementation details, what's implemented, edge cases — see [PROJECT.md](./PROJECT.md).

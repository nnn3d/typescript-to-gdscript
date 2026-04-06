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

3. **Project philosophy**: write like GDScript, but with strong TS types, linting, and autocomplete. Only GDScript-supported features/API should be supported. For TS-unsupported GD features, use strongly typed `gd` namespace helpers.

4. **Documentation split**:
   - `README.md` — user-facing docs (what users see on GitHub)
   - `PROJECT.md` — internal architecture, structure, edge cases
   - `CLAUDE.md` — this file, rules only

---

## Quick Reference

- **Package manager**: yarn (v1)
- **Run tests**: `npx vitest run`
- **Regenerate Godot typings**: `yarn generate:godot-typings`
- **CLI entry**: `src/cli/index.ts` (binary `ts2gd`)
- **Main converters**: `src/converter/ts-to-gd/`, `src/converter/gd-to-ts/`
- **Typings generation**: `src/typings/scenes.ts` (scene/script typings), `src/typings/godot-docs.ts` (Godot class typings from XML)

For anything else — file layout, implementation details, what's implemented, edge cases — see [PROJECT.md](./PROJECT.md).

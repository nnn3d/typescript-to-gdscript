# TYPESCRIPT TO GDSCRIPT

## Purpose

This project converts TypeScript code to GDScript for the Godot game engine, with utilities for typings generation, linting, and watch mode.

## General Instructions

- When adding new user-facing features, update README.md to document them.
- When modifying existing features, update README.md if the documentation is affected.
- IMPORTANT FOR CLAUDE: ask the user if you find transformation cases with problems.

## Project Philosophy

Write like GDScript, but with strong TS types, linting, and autocomplete.
Only GDScript-supported features/API should be supported. For TS-unsupported GD features, use strongly typed `gd` namespace helpers.

## Tech Stack

- **Package manager**: yarn (v1)
- **Build**: plain tsc (ES modules, Node16 resolution, ES2022 target, `erasableSyntaxOnly: true`)
- **Testing**: vitest (fixture-based paired .ts/.gd files)
- **TS parsing**: TypeScript Compiler API (ts.Program + TypeChecker for type-aware transforms)
- **GD parsing**: tree-sitter + tree-sitter-gdscript v6.1.0
- **Godot resource parsing**: tree-sitter-godot-resource v0.7.0 (.tscn, .tres, project.godot)
- **AST type generation**: @asgerf/dts-tree-sitter v0.21.0 (generates typed AST interfaces from grammars)
- **Source maps**: `source-map` npm package
- **CLI**: commander, **Watch**: chokidar, **Cache**: SHA-256 file hashing

## Project Structure

```
vendor/godot/            # Git submodule: official godot repo (shallow clone, master)
                         # Only doc/classes/*.xml and version.py are used

scripts/
  fix-tree-sitter-types.js  # Post-processes @asgerf/dts-tree-sitter output for TS 5.9

typings/                 # Versioned Godot typings (committed to git, used as TS lib)
  index.d.ts             # Entry point: references _globals/ + latest/
  _globals/
    gd-helpers.d.ts      # gd namespace type defs (signal, enum_, as, ops, decorators)
    globals.d.ts         # Generated global class declarations + scene typings
  _overrides/            # Manual type overrides applied during typings generation
    *.d.ts               # Per-class override files (node.d.ts, array.d.ts, etc.)
  4.7/
    classes/             # Per-class .d.ts files (916 classes)
    godot-class-registry.json  # Class hierarchy JSON (916 classes)
  latest/index.d.ts      # Pointer to active version

src/
  config/index.ts        # tstogd.json loader, registry resolver
  converter/
    ts-to-gd/            # transformer.ts (AST visitor), emitter.ts (line/col + sourcemap), index.ts
    gd-to-ts/index.ts    # convertGdToTs() with typed AST, scope tracking, GodotClassRegistry
    common/index.ts      # TransformContext, TransformDiagnostic, TransformResult, tsTypeToGdType()
  parser/
    gdscript/            # GDScriptParser class + AUTO-GENERATED types.ts (SyntaxType, typed nodes)
    godot-resource/      # GodotResourceParser class + AUTO-GENERATED types.ts
    typescript/index.ts  # createTsProgram, getTypeChecker, getSourceFile
  sourcemap/index.ts     # SourceMapper (write) + SourceMapReader (read/verify)
  typings/
    godot-registry.ts    # GodotClassRegistry + XML parsing + version detection
    godot-docs.ts        # generateGodotDocsTypings: per-class .d.ts + registry JSON
    classes.ts           # generateClassTypings: scans TS files, outputs global .d.ts
    scenes.ts            # generateSceneTypings: parses .tscn/.tres for get_node/get_parent/GodotResources
  eslint/                # plugin.ts + rules/convert.ts (ts2gd/convert rule)
  godot-validate/index.ts  # Godot CLI validation, error parsing, source map remapping
  cache/index.ts         # FileCache with SHA-256
  watcher/index.ts       # Watcher class using chokidar
  cli/index.ts           # Commander CLI
  types/gd-helpers.d.ts  # gd namespace type defs (original, copied to typings/_globals/)

tests/
  fixtures/ts-to-gd/    # 21 paired .ts/.gd fixture files
  fixtures/gd-to-ts/    # 22 paired .gd/.ts fixture files
  converter/             # ts-to-gd.test.ts, gd-to-ts.test.ts, converter-diag.test.ts
  typings/               # godot-registry, gd-to-ts-registry, class-typings, scene-typings, godot-docs, type-checks
  sourcemap/             # ts-to-gd-sourcemap.test.ts (9 position checks)
  eslint/                # eslint.test.ts + fixtures/
  godot-validate/        # godot-validate.test.ts
```

## CLI Commands (binary: `ts2gd`)

- `ts2gd convert <files...>` — Convert TS to GD (`-o`, `--source-map`, `--root-dir`, `--tsconfig`)
- `ts2gd convert-gd <files...>` — Convert GD to TS (`-o`, `--registry`)
- `ts2gd lint <files...>` — Lint TS files (`--root-dir`, `--tsconfig`)
- `ts2gd watch` — Watch and auto-convert (`--root-dir`, `--output-dir`, `--source-map`, `--tsconfig`, `--class-typings`)
- `ts2gd generate-typings` — Generate versioned typings from Godot docs (`--docs-dir`, `--typings-dir`, `--patch-dir`, `--version`, `--set-latest`)
- `ts2gd set-latest <version>` — Set "latest" typings (`--typings-dir`)
- `ts2gd generate-class-typings <files...>` — Generate global class .d.ts (`-o`, `--root-dir`, `--tsconfig`)

### Typings usage by consumer projects

```json
{ "compilerOptions": { "types": ["typescript-to-gdscript/typings"] } }
```

## Implementation Status

- [x] TS-to-GD converter (21 fixture tests): classes, properties, methods, signals, enums, control flow, expressions, operators, comments, await, lambdas, match, dict, gd.ops/as/signal/enum, source maps
- [x] GD-to-TS converter (22 fixture tests): same features in reverse, local scope tracking, async detection, inner classes, GodotClassRegistry for `this.` resolution
- [x] AST types generated by @asgerf/dts-tree-sitter (gdscript + godot-resource)
  - Post-processed by `scripts/fix-tree-sitter-types.js` for TS 5.9 `erasableSyntaxOnly`
  - Regenerate: `yarn generate:ast-types`, `yarn generate:resource-ast-types`
- [x] Typings generation (classes, scenes, godot-docs with _overrides/ system)
  - Scene parsing via tree-sitter-godot-resource: .tscn, .tres, project.godot
  - `get_node()`/`get_node_or_null()` overloads via module augmentation per script class
  - `get_parent()` typed via `[__parent]` symbol on `Node<Tree>` generic
  - `GodotResources` interface: `.tscn` → `PackedScene<T>`, `.gd` → `typeof _Class`, `.tres` → `gd_resource type` header, assets → from extension
  - Autoload singletons from `project.godot` → global `const` declarations
- [x] Godot class registry (916 classes, inheritance chain, global functions from `vendor/godot` XML docs)
- [x] Converter diagnostics + ESLint plugin (`ts2gd/convert` rule, flat config ESLint >= 9)
- [x] Watch mode + CLI + Cache
- [x] Godot validation (CLI --check-only, source map remapping to TS positions)
- [ ] Source map integration with Godot LSP (map LSP errors back to TS in IDE)

## Conversion Rules (TS ↔ GDScript)

| TypeScript | GDScript | Notes |
|---|---|---|
| `export class Foo extends Bar {}` | `extends Bar` / `class_name Foo` | One class per file, `export` stripped |
| `constructor()` | `_init()` | |
| `this.` | `self.` | Always converted (never stripped) |
| `let` / `const` | `var` | `var` restricted in TS |
| `number` | `float` | `int`/`float` type aliases preserved |
| `undefined` | restricted | Use `null` instead |
| `===` / `!==` | `==` / `!=` | |
| `&&` / `\|\|` / `!` | `and` / `or` / `not` | |
| `for (x of arr)` | `for x in arr` | |
| `switch/case` | `match` | |
| `//` / `/** */` | `#` / `##` | |
| `async` | stripped | GDScript has no async |
| `new Foo()` | `Foo.new()` | |
| `gd.signal<[T]>()` | `signal name(param: T)` | |
| `gd.enum('A', 'B')` | `enum Name {A, B}` | |
| `gd.ops.add(a, b)` | `a + b` | Typed operator overloads |
| `gd.as(val, Type)` | `val as Type` | |
| `gd.dict([[k, v]])` | `{k: v}` | Non-string keys |
| `StringName('...')` | `&"..."` | |
| `NodePath('...')` | `^"..."` | |
| `@gd.export` | `@export` | `gd.decorators.export_` in TS types |
| `instanceof` | `is` | |

## Known Edge Cases

- Numeric literals: use `getText()` to preserve `100.0` (TS parser strips trailing `.0`)
- String literals: use `getText()` to preserve escape sequences
- Dict string keys: use `emitStringLiteral()` for proper quote escaping (`'it\'s'` → `"it's"`)
- `self.method()` vs `self.callback`: only strip `self.` for method call expressions, not property access as argument
- `@gd.export`: `export` is TS reserved, handled via `gd.decorators.export_`
- GD-to-TS `self.` resolution: registry always required, only known members (own + Godot inherited) get `this.` prefix
- GD-to-TS scope: local vars/params shadow class members to prevent incorrect `this.` prefix
- `export class`: enables module augmentation for scene typings (named exports, not default)
- `[__parent]` encoding: `Node<Tree extends object = any>`, conditional type `[any] extends [{[__parent]: infer P}] ? P : Node` — `any` default → `unknown` → returns `Node`
- GodotResources `.gd`: `typeof _Class` (class/constructor type), not instance type
- AST type post-processing: `const enum` → const object (erasableSyntaxOnly), `SyntaxType.X` → `typeof SyntaxType.X` in type positions
- tree-sitter-gdscript `ParametersNode` name clash: type alias renamed to `ParameterChildNode`
- Cross-file class visibility: `import { Name as _Name }` + `declare global { class Name extends _Name {} }`

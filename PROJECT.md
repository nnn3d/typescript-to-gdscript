# Project Structure & Implementation Notes

Detailed project layout, implementation status, conversion rules, and edge cases. See CLAUDE.md for instructions/rules.

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
    gd-to-ts/ts-helpers.ts  # TS-based post-processing (operator fix, explicit convert, ready field types, extends type)
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

- `ts2gd init` — Interactive project initialization (tstogd.json, tsconfig.json, eslint.config.js, npm install, .gdignore)
- `ts2gd convert <files...>` — Convert TS to GD (`-o`, `--source-map`, `--root-dir`, `--tsconfig`, `--emit-on-error`)
- `ts2gd convert-gd <files...>` — Convert GD to TS (`-o`, `--registry`, `--no-helpers`, `--no-signal-handler-helper`, `--no-operator-fix-helper`, `--no-explicit-convert-helper`, `--no-ready-field-types-helper`, `--no-extends-type-helper`, `--unsafe-use-any`, `--emit-on-error`)
- `ts2gd lint <files...>` — Lint TS files (`--root-dir`, `--tsconfig`)
- `ts2gd watch` — Watch and auto-convert (`--root-dir`, `--output-dir`, `--source-map`, `--tsconfig`, `--class-typings`)
- `ts2gd generate-typings` — Generate versioned typings from Godot docs (`--docs-dir`, `--typings-dir`, `--patch-dir`, `--version`, `--set-latest`)
- `ts2gd set-latest <version>` — Set "latest" typings (`--typings-dir`)
- `ts2gd generate-class-typings <files...>` — Generate global class .d.ts (`-o`, `--root-dir`, `--tsconfig`)
- `ts2gd generate-addon-typings` — Generate typings for GDScript addons in `addons/` (`-o`, `--root-dir`)

### Typings usage by consumer projects

```json
{ "compilerOptions": { "types": ["typescript-to-gdscript/typings"] } }
```

## Implementation Status

- [x] TS-to-GD converter (21 fixture tests): classes, properties, methods, signals, enums, control flow, expressions, operators (incl. `gd.ops.rem` for `%`), comments, await, lambdas, match, dict, gd.ops/as/signal/enum, source maps
- [x] GD-to-TS converter (22 fixture tests): same features in reverse, local scope tracking, async detection, inner classes, GodotClassRegistry for `this.` resolution, conversion helpers (signal handler type inference), global enum constant qualification (`KEY_F21` → `Key.KEY_F21`)
- [x] AST types generated by @asgerf/dts-tree-sitter (gdscript + godot-resource)
  - Post-processed by `scripts/fix-tree-sitter-types.js` for TS 5.9 `erasableSyntaxOnly`
  - Regenerate: `yarn generate:ast-types`, `yarn generate:resource-ast-types`
- [x] Typings generation (classes, scenes, godot-docs with _overrides/ system)
  - **File-independent architecture**: each .tscn/.ts/.tres generates its own .d.ts independently
  - Hybrid flat+tree type system: named type aliases per node with `[__node_type]`, `[__node_parent]`, `[__node_children]`, flat descendant paths
  - `[__node_root]`: string (root node name) for `/root/` path resolution
  - `[__node_extends]`: lazy scene inheritance via `__node_extends` symbol (no `Omit` overhead)
  - `get_node()`/`get_node_or_null()`/`has_node()`/`get_child()` overloads via module augmentation per script class
  - `get_node('/root/...')` absolute path support via `_GDGetRootNode`/`_GDFindRootTree`/`_GDCreateRootTree`
  - `get_parent()` typed via `[__node_parent]` tree reference
  - `GodotGroups` interface: per-group named interfaces (`__GodotGroup_X`) for typed `get_nodes_in_group()`, `get_first_node_in_group()`, group action methods
  - Sub-resource chain parsing for TileMap → TileSet → TileSetScenesCollectionSource
  - `GodotResources` interface: `.tscn` → `PackedScene<_GDTreeNode<Tree>>`, `.gd` → `typeof Class`, `.tres` → `gd_resource type` header
  - Asset resources bundled into single `_resources.d.ts` (not individual files) for faster TS parsing
  - `ScriptPaths` pre-computed type alias to avoid repeated `_GDGetTreePaths` evaluation
  - `StaticProps` (`Omit<typeof ScriptClass, 'prototype' | keyof Function>`) for static field access on instances
  - Autoload singletons from `project.godot` → global `const` declarations (both `.gd` scripts and `.tscn` scenes), `uid://` resolution via `.uid` files
  - Unique name nodes (`%Name`) accessible from every subtree in the scene
  - **Addon typings** (`generate-addon-typings`): converts `addons/*.gd` → `.ts` via GD-to-TS, generates `.gd.d.ts` with global classes/enums/GodotScripts entries. Two-pass: convert all, then scan with TS program for cross-file resolution.
  - **Incremental generation** (`generateFileTypings`): per-file `.gd.d.ts`/`.tscn.d.ts` regeneration for watch mode (full generation only on first run, addon typings only on first run)
  - **Value type interfaces** (Vector2, Color, Rect2, Packed*Array, etc.): generated with instance interface + `*Constructor` interface + `declare const`. No `new` — constructors are call signatures only (matches GDScript)
  - `[__variant_converts]` on value-type instance interfaces: union of types accepted by single-parameter "from" constructors (e.g. `Vector2[__variant_converts]: Vector2 | Vector2i`). Enables `gd.as(val, Target)` type narrowing
  - `readonly prototype: ClassName` on `*Constructor` interfaces enables `v instanceof Vector2` type narrowing
  - Packed array types get `[Symbol.iterator](): IterableIterator<ItemType>` (item type inferred from `append(value: T)` method signature) for typed `for (const x of arr)` loops
  - `Array` interface: `[__variant_converts]` includes all Packed array types (from XML constructors); `ArrayConstructor` has `<T>(from_: PackedXArray): Array<T>` call signatures (no `new`)
  - `GodotArray` removed (use `Array()` call syntax instead of `new GodotArray()`)
- [x] Godot class registry (916 classes, inheritance chain, global functions, per-class `variantConverts` from single-param "from" constructors, from `vendor/godot` XML docs)
- [x] Converter diagnostics + ESLint plugin (`ts2gd/convert` rule, flat config ESLint >= 9)
  - Runs full TS→GD conversion + optional Godot validation per file, reports converter diagnostics and Godot errors inline
  - `x in y` validation: `emitBinaryExpression` checks the RHS type via `checker.getTypeAtLocation()`. Reports an error if the type is an array (`checker.isArrayType`/`isTupleType`), a number, a boolean, or a Godot variant type (derived from `resolveRegistry().getData().constructors` minus `GD_IN_ALLOWED_CONTAINER_TYPES` = `{Dictionary}`). Registry-derived sets are lazily cached at module scope; `Packed*Array` entries (detected by `startsWith('Packed')` + `endsWith('Array')`) get a dedicated "the array type `X`" label vs "the value type `X`" for non-packed variants. Only `Dictionary`/object-literal types and `String` are valid RHS targets.
- [x] Watch mode + CLI + Cache (watches .ts, .tscn, .tres, assets, project.godot)
- [x] Godot validation (CLI --check-only, source map remapping to TS positions, autoload false-positive filtering for Godot bug #80319)
- [x] GD-to-TS conversion helpers system (pluggable, individually toggleable via `--no-helpers` / `--no-signal-handler-helper` / `--no-operator-fix-helper` / `--no-explicit-convert-helper` / `--no-ready-field-types-helper` / `--no-extends-type-helper`)
  - Signal handler helper: infers parameter types from .tscn signal connections
  - Operator fix helper: TS-based post-processing that fixes operator type errors (TS2365/2362/2363) by wrapping in `gd.ops.X()`
  - Explicit convert helper: TS-based post-processing that fixes variant-type assignment errors (TS2345/2322) by inserting explicit `gd.as(value, Target)` conversions. Uses `variantConverts` metadata in `godot-class-registry.json` (populated from single-param "from" constructors in Godot XML). Runs in the same multi-pass loop as operator fix with overlap deduplication.
  - Ready field types helper: TS-based post-processing that fixes TS7008 (implicit any) and TS2564 (no initializer) on class properties. Behavior:
    - **TS2564** (`field: T`) + assigned in `_ready` → `!` (definite-assignment assertion)
    - **TS2564** (`field: T`) + NOT assigned in `_ready` + `T` is a GDScript primitive → `!` (GDScript primitives have a guaranteed default value at runtime, so they're effectively initialized)
    - **TS2564** (`field: T`) + NOT assigned in `_ready` + non-primitive `T` → `?` (mark optional), **or `!` when `unsafeUseAny` is set** (fewer `X | undefined` errors downstream at the cost of runtime safety)
    - **TS7008** (`field`) + assigned in `_ready` → `!: <inferred type>` (inferred via `typeof <expr>` for identifier/property-access RHS, else `checker.typeToString(getBaseTypeOfLiteralType(getTypeAtLocation(rhs)))`)
    - **TS7008** (`field`) + NOT assigned in `_ready` → left untouched (no type to infer)
    Fields that already have `!` or `?` are skipped. "GDScript primitive" check uses `GD_BUILTIN_PRIMITIVE_TYPES` (int/float/bool/String/etc.) plus `registry.isConstructor()` (Vector2, Color, Packed*Array, Array, Dictionary, StringName, NodePath, Callable, Signal, etc. — everything in the registry's `constructors` list). `unsafeUseAny` is plumbed through `TsHelperOptions.unsafeUseAny` → `collectReadyFieldTypeFixes(..., unsafeUseAny)` from the CLI `--unsafe-use-any` flag.
  - Extends type helper: TS-based post-processing that fixes TS7006 (implicit any) on parameters of overridden methods. Walks the class's base type chain via `checker.getBaseTypes()` to find an inherited method with the same name, then copies parameter types by index using the SYNTACTIC type text from the parent's `.d.ts` (preserving aliases like `float`/`int` rather than collapsing them to `number`).
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
| `switch (val) { case X: ... }` | `match val:` | Simple matches (literal/expression/wildcard patterns, no bindings/guards/array/dict) use native TS `switch`. GD→TS auto-detects via `isSimpleMatchStatement()` |
| `gd.match(val, [...])` | `match val:` | Advanced patterns (bindings, guards, arrays, dicts). Arrow `do: () => {}` preserves `this`; also supports `do()` method syntax |
| `get X() {} / set X(v) {}` | `var X: get: ... set(v): ...` | Simple setget: native TS accessors ↔ inline GD get/set bodies. Missing get or set in GD is filled with a passthrough default in TS |
| `X = gd.getset<T>({ value?, get, set })` | `var X[: T][ = v]: get: ... set(v): ...` OR `var X: get = fn, set = fn` | Complex setget (has default value or uses `get = fn, set = fn` ref form). Mixing inline + ref forms is an error; both `get` and `set` required |
| `//` / `/** */` | `#` / `##` | |
| `async` | stripped | GDScript has no async |
| `new Foo()` | `Foo.new()` | |
| `gd.signal<[T]>()` | `signal name(param: T)` | |
| `gd.enum('A', 'B')` | `enum Name {A, B}` | |
| `gd.ops.add(a, b)` | `a + b` | Typed operator overloads (also: sub, mul, div, rem, eq, ne, gt, gte, lt, lte, plus, minus) |
| `gd.ops.rem(a, b)` | `a % b` | Remainder/modulo for non-number types (Vector2i, etc.) |
| `gd.as(val, Type)` | `val as Type` | Class cast + variant conversion (Vector2↔Vector2i, Packed*Array↔Array) via `[__variant_converts]` symbol |
| `gd.eval('code')` | `code` | Raw GDScript passthrough, auto-indented. Also usable as variable initializer (`const v = gd.eval<T>('...')`) — first line becomes RHS, rest is body |
| `// @gd.eval: code` | `code` | Magic comment: raw GDScript in any position |
| `gd.dict([[k, v]])` | `{k: v}` | Non-string keys |
| `/* comment */` | `"""comment"""` | Block comments (also `'''`) |
| `int(x)` / `float(x)` | `int(x)` / `float(x)` | Cast functions (also types) |
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
- TileMap embedded scenes: sub_resource chains (TileMap → TileSet → TileSetScenesCollectionSource) parsed via `collectTileMapScenes()`, injected into `instancedParents` in Pass 3 of `generateTypings()` with `NodeType<{[__parent]: grandparentAlias}>` for proper chain resolution (e.g. `TileMap<{[__parent]: _Level}>` so `get_parent().get_parent()` resolves correctly). For root TileMap in instanced scenes (e.g. TilesetObjects.tscn), grandparent is resolved from instancing scenes.
- Godot validation autoload filtering: `--check-only --script` doesn't load autoloads (bug #80319), two error formats: `"Identifier not found: X"` and `"Identifier "X" not declared in the current scope."`, filtered in both parsed and unparsed error paths
- Godot validation duplicate class filtering: `Class "X" hides a global script class` when tmp validation copy coexists with original .gd file, filtered via `isDuplicateClassFalsePositive()`
- tree-sitter-gdscript comment bug: `#"` (no space) not parsed as comment; workaround adds space after `#`/`##` in `fixCommentIndentation()`
- Operator symbols use `__ops_` prefix: `__ops_add`, `__ops_sub`, `__ops_mul`, `__ops_div`, `__ops_rem`, `__ops_eq`, etc.
- Godot XML `Type[]` suffix (e.g. `Node[]`) handled by `godotTypeToTs()` → `Array<Node>`
- Scene tree `__node_extends` circularity avoided: unique name `%X` entries skip self-reference on the unique node itself
- `_GDTreeHandlers` does NOT include `/root/` overloads (only in module augmentation) to avoid per-TreeNode evaluation overhead
- `collectAllSignalHandlers()` pre-parses all scenes once for batch signal resolution (vs per-file `resolveSignalHandlers()`)
- Class-level enums → `namespace ClassName { const enum EnumName { ... } }` in .gd.d.ts for strong type checking
- Class-level inner classes → `namespace ClassName { type InnerClass = InstanceType<typeof ScriptClass.InnerClass>; }` in .gd.d.ts
- GD-to-TS: type annotations referencing class enums/inner classes qualified with class name (`State` → `ClassName.State`)
- GD-to-TS match statements: `isSimpleMatchStatement()` checks whether all PatternSections use only literal/expression/wildcard patterns (no Array/Dictionary/PatternBinding/PatternGuard). If so, `emitSimpleMatchAsSwitch()` produces a native TS `switch`/`case`/`default` block with explicit `break` after each section; multi-pattern sections (`1, 2, 3:`) become fall-through `case` labels. Otherwise falls back to `gd.match([...])` with object/arrow-function cases.
- GD-to-TS setget variables: `emitClassVariable()` inspects the `setget` child node. Simple case (no default value, no function-ref syntax) → `emitTsAccessors()` produces a pair of `get`/`set` accessors and synthesizes defaults for whichever side is missing. Complex case (has default value OR uses `get = fn, set = fn`) → `emitGdGetsetCall()` produces `name: T = gd.getset({...})` — always emits the property type annotation to sidestep `TS7022`. The annotation `T` is resolved in this order:
  1. Explicit GDScript type annotation (`var b: int = ...` → `int`)
  2. `typeof <value>` when the value expression is an identifier or attribute access (via `tryEmitTypeofValue` — the GDScript AST node must be `Identifier` or `Attribute`)
  3. Fallback: `unknown` (default) or `any` (when `--unsafe-use-any` is passed)
  Mixing inline bodies with function-reference syntax in one variable is an error.
- `gd.getset` TS7022 avoidance: the helper's `get`/`set` are strictly typed (`(() => T) | null` / `((v: T) => void) | null`) so bodies get full type checking. The inline bodies reference `this.<name>` (the property being defined), which triggers `TS7022` unless the property has an explicit type annotation. Non-function `get` types like `any` or `unknown` would avoid TS7022 but lose body type checking, so the converter always emits the annotation instead. Attempts at `NoInfer<T>`/`() => any`/`() => NoInfer<T>` all still trigger TS7022 because TS enters the closure for binding-analysis regardless of generic-inference flags.
- TS-to-GD `gd.getset` type resolution order (in `visitGdGetsetProperty`):
  1. Explicit `gd.getset<T>({...})` type argument
  2. Property declaration's own annotation (`name: T = ...`) — primary source in practice
  3. `set` callback parameter type (via `checker.getCallSignatures()` on `setExpr`) — fallback for inline `(v: int) => ...` or function-refs `this.set_x`
  4. `value` expression's type — numeric literals inspect raw source text to distinguish `int` (no decimal) from `float` (with decimal); other expressions go through `checker.getTypeAtLocation` + literal-widening + primitive mapping (`number`→`float`, `string`→`String`, `boolean`→`bool`)
- TS-to-GD setget: accessor pairs are grouped by name in `visitClassDeclaration` (new `'accessor'` OrderedMember kind), then emitted via `visitAccessorPair()` as a single `var X: get: ... set(v): ...` block (missing half is synthesized with a passthrough default). `PropertyDeclaration`s whose initializer is `gd.getset<T>({...})` route through `visitGdGetsetProperty()` which detects inline vs function-ref form and emits the appropriate GDScript, raising errors for mixed or incomplete configs. Inside accessor bodies, `this.<accessorName>` is rewritten to a bare identifier via `currentAccessorName` tracking (avoids infinite recursion in generated GDScript).
- `gd.getset` nullability: the type requires both `get` and `set` keys but each may be `null`. `null` means "use GDScript's default (backing-field read/write)" — the TS→GD converter simply omits that accessor from the GD setget clause. Both-null is an error ("at least one of `get` or `set` must be non-null"). GD→TS always emits both keys explicitly, using `get: null` / `set: null` when only one side is present in the source GDScript.
- `gd.eval` space indentation: converts space-based indent to tabs by tracking space→depth mapping; mixed tabs/spaces is an error
- `gd.eval` as variable initializer: `processGdEval()` returns processed lines with relative tab depth; `visitVariableStatement` emits first line as `var X = <firstLine>`, remaining lines are emitted at current indent (their embedded `\t` prefixes act as additional relative depth beyond the var line)
- GD-to-TS `'''`/`"""` triple-quoted strings as expression statements → `/* */` block comments (both class body and function body)
- TS-to-GD `/* */` non-doc block comments → `"""..."""` (single-line and multiline); class-level trailing comments emitted via closing brace
- GD-to-TS inline comments in expressions (e.g. `# comment` inside function call args) → `/* comment */`
- GD-to-TS `emitAttribute` checks `!ctx.localVars.has()` to prevent incorrect `this.` prefix when local variable shadows class member
- Value types (Vector2, Color, Array, etc.) are instantiated via call syntax `Vector2(1, 2)` — never `new Vector2()`, since GDScript has no `new` for these primitives. Their `*Constructor` interfaces only have call signatures
- `gd.as` variant conversion to `Array` constrains source via `T extends { [__variant_converts]: any } & Array[typeof __variant_converts]` — source must be in Array's own variant_converts union. Element type extracted from `[Symbol.iterator]` of source. Plain `never` return gets silently swallowed by TS method bivariance in large interfaces, so this constraint-based approach is used instead
- `addons/` directory excluded from user file discovery (findTsFiles, findGdFiles, findSceneFiles, watcher); addon `.gd` files discovered separately via `findAddonGdFiles()` for `generate-addon-typings`
- Addon `.ts` output files use `// @ts-nocheck` to suppress strict errors (GD-to-TS doesn't generate initializers); user tsconfig should exclude `types/addons` to avoid double-scanning
</content>
</invoke>
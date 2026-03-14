# TYPESCRIPT TO GDSCRIPT

## Purpose

This project is for converting typescript code to gdscript code for godot game engine, with utils around it.

## Features overview

- Convert typescript to gdscript (main feature)
  - With source maps
  - Also convert gdscript to typescript
    - This convertation should not give same result as initial typescript for double convertation
    - Also used for godot addons to create typings
- Generate TS typings for global class usage from ts files
  - Generate typings for godot scenes, to have autocomplete for "getNode()" and other functions
- Generate TS typings from Godot docs (classes and global values) and improve them
- Lint ts files for transformation errors (like unsupported TS features) and gdscript errors from godot LSP
- Watch mode, with transformations and linting

## Project Philosophy

Main point to write like on gdscript, but with strong types support by TS, and good linting and autocomplete.
Only features and API, supported in gdscript should be supported by this project converter
(there are maybe some exceptions for some sugar and so on).
For features, that unsupported in TS, should be used strongly typed helpers.

## Tech Stack

- **Package manager**: yarn (v1)
- **Build**: plain tsc (ES modules, Node16 resolution, ES2022 target)
- **Testing**: vitest (fixture-based paired .ts/.gd files in `tests/fixtures/`)
- **TS parsing**: TypeScript Compiler API (ts.Program + TypeChecker for type-aware transforms)
- **GD parsing**: tree-sitter + tree-sitter-gdscript v6.1.0 (native Node.js bindings)
- **Source maps**: `source-map` npm package (SourceMapGenerator for writing, SourceMapConsumer for reading)
- **CLI**: commander
- **Watch mode**: chokidar
- **Cache**: SHA-256 file hashing

### Dependencies
- typescript ^5.9.0, tree-sitter ^0.22.0, tree-sitter-gdscript ^6.1.0
- source-map ^0.7.4, commander ^13.0.0, chokidar ^4.0.0
- Dev: @types/node ^22.0.0, vitest ^3.0.0

## Project Structure

```
vendor/
  godot/               # Git submodule: official godot repo (shallow clone, master branch)
                       # Only vendor/godot/doc/classes/*.xml and version.py are used

typings/               # Versioned Godot typings (committed to git, used as TS lib)
  index.d.ts           # Entry point: references gd-helpers.d.ts + latest/godot.d.ts
  gd-helpers.d.ts      # gd namespace type defs (signal, enum_, as, math, decorators)
  4.6/                 # Godot 4.6 typings
    godot.d.ts         # 25K-line declare class/function definitions
    godot-class-registry.json  # Class hierarchy JSON (916 classes)
  latest/              # Copy of active version (used by index.d.ts)
    godot.d.ts
    godot-class-registry.json

src/
  config/
    index.ts           # tstogd.json loader, registry resolver (CLI → config → bundled latest)
  converter/
    ts-to-gd/          # Main TS->GD converter
      transformer.ts   # AST visitor, walks TS AST and emits GDScript
      emitter.ts       # GDScriptEmitter: line/col tracking, source map integration
      index.ts         # convertTsToGd() entry point
    gd-to-ts/          # GD->TS converter
      index.ts         # convertGdToTs() with typed AST, local scope tracking, required GodotClassRegistry
    common/            # Shared types and type mapping
      index.ts         # TransformContext, TransformDiagnostic, TransformResult, tsTypeToGdType()
  parser/
    gdscript/          # tree-sitter wrapper
      index.ts         # GDScriptParser class
      types.ts         # AUTO-GENERATED: 85 typed AST node interfaces with childForFieldName overloads
      generate-types.ts # Script to generate types.ts from node-types.json (run: yarn generate:ast-types)
    typescript/        # TS program utilities
      index.ts         # createTsProgram, getTypeChecker, getSourceFile
  sourcemap/
    index.ts           # SourceMapper (write) + SourceMapReader (read/verify)
  typings/
    godot-registry.ts  # GodotClassRegistry + XML parsing + version detection from version.py
    godot-docs.ts      # generateGodotDocsTypings: generates godot.d.ts + optional registry JSON
    classes.ts         # generateClassTypings: scans TS files, outputs global .d.ts
    scenes.ts          # generateSceneTypings: parses .tscn for getNode() overloads
    index.ts           # Barrel exports for all typings modules
  linter/
    index.ts           # lintFiles() entry point
    rules/index.ts     # 5 lint rules
  cache/
    index.ts           # FileCache with SHA-256, external modification detection
  watcher/
    index.ts           # Watcher class using chokidar, auto-converts with lint+cache
  cli/
    index.ts           # Commander CLI: convert, convert-gd, lint, watch, generate-typings, set-latest, generate-class-typings
  types/
    gd-helpers.d.ts    # gd namespace type defs (original, copied to typings/)

tests/
  fixtures/ts-to-gd/   # 16 paired .ts/.gd fixture files (TS->GD)
  fixtures/gd-to-ts/   # 12 paired .gd/.ts fixture files (GD->TS)
  converter/
    ts-to-gd.test.ts   # Fixture-based test runner (16 dynamic tests)
    gd-to-ts.test.ts   # Fixture-based test runner (12 dynamic tests)
  typings/
    godot-registry.test.ts    # Registry unit tests + real Godot docs parsing + version detection
    gd-to-ts-registry.test.ts # Integration: GD->TS converter with registry for inherited members
  sourcemap/
    ts-to-gd-sourcemap.test.ts  # Source map verification (9 tests with concrete line:column checks)
```

## CLI Commands (binary: `ts2gd`)

- `ts2gd convert <files...>` — Convert TS to GD (`-o`, `--source-map`, `--root-dir`, `--tsconfig`)
- `ts2gd convert-gd <files...>` — Convert GD to TS (`-o`, `--registry`)
- `ts2gd lint <files...>` — Lint TS files (`--root-dir`, `--tsconfig`)
- `ts2gd watch` — Watch and auto-convert (`--root-dir`, `--output-dir`, `--source-map`, `--tsconfig`, `--class-typings`)
- `ts2gd generate-typings` — Generate versioned typings from Godot docs (`--docs-dir`, `--typings-dir`, `--patch-dir`, `--version`, `--set-latest`)
- `ts2gd set-latest <version>` — Set "latest" typings from existing version folder (`--typings-dir`)
- `ts2gd generate-class-typings <files...>` — Generate global class .d.ts (`-o`, `--root-dir`, `--tsconfig`)

### Typings usage by consumer projects
Consumer projects add to their `tsconfig.json`:
```json
{ "compilerOptions": { "types": ["typescript-to-gdscript/typings"] } }
```
This loads `typings/index.d.ts` which references `gd-helpers.d.ts` + `latest/godot.d.ts`.

## Implementation Status

- [x] Project setup (package.json, tsconfig, vitest)
- [x] GDScript parser (tree-sitter wrapper)
- [x] TS-to-GD converter with 16 fixture tests passing
  - Classes, extends/class_name, properties (static, decorators), constructor->_init
  - Methods, signals (gd.signal), enums (gd.enum)
  - Control flow (if/elif/else, for-of->for-in, while, switch->match)
  - Expressions (this->self, ===->==, &&->and, ||->or, !->not)
  - StringName/NodePath, gd.as, gd.math.*, lambdas with types
  - Comments (// -> #, /** */ -> ##), await stripping, new->.new()
- [x] Source maps for TS-to-GD (GDScriptEmitter tracks line/col, 9 tests with concrete position checks)
- [x] GDScript AST types generated from tree-sitter node-types.json (85 typed interfaces with field overloads)
- [x] GD-to-TS converter with typed AST and 12 fixture tests:
  - Classes, extends, class_name, constructor_definition → constructor
  - Variables (typed, inferred `:=`, static), const → static property
  - Functions with params (typed, default, typed_default), return types
  - Signals with typed params → `gd.signal<[...]>()`
  - Enums (named → `gd.enum()`, anonymous → constants)
  - Annotations (@export → @gd.export, @onready → @gd.onready, etc.)
  - Control flow: if/elif/else, for_statement, while_statement, match → switch
  - Expressions: call, attribute, binary/unary operators, assignment, augmented assignment
  - Special: `self` → `this`, `$Path` → `this.getNode("Path")`, `&"..."` → `StringName()`, `^"..."` → `NodePath()`
  - `as` operator → `gd.as()`, `is` → `instanceof`, `and/or/not/==/!=` → `&&/||/!/===/!==`
  - Lambda, await, conditional expression, array, dictionary, subscript, parenthesized
  - Local scope tracking: function params and local vars shadow class members for `this.` resolution
  - `async` auto-detected from `await` usage in function body
  - Inner class definitions: `class Foo extends Bar:` → `Foo = class extends Bar { ... }`
  - GodotClassRegistry integration: inherited members from Godot classes resolved for `this.` prefix
  - Registry always required: precise member checking via GodotClassRegistry (resolved: CLI flag → tstogd.json → bundled latest)
- [x] Typings generation (classes, scenes, godot-docs with .patch system)
- [x] Godot class registry (916 classes from XML docs, inheritance chain resolution, global functions)
  - Git submodule: `vendor/godot` (official godot repo, shallow clone)
  - `GodotClassRegistry` class with `getAllMembers()`, `isGlobal()`, `getInheritanceChain()`
  - Integrated into GD-to-TS converter for inherited member resolution (`this.` prefix)
  - GDScript-specific builtins (range, len, load, preload, assert, etc.) added alongside @GlobalScope
  - Generates `godot.d.ts` (25K lines) + `godot-class-registry.json` (916 classes, 130 global functions)
  - Versioned typings: `typings/<version>/` folders, with `latest/` copy
  - Auto-detects Godot version from `vendor/godot/version.py`
  - `set-latest` CLI command to switch active version
  - Consumer tsconfig: `"types": ["typescript-to-gdscript/typings"]`
- [x] Linting (5 rules: single-class, no-undefined, no-const-let, no-top-level, no-unsupported)
- [x] Watch mode + CLI + Cache
- [ ] ESLint plugin
- [ ] Source map integration with linter (map Godot LSP errors back to TS via source maps)

## Features Specification

### Versions
Minimal officially supported godot version is 4.6. Minimal TS version is 5.9.

### TS-GD Converter

Main purpose to convert typescript to gdscript, but also can convert gdscript to typescript.

#### Transform Rules

- Should use AST for typescript, with information about types (from TS program);
- Should use AST for gdscript, with TS typings
  - For example it could be https://github.com/PrestonKnopp/tree-sitter-gdscript with tree-sitter extension to generate TS typings for gdscript AST;
- Good to have dual map for typescript AST to gdscript AST transformations (with context awareness), but not all transformation should be dual
- Should create and format result code in gdscript
  - For example can be used https://github.com/GDQuest/GDScript-formatter, or use it to rewrite with typescript to add source maps support
- Should create source maps from original typescript code to result (formatted) gdscript code
  - It used for linting from godot LSP and show errors in typescript file in IDE (this feature described below)
- Should have cache: map with original typescript file path and file hash and result gdscript file path and hash
  - For fast check, is file should be converted or not
  - For ts -> gd transformation, converter should warn about gdscript files which hash is differs from cache hash for this file, and DO NOT REWRITE IT
    - If there is no has, converter should warn about gdscript files that are not the same after transformation, and have a flag to rewrite them, or ask user to rewrite
- gd -> ts transformation for main files (not in addons) usually used only once, at start using this converter
- gd -> ts transformation for addons used every time addon updates
  - should have cache for addon files to not do it every time

#### Unsupported and converted GD features
For most of unsupported GD features, in typescript should be used global `gd` namespace, which contains helper to further transformation. There of course should be global d.ts for it.

IMPORTANT FOR CLAUDE: ask me if you find some other cases with transformation problems

##### TS file structure
All files in gdscript are files, so there should be only one class in typescript file, with only allowed import for types or type declarations / exports. All other named classes should be available globally, like in gdscript - which should be generated in one `d.ts` file (but not for anonymous classes). All other content should be inside this class.

##### TS types after transformation
After transformation, only primitive (available in gdscript) types and classes types are saved in code (without generics for classes). There should be special global helper type like `type TSOnly<T> = T`, which contents removes from transformation. If type is union or intersection, or another unsupported by gdscript - it should be removed.

##### `int` and `float` types
`int` and `float` are just global type aliases for ts `number` type. On transformation, pure `number` type should be converted to gdscript `float` type, but statements with `int` and `float` converts to same as it is write.

##### TS `undefined`
`undefined` type and value are restricted. Everywhere should be used `null`, and `undefined` type should be `never`, and fail transformation

##### Enums
There are enums in typescript, but they are not fully compatible with gdscript enums, also they can't be defined inside classes. So for enums should be helper like `gd.enums`. Example in ts class - `NAMED = gd.enum('THING_1', 'THING_2', ['THING_3', -1])` is same as `enum Named {THING_1, THING_2, ANOTHER_THING = -1}`. For anonymous enums there will be no equivalent in ts, but from gdscript to ts it will be converts as constants, eg `enum {UNIT_NEUTRAL, UNIT_ENEMY, UNIT_ALLY}` in gdscript should be `UNIT_NEUTRAL = 0; UNIT_ENEMY = 1; UNIT_ALLY = 2` after transforming to typescript.

##### Math operations override
There should be helpers for operations like `Vector2(1, 1) + Vector2(1, 1)`. `gd.math.add()`, `gd.math.div()`, `gd.math.mul()`, `gd.math.sub()` should be used for that. For example `gd.math.add(Vector2(1, 1), Vector2(1, 2), Vector2(2, 3))`. Use them from type information only when necessary.

##### Signals
Signals another helper, like `gd.signal<[...]>()`. Also, there should be type `Signal<[...]>` with generic args for type safety ofcourse.

##### Gdscript `as`
Since there is exists `as` in typescript, it has another behavior, and for gdscript `as` should be used `gd.as(Value, Type)` helper. For example `gd.as(my_sprite_2d, Node2D)` return type `typeof my_sprite_2d extends typeof Node2D ? typeof Node2D : (typeof Node2D) | null`.

##### Gdscript `_init()` method
TS `constructor()` used for gdscript `_init()` and vice versa.

##### Gdscript dicts `{}`
In typescript, default object (`{}`) should have type like gdscript `Dictionary` type, but all other classes (`RefCounted` and so on) should extend another object type, which like gdscript `Object` type - itself it should have `null` prototype in types.

##### TS const and let
`const` and `let` in typescript are restricted. Everywhere should be used `var`.

##### Array
Array type in typescript should be same as gdscript array, but with generic types.

##### Gdscript StringName, NodePath
Global function helpers should be used for this, like `&"..."` in gd -> `StringName('...')` in ts, `^"..."` in gd -> `NodePath('...')` in ts.

##### GD @export, @export_category, @export_global_file, @onload, @icon, etc
Typescript decorators used for this, but from global `gd` helper - like `@gd.export`.
Implementation note: `export` is reserved in TS, so decorators are defined in `gd.decorators` sub-namespace (e.g. `gd.decorators.export_`). The transformer maps `@gd.export` directly.

##### GD self and method / function calls
This is tricky, because in gdscript call function and class method is not the same. Also, in gdscript self method do not require `self.` prefix.
For transformations from typescript, just convert all `this.` to `self.` (even for self method calls), and by typescript types (from program) check if it method call - then transform to simple call (eg `self.method(arg1, arg2)`), or for function call transform to call (eg `method.call(arg1, arg2)`).
For transformation from gdscript - get information about all fields from current class and all extended classes - then, if field in this list, use `this.` prefix (eg `this.someSignal`, `this.someMethod()`), otherwise use field as is (eg `someSignal`, `someMethod()`). Also check if variable is not in current context - use as is for this case.

##### GD comments
For gd `#` use simple `//` comment, for gd `##` use `/** */` comment, and vice versa.

##### `async` keyword
GDScript has no `async` keyword. The `async` modifier is stripped during TS->GD transformation. GDScript coroutines use `await` without `async`.

### TS typings generation from classes
This generation should be worked with watch mode, also with once transformation.

#### TS classes
All root named classes in TS should be added to global declaration file, to be able global classes usage.

#### GD node paths
Check godot files for scripts, and create global declaration merge, to add typings for classes `getNode("...")` function for autocomplete. There is are ready made example in `https://github.com/johnfn/ts2gd`, with this functionality.

### TS typings from godot docs
There are should be script to generate typings from godot docs. It first generates typings as is (there is are ready made example for generation in `https://github.com/johnfn/ts2gd`). And then applies to them `.patch` files to add more granular manual typings, such as generics.
There also should be global d.ts file this some hardcoded global types, like `int` or `float` aliases (see above). It changes manually.

### Linting TS files
Linting script works both from CLI and with watch mode. It should:

- lint for transformation errors (eg unsupported feature, bad file structure, etc)
- lint for gdscript errors, using godot LSP and sourcemaps from compilation.

Also there should be eslint plugin, which do same lint and return results to eslint.

#### Current lint rules
1. **singleClassRule** — Only one class per file allowed
2. **noUndefinedRule** — `undefined` restricted, use `null`
3. **noConstLetRule** — `const`/`let` restricted, use `var`
4. **noTopLevelStatementsRule** — No top-level statements outside classes
5. **noUnsupportedFeaturesRule** — Spread, yield, for...in not supported

### Watch mode
As presented above, it uses from CLI, and watch for TS files for transformation, also for godot scenes to check scripts usage for getNode types generation.

### Tests
There should be tests for transformations - some for ts -> gd, and some for gd -> ts, to cover all possible cases and errors. Also test for correct source maps. Also for correct linting.

#### TS-to-GD test fixtures (16 paired .ts/.gd files in tests/fixtures/ts-to-gd/)
annotations, arrays-dicts, await-coroutines, classes, comments, constructor, control-flow, enums, functions, lambda, operators, signals, static-members, strings, type-casting, variables

#### GD-to-TS test fixtures (12 paired .gd/.ts files in tests/fixtures/gd-to-ts/)
annotations, comments, constructor, control-flow, enums, expressions, functions, lambda, operators, self, signals, variables

#### Godot registry tests (tests/typings/)
- `godot-registry.test.ts` — XML parsing, registry generation, GodotClassRegistry class, real Godot docs (916 classes)
- `gd-to-ts-registry.test.ts` — Integration: GD->TS with registry for inherited member resolution

#### Known transform edge cases resolved
- Numeric literals: use `getText()` to preserve `100.0` (TS parser `node.text` strips trailing `.0`)
- String literals: use `getText()` to preserve escape sequences
- `self.method()` call vs `self.callback` reference: only strip `self.` when it's a method call expression, not property access used as argument
- `@gd.export` decorator: `export` is TS reserved word, handled via `gd.decorators.export_` in types
- GD-to-TS `self.prop = param` double-this: attribute handler detects `self` at chain start, uses raw identifier for remaining parts; local scope (params + local vars) shadows class members to prevent `this.param`
- GD-to-TS `_init` → `constructor`: tree-sitter parses `_init` as `constructor_definition` node type (separate from `function_definition`)
- GD-to-TS inner `class` → `Name = class extends ... { ... }`: tree-sitter uses `class_body` node type but field name is `body`; members get extra 2-space indent
- GD-to-TS `self.` resolution: registry always required, only known class members (own + inherited from Godot classes) get `this.` prefix; user-defined parent classes not in registry won't resolve inherited members
- `tstogd.json` config: consumer project config file for registry resolution (godotVersion, registryPath, rootDir, outputDir, etc.)
- GD-to-TS multi-line lambda body: `emitLambda()` returns header only, `emitLambdaBody()` emits indented body separately

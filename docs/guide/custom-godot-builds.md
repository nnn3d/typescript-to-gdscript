# Custom Godot builds

typescript-to-gdscript ships typings for one stock Godot version. If your engine is different, such as another release, a fork, or a build with your own C++ modules, generate typings from your Godot's class docs so TypeScript knows exactly the classes and methods your build has.

## Do you need this?

The bundled version is in the `version` field at the top of `node_modules/typescript-to-gdscript/typings/godot-class-registry.json`. If it matches your Godot and you use no custom modules, you don't need anything on this page.

The usual sign that you do: TypeScript says a class or method doesn't exist, but your Godot has it, or the other way round.

## 1. Generate the typings

You need your Godot's source tree, the one you build the engine from. Generate the typings into a folder of your project, outside `node_modules` so they survive a reinstall:

```bash
npx tstogd generate-gdscript-global-typings \
  --output-dir _godot-typings \
  --godot-source /path/to/your-godot
```

`--godot-source` reads the whole class reference, the same way Godot's own documentation build does: the core classes, every module under `modules/` (your custom modules included), and the platform classes. The result in `_godot-typings/` is a complete typings folder that replaces the bundled one.

A module you build from outside the source tree (with SCons `custom_modules=`) isn't found there. Add its docs with `--docs-dir /path/to/module/doc_classes`, and put `--docs-dir` last on the command line, because it takes every value after it.

## 2. Point `tsconfig.json` at them

In `include`, replace the bundled typings entry with your folder:

```json
{
  "include": ["_godot-typings", "src/**/*.ts", "src/_typings/**/*.d.ts"]
}
```

## 3. Point `tstogd.json` at them

Set `godotTypingsDir` to the same folder:

```json
{
  "tsDir": "src",
  "gdDir": "scripts",
  "typingsDir": "src/_typings",
  "godotTypingsDir": "_godot-typings"
}
```

Run step 1 again whenever you rebuild Godot with new or changed classes. Commit `_godot-typings/`, so your team and CI work against the same engine.

## Fixing individual signatures

The class docs don't always say what TypeScript needs. Some methods always return a concrete type but are documented with a base class, and some never return `null`. The package fixes these with a set of overrides, and you can add your own with `--override-dir`:

```bash
npx tstogd generate-gdscript-global-typings \
  --output-dir _godot-typings \
  --override-dir my-overrides \
  --godot-source /path/to/your-godot
```

An override directory holds `.d.ts` files that redeclare members of a class. A member you list replaces the generated one, and a member the class doesn't have yet is added:

```ts nocheck
// my-overrides/resource.d.ts
declare class Resource {
  duplicate(deep?: boolean): this;
}
```

It can also hold a `non-nullable.json` that lists methods which never return `null`, so their return type is `T` instead of `T | null`:

```json
{
  "MyCustomSingleton": ["get_instance"]
}
```

> **Note:** Overriding a class the bundled set already covers, such as `Node`, replaces the bundled overrides for that class; [Custom override files](../reference/typings.md#custom-override-files) explains how to keep them.

## Migrating with custom classes

The [GDScript migration](./migrating-from-gdscript.md) uses the bundled class list to understand your scripts. If they use classes from your build, pass the registry you generated:

```bash
npx tstogd initial-convert-gd-to-ts --registry _godot-typings/godot-class-registry.json
```

## Details

The [typings reference](../reference/typings.md#tstogd-generate-gdscript-global-typings) lists every flag, and [Custom override files](../reference/typings.md#custom-override-files) covers the override format in full.

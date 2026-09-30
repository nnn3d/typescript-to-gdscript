# Shared packages

A shared package lets several Godot projects reuse the same scripts, scenes and resources through npm. The package is a tstogd project that is built once and published with its generated Godot files. Projects that install it use those files as they are, without converting anything.

## Make a package

Set `lib: true` in the package's `tstogd.json`:

```json
{
  "lib": true,
  "tsDir": "src",
  "gdDir": "dist/godot"
}
```

Build it with `tstogd convert`, as any project. With `lib: true`, imports inside the package become relative `preload()` paths, so the package works wherever a project places it:

```ts nocheck
// src/inventory.ts
import { _Slot } from './slot';
```

```gdscript
const _Slot = preload("./slot.gd")
```

Publish the whole package: the TypeScript source, `tstogd.json`, the generated `.gd` files, the scenes and resources, and the UID files Godot creates when it scans the package. Keep the UID files the same between releases, or resource references in projects that use the package break after an update.

If your package uses other shared packages, list them in its `package.json` `dependencies`. tstogd links each of them separately; it never bundles one package into another.

## Use a package

Install it like any npm package:

```bash
npm install @acme/inventory
```

`tstogd convert` and `tstogd watch` look through your dependencies, and link each one whose `tstogd.json` has `lib: true` into `tstogd_modules/<package-name>`. Godot scans the whole linked package, so its `class_name` classes, scenes and resources are available the same way your own are.

Add `tstogd_modules/` to your `.gitignore`. tstogd recreates the links on every run.

In TypeScript, import the package's classes from its source inside `tstogd_modules`, with a path relative to your file:

```ts nocheck
// src/shop.ts
import { Inventory } from '../tstogd_modules/@acme/inventory/src/inventory';
import { _Slot } from '../tstogd_modules/@acme/inventory/src/slot';

export class Shop extends Node {
  inventory: Inventory = new Inventory();
  featured: _Slot = new _Slot();
}
```

```gdscript
class_name Shop
extends Node

const _Slot = preload("res://tstogd_modules/@acme/inventory/dist/godot/slot.gd")

var inventory: Inventory = Inventory.new()
var featured: _Slot = _Slot.new()
```

`Inventory` has a `class_name`, so Godot knows it everywhere and no `preload()` is needed. `_Slot` has none, so it is preloaded from where the package is linked.

> **Note:** An import straight from the package name, such as `'@acme/inventory/src/inventory'`, isn't found with the `tsconfig.json` that `tstogd init` writes, because its module resolution doesn't look into `node_modules`. Go through `tstogd_modules` as above.

## Folders and custom names

`externalPackages` in `tstogd.json` adds a package that isn't an npm dependency, such as a folder next to your project, or links a package under a different name:

```json
{
  "externalPackages": [
    { "from": "../shared-gameplay", "to": "gameplay" },
    { "from": "@acme/inventory", "to": "inventory-v2" }
  ]
}
```

`from` is a package name or a path relative to your project. `to` is the folder name under `tstogd_modules`; without it, the package name is used. Each folder needs a `tstogd.json` with `lib: true`.

A built package reaches its own shared dependencies through fixed `res://tstogd_modules/<package-name>/...` paths, so don't rename a package with `to` when another package imports it.

## Details

[Shared packages in the configuration reference](../reference/configuration.md#shared-packages) covers the remaining rules for package layout and linking.

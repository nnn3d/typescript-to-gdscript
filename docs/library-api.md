# Library API

Import from `typescript-to-gdscript` when another TypeScript tool needs to
convert scripts without invoking the CLI.

## `convertRuntimeModules`

`convertRuntimeModules()` accepts the project's entry files, recursively
follows value imports using one TypeScript program, and returns each converted
module with its absolute GDScript destination. It performs no filesystem
writes: the caller decides when to persist the results.

```ts
import { convertRuntimeModules } from 'typescript-to-gdscript';

const modules = convertRuntimeModules({
  entryFiles: ['test.ts'],
  rootDir: 'src',
  tsDir: 'src',
  gdDir: 'addons/my_mod',
  projectRoot: '/path/to/godot-project',
  tsConfigPath: 'tsconfig.json',
});

for (const module of modules)
  writeFileSync(module.outputPath, module.result.code);
```

Entry files use the normal `tsDir` → `gdDir` mirror. Runtime sources resolved
from external TypeScript packages receive paths under
`<projectRoot>/.tstogd_modules/<package>/<version>/`, so their emitted
`res://` preloads are valid in Godot. Type-only imports do not enter the result.

Pass an existing `ts.Program` through `program` to reuse the caller's type
checker; otherwise tstogd creates one from `entryFiles` and `tsConfigPath`.

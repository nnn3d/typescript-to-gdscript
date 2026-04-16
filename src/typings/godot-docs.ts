import {
  writeFileSync,
  readFileSync,
  existsSync,
  mkdirSync,
  rmSync,
} from 'fs';
import { join } from 'path';
import {
  parseAllClassXmls,
  parseClassXml,
  generateRegistryData,
  GodotClassRegistry,
  type GodotClassXml,
} from './godot-registry.ts';
import {
  godotTypeToTs,
  setKnownClasses,
  setValueTypes,
  setNonNullableMembers,
  setVariantParamConverts,
  getValueTypes,
  deriveValueTypes,
  deriveVariantParamConverts,
  loadNonNullableOverrides,
  sanitizeClassName,
  INTERFACE_CLASSES,
  CLASS_NAME_CONFLICTS,
} from './type-mapping.ts';
import {
  generateClassDeclaration,
  generateValueTypeDeclaration,
  generateInterfaceDeclaration,
  generateConstructorInterface,
} from './class-generator.ts';
import {
  SKIP_CLASSES,
  generateGlobalScopeDeclaration,
  generateGDScriptDeclaration,
  generateNumberOperatorOverloads,
  computeDictOnlyOverrides,
  collectAllDictMembers,
} from './global-generator.ts';
import {
  loadOverrides,
  loadGlobalOverrides,
  applyOverride,
  applyGlobalOverrides,
} from './override-system.ts';

// ─── Re-exports (public API) ─────────────────────────────────────

export { godotTypeToTs } from './type-mapping.ts';

// ─── Types ───────────────────────────────────────────────────────

export interface GodotDocsTypingsOptions {
  /** Path to Godot docs XML class reference directory */
  classDocsDir: string;
  /** Output directory for generated .d.ts files */
  outputDir: string;
  /** Override directories (.d.ts files + non-nullable.json) in priority order — later dirs override earlier. */
  overrideDirs?: string[];
  /** Also generate the class registry JSON at this path */
  registryOutputPath?: string;
  /** Godot version label */
  version?: string;
}

// ─── Main entry point ────────────────────────────────────────────

/**
 * Generates TypeScript typings from Godot XML class documentation.
 * Also generates the class registry JSON if registryOutputPath is specified.
 * Returns the GodotClassRegistry if generated.
 */
export function generateGodotDocsTypings(
  options: GodotDocsTypingsOptions,
): GodotClassRegistry | null {
  const classes = parseAllClassXmls(options.classDocsDir);

  // Load @GDScript.xml from modules/gdscript/doc_classes/ (sibling to doc/classes/)
  let gdscriptCls: GodotClassXml | null = null;
  const gdscriptXmlPath = join(
    options.classDocsDir,
    '../../modules/gdscript/doc_classes/@GDScript.xml',
  );
  if (existsSync(gdscriptXmlPath)) {
    const xmlContent = readFileSync(gdscriptXmlPath, 'utf-8');
    gdscriptCls = parseClassXml(xmlContent);
  }

  // Populate known class names for type resolution
  setKnownClasses(new Set([...classes.keys()].filter((n) => !n.startsWith('@'))));

  // Derive value types (classes with copy constructor) — used for nullable detection
  // and for routing classes to generateValueTypeDeclaration vs generateClassDeclaration.
  setValueTypes(deriveValueTypes(classes));

  // Derive variant param conversion map for widening method parameter types
  setVariantParamConverts(deriveVariantParamConverts(classes));

  // Load override .d.ts files (merged across all override dirs)
  const overrideDirs = options.overrideDirs ?? [];
  const overrides = loadOverrides(overrideDirs);
  const globalOverrides = loadGlobalOverrides(overrideDirs);

  // Load non-nullable member overrides from JSON (merged across all override dirs)
  setNonNullableMembers(loadNonNullableOverrides(overrideDirs));

  // Report unmatched overrides (class name not found in Godot docs)
  // Special overrides that don't map to a Godot class directly
  const SPECIAL_OVERRIDES = new Set(['CallableFunction']);
  for (const overrideName of overrides.keys()) {
    if (SPECIAL_OVERRIDES.has(overrideName)) continue;
    // Map interface names back to GD class names for validation
    var found = false;
    for (const [gdName, tsName] of INTERFACE_CLASSES) {
      if (tsName === overrideName) {
        found = true;
        break;
      }
    }
    if (!found) {
      const sanitizedName =
        [...CLASS_NAME_CONFLICTS.entries()].find(
          ([_, v]) => v === overrideName,
        )?.[0] ?? overrideName;
      found = classes.has(sanitizedName) || classes.has(overrideName);
    }
    if (!found) {
      console.warn(
        `Warning: override for "${overrideName}" does not match any Godot class`,
      );
    }
  }

  // Compute Dictionary-only member names that no Object subclass defines.
  const dictOnlyOverrides = computeDictOnlyOverrides(classes);

  // Collect all Dictionary members for value type anti-dict overrides
  const allDictMembers = collectAllDictMembers(classes);

  // Prepare classes/ subdirectory — clean and recreate
  const classesDir = join(options.outputDir, 'classes');
  if (existsSync(classesDir)) {
    rmSync(classesDir, { recursive: true, force: true });
  }
  mkdirSync(classesDir, { recursive: true });

  const header =
    '// AUTO-GENERATED from Godot class documentation.\n// Manual overrides applied from src/typings/overrides/*.d.ts\n';

  // Track generated files for the index
  const generatedFiles: string[] = [];

  // Build set of singleton class names (from @GlobalScope properties)
  const globalScope = classes.get('@GlobalScope');
  const singletonClassNames = new Set<string>(
    globalScope?.properties.map((p) => p.type) ?? [],
  );

  // Find singletons that are extended by other classes —
  // these need `declare var` with `new()` instead of `declare const`
  const extendedSingletons = new Set<string>();
  for (const [, cls] of classes) {
    if (cls.inherits && singletonClassNames.has(cls.inherits)) {
      extendedSingletons.add(cls.inherits);
    }
  }

  const valueTypes = getValueTypes();

  // Sort class names for deterministic output
  const sortedNames = [...classes.keys()].sort();

  for (const name of sortedNames) {
    const cls = classes.get(name)!;
    if (name === '@GlobalScope') {
      let globalsContent = generateGlobalScopeDeclaration(cls);
      // Append @GDScript built-in constants, functions, and annotation decorators
      if (gdscriptCls) {
        globalsContent += generateGDScriptDeclaration(gdscriptCls);
      }
      globalsContent = applyGlobalOverrides(globalsContent, globalOverrides);
      const content = header + '\n' + globalsContent + '\n';
      const fileName = '_globals.d.ts';
      writeFileSync(join(classesDir, fileName), content);
      generatedFiles.push(fileName);
      continue;
    }

    // Skip other @-prefixed special docs
    if (name.startsWith('@')) continue;

    // Skip primitive types handled by gd-helpers.d.ts or TS builtins
    if (SKIP_CLASSES.has(name)) continue;

    // StringName has identical API to String — emit as a type alias
    if (name === 'StringName') {
      const content = header + '\ntype StringName = String;\n';
      const fileName = 'StringName.d.ts';
      writeFileSync(join(classesDir, fileName), content);
      generatedFiles.push(fileName);
      continue;
    }

    // Some GD classes are emitted as TS interfaces (replacing built-in types)
    const interfaceName = INTERFACE_CLASSES.get(name);
    if (interfaceName) {
      const fileLines: string[] = [];

      var declaration = generateInterfaceDeclaration(cls, interfaceName);

      // Apply overrides if available (by TS interface name)
      const override = overrides.get(interfaceName);
      if (override) {
        declaration = applyOverride(declaration, override);
      }

      fileLines.push(declaration);
      fileLines.push('');

      // Emit renamed alias so existing references still work
      const renamedName = CLASS_NAME_CONFLICTS.get(name);
      if (renamedName) {
        fileLines.push(
          `type ${renamedName} = ${interfaceName};`,
        );
      }
      // Dictionary → Object interface + Dictionary<K,V> from override + constructor
      if (name === 'Dictionary') {
        const dictOverride = overrides.get('Dictionary');
        if (dictOverride) {
          // Emit Dictionary<K,V> interface from the override file
          const dictHeader = dictOverride.header ?? 'interface Dictionary<K = unknown, V = unknown> extends Object';
          fileLines.push(`${dictHeader} {`);
          for (const [, text] of dictOverride.members) {
            fileLines.push(text);
          }
          for (const extra of dictOverride.extras) {
            fileLines.push(extra);
          }
          fileLines.push('}');
        } else {
          fileLines.push(`type Dictionary = Object;`);
        }
        fileLines.push(generateConstructorInterface(cls, 'Dictionary', 'Dictionary'));
        fileLines.push('declare var Object: typeof GodotObject;');
      }
      // Callable → Function, keep Callable alias + constructor + CallableFunction/NewableFunction
      if (name === 'Callable') {
        fileLines.push(`type Callable = Function;`);
        fileLines.push(generateConstructorInterface(cls, 'Callable', 'Callable'));
        const cfOverride = overrides.get('CallableFunction');
        if (cfOverride) {
          const cfHeader = cfOverride.header!.replace(
            /^(interface|class)\s/m,
            'declare $1 ',
          );
          const cfLines = [cfHeader + ' {'];
          for (const [, text] of cfOverride.members) {
            cfLines.push(text);
          }
          for (const extra of cfOverride.extras) {
            cfLines.push(extra);
          }
          cfLines.push('}');
          fileLines.push(cfLines.join('\n'));
        } else {
          fileLines.push(
            'declare interface CallableFunction extends Function {}',
          );
        }
        fileLines.push('declare interface NewableFunction extends Function {}');
      }
      // Array → ArrayConstructor with call signatures only (GDScript arrays can't use `new`)
      if (name === 'Array') {
        const hasGenerics = override?.header?.includes('<') ?? false;
        const typeParam = hasGenerics ? '<T>' : '';
        fileLines.push('declare interface ArrayConstructor {');
        fileLines.push(`  ${typeParam}(): Array${typeParam};`);
        fileLines.push(`  ${typeParam}(...items: ${hasGenerics ? 'T' : 'unknown'}[]): Array${typeParam};`);
        // "from" constructors from Godot XML (PackedByteArray → Array<int>, etc.)
        for (const ctor of cls.constructors) {
          if (ctor.parameters.length !== 1) continue;
          const param = ctor.parameters[0]!;
          if (param.name !== 'from' && !param.name.startsWith('from')) continue;
          const paramType = godotTypeToTs(param.type);
          // Skip the `from: Array` variant (redundant with `(): Array`)
          if (paramType.startsWith('Array')) continue;
          fileLines.push(`  ${typeParam}(from_: ${paramType}): Array${typeParam};`);
        }
        fileLines.push('}');
        fileLines.push('declare var Array: ArrayConstructor;');
      }

      const fileName = `${name}.d.ts`;
      writeFileSync(
        join(classesDir, fileName),
        header + '\n' + fileLines.join('\n') + '\n',
      );
      generatedFiles.push(fileName);
      continue;
    }

    // Value types: emitted as interface + constructor function (no `new`)
    if (valueTypes.has(name)) {
      var valueDecl = generateValueTypeDeclaration(cls, allDictMembers);

      // Apply overrides if available
      const className = sanitizeClassName(name);
      const classOverride = overrides.get(className);
      if (classOverride) {
        valueDecl = applyOverride(valueDecl, classOverride);
      }

      const fileName = `${name}.d.ts`;
      writeFileSync(
        join(classesDir, fileName),
        header + '\n' + valueDecl + '\n',
      );
      generatedFiles.push(fileName);
      continue;
    }

    // Collect explicit method names and property names from ancestor classes.
    // Generated setter/getter methods must not clash with inherited explicit methods
    // (which may have different signatures) or inherited properties (TS can't have
    // a method override a property).
    const inheritedMemberNames = new Set<string>();
    let ancestor = cls.inherits;
    while (ancestor) {
      const ancestorCls = classes.get(ancestor);
      if (!ancestorCls) break;
      for (const m of ancestorCls.methods) inheritedMemberNames.add(m.name);
      for (const p of ancestorCls.properties) {
        inheritedMemberNames.add(p.name);
        if (p.setter) inheritedMemberNames.add(p.setter);
        if (p.getter) inheritedMemberNames.add(p.getter);
      }
      ancestor = ancestorCls.inherits;
    }
    // Dict-only overrides on Object add `name: never` properties — any descendant
    // must not generate a setter/getter method with the same name.
    if (name !== 'Object' && dictOnlyOverrides) {
      for (const n of dictOnlyOverrides) inheritedMemberNames.add(n);
    }

    var classDecl = generateClassDeclaration(
      cls,
      name === 'Object' ? dictOnlyOverrides : undefined,
      inheritedMemberNames,
    );

    // Apply overrides if available (by TS class name)
    const className = sanitizeClassName(name);
    const classOverride = overrides.get(className);
    if (classOverride) {
      classDecl = applyOverride(classDecl, classOverride);
    }

    // Singleton classes: convert to interface + global instance value.
    // Interfaces can't have `static` members, so strip the `static` keyword.
    if (singletonClassNames.has(name)) {
      // Replace `declare class` with `declare interface`
      classDecl = classDecl.replace(
        /^declare class /m,
        'declare interface ',
      );
      // Strip `static` keyword from members (interfaces don't support it;
      // all members become instance members accessible via the global const/var).
      classDecl = classDecl.replace(/^(\s+)static readonly /gm, '$1readonly ');
      classDecl = classDecl.replace(/^(\s+)static /gm, '$1');

      if (extendedSingletons.has(name)) {
        // Singletons extended by other classes: use `declare var` with `new()`
        // so TS treats the name as a constructor type for `extends` clauses.
        classDecl += `\ndeclare var ${className}: ${className} & {\n  new(): ${className};\n  readonly prototype: ${className};\n};\n`;
      } else {
        // Singletons NOT extended: use `declare const` (can't construct).
        classDecl += `\ndeclare const ${className}: ${className};\n`;
      }
    }

    const fileName = `${name}.d.ts`;
    writeFileSync(join(classesDir, fileName), header + '\n' + classDecl + '\n');
    generatedFiles.push(fileName);
  }

  // Generate Number interface extension with int/float operator overloads
  const numberOps = generateNumberOperatorOverloads(classes);
  if (numberOps) {
    const fileName = '_number-ops.d.ts';
    writeFileSync(join(classesDir, fileName), header + '\n' + numberOps + '\n');
    generatedFiles.push(fileName);
  }

  // Generate classes/index.d.ts that references all class files
  const indexLines = generatedFiles
    .sort()
    .map((f) => `/// <reference path="${f}" />`);
  writeFileSync(join(classesDir, 'index.d.ts'), indexLines.join('\n') + '\n');

  // Generate registry JSON if requested
  let registry: GodotClassRegistry | null = null;
  if (options.registryOutputPath) {
    const data = generateRegistryData(classes, gdscriptCls);
    data.version = options.version ?? '';
    writeFileSync(options.registryOutputPath, JSON.stringify(data, null, 2));
    registry = new GodotClassRegistry(data);
  }

  return registry;
}

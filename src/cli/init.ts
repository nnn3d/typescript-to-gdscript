/**
 * `ts2gd init` — Interactive project initialization.
 * Walks through config creation, tsconfig, eslint, npm install, and .gdignore setup.
 */

import type { Command } from 'commander';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';

// ─── Embedded Templates ──────────────────────────────────────

const TSCONFIG_TEMPLATE = `{
  "compilerOptions": {
    "target": "esnext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "noLib": true,
    "strict": true,
    "noEmit": true,
    "types": []
  },
  "include": ["typescript-to-gdscript/typings", "{{tsDir}}/**/*.ts", "{{typingsDir}}/**/*.d.ts"]
}
`;

const ESLINT_CONFIG_TEMPLATE = `import tsParser from '@typescript-eslint/parser';
import ts2gd from 'typescript-to-gdscript/eslint';

export default [
  {
    files: ['{{tsDir}}/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      ts2gd: ts2gd,
    },
    rules: {
      'ts2gd/convert': 'error',
    },
  },
];
`;

// ─── ESLint Config Detection ─────────────────────────────────

const ESLINT_CONFIG_FILES = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.ts',
  'eslint.config.mts',
  'eslint.config.cts',
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintrc.yml',
];

// ─── Prompt Helpers ──────────────────────────────────────────

async function ask(
  rl: readline.Interface,
  question: string,
  defaultValue?: string,
): Promise<string> {
  const suffix = defaultValue !== undefined ? ` (${defaultValue})` : '';
  const answer = await rl.question(`  ${question}${suffix}: `);
  return answer.trim() || defaultValue || '';
}

async function askYesNo(
  rl: readline.Interface,
  question: string,
  defaultYes = true,
): Promise<boolean> {
  const hint = defaultYes ? '[Y/n]' : '[y/N]';
  const answer = await rl.question(`  ${question} ${hint}: `);
  const normalized = answer.trim().toLowerCase();
  if (normalized === '') return defaultYes;
  return normalized === 'y' || normalized === 'yes';
}

// ─── Step: tstogd.json ───────────────────────────────────────

interface InitConfig {
  tsDir: string;
  gdDir: string;
  typingsDir: string;
  sourceMap: boolean;
  godotVersion: string;
}

async function stepTstogdJson(
  rl: readline.Interface,
  cwd: string,
): Promise<InitConfig> {
  const configPath = join(cwd, 'tstogd.json');
  const defaults: InitConfig = {
    tsDir: 'ts',
    gdDir: '.',
    typingsDir: 'ts/_typings',
    sourceMap: false,
    godotVersion: 'latest',
  };

  if (existsSync(configPath)) {
    console.log('\n✓ tstogd.json already exists.');
    console.log('  See README.md for available configuration options.\n');
    // Parse existing config to use in later steps
    try {
      const existing = JSON.parse(readFileSync(configPath, 'utf-8'));
      return {
        tsDir: existing.tsDir ?? defaults.tsDir,
        gdDir: existing.gdDir ?? defaults.gdDir,
        typingsDir: existing.typingsDir ?? defaults.typingsDir,
        sourceMap: existing.sourceMap ?? defaults.sourceMap,
        godotVersion: existing.godotVersion ?? defaults.godotVersion,
      };
    } catch {
      return defaults;
    }
  }

  console.log('\n📝 Creating tstogd.json...\n');

  const tsDir = await ask(rl, 'TypeScript source directory', defaults.tsDir);
  const gdDir = await ask(rl, 'GDScript output directory', defaults.gdDir);
  const typingsDir = await ask(rl, 'Typings output directory', defaults.typingsDir);
  const sourceMap = await askYesNo(rl, 'Generate source maps?', false);
  const godotVersion = await ask(rl, 'Godot version', defaults.godotVersion);

  const config: Record<string, unknown> = {};
  config.tsDir = tsDir;
  if (gdDir !== tsDir) config.gdDir = gdDir;
  config.typingsDir = typingsDir;
  if (sourceMap) config.sourceMap = true;
  if (godotVersion !== 'latest') config.godotVersion = godotVersion;

  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log('\n  ✓ Created tstogd.json');

  return { tsDir, gdDir, typingsDir, sourceMap, godotVersion };
}

// ─── Step: tsconfig.json ─────────────────────────────────────

async function stepTsconfig(
  rl: readline.Interface,
  cwd: string,
  config: InitConfig,
  packagesToInstall: string[],
): Promise<void> {
  const tsconfigPath = join(cwd, 'tsconfig.json');

  if (existsSync(tsconfigPath)) {
    console.log('\n✓ tsconfig.json already exists.');
    console.log('  See README.md for recommended TypeScript settings.\n');
    return;
  }

  console.log('');
  const create = await askYesNo(rl, 'Create tsconfig.json from template?');
  if (!create) return;

  const content = TSCONFIG_TEMPLATE
    .replace('{{tsDir}}', config.tsDir)
    .replace('{{typingsDir}}', config.typingsDir);

  writeFileSync(tsconfigPath, content);
  console.log('  ✓ Created tsconfig.json');

  // Ask to install TypeScript
  const installTs = await askYesNo(rl, 'Install TypeScript?');
  if (installTs) {
    packagesToInstall.push('typescript');
  }
}

// ─── Step: ESLint Config ─────────────────────────────────────

async function stepEslint(
  rl: readline.Interface,
  cwd: string,
  config: InitConfig,
  packagesToInstall: string[],
): Promise<void> {
  const hasConfig = ESLINT_CONFIG_FILES.some(f => existsSync(join(cwd, f)));

  if (hasConfig) {
    console.log('\n✓ ESLint config already exists.');
    console.log('  See README.md for ts2gd ESLint plugin setup.\n');
    return;
  }

  console.log('');
  const create = await askYesNo(rl, 'Create eslint.config.js from template?');
  if (!create) return;

  const content = ESLINT_CONFIG_TEMPLATE.replace('{{tsDir}}', config.tsDir);
  writeFileSync(join(cwd, 'eslint.config.js'), content);
  console.log('  ✓ Created eslint.config.js');

  const installEslint = await askYesNo(rl, 'Install ESLint and @typescript-eslint/parser?');
  if (installEslint) {
    packagesToInstall.push('eslint', '@typescript-eslint/parser');
  }
}

// ─── Step: Install Packages ──────────────────────────────────

async function stepInstallPackages(
  rl: readline.Interface,
  cwd: string,
  packagesToInstall: string[],
): Promise<void> {
  if (packagesToInstall.length === 0) return;

  console.log(`\n📦 Packages to install: ${packagesToInstall.join(', ')}`);

  // Ensure package.json exists
  const pkgPath = join(cwd, 'package.json');
  if (!existsSync(pkgPath)) {
    const create = await askYesNo(rl, 'No package.json found. Create one?');
    if (!create) {
      console.log('  ⚠ Skipping package installation (no package.json).');
      return;
    }
    const name = basename(cwd).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    writeFileSync(pkgPath, JSON.stringify({ name, private: true, type: 'module' }, null, 2) + '\n');
    console.log('  ✓ Created package.json');
  }

  console.log(`  Installing ${packagesToInstall.join(', ')}...`);
  try {
    execSync(`npm install --save-dev ${packagesToInstall.join(' ')}`, {
      cwd,
      stdio: 'inherit',
    });
    console.log('  ✓ Packages installed');
  } catch {
    console.error('  ⚠ npm install failed. Please install packages manually:');
    console.error(`    npm install --save-dev ${packagesToInstall.join(' ')}`);
  }
}

// ─── Step: .gdignore ─────────────────────────────────────────

async function stepGdignore(
  rl: readline.Interface,
  cwd: string,
): Promise<void> {
  const nodeModulesPath = join(cwd, 'node_modules');
  const gdignorePath = join(nodeModulesPath, '.gdignore');

  if (!existsSync(nodeModulesPath)) return;

  if (existsSync(gdignorePath)) {
    console.log('\n✓ node_modules/.gdignore already exists.');
    return;
  }

  console.log('');
  const create = await askYesNo(rl, 'Create .gdignore in node_modules to exclude from Godot?');
  if (!create) return;

  writeFileSync(gdignorePath, '');
  console.log('  ✓ Created node_modules/.gdignore');
}

// ─── Step: .gitignore ────────────────────────────────────────

async function stepGitignore(
  rl: readline.Interface,
  cwd: string,
): Promise<void> {
  const gitignorePath = join(cwd, '.gitignore');
  const hasGitignore = existsSync(gitignorePath);
  const content = hasGitignore ? readFileSync(gitignorePath, 'utf-8') : '';

  // Check if node_modules is already ignored
  const lines = content.split('\n').map(l => l.trim());
  const hasNodeModulesIgnore = lines.some(l =>
    l === 'node_modules' || l === 'node_modules/' || l === '/node_modules' || l === '/node_modules/',
  );

  if (hasNodeModulesIgnore) return;

  console.log('');
  const add = await askYesNo(rl, 'Add node_modules to .gitignore?');
  if (!add) return;

  const newContent = hasGitignore
    ? content.trimEnd() + '\nnode_modules/\n'
    : 'node_modules/\n';

  writeFileSync(gitignorePath, newContent);
  console.log(hasGitignore
    ? '  ✓ Added node_modules/ to .gitignore'
    : '  ✓ Created .gitignore with node_modules/',
  );
}

// ─── Main ────────────────────────────────────────────────────

export async function runInit(): Promise<void> {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const cwd = process.cwd();

  try {
    console.log('');
    console.log('🎮 typescript-to-gdscript — Project Initialization');
    console.log('═══════════════════════════════════════════════════');

    const packagesToInstall: string[] = [];

    // Step 1: tstogd.json
    const config = await stepTstogdJson(rl, cwd);

    // Step 2: tsconfig.json
    await stepTsconfig(rl, cwd, config, packagesToInstall);

    // Step 3: ESLint config
    await stepEslint(rl, cwd, config, packagesToInstall);

    // Step 4: Install packages
    await stepInstallPackages(rl, cwd, packagesToInstall);

    // Step 5: .gdignore in node_modules
    await stepGdignore(rl, cwd);

    // Step 6: .gitignore
    await stepGitignore(rl, cwd);

    // Done
    console.log('\n✅ Initialization complete!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Create TypeScript files in your source directory');
    console.log('  2. Run `ts2gd convert` to convert TS → GDScript');
    console.log('  3. Run `ts2gd watch` for auto-conversion on save');
    console.log('  4. See README.md for full documentation');
    console.log('');
  } finally {
    rl.close();
  }
}

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a Godot project for typescript-to-gdscript')
    .action(async () => {
      await runInit();
    });
}

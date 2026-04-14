/**
 * CLI command: open-editor
 *
 * Maps a GDScript file to its TypeScript source and opens it in an external editor.
 * Designed to be used as Godot's external text editor command.
 *
 * Godot Editor Settings → Text Editor → External:
 *   Exec Path:  tstogd (or npx tstogd, or full path)
 *   Exec Flags: open-editor -f {file} -p {project} -e "code --goto {tsFile}:{line}:{col}"
 *
 * Godot replaces {file}, {line}, {col}, {project} before calling the script.
 * The script only replaces {tsFile} with the mapped TypeScript file path.
 *
 * Examples:
 *   VS Code:   -e "code --goto {tsFile}:{line}:{col}"
 *   WebStorm:  -e "webstorm --line {line} --column {col} {tsFile}"
 *   Vim:       -e "vim +{line} {tsFile}"
 */

import type { Command } from 'commander';
import { resolve, relative } from 'path';
import { existsSync } from 'fs';
import { spawn } from 'child_process';
import { resolveConfig } from '../config/index.ts';

export function registerOpenEditorCommand(program: Command): void {
  program
    .command('open-editor')
    .description(
      'Open a GDScript file in an external editor as the corresponding TypeScript file. ' +
        'Use as Godot\'s external text editor command.',
    )
    .requiredOption('-f, --file <path>', 'GDScript file path (absolute or res://)')
    .requiredOption(
      '-e, --editor-cmd <cmd>',
      'Editor command template. Use {tsFile} as placeholder for the mapped .ts path.',
    )
    .option(
      '-p, --project <dir>',
      'Godot project directory (where tstogd.json is)',
    )
    .action((opts) => {
      const projectDir = opts.project
        ? resolve(opts.project)
        : process.cwd();

      // 1. Load config from project dir
      let cfg;
      try {
        cfg = resolveConfig({ configDir: projectDir });
      } catch {
        console.error(
          `Could not load tstogd.json from ${projectDir}. ` +
            'Use --project / -p to specify the Godot project directory.',
        );
        process.exit(1);
      }

      // 2. Map .gd → .ts
      let gdPath = opts.file as string;
      if (gdPath.startsWith('res://')) {
        gdPath = resolve(cfg.rootDir, gdPath.slice(6));
      }
      if (!gdPath.startsWith('/') && !gdPath.match(/^[A-Za-z]:\\/)) {
        gdPath = resolve(projectDir, gdPath);
      }

      const relPath = relative(cfg.gdDir, gdPath);
      const tsPath = resolve(cfg.tsDir, relPath.replace(/\.gd$/, '.ts'));

      if (!existsSync(tsPath)) {
        console.error(
          `TypeScript file not found: ${tsPath}\n` +
            `  (mapped from: ${gdPath})`,
        );
        process.exit(1);
      }

      // 3. Substitute {tsFile} in editor command (quoted for paths with spaces)
      const quotedTsPath = tsPath.includes(' ') ? `"${tsPath}"` : tsPath;
      const editorCmd = (opts.editorCmd as string)
        .replace(/\{tsFile\}/g, quotedTsPath);

      // 4. Split command string and spawn editor
      const parts = parseCommandString(editorCmd);
      if (parts.length === 0) {
        console.error('Empty editor command after substitution.');
        process.exit(1);
      }

      const [exe, ...args] = parts;

      try {
        const child = spawn(exe!, args, {
          detached: true,
          stdio: 'ignore',
          windowsHide: true,
        });
        child.unref();
      } catch (err) {
        console.error(`Failed to launch editor: ${exe}`, err);
        process.exit(1);
      }
    });
}

/**
 * Parse a command string into parts, respecting quoted strings.
 * "code --goto file.ts:1:1" → ["code", "--goto", "file.ts:1:1"]
 * 'vim "+set nu" file.ts' → ["vim", "+set nu", "file.ts"]
 */
function parseCommandString(cmd: string): string[] {
  const parts: string[] = [];
  let current = '';
  let inQuote: string | null = null;

  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i]!;
    if (inQuote) {
      if (ch === inQuote) {
        inQuote = null;
      } else {
        current += ch;
      }
    } else if (ch === '"' || ch === "'") {
      inQuote = ch;
    } else if (ch === ' ' || ch === '\t') {
      if (current) {
        parts.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }
  if (current) parts.push(current);

  return parts;
}

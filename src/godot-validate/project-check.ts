import { execFile } from 'child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

/**
 * Loads every script listed in the file named after `--`, one `res://` path
 * per line, then quits. Loading a script parses and compiles it without
 * instantiating it, so nothing of the game runs, and Godot prints each error
 * as it does for `--check-only --script`.
 */
const CHECKER = `extends SceneTree

func _init():
	var list := FileAccess.open(OS.get_cmdline_user_args()[0], FileAccess.READ)
	while not list.eof_reached():
		var path := list.get_line().strip_edges()
		if path != "":
			load(path)
	quit()
`;

/**
 * Compile `resPaths` in one Godot run and return what Godot printed. The
 * project itself is never started: `--check-only` only applies with
 * `--script`, so a bare `--path` run plays the main scene (its code runs,
 * scripts it doesn't load go unchecked), and without a main scene Godot
 * aborts with a modal dialog, which Windows shows even in `--headless` mode.
 * The checker and the list live in a temp folder, outside the project.
 */
export async function compileGdScripts(
  godotPath: string,
  projectRoot: string,
  resPaths: string[],
  signal?: AbortSignal,
): Promise<string> {
  const dir = mkdtempSync(join(tmpdir(), 'tstogd-check-'));
  try {
    const checker = join(dir, 'check.gd');
    const list = join(dir, 'scripts.txt');
    writeFileSync(checker, CHECKER);
    writeFileSync(list, resPaths.join('\n'));
    try {
      const result = await execFileAsync(
        godotPath,
        ['--headless', '--path', projectRoot, '--script', checker, '--', list],
        {
          timeout: 60000,
          cwd: projectRoot,
          signal,
          windowsHide: true,
          maxBuffer: 50 * 1024 * 1024,
        },
      );
      return (result.stderr ?? '') + '\n' + (result.stdout ?? '');
    } catch (err: any) {
      if (signal?.aborted) throw err;
      return (err.stderr ?? '') + '\n' + (err.stdout ?? '');
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

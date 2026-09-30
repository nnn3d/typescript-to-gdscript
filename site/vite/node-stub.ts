/**
 * Stand-in for `fs`, `os` and `url` in the browser build. The playground
 * never touches the disk; if a converter code path starts to, it fails
 * here with a clear message instead of misbehaving.
 */
function unavailable(name: string): never {
  throw new Error(`${name} is not available in the browser`);
}

export const existsSync = () => unavailable('fs.existsSync');
export const lstatSync = () => unavailable('fs.lstatSync');
export const mkdirSync = () => unavailable('fs.mkdirSync');
export const readFileSync = () => unavailable('fs.readFileSync');
export const readlinkSync = () => unavailable('fs.readlinkSync');
export const readdirSync = () => unavailable('fs.readdirSync');
export const realpathSync = () => unavailable('fs.realpathSync');
export const symlinkSync = () => unavailable('fs.symlinkSync');
export const unlinkSync = () => unavailable('fs.unlinkSync');
export const writeFileSync = () => unavailable('fs.writeFileSync');
export const tmpdir = () => unavailable('os.tmpdir');
export const fileURLToPath = () => unavailable('url.fileURLToPath');

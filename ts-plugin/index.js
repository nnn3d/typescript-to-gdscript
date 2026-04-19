// CJS shim — `ts-plugin/package.json` sets `"type": "commonjs"` here so
// this file is parsed as CJS even though the parent package is ESM.
// `require()` of the ESM build works on Node 22+ (no top-level await in
// the plugin). tsserver's plugin loader is CJS-oriented, so this wrapper
// is the least-friction bridge to the real compiled plugin.

const plugin = require('../dist/ts-plugin/index.js');
// Compiled ESM default exports land on `.default` when CJS-imported.
module.exports = plugin && plugin.default ? plugin.default : plugin;

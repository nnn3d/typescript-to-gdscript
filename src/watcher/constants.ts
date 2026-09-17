/** File extensions that trigger typings regeneration. */
export const RESOURCE_EXTENSIONS = new Set([
  '.tscn',
  '.tres',
  '.res',
  '.png',
  '.jpg',
  '.ogg',
  '.wav',
  '.mp3',
  '.gdshader',
  '.theme',
]);

export const WATCHED_EXTENSIONS = new Set(['.ts', ...RESOURCE_EXTENSIONS]);

export const DEBOUNCE_MS = 50;
export const CHECK_DEBOUNCE_MS = 1000;

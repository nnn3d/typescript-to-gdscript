// site/constants.ts
export const SITE_ORIGIN = 'https://nnn3d.github.io';
/** Site base path, no trailing slash. */
export const BASE = '/typescript-to-gdscript';
export const REPO_URL = 'https://github.com/nnn3d/typescript-to-gdscript';
export const REPO_BLOB_URL = `${REPO_URL}/blob/master`;
export const REPO_EDIT_URL = `${REPO_URL}/edit/master`;
export const REPO_RAW_URL = `${REPO_URL}/raw/master`;
/** Hidden from the sidebar only: `assets/` holds images, not pages, but is still synced. */
export const SIDEBAR_HIDDEN_DIRS = new Set(['assets', 'superpowers']);
/** Never copied to the site: local planning docs, not published content. */
export const UNSYNCED_DOC_DIRS = new Set(['superpowers']);

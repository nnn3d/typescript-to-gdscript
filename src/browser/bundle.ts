/** Virtual folder the Godot typings are mounted at. */
export const TYPINGS_ROOT = '/typings';

/** The bundled typings: `/typings/...` path → `.d.ts` text, plus the class registry. */
export interface TypingsBundle {
  typings: Record<string, string>;
  registryJson: string;
}

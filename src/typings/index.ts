export { generateClassTypings, type ClassTypingsOptions } from './classes.ts';
export { generateSceneTypings, type SceneTypingsOptions } from './scenes.ts';
export { generateGodotDocsTypings, type GodotDocsTypingsOptions } from './godot-docs.ts';
export {
  GodotClassRegistry,
  generateGodotRegistry,
  parseAllClassXmls,
  generateRegistryData,
  type GodotRegistryData,
  type GodotClassInfo,
  type GodotEnumInfo,
  type GenerateRegistryOptions,
  parseGodotVersion,
  type GodotVersion,
  type GodotClassXml,
  type GodotMethodXml,
  type GodotPropertyXml,
  type GodotSignalXml,
  type GodotParamXml,
} from './godot-registry.ts';

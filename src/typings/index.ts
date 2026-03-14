export { generateClassTypings, type ClassTypingsOptions } from './classes.js';
export { generateSceneTypings, type SceneTypingsOptions } from './scenes.js';
export { generateGodotDocsTypings, type GodotDocsTypingsOptions } from './godot-docs.js';
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
} from './godot-registry.js';

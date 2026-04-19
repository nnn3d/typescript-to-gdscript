export {
  generateTypings,
  parseAutoloads,
  resolveSignalHandlers,
  collectAllSignalHandlers,
  type GenerateTypingsOptions,
  type SignalHandlerInfo,
  type ScriptClassInfo,
  type AutoloadEntry,
} from './scenes.ts';
export {
  generateGodotDocsTypings,
  type GodotDocsTypingsOptions,
} from './godot-docs.ts';
export {
  GodotClassRegistry,
  generateGodotRegistry,
  parseAllClassXmls,
  generateRegistryData,
  type GodotRegistryData,
  type GodotClassInfo,
  type GodotEnumInfo,
  type GodotSignalInfo,
  type GodotSignalParamInfo,
  type GenerateRegistryOptions,
  parseGodotVersion,
  type GodotVersion,
  type GodotClassXml,
  type GodotMethodXml,
  type GodotPropertyXml,
  type GodotSignalXml,
  type GodotParamXml,
} from './godot-registry.ts';

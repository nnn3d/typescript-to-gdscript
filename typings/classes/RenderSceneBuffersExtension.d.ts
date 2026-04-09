// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** This class allows for a RenderSceneBuffer implementation to be made in GDExtension. */
declare class RenderSceneBuffersExtension extends RenderSceneBuffers {
  /** Implement this in GDExtension to handle the (re)sizing of a viewport. */
  _configure(config: RenderSceneBuffersConfiguration): void;
  /** Implement this in GDExtension to change the anisotropic filtering level. */
  _set_anisotropic_filtering_level(anisotropic_filtering_level: int): void;
  /** Implement this in GDExtension to record a new FSR sharpness value. */
  _set_fsr_sharpness(fsr_sharpness: float): void;
  /** Implement this in GDExtension to change the texture mipmap bias. */
  _set_texture_mipmap_bias(texture_mipmap_bias: float): void;
  /** Implement this in GDExtension to react to the debanding flag changing. */
  _set_use_debanding(use_debanding: boolean): void;
}

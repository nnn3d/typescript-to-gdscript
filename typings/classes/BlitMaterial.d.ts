// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A material that processes blit calls to a DrawableTexture. */
declare class BlitMaterial extends Material {
  /** The manner in which the newly blitted texture is blended with the original DrawableTexture. */
  blend_mode: int;
  set_blend_mode(value: int): void;
  get_blend_mode(): int;

  // enum BlendMode
  /** Mix blending mode. Colors are assumed to be independent of the alpha (opacity) value. */
  static readonly BLEND_MODE_MIX: int;
  /** Additive blending mode. */
  static readonly BLEND_MODE_ADD: int;
  /** Subtractive blending mode. */
  static readonly BLEND_MODE_SUB: int;
  /** Multiplicative blending mode. */
  static readonly BLEND_MODE_MUL: int;
  /** No blending mode, direct color copy. */
  static readonly BLEND_MODE_DISABLED: int;
}

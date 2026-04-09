// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D texture that supports drawing to itself via Blit calls. */
declare class DrawableTexture2D extends Texture2D {
  resource_local_to_scene: boolean;

  /**
   * Draws to given `rect` on this texture by copying from the given `source`. A `modulate` color can be passed in for the shader to use, but defaults to White. The `mipmap` value can specify a draw to a lower mipmap level. The `material` parameter can take a ShaderMaterial with a TextureBlit Shader for custom drawing behavior.
   */
  blit_rect(rect: Rect2i | Rect2, source: Texture2D, modulate?: Color, mipmap?: int, material?: Material): void;
  /**
   * Draws to the given `rect` on this texture, as well as on up to 3 DrawableTexture `extra_targets`. All `extra_targets` must be the same size and DrawableFormat as the original target, otherwise the Shader may fail. Expects up to 4 Texture `sources`, but will replace missing `sources` with default Black Textures.
   */
  blit_rect_multi(rect: Rect2i | Rect2, sources: Array<Texture2D>, extra_targets: Array<DrawableTexture2D>, modulate?: Color, mipmap?: int, material?: Material): void;
  /** Re-calculates the mipmaps for this texture on demand. */
  generate_mipmaps(): void;
  /** Returns `true` if mipmaps are set to be used on this DrawableTexture. */
  get_use_mipmaps(): boolean;
  /** Sets the format of this DrawableTexture. */
  set_format(format: int): void;
  /** Sets the height of this DrawableTexture. */
  set_height(height: int): void;
  /** Sets if mipmaps should be used on this DrawableTexture. */
  set_use_mipmaps(mipmaps: boolean): void;
  /** Sets the width of this DrawableTexture. */
  set_width(width: int): void;
  /** Initializes the DrawableTexture to a White texture of the given `width`, `height`, and `format`. */
  setup(width: int, height: int, format: int, color?: Color, use_mipmaps?: boolean): void;

  // enum DrawableFormat
  /** OpenGL texture format RGBA with four components, each with a bitdepth of 8. */
  static readonly DRAWABLE_FORMAT_RGBA8: int;
  /**
   * OpenGL texture format RGBA with four components, each with a bitdepth of 8.
   * When drawn to, an sRGB to linear color space conversion is performed.
   */
  static readonly DRAWABLE_FORMAT_RGBA8_SRGB: int;
  /**
   * OpenGL texture format GL_RGBA16F where there are four components, each a 16-bit "half-precision" floating-point value.
   */
  static readonly DRAWABLE_FORMAT_RGBAH: int;
  /**
   * OpenGL texture format GL_RGBA32F where there are four components, each a 32-bit floating-point value.
   */
  static readonly DRAWABLE_FORMAT_RGBAF: int;
}

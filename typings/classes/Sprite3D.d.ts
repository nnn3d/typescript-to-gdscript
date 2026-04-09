// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** 2D sprite node in a 3D world. */
declare class Sprite3D extends SpriteBase3D {
  /**
   * Current frame to display from sprite sheet. {@link hframes} or {@link vframes} must be greater than 1. This property is automatically adjusted when {@link hframes} or {@link vframes} are changed to keep pointing to the same visual frame (same column and row). If that's impossible, this value is reset to `0`.
   */
  frame: int;
  /**
   * Coordinates of the frame to display from sprite sheet. This is as an alias for the {@link frame} property. {@link hframes} or {@link vframes} must be greater than 1.
   */
  frame_coords: Vector2i;
  /**
   * The number of columns in the sprite sheet. When this property is changed, {@link frame} is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, {@link frame} is reset to `0`.
   */
  hframes: int;
  /**
   * If `true`, the sprite will use {@link region_rect} and display only the specified part of its texture.
   */
  region_enabled: boolean;
  /** The region of the atlas texture to display. {@link region_enabled} must be `true`. */
  region_rect: Rect2;
  /**
   * {@link Texture2D} object to draw. If {@link GeometryInstance3D.material_override} is used, this will be overridden. The size information is still used.
   */
  texture: Texture2D | null;
  /**
   * The number of rows in the sprite sheet. When this property is changed, {@link frame} is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, {@link frame} is reset to `0`.
   */
  vframes: int;
  set_frame(value: int): void;
  get_frame(): int;
  set_frame_coords(value: Vector2i): void;
  get_frame_coords(): Vector2i;
  set_hframes(value: int): void;
  get_hframes(): int;
  set_region_enabled(value: boolean): void;
  is_region_enabled(): boolean;
  set_region_rect(value: Rect2): void;
  get_region_rect(): Rect2;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;
  set_vframes(value: int): void;
  get_vframes(): int;

  /** Emitted when the {@link frame} changes. */
  frame_changed: Signal<[]>;
  /** Emitted when the {@link texture} changes. */
  texture_changed: Signal<[]>;
}

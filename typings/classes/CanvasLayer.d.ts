// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node used for independent rendering of objects within a 2D scene. */
declare class CanvasLayer extends Node {
  /**
   * The custom {@link Viewport} node assigned to the {@link CanvasLayer}. If `null`, uses the default viewport instead.
   */
  custom_viewport: Node | null;
  /**
   * If enabled, the {@link CanvasLayer} maintains its position in world space. If disabled, the {@link CanvasLayer} stays in a fixed position on the screen.
   * Together with {@link follow_viewport_scale}, this can be used for a pseudo-3D effect.
   */
  follow_viewport_enabled: boolean;
  /**
   * Scales the layer when using {@link follow_viewport_enabled}. Layers moving into the foreground should have increasing scales, while layers moving into the background should have decreasing scales.
   */
  follow_viewport_scale: float;
  /**
   * Layer index for draw order. Lower values are drawn behind higher values.
   * **Note:** If multiple CanvasLayers have the same layer index, {@link CanvasItem} children of one CanvasLayer are drawn behind the {@link CanvasItem} children of the other CanvasLayer. Which CanvasLayer is drawn in front is non-deterministic.
   * **Note:** The layer index should be between {@link RenderingServer.CANVAS_LAYER_MIN} and {@link RenderingServer.CANVAS_LAYER_MAX} (inclusive). Any other value will wrap around.
   */
  layer: int;
  /** The layer's base offset. */
  offset: Vector2;
  /** The layer's rotation in radians. */
  rotation: float;
  /** The layer's scale. */
  scale: Vector2;
  /** The layer's transform. */
  transform: Transform2D;
  /**
   * If `false`, any {@link CanvasItem} under this {@link CanvasLayer} will be hidden.
   * Unlike {@link CanvasItem.visible}, visibility of a {@link CanvasLayer} isn't propagated to underlying layers.
   */
  visible: boolean;
  set_custom_viewport(value: Node | null): void;
  get_custom_viewport(): Node | null;
  set_follow_viewport(value: boolean): void;
  is_following_viewport(): boolean;
  set_follow_viewport_scale(value: float): void;
  get_follow_viewport_scale(): float;
  set_layer(value: int): void;
  get_layer(): int;
  set_offset(value: Vector2): void;
  get_offset(): Vector2;
  set_rotation(value: float): void;
  get_rotation(): float;
  set_scale(value: Vector2): void;
  get_scale(): Vector2;
  set_transform(value: Transform2D): void;
  get_transform(): Transform2D;
  set_visible(value: boolean): void;
  is_visible(): boolean;

  /** Returns the RID of the canvas used by this layer. */
  get_canvas(): RID;
  /**
   * Returns the transform from the {@link CanvasLayer}s coordinate system to the {@link Viewport}s coordinate system.
   */
  get_final_transform(): Transform2D;
  /**
   * Hides any {@link CanvasItem} under this {@link CanvasLayer}. This is equivalent to setting {@link visible} to `false`.
   */
  hide(): void;
  /**
   * Shows any {@link CanvasItem} under this {@link CanvasLayer}. This is equivalent to setting {@link visible} to `true`.
   */
  show(): void;

  /** Emitted when visibility of the layer is changed. See {@link visible}. */
  visibility_changed: Signal<[]>;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Directional 2D light from a distance. */
declare class DirectionalLight2D extends Light2D {
  /**
   * The height of the light. Used with 2D normal mapping. Ranges from 0 (parallel to the plane) to 1 (perpendicular to the plane).
   */
  height: float;
  /**
   * The maximum distance from the camera center objects can be before their shadows are culled (in pixels). Decreasing this value can prevent objects located outside the camera from casting shadows (while also improving performance). {@link Camera2D.zoom} is not taken into account by {@link max_distance}, which means that at higher zoom values, shadows will appear to fade out sooner when zooming onto a given point.
   */
  max_distance: float;
  set_max_distance(value: float): void;
  get_max_distance(): float;
}

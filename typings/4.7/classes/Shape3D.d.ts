// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for 3D shapes used for physics collision. */
declare class Shape3D extends Resource {
  /**
   * The shape's custom solver bias. Defines how much bodies react to enforce contact separation when this shape is involved.
   * When set to `0`, the default value from {@link ProjectSettings.physics/3d/solver/default_contact_bias} is used.
   * **Note:** {@link custom_solver_bias} is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  custom_solver_bias: float;
  /**
   * The collision margin for the shape. This is not used in Godot Physics.
   * Collision margins allow collision detection to be more efficient by adding an extra shell around shapes. Collision algorithms are more expensive when objects overlap by more than their margin, so a higher value for margins is better for performance, at the cost of accuracy around edges as it makes them less sharp.
   */
  margin: float;
  set_custom_solver_bias(value: float): void;
  get_custom_solver_bias(): float;
  set_margin(value: float): void;
  get_margin(): float;

  /** Returns the {@link ArrayMesh} used to draw the debug collision for this {@link Shape3D}. */
  get_debug_mesh(): ArrayMesh;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * 3D obstacle used to affect navigation mesh baking or constrain velocities of avoidance controlled agents.
 */
declare class NavigationObstacle3D extends Node3D {
  /**
   * If enabled and parsed in a navigation mesh baking process the obstacle will discard source geometry inside its {@link vertices} and {@link height} defined shape.
   */
  affect_navigation_mesh: boolean;
  /** If `true` the obstacle affects avoidance using agents. */
  avoidance_enabled: boolean;
  /**
   * A bitfield determining the avoidance layers for this obstacle. Agents with a matching bit on the their avoidance mask will avoid this obstacle.
   */
  avoidance_layers: int;
  /**
   * If enabled the obstacle vertices will carve into the baked navigation mesh with the shape unaffected by additional offsets (e.g. agent radius).
   * It will still be affected by further postprocessing of the baking process, like edge and polygon simplification.
   * Requires {@link affect_navigation_mesh} to be enabled.
   */
  carve_navigation_mesh: boolean;
  /**
   * Sets the obstacle height used in 2D avoidance. 2D avoidance using agent's ignore obstacles that are below or above them.
   */
  height: float;
  /** Sets the avoidance radius for the obstacle. */
  radius: float;
  /**
   * If `true` the obstacle affects 3D avoidance using agent's with obstacle {@link radius}.
   * If `false` the obstacle affects 2D avoidance using agent's with both obstacle {@link vertices} as well as obstacle {@link radius}.
   */
  use_3d_avoidance: boolean;
  /**
   * Sets the wanted velocity for the obstacle so other agent's can better predict the obstacle if it is moved with a velocity regularly (every frame) instead of warped to a new position. Does only affect avoidance for the obstacles {@link radius}. Does nothing for the obstacles static vertices.
   */
  velocity: Vector3;
  /**
   * The outline vertices of the obstacle. If the vertices are winded in clockwise order agents will be pushed in by the obstacle, else they will be pushed out. Outlines can not be crossed or overlap. Should the vertices using obstacle be warped to a new position agent's can not predict this movement and may get trapped inside the obstacle.
   */
  vertices: PackedVector3Array;
  set_affect_navigation_mesh(value: boolean): void;
  get_affect_navigation_mesh(): boolean;
  set_avoidance_enabled(value: boolean): void;
  get_avoidance_enabled(): boolean;
  set_avoidance_layers(value: int): void;
  get_avoidance_layers(): int;
  set_carve_navigation_mesh(value: boolean): void;
  get_carve_navigation_mesh(): boolean;
  set_height(value: float): void;
  get_height(): float;
  set_radius(value: float): void;
  get_radius(): float;
  set_use_3d_avoidance(value: boolean): void;
  get_use_3d_avoidance(): boolean;
  set_velocity(value: Vector3 | Vector3i): void;
  get_velocity(): Vector3;
  set_vertices(value: PackedVector3Array | Array<unknown>): void;
  get_vertices(): PackedVector3Array;

  /**
   * Returns whether or not the specified layer of the {@link avoidance_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_avoidance_layer_value(layer_number: int): boolean;
  /**
   * Returns the {@link RID} of the navigation map for this NavigationObstacle node. This function returns always the map set on the NavigationObstacle node and not the map of the abstract obstacle on the NavigationServer. If the obstacle map is changed directly with the NavigationServer API the NavigationObstacle node will not be aware of the map change. Use {@link set_navigation_map} to change the navigation map for the NavigationObstacle and also update the obstacle on the NavigationServer.
   */
  get_navigation_map(): RID;
  /** Returns the {@link RID} of this obstacle on the {@link NavigationServer3D}. */
  get_rid(): RID;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link avoidance_layers} bitmask, given a `layer_number` between 1 and 32.
   */
  set_avoidance_layer_value(layer_number: int, value: boolean): void;
  /**
   * Sets the {@link RID} of the navigation map this NavigationObstacle node should use and also updates the `obstacle` on the NavigationServer.
   */
  set_navigation_map(navigation_map: RID): void;
}

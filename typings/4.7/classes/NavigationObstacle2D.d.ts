// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * 2D obstacle used to affect navigation mesh baking or constrain velocities of avoidance controlled agents.
 */
declare class NavigationObstacle2D extends Node2D {
  /**
   * If enabled and parsed in a navigation mesh baking process the obstacle will discard source geometry inside its {@link vertices} defined shape.
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
  /** Sets the avoidance radius for the obstacle. */
  radius: float;
  /**
   * Sets the wanted velocity for the obstacle so other agent's can better predict the obstacle if it is moved with a velocity regularly (every frame) instead of warped to a new position. Does only affect avoidance for the obstacles {@link radius}. Does nothing for the obstacles static vertices.
   */
  velocity: Vector2;
  /**
   * The outline vertices of the obstacle. If the vertices are winded in clockwise order agents will be pushed in by the obstacle, else they will be pushed out. Outlines can not be crossed or overlap. Should the vertices using obstacle be warped to a new position agent's can not predict this movement and may get trapped inside the obstacle.
   */
  vertices: PackedVector2Array;

  /**
   * Returns whether or not the specified layer of the {@link avoidance_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_avoidance_layer_value(layer_number: int): boolean;
  /**
   * Returns the {@link RID} of the navigation map for this NavigationObstacle node. This function returns always the map set on the NavigationObstacle node and not the map of the abstract obstacle on the NavigationServer. If the obstacle map is changed directly with the NavigationServer API the NavigationObstacle node will not be aware of the map change. Use {@link set_navigation_map} to change the navigation map for the NavigationObstacle and also update the obstacle on the NavigationServer.
   */
  get_navigation_map(): RID;
  /** Returns the {@link RID} of this obstacle on the {@link NavigationServer2D}. */
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

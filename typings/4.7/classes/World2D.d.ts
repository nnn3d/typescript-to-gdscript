// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A resource that holds all components of a 2D world, such as a canvas and a physics space. */
declare class World2D extends Resource {
  /**
   * The {@link RID} of this world's canvas resource. Used by the {@link RenderingServer} for 2D drawing.
   */
  canvas: RID;
  /**
   * Direct access to the world's physics 2D space state. Used for querying current and potential collisions. When using multi-threaded physics, access is limited to {@link Node._physics_process} in the main thread.
   */
  direct_space_state: PhysicsDirectSpaceState2D | null;
  /** The {@link RID} of this world's navigation map. Used by the {@link NavigationServer2D}. */
  navigation_map: RID;
  /**
   * The {@link RID} of this world's physics space resource. Used by the {@link PhysicsServer2D} for 2D physics, treating it as both a space and an area.
   */
  space: RID;
  get_canvas(): RID;
  get_direct_space_state(): PhysicsDirectSpaceState2D | null;
  get_navigation_map(): RID;
  get_space(): RID;
}

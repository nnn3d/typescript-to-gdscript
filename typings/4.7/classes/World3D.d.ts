// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A resource that holds all components of a 3D world, such as a visual scenario and a physics space. */
declare class World3D extends Resource {
  /** The default {@link CameraAttributes} resource to use if none set on the {@link Camera3D}. */
  camera_attributes: CameraAttributes;
  /**
   * Direct access to the world's physics 3D space state. Used for querying current and potential collisions. When using multi-threaded physics, access is limited to {@link Node._physics_process} in the main thread.
   */
  direct_space_state: PhysicsDirectSpaceState3D;
  /** The World3D's {@link Environment}. */
  environment: Environment;
  /** The World3D's fallback environment will be used if {@link environment} fails or is missing. */
  fallback_environment: Environment;
  /** The {@link RID} of this world's navigation map. Used by the {@link NavigationServer3D}. */
  navigation_map: RID;
  /** The World3D's visual scenario. */
  scenario: RID;
  /** The World3D's physics space. */
  space: RID;
  set_camera_attributes(value: CameraAttributes): void;
  get_camera_attributes(): CameraAttributes;
  get_direct_space_state(): PhysicsDirectSpaceState3D;
  set_environment(value: Environment): void;
  get_environment(): Environment;
  set_fallback_environment(value: Environment): void;
  get_fallback_environment(): Environment;
  get_navigation_map(): RID;
  get_scenario(): RID;
  get_space(): RID;
}

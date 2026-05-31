// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Default environment properties for the entire scene (post-processing effects, lighting and background settings).
 */
declare class WorldEnvironment extends Node {
  /** The default {@link CameraAttributes} resource to use if none set on the {@link Camera3D}. */
  camera_attributes: CameraAttributes | null;
  /** The default {@link Compositor} resource to use if none set on the {@link Camera3D}. */
  compositor: Compositor | null;
  /**
   * The {@link Environment} resource used by this {@link WorldEnvironment}, defining the default properties.
   */
  environment: Environment | null;
  set_camera_attributes(value: CameraAttributes | null): void;
  get_camera_attributes(): CameraAttributes | null;
  set_compositor(value: Compositor | null): void;
  get_compositor(): Compositor | null;
  set_environment(value: Environment | null): void;
  get_environment(): Environment | null;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The origin point in AR/VR. */
declare class XROrigin3D extends Node3D {
  /**
   * If `true`, this origin node is currently being used by the {@link XRServer}. Only one origin point can be used at a time.
   */
  current: boolean;
  /**
   * The scale of the game world compared to the real world. This is the same as {@link XRServer.world_scale}. By default, most AR/VR platforms assume that 1 game unit corresponds to 1 real world meter.
   */
  world_scale: float;
  set_current(value: boolean): void;
  is_current(): boolean;
  set_world_scale(value: float): void;
  get_world_scale(): float;
}

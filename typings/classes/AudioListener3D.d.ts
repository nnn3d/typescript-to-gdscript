// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Overrides the location sounds are heard from. */
declare class AudioListener3D extends Node3D {
  /**
   * If not {@link DOPPLER_TRACKING_DISABLED}, this listener will simulate the Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) for objects changed in particular `_process` methods.
   * **Note:** The Doppler effect will only be heard on {@link AudioStreamPlayer3D}s if {@link AudioStreamPlayer3D.doppler_tracking} is not set to {@link AudioStreamPlayer3D.DOPPLER_TRACKING_DISABLED}.
   */
  doppler_tracking: int;
  set_doppler_tracking(value: int): void;
  get_doppler_tracking(): int;

  /** Disables the listener to use the current camera's listener instead. */
  clear_current(): void;
  /** Returns the listener's global orthonormalized {@link Transform3D}. */
  get_listener_transform(): Transform3D;
  /**
   * Returns `true` if the listener was made current using {@link make_current}, `false` otherwise.
   * **Note:** There may be more than one AudioListener3D marked as "current" in the scene tree, but only the one that was made current last will be used.
   */
  is_current(): boolean;
  /** Enables the listener. This will override the current camera's listener. */
  make_current(): void;

  // enum DopplerTracking
  /** Disables Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) simulation (default). */
  static readonly DOPPLER_TRACKING_DISABLED: int;
  /**
   * Simulate Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) by tracking positions of objects that are changed in `_process`. Changes in the relative velocity of this listener compared to those objects affect how audio is perceived (changing the audio's {@link AudioStreamPlayer3D.pitch_scale}).
   */
  static readonly DOPPLER_TRACKING_IDLE_STEP: int;
  /**
   * Simulate Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) by tracking positions of objects that are changed in `_physics_process`. Changes in the relative velocity of this listener compared to those objects affect how audio is perceived (changing the audio's {@link AudioStreamPlayer3D.pitch_scale}).
   */
  static readonly DOPPLER_TRACKING_PHYSICS_STEP: int;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Overrides the location sounds are heard from. */
declare class AudioListener2D<Tree extends object = any> extends Node2D<Tree> {
  /** Disables the {@link AudioListener2D}. If it's not set as current, this method will have no effect. */
  clear_current(): void;
  /** Returns `true` if this {@link AudioListener2D} is currently active. */
  is_current(): boolean;
  /**
   * Makes the {@link AudioListener2D} active, setting it as the hearing point for the sounds. If there is already another active {@link AudioListener2D}, it will be disabled.
   * This method will have no effect if the {@link AudioListener2D} is not added to {@link SceneTree}.
   */
  make_current(): void;
}

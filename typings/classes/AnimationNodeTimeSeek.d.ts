// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A time-seeking animation node used in {@link AnimationTree}. */
declare class AnimationNodeTimeSeek extends AnimationNode {
  /**
   * If `true`, some processes are executed to handle keys between seeks, such as calculating root motion and finding the nearest discrete key.
   */
  explicit_elapse: boolean;
  set_explicit_elapse(value: boolean): void;
  is_explicit_elapse(): boolean;
}

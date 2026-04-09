// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for {@link AnimationNode}s with multiple input ports that must be synchronized. */
declare class AnimationNodeSync extends AnimationNode {
  /**
   * If `false`, the blended animations' frame are stopped when the blend value is `0`.
   * If `true`, forcing the blended animations to advance frame.
   */
  sync: boolean;
  set_use_sync(value: boolean): void;
  is_using_sync(): boolean;
}

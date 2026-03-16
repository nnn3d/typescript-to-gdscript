// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for extending {@link AnimationRootNode}s from GDScript, C#, or C++. */
declare class AnimationNodeExtension extends AnimationNode {
  /**
   * A version of the {@link AnimationNode._process} method that is meant to be overridden by custom nodes. It returns a {@link PackedFloat32Array} with the processed animation data.
   * The {@link PackedFloat64Array} parameter contains the playback information, containing the following values encoded as floating point numbers (in order): playback time and delta, start and end times, whether a seek was requested (encoded as a float greater than `0`), whether the seek request was externally requested (encoded as a float greater than `0`), the current {@link Animation.LoopedFlag} (encoded as a float), and the current blend weight.
   * The function must return a {@link PackedFloat32Array} of the node's time info, containing the following values (in order): animation length, time position, delta, {@link Animation.LoopMode} (encoded as a float), whether the animation is about to end (encoded as a float greater than `0`) and whether the animation is infinite (encoded as a float greater than `0`). All values must be included in the returned array.
   */
  _process_animation_node(playback_info: PackedFloat64Array, test_only: boolean): PackedFloat32Array;
  /**
   * Returns the animation's remaining time for the given node info. For looping animations, it will only return the remaining time if `break_loop` is `true`, a large integer value will be returned otherwise.
   */
  static get_remaining_time(node_info: PackedFloat32Array, break_loop: boolean): float;
  /** Returns `true` if the animation for the given `node_info` is looping. */
  static is_looping(node_info: PackedFloat32Array): boolean;
}

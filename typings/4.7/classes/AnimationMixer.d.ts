// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base class for {@link AnimationPlayer} and {@link AnimationTree}. */
declare class AnimationMixer extends Node {
  /** If `true`, the {@link AnimationMixer} will be processing. */
  active: boolean;
  /**
   * The number of possible simultaneous sounds for each of the assigned AudioStreamPlayers.
   * For example, if this value is `32` and the animation has two audio tracks, the two {@link AudioStreamPlayer}s assigned can play simultaneously up to `32` voices each.
   */
  audio_max_polyphony: int;
  /**
   * Ordinarily, tracks can be set to {@link Animation.UPDATE_DISCRETE} to update infrequently, usually when using nearest interpolation.
   * However, when blending with {@link Animation.UPDATE_CONTINUOUS} several results are considered. The {@link callback_mode_discrete} specify it explicitly. See also {@link AnimationCallbackModeDiscrete}.
   * To make the blended results look good, it is recommended to set this to {@link ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS} to update every frame during blending. Other values exist for compatibility and they are fine if there is no blending, but not so, may produce artifacts.
   */
  callback_mode_discrete: int;
  /** The call mode used for "Call Method" tracks. */
  callback_mode_method: int;
  /** The process notification in which to update animations. */
  callback_mode_process: int;
  /**
   * If `true`, the blending uses the deterministic algorithm. The total weight is not normalized and the result is accumulated with an initial value (`0` or a `"RESET"` animation if present).
   * This means that if the total amount of blending is `0.0`, the result is equal to the `"RESET"` animation.
   * If the number of tracks between the blended animations is different, the animation with the missing track is treated as if it had the initial value.
   * If `false`, The blend does not use the deterministic algorithm. The total weight is normalized and always `1.0`. If the number of tracks between the blended animations is different, nothing is done about the animation that is missing a track.
   * **Note:** In {@link AnimationTree}, the blending with {@link AnimationNodeAdd2}, {@link AnimationNodeAdd3}, {@link AnimationNodeSub2} or the weight greater than `1.0` may produce unexpected results.
   * For example, if {@link AnimationNodeAdd2} blends two nodes with the amount `1.0`, then total weight is `2.0` but it will be normalized to make the total amount `1.0` and the result will be equal to {@link AnimationNodeBlend2} with the amount `0.5`.
   */
  deterministic: boolean;
  /**
   * This is used by the editor. If set to `true`, the scene will be saved with the effects of the reset animation (the animation with the key `"RESET"`) applied as if it had been seeked to time 0, with the editor keeping the values that the scene had before saving.
   * This makes it more convenient to preview and edit animations in the editor, as changes to the scene will not be saved as long as they are set in the reset animation.
   */
  reset_on_save: boolean;
  /**
   * If `true`, {@link get_root_motion_position} value is extracted as a local translation value before blending. In other words, it is treated like the translation is done after the rotation.
   */
  root_motion_local: boolean;
  /**
   * The path to the Animation track used for root motion. Paths must be valid scene-tree paths to a node, and must be specified starting from the parent node of the node that will reproduce the animation. The {@link root_motion_track} uses the same format as {@link Animation.track_set_path}, but note that a bone must be specified.
   * If the track has type {@link Animation.TYPE_POSITION_3D}, {@link Animation.TYPE_ROTATION_3D}, or {@link Animation.TYPE_SCALE_3D} the transformation will be canceled visually, and the animation will appear to stay in place. See also {@link get_root_motion_position}, {@link get_root_motion_rotation}, {@link get_root_motion_scale}, and {@link RootMotionView}.
   */
  root_motion_track: string;
  /** The node which node path references will travel from. */
  root_node: string;
  set_active(value: boolean): void;
  is_active(): boolean;
  set_audio_max_polyphony(value: int): void;
  get_audio_max_polyphony(): int;
  set_callback_mode_discrete(value: int): void;
  get_callback_mode_discrete(): int;
  set_callback_mode_method(value: int): void;
  get_callback_mode_method(): int;
  set_callback_mode_process(value: int): void;
  get_callback_mode_process(): int;
  set_deterministic(value: boolean): void;
  is_deterministic(): boolean;
  set_reset_on_save_enabled(value: boolean): void;
  is_reset_on_save_enabled(): boolean;
  set_root_motion_local(value: boolean): void;
  is_root_motion_local(): boolean;
  set_root_motion_track(value: string): void;
  get_root_motion_track(): string;
  set_root_node(value: string): void;
  get_root_node(): string;

  /** A virtual function for processing after getting a key during playback. */
  _post_process_key_value(animation: Animation, track: int, value: unknown, object_id: int, object_sub_idx: int): unknown;
  /**
   * Adds `library` to the animation player, under the key `name`.
   * AnimationMixer has a global library by default with an empty string as key. For adding an animation to the global library:
   */
  add_animation_library(name: string, library: AnimationLibrary): int;
  /** Manually advance the animations by the specified time (in seconds). */
  advance(delta: float): void;
  /**
   * If the animation track specified by `name` has an option {@link Animation.UPDATE_CAPTURE}, stores current values of the objects indicated by the track path as a cache. If there is already a captured cache, the old cache is discarded.
   * After this it will interpolate with current animation blending result during the playback process for the time specified by `duration`, working like a crossfade.
   * You can specify `trans_type` as the curve for the interpolation. For better results, it may be appropriate to specify {@link Tween.TRANS_LINEAR} for cases where the first key of the track begins with a non-zero value or where the key value does not change, and {@link Tween.TRANS_QUAD} for cases where the key value changes linearly.
   */
  capture(name: string, duration: float, trans_type: int, ease_type: int): void;
  /**
   * {@link AnimationMixer} caches animated nodes. It may not notice if a node disappears; {@link clear_caches} forces it to update the cache again.
   */
  clear_caches(): void;
  /** Returns the key of `animation` or an empty {@link StringName} if not found. */
  find_animation(animation: Animation): string;
  /**
   * Returns the key for the {@link AnimationLibrary} that contains `animation` or an empty {@link StringName} if not found.
   */
  find_animation_library(animation: Animation): string;
  /**
   * Returns the {@link Animation} with the key `name`. If the animation does not exist, `null` is returned and an error is logged.
   */
  get_animation(name: string): Animation;
  /**
   * Returns the first {@link AnimationLibrary} with key `name` or `null` if not found.
   * To get the {@link AnimationMixer}'s global animation library, use `get_animation_library("")`.
   */
  get_animation_library(name: string): AnimationLibrary;
  /** Returns the list of stored library keys. */
  get_animation_library_list(): unknown;
  /** Returns the list of stored animation keys. */
  get_animation_list(): PackedStringArray;
  /**
   * Retrieve the motion delta of position with the {@link root_motion_track} as a {@link Vector3} that can be used elsewhere.
   * If {@link root_motion_track} is not a path to a track of type {@link Animation.TYPE_POSITION_3D}, returns `Vector3(0, 0, 0)`.
   * See also {@link root_motion_track} and {@link RootMotionView}.
   * The most basic example is applying position to {@link CharacterBody3D}:
   * By using this in combination with {@link get_root_motion_rotation_accumulator}, you can apply the root motion position more correctly to account for the rotation of the node.
   * If {@link root_motion_local} is `true`, returns the pre-multiplied translation value with the inverted rotation.
   * In this case, the code can be written as follows:
   */
  get_root_motion_position(): Vector3;
  /**
   * Retrieve the blended value of the position tracks with the {@link root_motion_track} as a {@link Vector3} that can be used elsewhere.
   * This is useful in cases where you want to respect the initial key values of the animation.
   * For example, if an animation with only one key `Vector3(0, 0, 0)` is played in the previous frame and then an animation with only one key `Vector3(1, 0, 1)` is played in the next frame, the difference can be calculated as follows:
   * However, if the animation loops, an unintended discrete change may occur, so this is only useful for some simple use cases.
   */
  get_root_motion_position_accumulator(): Vector3;
  /**
   * Retrieve the motion delta of rotation with the {@link root_motion_track} as a {@link Quaternion} that can be used elsewhere.
   * If {@link root_motion_track} is not a path to a track of type {@link Animation.TYPE_ROTATION_3D}, returns `Quaternion(0, 0, 0, 1)`.
   * See also {@link root_motion_track} and {@link RootMotionView}.
   * The most basic example is applying rotation to {@link CharacterBody3D}:
   */
  get_root_motion_rotation(): Quaternion;
  /**
   * Retrieve the blended value of the rotation tracks with the {@link root_motion_track} as a {@link Quaternion} that can be used elsewhere.
   * This is necessary to apply the root motion position correctly, taking rotation into account. See also {@link get_root_motion_position}.
   * Also, this is useful in cases where you want to respect the initial key values of the animation.
   * For example, if an animation with only one key `Quaternion(0, 0, 0, 1)` is played in the previous frame and then an animation with only one key `Quaternion(0, 0.707, 0, 0.707)` is played in the next frame, the difference can be calculated as follows:
   * However, if the animation loops, an unintended discrete change may occur, so this is only useful for some simple use cases.
   */
  get_root_motion_rotation_accumulator(): Quaternion;
  /**
   * Retrieve the motion delta of scale with the {@link root_motion_track} as a {@link Vector3} that can be used elsewhere.
   * If {@link root_motion_track} is not a path to a track of type {@link Animation.TYPE_SCALE_3D}, returns `Vector3(0, 0, 0)`.
   * See also {@link root_motion_track} and {@link RootMotionView}.
   * The most basic example is applying scale to {@link CharacterBody3D}:
   */
  get_root_motion_scale(): Vector3;
  /**
   * Retrieve the blended value of the scale tracks with the {@link root_motion_track} as a {@link Vector3} that can be used elsewhere.
   * For example, if an animation with only one key `Vector3(1, 1, 1)` is played in the previous frame and then an animation with only one key `Vector3(2, 2, 2)` is played in the next frame, the difference can be calculated as follows:
   * However, if the animation loops, an unintended discrete change may occur, so this is only useful for some simple use cases.
   */
  get_root_motion_scale_accumulator(): Vector3;
  /** Returns `true` if the {@link AnimationMixer} stores an {@link Animation} with key `name`. */
  has_animation(name: string): boolean;
  /** Returns `true` if the {@link AnimationMixer} stores an {@link AnimationLibrary} with key `name`. */
  has_animation_library(name: string): boolean;
  /** Removes the {@link AnimationLibrary} associated with the key `name`. */
  remove_animation_library(name: string): void;
  /** Moves the {@link AnimationLibrary} associated with the key `name` to the key `newname`. */
  rename_animation_library(name: string, newname: string): void;

  /**
   * Notifies when an animation finished playing.
   * **Note:** This signal is not emitted if an animation is looping.
   */
  animation_finished: Signal<[string]>;
  /** Notifies when the animation libraries have changed. */
  animation_libraries_updated: Signal<[]>;
  /** Notifies when an animation list is changed. */
  animation_list_changed: Signal<[]>;
  /**
   * Notifies when an animation starts playing.
   * **Note:** This signal is not emitted if an animation is looping.
   */
  animation_started: Signal<[string]>;
  /**
   * Notifies when the caches have been cleared, either automatically, or manually via {@link clear_caches}.
   */
  caches_cleared: Signal<[]>;
  /** Notifies when the blending result related have been applied to the target objects. */
  mixer_applied: Signal<[]>;
  /** Notifies when the property related process have been updated. */
  mixer_updated: Signal<[]>;

  // enum AnimationCallbackModeProcess
  /**
   * Process animation during physics frames (see {@link Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS}). This is especially useful when animating physics bodies.
   */
  static readonly ANIMATION_CALLBACK_MODE_PROCESS_PHYSICS: int;
  /** Process animation during process frames (see {@link Node.NOTIFICATION_INTERNAL_PROCESS}). */
  static readonly ANIMATION_CALLBACK_MODE_PROCESS_IDLE: int;
  /** Do not process animation. Use {@link advance} to process the animation manually. */
  static readonly ANIMATION_CALLBACK_MODE_PROCESS_MANUAL: int;
  // enum AnimationCallbackModeMethod
  /**
   * Batch method calls during the animation process, then do the calls after events are processed. This avoids bugs involving deleting nodes or modifying the AnimationPlayer while playing.
   */
  static readonly ANIMATION_CALLBACK_MODE_METHOD_DEFERRED: int;
  /** Make method calls immediately when reached in the animation. */
  static readonly ANIMATION_CALLBACK_MODE_METHOD_IMMEDIATE: int;
  // enum AnimationCallbackModeDiscrete
  /**
   * An {@link Animation.UPDATE_DISCRETE} track value takes precedence when blending {@link Animation.UPDATE_CONTINUOUS} or {@link Animation.UPDATE_CAPTURE} track values and {@link Animation.UPDATE_DISCRETE} track values.
   */
  static readonly ANIMATION_CALLBACK_MODE_DISCRETE_DOMINANT: int;
  /**
   * An {@link Animation.UPDATE_CONTINUOUS} or {@link Animation.UPDATE_CAPTURE} track value takes precedence when blending the {@link Animation.UPDATE_CONTINUOUS} or {@link Animation.UPDATE_CAPTURE} track values and the {@link Animation.UPDATE_DISCRETE} track values. This is the default behavior for {@link AnimationPlayer}.
   */
  static readonly ANIMATION_CALLBACK_MODE_DISCRETE_RECESSIVE: int;
  /**
   * Always treat the {@link Animation.UPDATE_DISCRETE} track value as {@link Animation.UPDATE_CONTINUOUS} with {@link Animation.INTERPOLATION_NEAREST}. This is the default behavior for {@link AnimationTree}.
   * If a value track has un-interpolatable type key values, it is internally converted to use {@link ANIMATION_CALLBACK_MODE_DISCRETE_RECESSIVE} with {@link Animation.UPDATE_DISCRETE}.
   * Un-interpolatable type list:
   * - {@link @GlobalScope.TYPE_NIL}
   * - {@link @GlobalScope.TYPE_NODE_PATH}
   * - {@link @GlobalScope.TYPE_RID}
   * - {@link @GlobalScope.TYPE_OBJECT}
   * - {@link @GlobalScope.TYPE_CALLABLE}
   * - {@link @GlobalScope.TYPE_SIGNAL}
   * - {@link @GlobalScope.TYPE_DICTIONARY}
   * - {@link @GlobalScope.TYPE_PACKED_BYTE_ARRAY}
   * {@link @GlobalScope.TYPE_BOOL} and {@link @GlobalScope.TYPE_INT} are treated as {@link @GlobalScope.TYPE_FLOAT} during blending and rounded when the result is retrieved.
   * It is same for arrays and vectors with them such as {@link @GlobalScope.TYPE_PACKED_INT32_ARRAY} or {@link @GlobalScope.TYPE_VECTOR2I}, they are treated as {@link @GlobalScope.TYPE_PACKED_FLOAT32_ARRAY} or {@link @GlobalScope.TYPE_VECTOR2}. Also note that for arrays, the size is also interpolated.
   * {@link @GlobalScope.TYPE_STRING} and {@link @GlobalScope.TYPE_STRING_NAME} are interpolated between character codes and lengths, but note that there is a difference in algorithm between interpolation between keys and interpolation by blending.
   */
  static readonly ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS: int;
}

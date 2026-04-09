// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Holds data that can be used to animate anything in the engine. */
declare class Animation extends Resource {
  /** Returns `true` if the capture track is included. This is a cached readonly value for performance. */
  capture_included: boolean;
  /**
   * The total length of the animation (in seconds).
   * **Note:** Length is not delimited by the last key, as this one may be before or after the end to ensure correct interpolation and looping.
   */
  length: float;
  /**
   * Determines the behavior of both ends of the animation timeline during animation playback. This indicates whether and how the animation should be restarted, and is also used to correctly interpolate animation cycles.
   */
  loop_mode: int;
  /** The animation step value. */
  step: float;
  is_capture_included(): boolean;
  set_length(value: float): void;
  get_length(): float;
  set_loop_mode(value: int): void;
  get_loop_mode(): int;
  set_step(value: float): void;
  get_step(): float;

  /** Adds a marker to this Animation. */
  add_marker(name: string, time: float): void;
  /** Adds a track to the Animation. */
  add_track(type_: int, at_position?: int): int;
  /**
   * Returns the animation name at the key identified by `key_idx`. The `track_idx` must be the index of an Animation Track.
   */
  animation_track_get_key_animation(track_idx: int, key_idx: int): string;
  /**
   * Inserts a key with value `animation` at the given `time` (in seconds). The `track_idx` must be the index of an Animation Track.
   */
  animation_track_insert_key(track_idx: int, time: float, animation: string): int;
  /**
   * Sets the key identified by `key_idx` to value `animation`. The `track_idx` must be the index of an Animation Track.
   */
  animation_track_set_key_animation(track_idx: int, key_idx: int, animation: string): void;
  /**
   * Returns the end offset of the key identified by `key_idx`. The `track_idx` must be the index of an Audio Track.
   * End offset is the number of seconds cut off at the ending of the audio stream.
   */
  audio_track_get_key_end_offset(track_idx: int, key_idx: int): float;
  /**
   * Returns the start offset of the key identified by `key_idx`. The `track_idx` must be the index of an Audio Track.
   * Start offset is the number of seconds cut off at the beginning of the audio stream.
   */
  audio_track_get_key_start_offset(track_idx: int, key_idx: int): float;
  /**
   * Returns the audio stream of the key identified by `key_idx`. The `track_idx` must be the index of an Audio Track.
   */
  audio_track_get_key_stream(track_idx: int, key_idx: int): Resource | null;
  /**
   * Inserts an Audio Track key at the given `time` in seconds. The `track_idx` must be the index of an Audio Track.
   * `stream` is the {@link AudioStream} resource to play. `start_offset` is the number of seconds cut off at the beginning of the audio stream, while `end_offset` is at the ending.
   */
  audio_track_insert_key(track_idx: int, time: float, stream: Resource, start_offset?: float, end_offset?: float): int;
  /** Returns `true` if the track at `track_idx` will be blended with other animations. */
  audio_track_is_use_blend(track_idx: int): boolean;
  /**
   * Sets the end offset of the key identified by `key_idx` to value `offset`. The `track_idx` must be the index of an Audio Track.
   */
  audio_track_set_key_end_offset(track_idx: int, key_idx: int, offset: float): void;
  /**
   * Sets the start offset of the key identified by `key_idx` to value `offset`. The `track_idx` must be the index of an Audio Track.
   */
  audio_track_set_key_start_offset(track_idx: int, key_idx: int, offset: float): void;
  /**
   * Sets the stream of the key identified by `key_idx` to value `stream`. The `track_idx` must be the index of an Audio Track.
   */
  audio_track_set_key_stream(track_idx: int, key_idx: int, stream: Resource): void;
  /**
   * Sets whether the track will be blended with other animations. If `true`, the audio playback volume changes depending on the blend value.
   */
  audio_track_set_use_blend(track_idx: int, enable: boolean): void;
  /**
   * Returns the in handle of the key identified by `key_idx`. The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_get_key_in_handle(track_idx: int, key_idx: int): Vector2;
  /**
   * Returns the out handle of the key identified by `key_idx`. The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_get_key_out_handle(track_idx: int, key_idx: int): Vector2;
  /**
   * Returns the value of the key identified by `key_idx`. The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_get_key_value(track_idx: int, key_idx: int): float;
  /**
   * Inserts a Bezier Track key at the given `time` in seconds. The `track_idx` must be the index of a Bezier Track.
   * `in_handle` is the left-side weight of the added Bezier curve point, `out_handle` is the right-side one, while `value` is the actual value at this point.
   */
  bezier_track_insert_key(track_idx: int, time: float, value: float, in_handle?: Vector2, out_handle?: Vector2): int;
  /**
   * Returns the interpolated value at the given `time` (in seconds). The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_interpolate(track_idx: int, time: float): float;
  /**
   * Sets the in handle of the key identified by `key_idx` to value `in_handle`. The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_set_key_in_handle(track_idx: int, key_idx: int, in_handle: Vector2, balanced_value_time_ratio?: float): void;
  /**
   * Sets the out handle of the key identified by `key_idx` to value `out_handle`. The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_set_key_out_handle(track_idx: int, key_idx: int, out_handle: Vector2, balanced_value_time_ratio?: float): void;
  /**
   * Sets the value of the key identified by `key_idx` to the given value. The `track_idx` must be the index of a Bezier Track.
   */
  bezier_track_set_key_value(track_idx: int, key_idx: int, value: float): void;
  /** Inserts a key in a given blend shape track. Returns the key index. */
  blend_shape_track_insert_key(track_idx: int, time: float, amount: float): int;
  /**
   * Returns the interpolated blend shape value at the given time (in seconds). The `track_idx` must be the index of a blend shape track.
   */
  blend_shape_track_interpolate(track_idx: int, time_sec: float, backward?: boolean): float;
  /** Clear the animation (clear all tracks and reset all). */
  clear(): void;
  /**
   * Compress the animation and all its tracks in-place. This will make {@link track_is_compressed} return `true` once called on this {@link Animation}. Compressed tracks require less memory to be played, and are designed to be used for complex 3D animations (such as cutscenes) imported from external 3D software. Compression is lossy, but the difference is usually not noticeable in real world conditions.
   * **Note:** Compressed tracks have various limitations (such as not being editable from the editor), so only use compressed animations if you actually need them.
   */
  compress(page_size?: int, fps?: int, split_tolerance?: float): void;
  /** Adds a new track to `to_animation` that is a copy of the given track from this animation. */
  copy_track(track_idx: int, to_animation: Animation): void;
  /** Returns the index of the specified track. If the track is not found, return -1. */
  find_track(path: string, type_: int): int;
  /** Returns the name of the marker located at the given time. */
  get_marker_at_time(time: float): string;
  /** Returns the given marker's color. */
  get_marker_color(name: string): Color;
  /** Returns every marker in this Animation, sorted ascending by time. */
  get_marker_names(): PackedStringArray;
  /** Returns the given marker's time. */
  get_marker_time(name: string): float;
  /**
   * Returns the closest marker that comes after the given time. If no such marker exists, an empty string is returned.
   */
  get_next_marker(time: float): string;
  /**
   * Returns the closest marker that comes before the given time. If no such marker exists, an empty string is returned.
   */
  get_prev_marker(time: float): string;
  /** Returns the amount of tracks in the animation. */
  get_track_count(): int;
  /** Returns `true` if this Animation contains a marker with the given name. */
  has_marker(name: string): boolean;
  /** Returns the method name of a method track. */
  method_track_get_name(track_idx: int, key_idx: int): string;
  /** Returns the arguments values to be called on a method track for a given key in a given track. */
  method_track_get_params(track_idx: int, key_idx: int): Array<unknown>;
  /**
   * Optimize the animation and all its tracks in-place. This will preserve only as many keys as are necessary to keep the animation within the specified bounds.
   */
  optimize(allowed_velocity_err?: float, allowed_angular_err?: float, precision?: int): void;
  /** Inserts a key in a given 3D position track. Returns the key index. */
  position_track_insert_key(track_idx: int, time: float, position: Vector3): int;
  /**
   * Returns the interpolated position value at the given time (in seconds). The `track_idx` must be the index of a 3D position track.
   */
  position_track_interpolate(track_idx: int, time_sec: float, backward?: boolean): Vector3;
  /** Removes the marker with the given name from this Animation. */
  remove_marker(name: string): void;
  /** Removes a track by specifying the track index. */
  remove_track(track_idx: int): void;
  /** Inserts a key in a given 3D rotation track. Returns the key index. */
  rotation_track_insert_key(track_idx: int, time: float, rotation: Quaternion): int;
  /**
   * Returns the interpolated rotation value at the given time (in seconds). The `track_idx` must be the index of a 3D rotation track.
   */
  rotation_track_interpolate(track_idx: int, time_sec: float, backward?: boolean): Quaternion;
  /** Inserts a key in a given 3D scale track. Returns the key index. */
  scale_track_insert_key(track_idx: int, time: float, scale: Vector3): int;
  /**
   * Returns the interpolated scale value at the given time (in seconds). The `track_idx` must be the index of a 3D scale track.
   */
  scale_track_interpolate(track_idx: int, time_sec: float, backward?: boolean): Vector3;
  /** Sets the given marker's color. */
  set_marker_color(name: string, color: Color): void;
  /**
   * Finds the key index by time in a given track. Optionally, only find it if the approx/exact time is given.
   * If `limit` is `true`, it does not return keys outside the animation range.
   * If `backward` is `true`, the direction is reversed in methods that rely on one directional processing.
   * For example, in case `find_mode` is {@link FIND_MODE_NEAREST}, if there is no key in the current position just after seeked, the first key found is retrieved by searching before the position, but if `backward` is `true`, the first key found is retrieved after the position.
   */
  track_find_key(track_idx: int, time: float, find_mode: int, limit?: boolean, backward?: boolean): int;
  /**
   * Returns `true` if the track at `track_idx` wraps the interpolation loop. New tracks wrap the interpolation loop by default.
   */
  track_get_interpolation_loop_wrap(track_idx: int): boolean;
  /** Returns the interpolation type of a given track. */
  track_get_interpolation_type(track_idx: int): int;
  /** Returns the number of keys in a given track. */
  track_get_key_count(track_idx: int): int;
  /** Returns the time at which the key is located. */
  track_get_key_time(track_idx: int, key_idx: int): float;
  /**
   * Returns the transition curve (easing) for a specific key (see the built-in math function {@link @GlobalScope.ease}).
   */
  track_get_key_transition(track_idx: int, key_idx: int): float;
  /** Returns the value of a given key in a given track. */
  track_get_key_value(track_idx: int, key_idx: int): unknown;
  /** Gets the path of a track. For more information on the path format, see {@link track_set_path}. */
  track_get_path(track_idx: int): string;
  /** Gets the type of a track. */
  track_get_type(track_idx: int): int;
  /** Inserts a generic key in a given track. Returns the key index. */
  track_insert_key(track_idx: int, time: float, key: unknown, transition?: float): int;
  /** Returns `true` if the track is compressed, `false` otherwise. See also {@link compress}. */
  track_is_compressed(track_idx: int): boolean;
  /** Returns `true` if the track at index `track_idx` is enabled. */
  track_is_enabled(track_idx: int): boolean;
  /** Returns `true` if the given track is imported. Else, return `false`. */
  track_is_imported(track_idx: int): boolean;
  /** Moves a track down. */
  track_move_down(track_idx: int): void;
  /** Changes the index position of track `track_idx` to the one defined in `to_idx`. */
  track_move_to(track_idx: int, to_idx: int): void;
  /** Moves a track up. */
  track_move_up(track_idx: int): void;
  /** Removes a key by index in a given track. */
  track_remove_key(track_idx: int, key_idx: int): void;
  /** Removes a key at `time` in a given track. */
  track_remove_key_at_time(track_idx: int, time: float): void;
  /** Enables/disables the given track. Tracks are enabled by default. */
  track_set_enabled(track_idx: int, enabled: boolean): void;
  /** Sets the given track as imported or not. */
  track_set_imported(track_idx: int, imported: boolean): void;
  /** If `true`, the track at `track_idx` wraps the interpolation loop. */
  track_set_interpolation_loop_wrap(track_idx: int, interpolation: boolean): void;
  /** Sets the interpolation type of a given track. */
  track_set_interpolation_type(track_idx: int, interpolation: int): void;
  /** Sets the time of an existing key. */
  track_set_key_time(track_idx: int, key_idx: int, time: float): void;
  /**
   * Sets the transition curve (easing) for a specific key (see the built-in math function {@link @GlobalScope.ease}).
   */
  track_set_key_transition(track_idx: int, key_idx: int, transition: float): void;
  /** Sets the value of an existing key. */
  track_set_key_value(track_idx: int, key: int, value: unknown): void;
  /**
   * Sets the path of a track. Paths must be valid scene-tree paths to a node and must be specified starting from the {@link AnimationMixer.root_node} that will reproduce the animation. Tracks that control properties or bones must append their name after the path, separated by `":"`.
   * For example, `"character/skeleton:ankle"` or `"character/mesh:transform/local"`.
   */
  track_set_path(track_idx: int, path: string): void;
  /** Swaps the track `track_idx`'s index position with the track `with_idx`. */
  track_swap(track_idx: int, with_idx: int): void;
  /** Returns the update mode of a value track. */
  value_track_get_update_mode(track_idx: int): int;
  /**
   * Returns the interpolated value at the given time (in seconds). The `track_idx` must be the index of a value track.
   * A `backward` mainly affects the direction of key retrieval of the track with {@link UPDATE_DISCRETE} converted by {@link AnimationMixer.ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS} to match the result with {@link track_find_key}.
   */
  value_track_interpolate(track_idx: int, time_sec: float, backward?: boolean): unknown;
  /** Sets the update mode of a value track. */
  value_track_set_update_mode(track_idx: int, mode: int): void;

  // enum TrackType
  /**
   * Value tracks set values in node properties, but only those which can be interpolated. For 3D position/rotation/scale, using the dedicated {@link TYPE_POSITION_3D}, {@link TYPE_ROTATION_3D} and {@link TYPE_SCALE_3D} track types instead of {@link TYPE_VALUE} is recommended for performance reasons.
   */
  static readonly TYPE_VALUE: int;
  /** 3D position track (values are stored in {@link Vector3}s). */
  static readonly TYPE_POSITION_3D: int;
  /** 3D rotation track (values are stored in {@link Quaternion}s). */
  static readonly TYPE_ROTATION_3D: int;
  /** 3D scale track (values are stored in {@link Vector3}s). */
  static readonly TYPE_SCALE_3D: int;
  /** Blend shape track. */
  static readonly TYPE_BLEND_SHAPE: int;
  /** Method tracks call functions with given arguments per key. */
  static readonly TYPE_METHOD: int;
  /**
   * Bezier tracks are used to interpolate a value using custom curves. They can also be used to animate sub-properties of vectors and colors (e.g. alpha value of a {@link Color}).
   */
  static readonly TYPE_BEZIER: int;
  /**
   * Audio tracks are used to play an audio stream with either type of {@link AudioStreamPlayer}. The stream can be trimmed and previewed in the animation.
   */
  static readonly TYPE_AUDIO: int;
  /** Animation tracks play animations in other {@link AnimationPlayer} nodes. */
  static readonly TYPE_ANIMATION: int;
  // enum InterpolationType
  /** No interpolation (nearest value). */
  static readonly INTERPOLATION_NEAREST: int;
  /** Linear interpolation. */
  static readonly INTERPOLATION_LINEAR: int;
  /**
   * Cubic interpolation. This looks smoother than linear interpolation, but is more expensive to interpolate. Stick to {@link INTERPOLATION_LINEAR} for complex 3D animations imported from external software, even if it requires using a higher animation framerate in return.
   */
  static readonly INTERPOLATION_CUBIC: int;
  /**
   * Linear interpolation with shortest path rotation.
   * **Note:** The result value is always normalized and may not match the key value.
   */
  static readonly INTERPOLATION_LINEAR_ANGLE: int;
  /**
   * Cubic interpolation with shortest path rotation.
   * **Note:** The result value is always normalized and may not match the key value.
   */
  static readonly INTERPOLATION_CUBIC_ANGLE: int;
  // enum UpdateMode
  /** Update between keyframes and hold the value. */
  static readonly UPDATE_CONTINUOUS: int;
  /** Update at the keyframes. */
  static readonly UPDATE_DISCRETE: int;
  /**
   * Same as {@link UPDATE_CONTINUOUS} but works as a flag to capture the value of the current object and perform interpolation in some methods. See also {@link AnimationMixer.capture}, {@link AnimationPlayer.playback_auto_capture}, and {@link AnimationPlayer.play_with_capture}.
   */
  static readonly UPDATE_CAPTURE: int;
  // enum LoopMode
  /** At both ends of the animation, the animation will stop playing. */
  static readonly LOOP_NONE: int;
  /**
   * At both ends of the animation, the animation will be repeated without changing the playback direction.
   */
  static readonly LOOP_LINEAR: int;
  /** Repeats playback and reverse playback at both ends of the animation. */
  static readonly LOOP_PINGPONG: int;
  // enum LoopedFlag
  /** This flag indicates that the animation proceeds without any looping. */
  static readonly LOOPED_FLAG_NONE: int;
  /**
   * This flag indicates that the animation has reached the end of the animation and just after loop processed.
   */
  static readonly LOOPED_FLAG_END: int;
  /**
   * This flag indicates that the animation has reached the start of the animation and just after loop processed.
   */
  static readonly LOOPED_FLAG_START: int;
  // enum FindMode
  /** Finds the nearest time key. */
  static readonly FIND_MODE_NEAREST: int;
  /** Finds only the key with approximating the time. */
  static readonly FIND_MODE_APPROX: int;
  /** Finds only the key with matching the time. */
  static readonly FIND_MODE_EXACT: int;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node for audio playback. */
declare class AudioStreamPlayer extends Node {
  /** If `true`, this node calls {@link play} when entering the tree. */
  autoplay: boolean;
  /**
   * The target bus name. All sounds from this node will be playing on this bus.
   * **Note:** At runtime, if no bus with the given name exists, all sounds will fall back on `"Master"`. See also {@link AudioServer.get_bus_name}.
   */
  bus: string;
  /**
   * The maximum number of sounds this node can play at the same time. Calling {@link play} after this value is reached will cut off the oldest sounds.
   */
  max_polyphony: int;
  /**
   * The mix target channels. Has no effect when two speakers or less are detected (see {@link AudioServer.SpeakerMode}).
   */
  mix_target: int;
  /**
   * The audio's pitch and tempo, as a multiplier of the {@link stream}'s sample rate. A value of `2.0` doubles the audio's pitch, while a value of `0.5` halves the pitch.
   */
  pitch_scale: float;
  /**
   * The playback type of the stream player. If set other than to the default value, it will force that playback type.
   */
  playback_type: int;
  /**
   * If `true`, this node is playing sounds. Setting this property has the same effect as {@link play} and {@link stop}.
   */
  playing: boolean;
  /**
   * The {@link AudioStream} resource to be played. Setting this property stops all currently playing sounds. If left empty, the {@link AudioStreamPlayer} does not work.
   */
  stream: AudioStream | null;
  /**
   * If `true`, the sounds are paused. Setting {@link stream_paused} to `false` resumes all sounds.
   * **Note:** This property is automatically changed when exiting or entering the tree, or this node is paused (see {@link Node.process_mode}).
   */
  stream_paused: boolean;
  /**
   * Volume of sound, in decibels. This is an offset of the {@link stream}'s volume.
   * **Note:** To convert between decibel and linear energy (like most volume sliders do), use {@link volume_linear}, or {@link @GlobalScope.db_to_linear} and {@link @GlobalScope.linear_to_db}.
   */
  volume_db: float;
  /**
   * Volume of sound, as a linear value.
   * **Note:** This member modifies {@link volume_db} for convenience. The returned value is equivalent to the result of {@link @GlobalScope.db_to_linear} on {@link volume_db}. Setting this member is equivalent to setting {@link volume_db} to the result of {@link @GlobalScope.linear_to_db} on a value.
   */
  volume_linear: float;
  set_autoplay(value: boolean): void;
  is_autoplay_enabled(): boolean;
  set_bus(value: string): void;
  get_bus(): string;
  set_max_polyphony(value: int): void;
  get_max_polyphony(): int;
  set_mix_target(value: int): void;
  get_mix_target(): int;
  set_pitch_scale(value: float): void;
  get_pitch_scale(): float;
  set_playback_type(value: int): void;
  get_playback_type(): int;
  set_playing(value: boolean): void;
  is_playing(): boolean;
  set_stream(value: AudioStream | null): void;
  get_stream(): AudioStream | null;
  set_stream_paused(value: boolean): void;
  get_stream_paused(): boolean;
  set_volume_db(value: float): void;
  get_volume_db(): float;
  set_volume_linear(value: float): void;
  get_volume_linear(): float;

  /**
   * Returns the position in the {@link AudioStream} of the latest sound, in seconds. Returns `0.0` if no sounds are playing.
   * **Note:** The position is not always accurate, as the {@link AudioServer} does not mix audio every processed frame. To get more accurate results, add {@link AudioServer.get_time_since_last_mix} to the returned position.
   * **Note:** This method always returns `0.0` if the {@link stream} is an {@link AudioStreamInteractive}, since it can have multiple clips playing at once.
   */
  get_playback_position(): float;
  /**
   * Returns the latest {@link AudioStreamPlayback} of this node, usually the most recently created by {@link play}. If no sounds are playing, this method fails and returns an empty playback.
   */
  get_stream_playback(): AudioStreamPlayback | null;
  /**
   * Returns `true` if any sound is active, even if {@link stream_paused} is set to `true`. See also {@link playing} and {@link get_stream_playback}.
   */
  has_stream_playback(): boolean;
  /** Plays a sound from the beginning, or the given `from_position` in seconds. */
  play(from_position?: float): void;
  /**
   * Restarts all sounds to be played from the given `to_position`, in seconds. Does nothing if no sounds are playing.
   */
  seek(to_position: float): void;
  /** Stops all sounds from this node. */
  stop(): void;

  /**
   * Emitted when a sound finishes playing without interruptions. This signal is *not* emitted when calling {@link stop}, or when exiting the tree while sounds are playing.
   */
  finished: Signal<[]>;

  // enum MixTarget
  /** The audio will be played only on the first channel. This is the default. */
  static readonly MIX_TARGET_STEREO: int;
  /** The audio will be played on all surround channels. */
  static readonly MIX_TARGET_SURROUND: int;
  /** The audio will be played on the second channel, which is usually the center. */
  static readonly MIX_TARGET_CENTER: int;
}

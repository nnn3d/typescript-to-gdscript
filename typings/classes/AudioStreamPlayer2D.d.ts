// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Plays positional sound in 2D space. */
declare class AudioStreamPlayer2D extends Node2D {
  /**
   * Determines which {@link Area2D} layers affect the sound for reverb and audio bus effects. Areas can be used to redirect {@link AudioStream}s so that they play in a certain audio bus. An example of how you might use this is making a "water" area so that sounds played in the water are redirected through an audio bus to make them sound like they are being played underwater.
   */
  area_mask: int;
  /** The volume is attenuated over distance with this as an exponent. */
  attenuation: float;
  /** If `true`, audio plays when added to scene tree. */
  autoplay: boolean;
  /**
   * Bus on which this audio is playing.
   * **Note:** When setting this property, keep in mind that no validation is performed to see if the given name matches an existing bus. This is because audio bus layouts might be loaded after this property is set. If this given name can't be resolved at runtime, it will fall back to `"Master"`.
   */
  bus: string;
  /** Maximum distance from which audio is still hearable. */
  max_distance: float;
  /**
   * The maximum number of sounds this node can play at the same time. Playing additional sounds after this value is reached will cut off the oldest sounds.
   */
  max_polyphony: int;
  /**
   * Scales the panning strength for this node by multiplying the base {@link ProjectSettings.audio/general/2d_panning_strength} with this factor. Higher values will pan audio from left to right more dramatically than lower values.
   */
  panning_strength: float;
  /** The pitch and the tempo of the audio, as a multiplier of the audio sample's sample rate. */
  pitch_scale: float;
  /**
   * The playback type of the stream player. If set other than to the default value, it will force that playback type.
   */
  playback_type: int;
  /** If `true`, audio is playing or is queued to be played (see {@link play}). */
  playing: boolean;
  /** The {@link AudioStream} object to be played. */
  stream: AudioStream | null;
  /** If `true`, the playback is paused. You can resume it by setting {@link stream_paused} to `false`. */
  stream_paused: boolean;
  /** Base volume before attenuation, in decibels. */
  volume_db: float;
  /**
   * Base volume before attenuation, as a linear value.
   * **Note:** This member modifies {@link volume_db} for convenience. The returned value is equivalent to the result of {@link @GlobalScope.db_to_linear} on {@link volume_db}. Setting this member is equivalent to setting {@link volume_db} to the result of {@link @GlobalScope.linear_to_db} on a value.
   */
  volume_linear: float;
  set_area_mask(value: int): void;
  get_area_mask(): int;
  set_attenuation(value: float): void;
  get_attenuation(): float;
  set_autoplay(value: boolean): void;
  is_autoplay_enabled(): boolean;
  set_bus(value: string): void;
  get_bus(): string;
  set_max_distance(value: float): void;
  get_max_distance(): float;
  set_max_polyphony(value: int): void;
  get_max_polyphony(): int;
  set_panning_strength(value: float): void;
  get_panning_strength(): float;
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

  /** Returns the position in the {@link AudioStream}. */
  get_playback_position(): float;
  /** Returns the {@link AudioStreamPlayback} object associated with this {@link AudioStreamPlayer2D}. */
  get_stream_playback(): AudioStreamPlayback | null;
  /**
   * Returns whether the {@link AudioStreamPlayer} can return the {@link AudioStreamPlayback} object or not.
   */
  has_stream_playback(): boolean;
  /**
   * Queues the audio to play on the next physics frame, from the given position `from_position`, in seconds.
   */
  play(from_position?: float): void;
  /** Sets the position from which audio will be played, in seconds. */
  seek(to_position: float): void;
  /** Stops the audio. */
  stop(): void;

  /** Emitted when the audio stops playing. */
  finished: Signal<[]>;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Plays positional sound in 3D space. */
declare class AudioStreamPlayer3D<Tree extends object = any> extends Node3D<Tree> {
  /**
   * Determines which {@link Area3D} layers affect the sound for reverb and audio bus effects. Areas can be used to redirect {@link AudioStream}s so that they play in a certain audio bus. An example of how you might use this is making a "water" area so that sounds played in the water are redirected through an audio bus to make them sound like they are being played underwater.
   */
  area_mask: int;
  /**
   * The cutoff frequency of the attenuation low-pass filter, in Hz. A sound above this frequency is attenuated more than a sound below this frequency. To disable this effect, set this to `20500` as this frequency is above the human hearing limit.
   */
  attenuation_filter_cutoff_hz: float;
  /** Amount how much the filter affects the loudness, in decibels. */
  attenuation_filter_db: float;
  /**
   * Decides if audio should get quieter with distance linearly, quadratically, logarithmically, or not be affected by distance, effectively disabling attenuation.
   */
  attenuation_model: int;
  /** If `true`, audio plays when the AudioStreamPlayer3D node is added to scene tree. */
  autoplay: boolean;
  /**
   * The bus on which this audio is playing.
   * **Note:** When setting this property, keep in mind that no validation is performed to see if the given name matches an existing bus. This is because audio bus layouts might be loaded after this property is set. If this given name can't be resolved at runtime, it will fall back to `"Master"`.
   */
  bus: string;
  /**
   * Decides in which step the Doppler effect should be calculated.
   * **Note:** If {@link doppler_tracking} is not {@link DOPPLER_TRACKING_DISABLED} but the current {@link Camera3D}/{@link AudioListener3D} has doppler tracking disabled, the Doppler effect will be heard but will not take the movement of the current listener into account. If accurate Doppler effect is desired, doppler tracking should be enabled on both the {@link AudioStreamPlayer3D} and the current {@link Camera3D}/{@link AudioListener3D}.
   */
  doppler_tracking: int;
  /** The angle in which the audio reaches a listener unattenuated. */
  emission_angle_degrees: float;
  /** If `true`, the audio should be attenuated according to the direction of the sound. */
  emission_angle_enabled: boolean;
  /**
   * Attenuation factor used if listener is outside of {@link emission_angle_degrees} and {@link emission_angle_enabled} is set, in decibels.
   */
  emission_angle_filter_attenuation_db: float;
  /** Sets the absolute maximum of the sound level, in decibels. */
  max_db: float;
  /**
   * The distance past which the sound can no longer be heard at all. Only has an effect if set to a value greater than `0.0`. {@link max_distance} works in tandem with {@link unit_size}. However, unlike {@link unit_size} whose behavior depends on the {@link attenuation_model}, {@link max_distance} always works in a linear fashion. This can be used to prevent the {@link AudioStreamPlayer3D} from requiring audio mixing when the listener is far away, which saves CPU resources.
   */
  max_distance: float;
  /**
   * The maximum number of sounds this node can play at the same time. Playing additional sounds after this value is reached will cut off the oldest sounds.
   */
  max_polyphony: int;
  /**
   * Scales the panning strength for this node by multiplying the base {@link ProjectSettings.audio/general/3d_panning_strength} by this factor. If the product is `0.0` then stereo panning is disabled and the volume is the same for all channels. If the product is `1.0` then one of the channels will be muted when the sound is located exactly to the left (or right) of the listener.
   * Two speaker stereo arrangements implement the WebAudio standard for StereoPannerNode Panning (https://webaudio.github.io/web-audio-api/#stereopanner-algorithm) where the volume is cosine of half the azimuth angle to the ear.
   * For other speaker arrangements such as the 5.1 and 7.1 the SPCAP (Speaker-Placement Correction Amplitude) algorithm is implemented.
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
  /** The {@link AudioStream} resource to be played. */
  stream: AudioStream;
  /** If `true`, the playback is paused. You can resume it by setting {@link stream_paused} to `false`. */
  stream_paused: boolean;
  /** The factor for the attenuation effect. Higher values make the sound audible over a larger distance. */
  unit_size: float;
  /** The base sound level before attenuation, in decibels. */
  volume_db: float;
  /**
   * The base sound level before attenuation, as a linear value.
   * **Note:** This member modifies {@link volume_db} for convenience. The returned value is equivalent to the result of {@link @GlobalScope.db_to_linear} on {@link volume_db}. Setting this member is equivalent to setting {@link volume_db} to the result of {@link @GlobalScope.linear_to_db} on a value.
   */
  volume_linear: float;
  set_area_mask(value: int): void;
  get_area_mask(): int;
  set_attenuation_filter_cutoff_hz(value: float): void;
  get_attenuation_filter_cutoff_hz(): float;
  set_attenuation_filter_db(value: float): void;
  get_attenuation_filter_db(): float;
  set_attenuation_model(value: int): void;
  get_attenuation_model(): int;
  set_autoplay(value: boolean): void;
  is_autoplay_enabled(): boolean;
  set_bus(value: string): void;
  get_bus(): string;
  set_doppler_tracking(value: int): void;
  get_doppler_tracking(): int;
  set_emission_angle(value: float): void;
  get_emission_angle(): float;
  set_emission_angle_enabled(value: boolean): void;
  is_emission_angle_enabled(): boolean;
  set_emission_angle_filter_attenuation_db(value: float): void;
  get_emission_angle_filter_attenuation_db(): float;
  set_max_db(value: float): void;
  get_max_db(): float;
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
  set_stream(value: AudioStream): void;
  get_stream(): AudioStream;
  set_stream_paused(value: boolean): void;
  get_stream_paused(): boolean;
  set_unit_size(value: float): void;
  get_unit_size(): float;
  set_volume_db(value: float): void;
  get_volume_db(): float;
  set_volume_linear(value: float): void;
  get_volume_linear(): float;

  /** Returns the position in the {@link AudioStream}. */
  get_playback_position(): float;
  /** Returns the {@link AudioStreamPlayback} object associated with this {@link AudioStreamPlayer3D}. */
  get_stream_playback(): AudioStreamPlayback;
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

  // enum AttenuationModel
  /** Attenuation of loudness according to linear distance. */
  static readonly ATTENUATION_INVERSE_DISTANCE: int;
  /** Attenuation of loudness according to squared distance. */
  static readonly ATTENUATION_INVERSE_SQUARE_DISTANCE: int;
  /** Attenuation of loudness according to logarithmic distance. */
  static readonly ATTENUATION_LOGARITHMIC: int;
  /**
   * No attenuation of loudness according to distance. The sound will still be heard positionally, unlike an {@link AudioStreamPlayer}. {@link ATTENUATION_DISABLED} can be combined with a {@link max_distance} value greater than `0.0` to achieve linear attenuation clamped to a sphere of a defined size.
   */
  static readonly ATTENUATION_DISABLED: int;
  // enum DopplerTracking
  /** Disables doppler tracking. */
  static readonly DOPPLER_TRACKING_DISABLED: int;
  /** Executes doppler tracking during process frames (see {@link Node.NOTIFICATION_INTERNAL_PROCESS}). */
  static readonly DOPPLER_TRACKING_IDLE_STEP: int;
  /**
   * Executes doppler tracking during physics frames (see {@link Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS}).
   */
  static readonly DOPPLER_TRACKING_PHYSICS_STEP: int;
}

// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Server interface for low-level audio access. */
declare interface AudioServer extends GodotObject {
  /** Number of available audio buses. */
  bus_count: int;
  /**
   * Name of the current device for audio input (see {@link get_input_device_list}). On systems with multiple audio inputs (such as analog, USB and HDMI audio), this can be used to select the audio input device. The value `"Default"` will record audio on the system-wide default audio input. If an invalid device name is set, the value will be reverted back to `"Default"`.
   * **Note:** {@link ProjectSettings.audio/driver/enable_input} must be `true` for audio input to work. See also that setting's description for caveats related to permissions and operating system privacy settings.
   */
  input_device: string;
  /**
   * Name of the current device for audio output (see {@link get_output_device_list}). On systems with multiple audio outputs (such as analog, USB and HDMI audio), this can be used to select the audio output device. The value `"Default"` will play audio on the system-wide default audio output. If an invalid device name is set, the value will be reverted back to `"Default"`.
   */
  output_device: string;
  /**
   * Scales the rate at which audio is played (i.e. setting it to `0.5` will make the audio be played at half its speed). See also {@link Engine.time_scale} to affect the general simulation speed, which is independent from {@link AudioServer.playback_speed_scale}.
   */
  playback_speed_scale: float;
  set_bus_count(value: int): void;
  get_bus_count(): int;
  set_input_device(value: string | NodePath): void;
  get_input_device(): string;
  set_output_device(value: string | NodePath): void;
  get_output_device(): string;
  set_playback_speed_scale(value: float): void;
  get_playback_speed_scale(): float;

  /** Adds a bus at `at_position`. */
  add_bus(at_position?: int): void;
  /** Adds an {@link AudioEffect} effect to the bus `bus_idx` at `at_position`. */
  add_bus_effect(bus_idx: int, effect: AudioEffect, at_position?: int): void;
  /** Generates an {@link AudioBusLayout} using the available buses and effects. */
  generate_bus_layout(): AudioBusLayout;
  /** Returns the number of channels of the bus at index `bus_idx`. */
  get_bus_channels(bus_idx: int): int;
  /** Returns the {@link AudioEffect} at position `effect_idx` in bus `bus_idx`. */
  get_bus_effect(bus_idx: int, effect_idx: int): AudioEffect | null;
  /** Returns the number of effects on the bus at `bus_idx`. */
  get_bus_effect_count(bus_idx: int): int;
  /**
   * Returns the {@link AudioEffectInstance} assigned to the given bus and effect indices (and optionally channel).
   */
  get_bus_effect_instance(bus_idx: int, effect_idx: int, channel?: int): AudioEffectInstance | null;
  /**
   * Returns the index of the bus with the name `bus_name`. Returns `-1` if no bus with the specified name exist.
   */
  get_bus_index(bus_name: string): int;
  /** Returns the name of the bus with the index `bus_idx`. */
  get_bus_name(bus_idx: int): string;
  /** Returns the peak volume of the left speaker at bus index `bus_idx` and channel index `channel`. */
  get_bus_peak_volume_left_db(bus_idx: int, channel: int): float;
  /** Returns the peak volume of the right speaker at bus index `bus_idx` and channel index `channel`. */
  get_bus_peak_volume_right_db(bus_idx: int, channel: int): float;
  /** Returns the name of the bus that the bus at index `bus_idx` sends to. */
  get_bus_send(bus_idx: int): string;
  /** Returns the volume of the bus at index `bus_idx` in dB. */
  get_bus_volume_db(bus_idx: int): float;
  /**
   * Returns the volume of the bus at index `bus_idx` as a linear value.
   * **Note:** The returned value is equivalent to the result of {@link @GlobalScope.db_to_linear} on the result of {@link get_bus_volume_db}.
   */
  get_bus_volume_linear(bus_idx: int): float;
  /**
   * Returns the name of the current audio driver. The default usually depends on the operating system, but may be overridden via the `--audio-driver` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html). `--headless` also automatically sets the audio driver to `Dummy`. See also {@link ProjectSettings.audio/driver/driver}.
   */
  get_driver_name(): string;
  /**
   * Returns the absolute size of the microphone input buffer. This is set to a multiple of the audio latency and can be used to estimate the minimum rate at which the frames need to be fetched.
   */
  get_input_buffer_length_frames(): int;
  /**
   * Returns the names of all audio input devices detected on the system.
   * **Note:** {@link ProjectSettings.audio/driver/enable_input} must be `true` for audio input to work. See also that setting's description for caveats related to permissions and operating system privacy settings.
   */
  get_input_device_list(): PackedStringArray;
  /**
   * Returns a {@link PackedVector2Array} containing exactly `frames` audio samples from the internal microphone buffer if available, otherwise returns an empty {@link PackedVector2Array}.
   * The buffer is filled at the rate of {@link get_input_mix_rate} frames per second when {@link set_input_device_active} has successfully been set to `true`.
   * The samples are signed floating-point PCM values between `-1` and `1`.
   */
  get_input_frames(frames: int): PackedVector2Array;
  /** Returns the number of frames available to read using {@link get_input_frames}. */
  get_input_frames_available(): int;
  /** Returns the sample rate at the input of the {@link AudioServer}. */
  get_input_mix_rate(): float;
  /** Returns the sample rate at the output of the {@link AudioServer}. */
  get_mix_rate(): float;
  /** Returns the names of all audio output devices detected on the system. */
  get_output_device_list(): PackedStringArray;
  /**
   * Returns the audio driver's effective output latency. This is based on {@link ProjectSettings.audio/driver/output_latency}, but the exact returned value will differ depending on the operating system and audio driver.
   * **Note:** This can be expensive; it is not recommended to call {@link get_output_latency} every frame.
   */
  get_output_latency(): float;
  /** Returns the speaker configuration. */
  get_speaker_mode(): int;
  /** Returns the relative time since the last mix occurred, in seconds. */
  get_time_since_last_mix(): float;
  /** Returns the relative time until the next mix occurs, in seconds. */
  get_time_to_next_mix(): float;
  /** If `true`, the bus at index `bus_idx` is bypassing effects. */
  is_bus_bypassing_effects(bus_idx: int): boolean;
  /** If `true`, the effect at index `effect_idx` on the bus at index `bus_idx` is enabled. */
  is_bus_effect_enabled(bus_idx: int, effect_idx: int): boolean;
  /** If `true`, the bus at index `bus_idx` is muted. */
  is_bus_mute(bus_idx: int): boolean;
  /** If `true`, the bus at index `bus_idx` is in solo mode. */
  is_bus_solo(bus_idx: int): boolean;
  /**
   * If `true`, the stream is registered as a sample. The engine will not have to register it before playing the sample.
   * If `false`, the stream will have to be registered before playing it. To prevent lag spikes, register the stream as sample with {@link register_stream_as_sample}.
   */
  is_stream_registered_as_sample(stream: AudioStream): boolean;
  /**
   * Locks the audio driver's main loop.
   * **Note:** Remember to unlock it afterwards.
   */
  lock(): void;
  /** Moves the bus from index `index` to index `to_index`. */
  move_bus(index: int, to_index: int): void;
  /**
   * Forces the registration of a stream as a sample.
   * **Note:** Lag spikes may occur when calling this method, especially on single-threaded builds. It is suggested to call this method while loading assets, where the lag spike could be masked, instead of registering the sample right before it needs to be played.
   */
  register_stream_as_sample(stream: AudioStream): void;
  /** Removes the bus at index `index`. */
  remove_bus(index: int): void;
  /** Removes the effect at index `effect_idx` from the bus at index `bus_idx`. */
  remove_bus_effect(bus_idx: int, effect_idx: int): void;
  /** If `true`, the bus at index `bus_idx` is bypassing effects. */
  set_bus_bypass_effects(bus_idx: int, enable: boolean): void;
  /** If `true`, the effect at index `effect_idx` on the bus at index `bus_idx` is enabled. */
  set_bus_effect_enabled(bus_idx: int, effect_idx: int, enabled: boolean): void;
  /** Overwrites the currently used {@link AudioBusLayout}. */
  set_bus_layout(bus_layout: AudioBusLayout): void;
  /** If `true`, the bus at index `bus_idx` is muted. */
  set_bus_mute(bus_idx: int, enable: boolean): void;
  /** Sets the name of the bus at index `bus_idx` to `name`. */
  set_bus_name(bus_idx: int, name: string | NodePath): void;
  /** Connects the output of the bus at `bus_idx` to the bus named `send`. */
  set_bus_send(bus_idx: int, send: string): void;
  /** If `true`, the bus at index `bus_idx` is in solo mode. */
  set_bus_solo(bus_idx: int, enable: boolean): void;
  /** Sets the volume in decibels of the bus at index `bus_idx` to `volume_db`. */
  set_bus_volume_db(bus_idx: int, volume_db: float): void;
  /**
   * Sets the volume as a linear value of the bus at index `bus_idx` to `volume_linear`.
   * **Note:** Using this method is equivalent to calling {@link set_bus_volume_db} with the result of {@link @GlobalScope.linear_to_db} on a value.
   */
  set_bus_volume_linear(bus_idx: int, volume_linear: float): void;
  /**
   * If set to `true`, all instances of {@link AudioStreamPlayback} will call {@link AudioStreamPlayback._tag_used_streams} every mix step.
   * **Note:** This is enabled by default in the editor, as it is used by editor plugins for the audio stream previews.
   */
  set_enable_tagging_used_audio_streams(enable: boolean): void;
  /**
   * If `active` is `true`, starts the microphone input stream specified by {@link input_device} or returns an error if it failed.
   * If `active` is `false`, stops the input stream if it is running.
   */
  set_input_device_active(active: boolean): int;
  /** Swaps the position of two effects in bus `bus_idx`. */
  swap_bus_effects(bus_idx: int, effect_idx: int, by_effect_idx: int): void;
  /** Unlocks the audio driver's main loop. (After locking it, you should always unlock it.) */
  unlock(): void;

  /** Emitted when an audio bus is added, deleted, or moved. */
  bus_layout_changed: Signal<[]>;
  /** Emitted when the audio bus at `bus_index` is renamed from `old_name` to `new_name`. */
  bus_renamed: Signal<[int, string, string]>;

  // enum SpeakerMode
  /** Two or fewer speakers were detected. */
  readonly SPEAKER_MODE_STEREO: int;
  /** A 3.1 channel surround setup was detected. */
  readonly SPEAKER_SURROUND_31: int;
  /** A 5.1 channel surround setup was detected. */
  readonly SPEAKER_SURROUND_51: int;
  /** A 7.1 channel surround setup was detected. */
  readonly SPEAKER_SURROUND_71: int;
  // enum PlaybackType
  /**
   * The playback will be considered of the type declared at {@link ProjectSettings.audio/general/default_playback_type}.
   */
  readonly PLAYBACK_TYPE_DEFAULT: int;
  /** Force the playback to be considered as a stream. */
  readonly PLAYBACK_TYPE_STREAM: int;
  /**
   * Force the playback to be considered as a sample. This can provide lower latency and more stable playback (with less risk of audio crackling), at the cost of having less flexibility.
   * **Note:** Only currently supported on the web platform.
   * **Note:** {@link AudioEffect}s are not supported when playback is considered as a sample.
   */
  readonly PLAYBACK_TYPE_SAMPLE: int;
  /** Represents the size of the {@link PlaybackType} enum. */
  readonly PLAYBACK_TYPE_MAX: int;
}
declare const AudioServer: AudioServer;


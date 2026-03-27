// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base class for audio streams. */
declare class AudioStream extends Resource {
  /** Override this method to return the bar beats of this stream. */
  _get_bar_beats(): int;
  /**
   * Overridable method. Should return the total number of beats of this audio stream. Used by the engine to determine the position of every beat.
   * Ideally, the returned value should be based off the stream's sample rate ({@link AudioStreamWAV.mix_rate}, for example).
   */
  _get_beat_count(): int;
  /**
   * Overridable method. Should return the tempo of this audio stream, in beats per minute (BPM). Used by the engine to determine the position of every beat.
   * Ideally, the returned value should be based off the stream's sample rate ({@link AudioStreamWAV.mix_rate}, for example).
   */
  _get_bpm(): float;
  /**
   * Override this method to customize the returned value of {@link get_length}. Should return the length of this audio stream, in seconds.
   */
  _get_length(): float;
  /**
   * Return the controllable parameters of this stream. This array contains dictionaries with a property info description format (see {@link Object.get_property_list}). Additionally, the default value for this parameter must be added tho each dictionary in "default_value" field.
   */
  _get_parameter_list(): Dictionary;
  /** Override this method to customize the name assigned to this audio stream. Unused by the engine. */
  _get_stream_name(): string;
  /**
   * Override this method to customize the tags for this audio stream. Should return a {@link Dictionary} of strings with the tag as the key and its content as the value.
   * Commonly used tags include `title`, `artist`, `album`, `tracknumber`, and `date`.
   */
  _get_tags(): Dictionary;
  /** Override this method to return `true` if this stream has a loop. */
  _has_loop(): boolean;
  /**
   * Override this method to customize the returned value of {@link instantiate_playback}. Should return a new {@link AudioStreamPlayback} created when the stream is played (such as by an {@link AudioStreamPlayer}).
   */
  _instantiate_playback(): AudioStreamPlayback;
  /**
   * Override this method to customize the returned value of {@link is_monophonic}. Should return `true` if this audio stream only supports one channel.
   */
  _is_monophonic(): boolean;
  /**
   * Returns if the current {@link AudioStream} can be used as a sample. Only static streams can be sampled.
   */
  can_be_sampled(): boolean;
  /** Generates an {@link AudioSample} based on the current stream. */
  generate_sample(): AudioSample;
  /**
   * Returns the length of the audio stream in seconds. If this stream is an {@link AudioStreamRandomizer}, returns the length of the last played stream. If this stream has an indefinite length (such as for {@link AudioStreamGenerator} and {@link AudioStreamMicrophone}), returns `0.0`.
   */
  get_length(): float;
  /**
   * Returns a newly created {@link AudioStreamPlayback} intended to play this audio stream. Useful for when you want to extend {@link _instantiate_playback} but call {@link instantiate_playback} from an internally held AudioStream subresource. An example of this can be found in the source code for `AudioStreamRandomPitch::instantiate_playback`.
   */
  instantiate_playback(): AudioStreamPlayback;
  /** Returns `true` if the stream is a collection of other streams, `false` otherwise. */
  is_meta_stream(): boolean;
  /**
   * Returns `true` if this audio stream only supports one channel (*monophony*), or `false` if the audio stream supports two or more channels (*polyphony*).
   */
  is_monophonic(): boolean;

  /** Signal to be emitted to notify when the parameter list changed. */
  parameter_list_changed: Signal<[]>;
}

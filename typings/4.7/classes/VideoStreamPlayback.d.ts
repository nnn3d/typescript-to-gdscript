// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Internal class used by {@link VideoStream} to manage playback state when played from a {@link VideoStreamPlayer}.
 */
declare class VideoStreamPlayback extends Resource {
  /** Returns the number of audio channels. */
  _get_channels(): int;
  /** Returns the video duration in seconds, if known, or 0 if unknown. */
  _get_length(): float;
  /** Returns the audio sample rate used for mixing. */
  _get_mix_rate(): int;
  /**
   * Return the current playback timestamp. Called in response to the {@link VideoStreamPlayer.stream_position} getter.
   */
  _get_playback_position(): float;
  /** Allocates a {@link Texture2D} in which decoded video frames will be drawn. */
  _get_texture(): Texture2D;
  /** Returns the paused status, as set by {@link _set_paused}. */
  _is_paused(): boolean;
  /** Returns the playback state, as determined by calls to {@link _play} and {@link _stop}. */
  _is_playing(): boolean;
  /**
   * Called in response to {@link VideoStreamPlayer.autoplay} or {@link VideoStreamPlayer.play}. Note that manual playback may also invoke {@link _stop} multiple times before this method is called. {@link _is_playing} should return `true` once playing.
   */
  _play(): void;
  /**
   * Seeks to `time` seconds. Called in response to the {@link VideoStreamPlayer.stream_position} setter.
   */
  _seek(time: float): void;
  /**
   * Select the audio track `idx`. Called when playback starts, and in response to the {@link VideoStreamPlayer.audio_track} setter.
   */
  _set_audio_track(idx: int): void;
  /**
   * Set the paused status of video playback. {@link _is_paused} must return `paused`. Called in response to the {@link VideoStreamPlayer.paused} setter.
   */
  _set_paused(paused: boolean): void;
  /**
   * Stops playback. May be called multiple times before {@link _play}, or in response to {@link VideoStreamPlayer.stop}. {@link _is_playing} should return `false` once stopped.
   */
  _stop(): void;
  /**
   * Ticks video playback for `delta` seconds. Called every frame as long as both {@link _is_paused} and {@link _is_playing} return `true`.
   */
  _update(delta: float): void;
  /**
   * Render `num_frames` audio frames (of {@link _get_channels} floats each) from `buffer`, starting from index `offset` in the array. Returns the number of audio frames rendered, or -1 on error.
   */
  mix_audio(num_frames: int, buffer?: PackedFloat32Array, offset?: int): int;
}

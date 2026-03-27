// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract class for non-real-time video recording encoders. */
declare class MovieWriter extends GodotObject {
  /**
   * Called when the audio sample rate used for recording the audio is requested by the engine. The value returned must be specified in Hz. Defaults to 48000 Hz if {@link _get_audio_mix_rate} is not overridden.
   */
  _get_audio_mix_rate(): int;
  /**
   * Called when the audio speaker mode used for recording the audio is requested by the engine. This can affect the number of output channels in the resulting audio file/stream. Defaults to {@link AudioServer.SPEAKER_MODE_STEREO} if {@link _get_audio_speaker_mode} is not overridden.
   */
  _get_audio_speaker_mode(): int;
  /**
   * Called when the engine determines whether this {@link MovieWriter} is able to handle the file at `path`. Must return `true` if this {@link MovieWriter} is able to handle the given file path, `false` otherwise. Typically, {@link _handles_file} is overridden as follows to allow the user to record a file at any path with a given file extension:
   */
  _handles_file(path: string): boolean;
  /**
   * Called once before the engine starts writing video and audio data. `movie_size` is the width and height of the video to save. `fps` is the number of frames per second specified in the project settings or using the `--fixed-fps <fps>` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  _write_begin(movie_size: Vector2i, fps: int, base_path: string): int;
  /**
   * Called when the engine finishes writing. This occurs when the engine quits by pressing the window manager's close button, or when {@link SceneTree.quit} is called.
   * **Note:** Pressing `Ctrl + C` on the terminal running the editor/project does *not* result in {@link _write_end} being called.
   */
  _write_end(): void;
  /**
   * Called at the end of every rendered frame. The `frame_image` and `audio_frame_block` function arguments should be written to.
   */
  _write_frame(frame_image: Image, audio_frame_block: void): int;
  /**
   * Adds a writer to be usable by the engine. The supported file extensions can be set by overriding {@link _handles_file}.
   * **Note:** {@link add_writer} must be called early enough in the engine initialization to work, as movie writing is designed to start at the same time as the rest of the engine.
   */
  static add_writer(writer: MovieWriter): void;
}

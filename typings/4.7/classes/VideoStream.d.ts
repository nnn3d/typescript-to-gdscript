// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base resource for video streams. */
declare class VideoStream extends Resource {
  /**
   * The video file path or URI that this {@link VideoStream} resource handles.
   * For {@link VideoStreamTheora}, this filename should be an Ogg Theora video file with the `.ogv` extension.
   */
  file: string;

  /**
   * Called when the video starts playing, to initialize and return a subclass of {@link VideoStreamPlayback}.
   */
  _instantiate_playback(): VideoStreamPlayback;
}

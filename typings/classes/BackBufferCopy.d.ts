// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node that copies a region of the screen to a buffer for access in shader code. */
declare class BackBufferCopy extends Node2D {
  /** Buffer mode. */
  copy_mode: int;
  /**
   * The area covered by the {@link BackBufferCopy}. Only used if {@link copy_mode} is {@link COPY_MODE_RECT}.
   */
  rect: Rect2;
  set_copy_mode(value: int): void;
  get_copy_mode(): int;
  set_rect(value: Rect2 | Rect2i): void;
  get_rect(): Rect2;

  // enum CopyMode
  /**
   * Disables the buffering mode. This means the {@link BackBufferCopy} node will directly use the portion of screen it covers.
   */
  static readonly COPY_MODE_DISABLED: int;
  /** {@link BackBufferCopy} buffers a rectangular region. */
  static readonly COPY_MODE_RECT: int;
  /** {@link BackBufferCopy} buffers the entire screen. */
  static readonly COPY_MODE_VIEWPORT: int;
}

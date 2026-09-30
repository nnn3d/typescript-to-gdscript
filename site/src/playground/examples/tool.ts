// Class decorators become class annotations, like `@tool`.
@tool
export class Ring extends Node2D {
  @export_group('Shape')
  @export_range(1, 64) segments: int = 32;
  @exports radius: float = 40.0;

  @export_group('Look')
  @exports color: Color = Color.WHITE;

  _process(_delta: float) {
    // Runs in the editor too, so the ring updates while you tweak it.
    this.queue_redraw();
  }

  _draw() {
    this.draw_arc(
      Vector2.ZERO,
      this.radius,
      0.0,
      TAU,
      this.segments,
      this.color,
    );
  }
}

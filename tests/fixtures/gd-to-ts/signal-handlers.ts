export class _SignalHandlers extends Area2D {
  _on_area_entered(area: Area2D) {
    print(area);
  }

  _on_body_shape_entered(body_rid: RID, body: Node2D, body_shape_index: int, local_shape_index: int) {
    print(body);
  }

  _on_timer_timeout() {
    print("timeout");
  }

  already_typed(area: Node2D) {
    print(area);
  }
}

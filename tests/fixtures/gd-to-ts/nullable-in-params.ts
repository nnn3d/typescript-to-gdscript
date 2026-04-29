export class NullableInParams extends Node {
  take_node(node: Node | null): void {
  }

  take_value(v: Vector2): void {
  }

  take_primitive(x: int): void {
  }

  take_string(s: string): void {
  }

  mixed(a: int, b: Node | null, c: Color, d: Resource | null): void {
  }

  take_packed(arr: PackedStringArray): void {
  }

  take_signal(s: Signal): void {
  }

  take_callable(cb: Callable): void {
  }

  default_non_null(node: Node | null = this): void {
  }

  lambda_user(): void {
    let cb = (n: Node2D | null) => { print(n); };
  }

  _ready(): void {
  }
}

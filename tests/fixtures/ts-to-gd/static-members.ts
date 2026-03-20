export default class MyClass extends Node {
  static MAX_SPEED: float = 200.0;
  static instance_count: int = 0;

  static get_max_speed(): float {
    return MyClass.MAX_SPEED;
  }

  static increment_count() {
    MyClass.instance_count += 1;
  }
}

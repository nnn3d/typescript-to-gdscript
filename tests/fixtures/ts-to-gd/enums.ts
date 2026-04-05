export class MyClass extends Node {
  static Direction = gd.enum("UP", "DOWN", "LEFT", "RIGHT");
  static State = gd.enum("IDLE", "WALKING", ["RUNNING", 5]);

  static Weapon = class extends Node {
    damage: int = 10;
  };

  current_direction: int = 0;
  current_state: int = 0;

  set_direction(dir: int) {
    this.current_direction = dir;
    return MyClass.Direction.LEFT || MyClass.State.IDLE;
  }

  test_typed(s: MyClass.State, w: MyClass.Weapon) {
    let state: MyClass.State = MyClass.State.IDLE;
  }
}

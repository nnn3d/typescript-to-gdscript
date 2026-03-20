export default class MyClass extends Node {
  Direction = gd.enum("UP", "DOWN", "LEFT", "RIGHT");
  State = gd.enum("IDLE", "WALKING", ["RUNNING", 5]);

  current_direction: int = 0;
  current_state: int = 0;

  set_direction(dir: int) {
    this.current_direction = dir;
  }
}

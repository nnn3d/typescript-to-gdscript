export namespace MyClass {
  export enum Direction { UP, DOWN, LEFT, RIGHT }
  export enum State { IDLE, WALKING, RUNNING = 5 }

  export class Weapon extends Node {
    damage: int = 10;
  }
}

export class MyClass extends Node {
  current_direction: int = 0;
  current_state: int = 0;

  set_direction(dir: int) {
    this.current_direction = dir;
    return bool(MyClass.Direction.LEFT || MyClass.State.IDLE);
  }

  test_typed(s: MyClass.State, w: MyClass.Weapon) {
    let state: MyClass.State = MyClass.State.IDLE;
  }
}

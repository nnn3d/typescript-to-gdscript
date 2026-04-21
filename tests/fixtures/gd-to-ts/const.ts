export namespace ConstClass {
  export const MAX_HP = 100;
}

export class ConstClass extends Node {
  get_health() {
    return ConstClass.MAX_HP;
  }
}

export class InvalidClass extends Node {
  _ready() {
    for (let key in this) {
      print(key);
    }
  }
}

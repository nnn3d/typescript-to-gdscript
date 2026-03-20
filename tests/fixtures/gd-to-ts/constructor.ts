export default class Constructor extends RefCounted {
  name: string;
  hp: int;

  constructor(name: string, hp: int = 100) {
    this.name = name;
    this.hp = hp;
    print("created: ", name);
  }
}

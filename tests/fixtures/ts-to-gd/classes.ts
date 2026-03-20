export default class Animal extends RefCounted {
  name: string = "";
  sound: string = "";

  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  speak(): string {
    return this.name + " says " + this.sound;
  }
}

export class Animal extends RefCounted {
  name: string = '';
  sound: string = '';

  speak(): string {
    return this.name + ' says ' + this.sound;
  }
}

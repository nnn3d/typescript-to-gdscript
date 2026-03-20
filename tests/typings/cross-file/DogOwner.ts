export default class DogOwner extends Node {
  owner_name: string = '';
  dog: Dog = null!;

  greet(): string {
    // @ts-expect-error __CLASS__ should not be global
    __CLASS__.name;

    return this.owner_name + ' owns ' + this.dog.bark();
  }
}

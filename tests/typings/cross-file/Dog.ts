export default class Dog extends Animal {
  breed: string = "";

  bark(): string {
    return this.speak() + " woof!";
  }
}

export class MyClass extends RefCounted {
  value: int = 0;
  label: string = "";

  constructor(value: int, label: string = "default") {
    this.value = value;
    this.label = label;
  }

  get_info(): string {
    return this.label + ": " + str(this.value);
  }
}

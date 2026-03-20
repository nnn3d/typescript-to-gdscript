export default class MyClass extends Node {
  async do_something() {
    print("Start");
    await this.get_tree().create_timer(1.0).timeout;
    print("After 1 second");
  }

  async complex_async() {
    let result = await this.long_task();
    print(result);
  }

  async long_task(): int {
    await this.get_tree().create_timer(2.0).timeout;
    return 42;
  }
}

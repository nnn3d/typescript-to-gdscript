export class AwaitCoroutines extends Node {
  async no_return() {
    print("Start");
    await this.get_tree().create_timer(1.0).timeout;
    print("After 1 second");
  }

  async with_return(): Promise<int> {
    await this.get_tree().create_timer(2.0).timeout;
    return 42;
  }

  async nested_await(): Promise<string> {
    let result: int = await this.with_return();
    return str(result);
  }

  sync_fn(): int {
    return 7;
  }

  sync_fn_no_type() {
    return;
  }

  use_lambda() {
    let f = async (x: int): Promise<int> => {
    await this.get_tree().create_timer(0.1).timeout;
    return x + 1;
  };
    let g = (x: int): int => x * 2;
  }
}

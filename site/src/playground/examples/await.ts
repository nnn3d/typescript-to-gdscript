// `async`/`await` become GDScript coroutines; `Promise<T>` unwraps to `T`.
export class Countdown extends Label {
  finished = gd.signal();

  async start(from: int) {
    for (let n of range(from, 0, -1)) {
      this.text = str(n);
      await this.get_tree().create_timer(1.0).timeout;
    }
    this.text = 'Go!';
    this.finished.emit();
  }

  async load_level(): Promise<int> {
    await this.finished;
    return 1;
  }
}

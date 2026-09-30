// `await signal` resolves to what Godot returns: null with no arguments,
// the value itself with one, an Array of them with more (verified against
// Godot 4.7). The types come from a private `then` on Signal.

type SignalAwaitSame<A, B> =
  (<X>() => X extends A ? 1 : 2) extends <X>() => X extends B ? 1 : 2
    ? true
    : false;
function expectSignalAwait<T extends true>() {}

class SignalAwaitTest extends Node {
  none = gd.signal<[]>();
  one = gd.signal<[amount: int]>();
  two = gd.signal<[a: int, b: string]>();
  // Optional arguments: the result depends on how many the emit passes.
  maybe = gd.signal<[when?: int]>();
  tail = gd.signal<[a: int, b?: string]>();
  tails = gd.signal<[a: int, b?: string, c?: bool]>();
  // No type argument: no arguments, like `signal name` in GDScript.
  bare = gd.signal();
  // An array rather than a tuple: the arity is unknown.
  untyped = gd.signal<unknown[]>();

  async run() {
    let none = await this.none;
    expectSignalAwait<SignalAwaitSame<typeof none, null>>();

    let one = await this.one;
    expectSignalAwait<SignalAwaitSame<typeof one, int>>();

    let two = await this.two;
    expectSignalAwait<SignalAwaitSame<typeof two, [a: int, b: string]>>();

    let maybe = await this.maybe;
    expectSignalAwait<SignalAwaitSame<typeof maybe, int | null>>();

    let tail = await this.tail;
    expectSignalAwait<SignalAwaitSame<typeof tail, int | [int, string]>>();

    let tails = await this.tails;
    expectSignalAwait<
      SignalAwaitSame<typeof tails, int | [int, string] | [int, string, bool]>
    >();

    let bare = await this.bare;
    expectSignalAwait<SignalAwaitSame<typeof bare, null>>();

    let untyped = await this.untyped;
    expectSignalAwait<SignalAwaitSame<typeof untyped, unknown>>();

    // An engine signal with no arguments.
    let timeout = await this.get_tree().create_timer(1.0).timeout;
    expectSignalAwait<SignalAwaitSame<typeof timeout, null>>();

    // @ts-expect-error — GDScript signals have no `then`
    this.one.then(() => {});

    // Private members do not narrow what a Signal is assignable to.
    let general: Signal = this.one;
    let wide: Signal<any[]> = this.two;
    print(general, wide);

    // KNOWN, ACCEPTED GAP: TypeScript unwraps thenables repeatedly, so a
    // coroutine returning a Signal awaits to the signal's value. At runtime
    // Godot gives that only if the coroutine returned without pausing; if it
    // paused, `await` gives the Signal object. Pinned so a change is noticed.
    let returned = await this.returns_signal();
    expectSignalAwait<SignalAwaitSame<typeof returned, int>>();
  }

  async returns_signal(): Promise<Signal<[amount: int]>> {
    await this.get_tree().process_frame;
    return this.one;
  }
}

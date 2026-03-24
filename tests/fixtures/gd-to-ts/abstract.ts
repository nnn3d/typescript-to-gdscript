export abstract class AbstractBase extends Node {
  abstract process_item(item: string): string;

  concrete_method() {
    return 42;
  }

  @abstract
  static InnerAbstract = class {
    @abstract
    do_something(): void {
    }
  }
}

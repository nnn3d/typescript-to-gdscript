export namespace AbstractBase {
  export abstract class InnerAbstract {
    abstract do_something(): void;
  }
}

export abstract class AbstractBase extends Node {
  abstract process_item(item: string): string;

  concrete_method() {
    return 42;
  }
}

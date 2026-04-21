export namespace Foo {
  const UNEXPORTED = 1;
  export const EXPORTED = 2;
}

export class Foo extends Node {
  value: int = Foo.EXPORTED;
}

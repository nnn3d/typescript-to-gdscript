export namespace Foo {
  export const MAX_HEALTH = 100;
  export enum State { IDLE, RUNNING }
}

export class Foo extends Node {
  hp: int = 0;
}

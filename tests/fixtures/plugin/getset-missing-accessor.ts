export class __CLASS__ extends Node {
  a: int = gd.getset({
    value: 10,
    get: () => {
      return this.a;
    },
  });
}

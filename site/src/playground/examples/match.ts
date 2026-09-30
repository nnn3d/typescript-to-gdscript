// A `switch` becomes a GDScript `match`.
export class Describer extends Node {
  describe(value: int): string {
    switch (value) {
      case 0:
        return 'zero';
      case 1:
      case 2:
        return 'small';
      default:
        return 'large';
    }
  }
}

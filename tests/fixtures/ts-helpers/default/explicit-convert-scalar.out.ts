// A variant conversion into a scalar names the Godot type: `boolean` and
// `string` are no values `gd.as` can take. A number target gets no fix at
// all: `int` and `float` both reach TypeScript as `number`, so the cast
// could not say which one the slot wants.
function wants_bool(v: bool): void {}
function wants_string(v: string): void {}
function wants_float(v: float): void {}
function wants_int(v: int): void {}

export class TestExplicitScalar extends Node {
  test(n: float, path: NodePath, flag: bool, text: string): void {
    wants_bool(gd.as(n, bool));
    wants_string(gd.as(path, String));
    wants_float(flag);
    wants_int(text);
  }
}

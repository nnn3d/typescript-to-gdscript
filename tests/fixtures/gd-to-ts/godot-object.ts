export namespace GodotObjectTypes {
  export class Inner extends GodotObject {}
}

export class GodotObjectTypes extends Node {
  // TypeScript already owns `Object`, so the typings call Godot's base class
  // `GodotObject`. TS's own `Object` type is the plain-object interface, so
  // every type position has to say `GodotObject`.
  got = gd.signal<[o: GodotObject | null]>();
  held: GodotObject = null;
  many: Array<GodotObject> = [];
  by_name: Dictionary<string, GodotObject> = {};

  take(o: GodotObject | null): GodotObject {
    let local: GodotObject = o;
    let pick = (x: GodotObject | null): GodotObject => x;
    print(pick);
    return local;
  }

  as_values(x: Node | null): void {
    // As a value, `Object` is the engine class in TypeScript too.
    let made = new Object();
    let is_obj = x instanceof Object;
    let cast = gd.as(x, Object);
    let flag = Object.CONNECT_DEFERRED;
    print(made, is_obj, cast, flag);
  }
}

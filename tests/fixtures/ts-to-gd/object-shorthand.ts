export class ObjectShorthand extends Node {
  make_dict(param: int) {
    let local: int = 2;
    return {
      single: { local },
      explicit: param,
      local,
      nested: { param, local },
      GodotObject,
    };
  }

  shadow(GodotObject: int) {
    return { GodotObject };
  }
}

// Phase D parameter narrowing. Params emitted as `T | null` get narrowed
// back to `T` when the body uses them as non-null (TS2531 / TS18047).
// Setter value params are excluded to keep getter/setter symmetric.
export class TestParamNarrow extends Node2D {
  // Body dereferences `node` → narrow to `Node`.
  name_of(node: Node): string {
    return node.name;
  }

  // Body null-checks → keep nullish.
  safe_name(node: Node | null): string {
    if (!node) return "";
    return node.name;
  }

  // Body just returns param (no access) → keep nullish.
  identity(node: Node | null): Node | null {
    return node;
  }

  // Multiple params: only the dereferenced one narrows.
  use_a(a: Node, b: Node | null): string {
    return a.name;
  }

  // Mixed case — ordering check. Body dereferences `node` (Phase D narrows)
  // AND returns null (Phase C widens). Phase C runs first each pass so the
  // widened return survives; Phase D narrows the param.
  action(node: Node): Node | null {
    let parent = node.get_parent();
    if (!parent) return null;
    return parent;
  }

  // Leading-null variant — narrower strips the leading `null |`.
  greet(node: Node): string {
    return node.name;
  }

  // Phase D must NOT narrow setter value params (would desync from getter).
  get anchor(): Node | null {
    return this.anchor;
  }
  set anchor(value: Node | null) {
    this.anchor = value;
    value.queue_free();
  }

  // Return widens based on original nullish param (Phase C), param stays
  // nullish because body doesn't deref (Phase D no-op).
  passthrough(node: Node | null): Node | null {
    return node;
  }
}

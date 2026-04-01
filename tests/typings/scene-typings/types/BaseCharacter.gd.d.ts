// AUTO-GENERATED — do not edit manually.

import type { BaseCharacter as ScriptClass } from "../BaseCharacter.js";

// BaseCharacter is a base class without its own scene tree.
// Tree typing for base classes is not yet supported — subclass scripts
// (Player.gd, Enemy.gd) get their own tree augmentations instead.

declare global {
  /** @see import("../BaseCharacter.ts") */
  class BaseCharacter extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): Node;
  }

  interface _GodotScripts {
    "res://BaseCharacter.gd": BaseCharacter;
  }

  interface GodotResources {
    "res://BaseCharacter.gd": typeof BaseCharacter;
  }
}

export {};

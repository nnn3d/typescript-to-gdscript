// AUTO-GENERATED — do not edit manually.

import type { BaseCharacter as _BaseCharacter } from "../BaseCharacter.js";

export interface _BaseCharacterSceneNodes {
  [__children]: [_BaseCharacterSceneNodes["Sprite2D"], _BaseCharacterSceneNodes["HitBox"], _BaseCharacterSceneNodes["CollisionShape2D"], _BaseCharacterSceneNodes["HealthBar"]];
  "Sprite2D": Sprite2D<{[__parent]: _BaseCharacter; [__children]: [AnimationPlayer<{[__parent]: _BaseCharacterSceneNodes["Sprite2D"]}>]; "AnimationPlayer": AnimationPlayer<{[__parent]: _BaseCharacterSceneNodes["Sprite2D"]}>}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _BaseCharacterSceneNodes["Sprite2D"]}>;
  "HitBox": Area2D<{[__parent]: _BaseCharacter; [__children]: [CollisionShape2D<{[__parent]: _BaseCharacterSceneNodes["HitBox"]}> | null]; "CollisionShape2D": CollisionShape2D<{[__parent]: _BaseCharacterSceneNodes["HitBox"]}> | null}> | null;
  "HitBox/CollisionShape2D": CollisionShape2D<{[__parent]: _BaseCharacterSceneNodes["HitBox"]}> | null;
  "CollisionShape2D": CollisionShape2D<{[__parent]: _BaseCharacter}> | null;
  "HealthBar": ProgressBar<{[__parent]: _BaseCharacter}> | null;
  "%HealthBar": ProgressBar<{[__parent]: _BaseCharacter}> | null;
}

declare module "../BaseCharacter.ts" {
  interface BaseCharacter {
    get_node<P extends string & _GDGetTreePaths<_BaseCharacterSceneNodes>>(path: P): _GDGetNode<_BaseCharacterSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_BaseCharacterSceneNodes>>(path: P): _GDGetNode<_BaseCharacterSceneNodes, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_BaseCharacterSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_BaseCharacterSceneNodes>>>(idx: Idx): _GDGetChild<_BaseCharacterSceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<_BaseCharacterParents>;
  }
}

declare global {
  // From: BaseCharacter.ts
  class BaseCharacter extends _BaseCharacter {}
  interface _BaseCharacterParents {}
  interface GodotResources {
    "res://BaseCharacter.gd": typeof _BaseCharacter;
  }
}

export {};

// AUTO-GENERATED — do not edit manually.

import type { BaseCharacter as _BaseCharacter } from "../BaseCharacter.js";

export interface _BaseCharacterSceneNodes {
  "Sprite2D": Sprite2D<{[__parent]: _BaseCharacter}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: Sprite2D}>;
  "HitBox": Area2D<{[__parent]: _BaseCharacter}> | null;
  "HitBox/CollisionShape2D": CollisionShape2D<{[__parent]: Area2D}> | null;
  "CollisionShape2D": CollisionShape2D<{[__parent]: _BaseCharacter}> | null;
  "HealthBar": ProgressBar<{[__parent]: _BaseCharacter}> | null;
  "%HealthBar": ProgressBar<{[__parent]: _BaseCharacter}> | null;
}

declare module "../BaseCharacter.ts" {
  interface BaseCharacter {
    get_node<P extends string & _GDGetTreePaths<_BaseCharacterSceneNodes>>(path: P): _GDGetNode<_BaseCharacterSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends keyof _BaseCharacterSceneNodes>(path: P): _BaseCharacterSceneNodes[P] | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_BaseCharacterSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
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

// AUTO-GENERATED — do not edit manually.

import type { Enemy as _Enemy } from "../Enemy.js";

export interface _EnemyTscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _Enemy}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: Sprite2D}>;
  "HitBox": Area2D<{[__parent]: _Enemy}>;
  "HitBox/CollisionShape2D": CollisionShape2D<{[__parent]: Area2D}>;
}

declare global {
  interface GodotResources {
    "res://Enemy.tscn": PackedScene<_Enemy>;
  }
}

export {};

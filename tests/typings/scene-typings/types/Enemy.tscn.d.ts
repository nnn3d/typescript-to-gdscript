// AUTO-GENERATED — do not edit manually.

import type { Enemy as _Enemy } from "../Enemy.js";

export interface _EnemyTscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _Enemy; "AnimationPlayer": AnimationPlayer<{[__parent]: _EnemyTscn_Tree["Sprite2D"]}>}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _EnemyTscn_Tree["Sprite2D"]}>;
  "HitBox": Area2D<{[__parent]: _Enemy; "CollisionShape2D": CollisionShape2D<{[__parent]: _EnemyTscn_Tree["HitBox"]}>}>;
  "HitBox/CollisionShape2D": CollisionShape2D<{[__parent]: _EnemyTscn_Tree["HitBox"]}>;
}

declare global {
  interface GodotResources {
    "res://Enemy.tscn": PackedScene<_Enemy>;
  }
}

export {};

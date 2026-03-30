// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _Enemy } from "../Enemy.js";

export interface _EnemyTscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _Enemy; [__children]: [AnimationPlayer<{[__parent]: _EnemyTscn_Tree["Sprite2D"]}>]; "AnimationPlayer": AnimationPlayer<{[__parent]: _EnemyTscn_Tree["Sprite2D"]}>}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _EnemyTscn_Tree["Sprite2D"]}>;
  "HitBox": Area2D<{[__parent]: _Enemy; [__children]: [CollisionShape2D<{[__parent]: _EnemyTscn_Tree["HitBox"]}>]; "CollisionShape2D": CollisionShape2D<{[__parent]: _EnemyTscn_Tree["HitBox"]}>}>;
  "HitBox/CollisionShape2D": CollisionShape2D<{[__parent]: _EnemyTscn_Tree["HitBox"]}>;
}

declare global {
  interface GodotResources {
    "res://Enemy.tscn": PackedScene<_Enemy>;
  }
}

export {};

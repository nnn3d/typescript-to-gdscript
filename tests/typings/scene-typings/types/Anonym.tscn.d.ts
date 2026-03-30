// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _Anonym } from "../Anonym.js";

export interface _AnonymTscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _Anonym; "AnimationPlayer": AnimationPlayer<{[__parent]: _AnonymTscn_Tree["Sprite2D"]}>}>;
  "CollisionShape2D": CollisionShape2D<{[__parent]: _Anonym}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _AnonymTscn_Tree["Sprite2D"]}>;
}

declare global {
  interface GodotResources {
    "res://Anonym.tscn": PackedScene<_Anonym>;
  }
}

export {};

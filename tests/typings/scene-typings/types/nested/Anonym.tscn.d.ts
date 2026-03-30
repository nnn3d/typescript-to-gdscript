// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _nested_Anonym } from "../../nested/Anonym.js";

export interface _nested_AnonymTscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _nested_Anonym; [__children]: [AnimationPlayer<{[__parent]: _nested_AnonymTscn_Tree["Sprite2D"]}>]; "AnimationPlayer": AnimationPlayer<{[__parent]: _nested_AnonymTscn_Tree["Sprite2D"]}>}>;
  "CollisionShape2D": CollisionShape2D<{[__parent]: _nested_Anonym}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _nested_AnonymTscn_Tree["Sprite2D"]}>;
}

declare global {
  interface GodotResources {
    "res://nested/Anonym.tscn": PackedScene<_nested_Anonym>;
  }
}

export {};

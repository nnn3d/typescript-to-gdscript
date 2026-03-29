// AUTO-GENERATED — do not edit manually.

import type { Player as _Player } from "../Player.js";

export interface _PlayerTscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _Player}>;
  "CollisionShape2D": CollisionShape2D<{[__parent]: _Player}>;
  "Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: Sprite2D}>;
  "HealthBar": ProgressBar<{[__parent]: _Player}>;
  "%HealthBar": ProgressBar<{[__parent]: _Player}>;
}

declare global {
  interface GodotResources {
    "res://Player.tscn": PackedScene<_Player>;
  }
}

export {};

// AUTO-GENERATED — do not edit manually.

import type { Ball as _Ball } from "../Ball.js";

export interface _BallATscn_Tree {
  "Sprite2D": Sprite2D<{[__parent]: _Ball}>;
  "Label": Sprite2D<{[__parent]: _Ball}>;
  "Timer": Timer<{[__parent]: _Ball}>;
}

declare global {
  interface GodotResources {
    "res://BallA.tscn": PackedScene<_Ball>;
  }
}

export {};

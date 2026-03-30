// AUTO-GENERATED — do not edit manually.

import type { Level as _Level } from "../Level.js";
import type { _PlayerSceneNodes } from "./Player.gd.js";
import type { _EnemySceneNodes } from "./Enemy.gd.js";
import type { _TilesetObjectsTscn } from "./TilesetObjects.tscn.js";
import type { _Level2Tscn } from "./Level2.tscn.js";

export interface _ALevelTscn_Tree {
  "Player": Player & {[__script_tree]: _PlayerSceneNodes};
  "Enemy": Enemy & {[__script_tree]: _EnemySceneNodes};
  "TilesetObjects": _TilesetObjectsTscn;
  "Background": Sprite2D<{[__parent]: _Level}>;
  "UI": CanvasLayer<{[__parent]: _Level; "ScoreLabel": Label<{[__parent]: _ALevelTscn_Tree["UI"]; "ScoreSprite": Sprite2D<{[__parent]: _ALevelTscn_Tree["UI/ScoreLabel"]}>}>}>;
  "UI/ScoreLabel": Label<{[__parent]: _ALevelTscn_Tree["UI"]; "ScoreSprite": Sprite2D<{[__parent]: _ALevelTscn_Tree["UI/ScoreLabel"]}>}>;
  "UI/ScoreLabel/ScoreSprite": Sprite2D<{[__parent]: _ALevelTscn_Tree["UI/ScoreLabel"]}>;
  "TilesetObjectsMap": _TilesetObjectsTscn;
  "Level2": _Level2Tscn;
  "ExtraNode": Label<{[__parent]: _Level}>;
}

declare global {
  interface GodotResources {
    "res://ALevel.tscn": PackedScene<_Level>;
  }
}

export {};

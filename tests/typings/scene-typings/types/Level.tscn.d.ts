// AUTO-GENERATED — do not edit manually.

import type { Level as _Level } from "../Level.js";
import type { _PlayerSceneNodes } from "./Player.gd.js";
import type { _EnemySceneNodes } from "./Enemy.gd.js";
import type { _TilesetObjectsTscn } from "./TilesetObjects.tscn.js";
import type { _Level2Tscn } from "./Level2.tscn.js";

export interface _LevelTscn_Tree {
  "Player": Player & {[__script_tree]: _PlayerSceneNodes};
  "Enemy": Enemy & {[__script_tree]: _EnemySceneNodes};
  "TilesetObjects": _TilesetObjectsTscn;
  "Background": Sprite2D<{[__parent]: _Level}>;
  "UI": CanvasLayer<{[__parent]: _Level}>;
  "UI/ScoreLabel": Label<{[__parent]: CanvasLayer}>;
  "TilesetObjectsMap": _TilesetObjectsTscn;
  "Level2": _Level2Tscn;
}

declare global {
  interface GodotResources {
    "res://Level.tscn": PackedScene<_Level>;
  }
  interface _PlayerParents { "res://Level.tscn": _Level; }
  interface _EnemyParents { "res://Level.tscn": _Level; }
  interface _TilesetObjectsTscnParents { "res://Level.tscn": _Level; }
  interface _TilesetObjectsTscnParents { "res://Level.tscn": _Level; }
  interface _Level2TscnParents { "res://Level.tscn": _Level; }
}

export {};

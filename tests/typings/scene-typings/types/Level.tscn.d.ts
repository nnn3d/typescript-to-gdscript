// AUTO-GENERATED — do not edit manually.

type _LevelTscn_Background = {
  [__node_type]: Sprite2D;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
};

type _LevelTscn_UI_ScoreLabel_ScoreSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _LevelTscn_UI_ScoreLabel;
  [__node_children]: [];
};

type _LevelTscn_UI_ScoreLabel = {
  [__node_type]: Label;
  [__node_parent]: _LevelTscn_UI;
  [__node_children]: [_LevelTscn_UI_ScoreLabel_ScoreSprite];
  "ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;
};

type _LevelTscn_UI = {
  [__node_type]: CanvasLayer;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [_LevelTscn_UI_ScoreLabel];
  "ScoreLabel": _LevelTscn_UI_ScoreLabel;
  "ScoreLabel/ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;
};

type _PlayerTscn_Tree = _GodotSceneTrees["res://Player.tscn"];

type _EnemyTscn_Tree = _GodotSceneTrees["res://Enemy.tscn"];

type _TilesetObjectsTscn_Tree = _GodotSceneTrees["res://TilesetObjects.tscn"];

type _Level2Tscn_Tree = _GodotSceneTrees["res://Level2.tscn"];

type _LevelTscn_Tree = {
  [__node_root]: "Level";
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Level.gd">;
  [__node_parent]: _GDGetInterfaceParent<__LevelTscn__Parents>;
  [__node_children]: [_PlayerTscn_Tree, _EnemyTscn_Tree, _TilesetObjectsTscn_Tree, _LevelTscn_Background, _LevelTscn_UI, _TilesetObjectsTscn_Tree, _Level2Tscn_Tree];
  "Player": _PlayerTscn_Tree;
  "Enemy": _EnemyTscn_Tree;
  "TilesetObjects": _TilesetObjectsTscn_Tree;
  "Background": _LevelTscn_Background;
  "UI": _LevelTscn_UI;
  "UI/ScoreLabel": _LevelTscn_UI_ScoreLabel;
  "UI/ScoreLabel/ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;
  "TilesetObjectsMap": _TilesetObjectsTscn_Tree;
  "Level2": _Level2Tscn_Tree;
};

declare global {
  interface __LevelTscn__Parents {}

  interface __LevelGd__Trees {
    "res://Level.tscn": _LevelTscn_Tree;
  }

  // Instanced scene parents
  interface __PlayerTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __EnemyTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __TilesetObjectsTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __TilesetObjectsTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __Level2Tscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }

  interface _GodotSceneTrees {
    "res://Level.tscn": _LevelTscn_Tree;
  }
  interface GodotResources {
    "res://Level.tscn": PackedScene<_GDTreeNode<_LevelTscn_Tree>>;
  }

  interface GodotGroups {
    "res://Level.tscn": {
      "entities": _GodotSceneTrees["res://Player.tscn"] | _GodotSceneTrees["res://Enemy.tscn"];
      "damageable": _GodotSceneTrees["res://Player.tscn"] | _GodotSceneTrees["res://Enemy.tscn"] | _LevelTscn_Background;
    }
  }
}

export {}
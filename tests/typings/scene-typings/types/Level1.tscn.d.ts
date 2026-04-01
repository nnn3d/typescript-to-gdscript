// AUTO-GENERATED — do not edit manually.

type _Level1Tscn_Background = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level1Tscn_Tree;
  [__node_children]: [];
};

type _Level1Tscn_ScoreSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level1Tscn_ScoreLabel;
  [__node_children]: [];
};

type _Level1Tscn_ScoreLabel = {
  [__node_type]: Label;
  [__node_parent]: _Level1Tscn_UI;
  [__node_children]: [_Level1Tscn_ScoreSprite];
  "ScoreSprite": _Level1Tscn_ScoreSprite;
};

type _Level1Tscn_UI = {
  [__node_type]: CanvasLayer;
  [__node_parent]: _Level1Tscn_Tree;
  [__node_children]: [_Level1Tscn_ScoreLabel];
  "ScoreLabel": _Level1Tscn_ScoreLabel;
  "ScoreLabel/ScoreSprite": _Level1Tscn_ScoreSprite;
};

type _Level1Tscn_ExtraSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level1Tscn_Tree;
  [__node_children]: [];
};

type _Level1Tscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Level.gd">;
  [__node_parent]: _GDGetInterfaceParent<__Level1Tscn__Parents>;
  [__node_children]: [_PlayerTscn_Tree, _EnemyTscn_Tree, _TilesetObjectsTscn_Tree, _Level1Tscn_Background, _Level1Tscn_UI, _TilesetObjectsTscn_Tree, _Level2Tscn_Tree, _TilesetObjectsTscn_Tree, _Level1Tscn_ExtraSprite];
  "Player": _PlayerTscn_Tree;
  "Enemy": _EnemyTscn_Tree;
  "TilesetObjects": _TilesetObjectsTscn_Tree;
  "TilesetObjectsMap": _TilesetObjectsTscn_Tree;
  "Level2": _Level2Tscn_Tree;
  "TilesetObjects2": _TilesetObjectsTscn_Tree;
  "Background": _Level1Tscn_Background;
  "UI": _Level1Tscn_UI;
  "UI/ScoreLabel": _Level1Tscn_ScoreLabel;
  "UI/ScoreLabel/ScoreSprite": _Level1Tscn_ScoreSprite;
  "ExtraSprite": _Level1Tscn_ExtraSprite;
};

interface __Level1Tscn__Parents {}

interface __LevelGd__Trees {
  "res://Level1.tscn": _Level1Tscn_Tree;
}

// Instanced scene parents
interface __TilesetObjectsTscn__Parents { "res://Level1.tscn": _Level1Tscn_Tree; }

interface _GodotSceneTrees {
  "res://Level1.tscn": _Level1Tscn_Tree;
}
interface GodotResources {
  "res://Level1.tscn": PackedScene<TreeNode<_Level1Tscn_Tree>>;
}

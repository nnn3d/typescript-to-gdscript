// AUTO-GENERATED — do not edit manually.

type _PlayerTscn_UniqueNodes = {
  "%HealthBar": _PlayerTscn_HealthBar;
};

type _PlayerTscn_Sprite2D_AnimationPlayer = {
  [__node_type]: AnimationPlayer;
  [__node_parent]: _PlayerTscn_Sprite2D;
  [__node_children]: [];
  [__node_unique]: _PlayerTscn_UniqueNodes;
};

type _PlayerTscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: [_PlayerTscn_Sprite2D_AnimationPlayer];
  [__node_unique]: _PlayerTscn_UniqueNodes;
  "AnimationPlayer": _PlayerTscn_Sprite2D_AnimationPlayer;
};

type _PlayerTscn_CollisionShape2D = {
  [__node_type]: CollisionShape2D;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _PlayerTscn_UniqueNodes;
};

type _PlayerTscn_HealthBar_HealthLabel = {
  [__node_type]: Label;
  [__node_parent]: _PlayerTscn_HealthBar;
  [__node_children]: [];
  [__node_unique]: _PlayerTscn_UniqueNodes;
};

type _PlayerTscn_HealthBar = {
  [__node_type]: ProgressBar;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: [_PlayerTscn_HealthBar_HealthLabel];
  [__node_unique]: _PlayerTscn_UniqueNodes;
  "HealthLabel": _PlayerTscn_HealthBar_HealthLabel;
};

type _PlayerTscn_Tree = {
  [__node_root]: "Player";
  [__node_type]: _GDGetInterfaceNode<GodotScripts, "res://Player.gd">;
  [__node_parent]: _GDGetInterfaceParent<__PlayerTscn__Parents>;
  [__node_children]: [_PlayerTscn_Sprite2D, _PlayerTscn_CollisionShape2D, _PlayerTscn_HealthBar];
  [__node_unique]: _PlayerTscn_UniqueNodes;
  "Sprite2D": _PlayerTscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _PlayerTscn_Sprite2D_AnimationPlayer;
  "CollisionShape2D": _PlayerTscn_CollisionShape2D;
  "HealthBar": _PlayerTscn_HealthBar;
  "HealthBar/HealthLabel": _PlayerTscn_HealthBar_HealthLabel;
};

declare global {
  interface __PlayerTscn__Parents {}

  interface __PlayerGd__Trees {
    "res://Player.tscn": _PlayerTscn_Tree;
  }

  interface GodotSceneTrees {
    "res://Player.tscn": _PlayerTscn_Tree;
  }
  interface GodotResources {
    "res://Player.tscn": PackedScene<_GDTreeNode<_PlayerTscn_Tree>>;
  }
}

export {}
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

type _PlayerTscn_AttackTimer = {
  [__node_type]: Timer;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _PlayerTscn_UniqueNodes;
};

type _PlayerTscn_HitArea = {
  [__node_type]: Area2D;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _PlayerTscn_UniqueNodes;
};

type _PlayerTscn_Tree = {
  [__node_root]: "Player";
  [__node_type]: _GDGetInterfaceNode<GodotScripts, "res://Player.gd">;
  [__node_parent]: _GDGetInterfaceParent<__PlayerTscn__Parents>;
  [__node_children]: [_PlayerTscn_Sprite2D, _PlayerTscn_CollisionShape2D, _PlayerTscn_HealthBar, _PlayerTscn_AttackTimer, _PlayerTscn_HitArea];
  [__node_unique]: _PlayerTscn_UniqueNodes;
  "Sprite2D": _PlayerTscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _PlayerTscn_Sprite2D_AnimationPlayer;
  "CollisionShape2D": _PlayerTscn_CollisionShape2D;
  "HealthBar": _PlayerTscn_HealthBar;
  "HealthBar/HealthLabel": _PlayerTscn_HealthBar_HealthLabel;
  "AttackTimer": _PlayerTscn_AttackTimer;
  "HitArea": _PlayerTscn_HitArea;
};

declare global {
  interface __PlayerTscn__Parents {}

  interface __PlayerGd__Trees {
    "res://Player.tscn": _PlayerTscn_Tree;
  }

  interface GodotSceneTrees {
    "res://Player.tscn": _PlayerTscn_Tree;
  }
  interface GodotScenes {
    "res://Player.tscn": _GDTreeNode<_PlayerTscn_Tree>;
  }
  interface GodotResources {
    "res://Player.tscn": PackedScene<_GDTreeNode<_PlayerTscn_Tree>>;
  }
  interface GodotConnections {
    "res://Player.tscn": {
      "AttackTimer.timeout": _GDSignalConnection<
        Timer["timeout"],
        GodotScripts["res://Player.gd"]["_on_attack_timer_timeout"]
      >;
      "HitArea.area_entered": _GDSignalConnection<
        Area2D["area_entered"],
        GodotScripts["res://Player.gd"]["_on_hit_area_area_entered"]
      >;
    };
  }
}

export {}
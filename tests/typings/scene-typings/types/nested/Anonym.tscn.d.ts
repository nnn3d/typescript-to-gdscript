// AUTO-GENERATED — do not edit manually.

type _nested_AnonymTscn_Sprite2D_AnimationPlayer = {
  [__node_type]: AnimationPlayer;
  [__node_parent]: _nested_AnonymTscn_Sprite2D;
  [__node_children]: [];
};

type _nested_AnonymTscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _nested_AnonymTscn_Tree;
  [__node_children]: [_nested_AnonymTscn_Sprite2D_AnimationPlayer];
  "AnimationPlayer": _nested_AnonymTscn_Sprite2D_AnimationPlayer;
};

type _nested_AnonymTscn_CollisionShape2D = {
  [__node_type]: CollisionShape2D;
  [__node_parent]: _nested_AnonymTscn_Tree;
  [__node_children]: [];
};

type _nested_AnonymTscn_Tree = {
  [__node_root]: "Player";
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://nested/Anonym.gd">;
  [__node_parent]: _GDGetInterfaceParent<__nested_AnonymTscn__Parents>;
  [__node_children]: [_nested_AnonymTscn_Sprite2D, _nested_AnonymTscn_CollisionShape2D];
  "Sprite2D": _nested_AnonymTscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _nested_AnonymTscn_Sprite2D_AnimationPlayer;
  "CollisionShape2D": _nested_AnonymTscn_CollisionShape2D;
};

declare global {
  interface __nested_AnonymTscn__Parents {}

  interface __nested_AnonymGd__Trees {
    "res://nested/Anonym.tscn": _nested_AnonymTscn_Tree;
  }

  interface _GodotSceneTrees {
    "res://nested/Anonym.tscn": _nested_AnonymTscn_Tree;
  }
  interface GodotResources {
    "res://nested/Anonym.tscn": PackedScene<_GDTreeNode<_nested_AnonymTscn_Tree>>;
  }
}

export {}
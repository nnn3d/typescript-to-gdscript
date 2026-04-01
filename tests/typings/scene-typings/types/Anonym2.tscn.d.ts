// AUTO-GENERATED — do not edit manually.

type _Anonym2Tscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Anonym2Tscn_Tree;
  [__node_children]: [_Anonym2Tscn_AnimationPlayer];
  "AnimationPlayer": _Anonym2Tscn_AnimationPlayer;
};

type _Anonym2Tscn_AnimationPlayer = {
  [__node_type]: AnimationPlayer;
  [__node_parent]: _Anonym2Tscn_Sprite2D;
  [__node_children]: [];
};

type _Anonym2Tscn_CollisionShape2D = {
  [__node_type]: CollisionShape2D;
  [__node_parent]: _Anonym2Tscn_Tree;
  [__node_children]: [];
};

type _Anonym2Tscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Anonym2.gd">;
  [__node_parent]: _GDGetInterfaceParent<__Anonym2Tscn__Parents>;
  [__node_children]: [_Anonym2Tscn_Sprite2D, _Anonym2Tscn_CollisionShape2D];
  "Sprite2D": _Anonym2Tscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _Anonym2Tscn_AnimationPlayer;
  "CollisionShape2D": _Anonym2Tscn_CollisionShape2D;
};

interface __Anonym2Tscn__Parents {}

interface __Anonym2Gd__Trees {
  "res://Anonym2.tscn": _Anonym2Tscn_Tree;
}

interface _GodotScripts {
  "res://Anonym2.gd": Anonym2;
}

interface _GodotSceneTrees {
  "res://Anonym2.tscn": _Anonym2Tscn_Tree;
}
interface GodotResources {
  "res://Anonym2.tscn": PackedScene<TreeNode<_Anonym2Tscn_Tree>>;
}

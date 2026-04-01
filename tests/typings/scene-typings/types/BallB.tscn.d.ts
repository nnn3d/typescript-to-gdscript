// AUTO-GENERATED — do not edit manually.

type _BallBTscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _BallBTscn_Tree;
  [__node_children]: [];
};

type _BallBTscn_Label = {
  [__node_type]: Label;
  [__node_parent]: _BallBTscn_Tree;
  [__node_children]: [];
};

type _BallBTscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Ball.gd">;
  [__node_parent]: _GDGetInterfaceParent<__BallBTscn__Parents>;
  [__node_children]: [_BallBTscn_Sprite2D, _BallBTscn_Label];
  "Sprite2D": _BallBTscn_Sprite2D;
  "Label": _BallBTscn_Label;
};

interface __BallBTscn__Parents {}

interface __BallGd__Trees {
  "res://BallB.tscn": _BallBTscn_Tree;
}

interface _GodotSceneTrees {
  "res://BallB.tscn": _BallBTscn_Tree;
}
interface GodotResources {
  "res://BallB.tscn": PackedScene<TreeNode<_BallBTscn_Tree>>;
}

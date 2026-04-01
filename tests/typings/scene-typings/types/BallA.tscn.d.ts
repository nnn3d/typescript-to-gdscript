// AUTO-GENERATED — do not edit manually.

type _BallATscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _BallATscn_Tree;
  [__node_children]: [];
};

type _BallATscn_Label = {
  [__node_type]: Sprite2D;
  [__node_parent]: _BallATscn_Tree;
  [__node_children]: [];
};

type _BallATscn_Timer = {
  [__node_type]: Timer;
  [__node_parent]: _BallATscn_Tree;
  [__node_children]: [];
};

type _BallATscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Ball.gd">;
  [__node_parent]: _GDGetInterfaceParent<__BallATscn__Parents>;
  [__node_children]: [_BallATscn_Sprite2D, _BallATscn_Label, _BallATscn_Timer];
  "Sprite2D": _BallATscn_Sprite2D;
  "Label": _BallATscn_Label;
  "Timer": _BallATscn_Timer;
};

declare global {
  interface __BallATscn__Parents {}

  interface __BallGd__Trees {
    "res://BallA.tscn": _BallATscn_Tree;
  }

  interface _GodotSceneTrees {
    "res://BallA.tscn": _BallATscn_Tree;
  }
  interface GodotResources {
    "res://BallA.tscn": PackedScene<_GDTreeNode<_BallATscn_Tree>>;
  }
}

export {}

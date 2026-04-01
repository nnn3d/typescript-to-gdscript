// AUTO-GENERATED — do not edit manually.

type _ALevelTscn_ExtraNode = {
  [__node_type]: Label;
  [__node_parent]: _ALevelTscn_Tree;
  [__node_children]: [];
};

type _ALevelTscn_Tree = {
  [__node_root]: true;
  [__node_type]: Node;
  [__node_parent]: _GDGetInterfaceParent<__ALevelTscn__Parents>;
  [__node_children]: [_ALevelTscn_ExtraNode];
  "ExtraNode": _ALevelTscn_ExtraNode;
};

declare global {
  interface __ALevelTscn__Parents {}

  interface _GodotSceneTrees {
    "res://ALevel.tscn": _ALevelTscn_Tree;
  }
  interface GodotResources {
    "res://ALevel.tscn": PackedScene<_GDTreeNode<_ALevelTscn_Tree>>;
  }
}

export {}
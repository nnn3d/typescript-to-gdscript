// AUTO-GENERATED — do not edit manually.

type _ALevelTscn_ExtraNode = {
  [__node_type]: Label;
  [__node_parent]: _ALevelTscn_Tree;
  [__node_children]: [];
};

type _ALevelTscn_Tree = {
  [__node_extends]: GodotSceneTrees["res://Level.tscn"];
  [__node_root]: "ALevel";
  [__node_type]: _GDGetInterfaceNode<GodotScripts, "res://ALevel.gd">;
  [__node_parent]: _GDGetInterfaceParent<__ALevelTscn__Parents>;
  [__node_children]: [_ALevelTscn_ExtraNode];
  "ExtraNode": _ALevelTscn_ExtraNode;
};

declare global {
  interface __ALevelTscn__Parents {}

  interface __ALevelGd__Trees {
    "res://ALevel.tscn": _ALevelTscn_Tree;
  }

  interface GodotSceneTrees {
    "res://ALevel.tscn": _ALevelTscn_Tree;
  }
  interface GodotResources {
    "res://ALevel.tscn": PackedScene<_GDTreeNode<_ALevelTscn_Tree>>;
  }
}

export {}
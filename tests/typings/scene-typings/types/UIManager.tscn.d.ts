// AUTO-GENERATED — do not edit manually.

type _UIManagerTscn_HealthBar = {
  [__node_type]: ProgressBar;
  [__node_parent]: _UIManagerTscn_Tree;
  [__node_children]: [];

};

type _UIManagerTscn_Tree = {
  [__node_root]: "UIManager";
  [__node_type]: Control;
  [__node_parent]: _GDGetInterfaceParent<__UIManagerTscn__Parents>;
  [__node_children]: [_UIManagerTscn_HealthBar];

  "HealthBar": _UIManagerTscn_HealthBar;
};

declare global {
  interface __UIManagerTscn__Parents {}

  interface GodotSceneTrees {
    "res://UIManager.tscn": _UIManagerTscn_Tree;
  }
  interface GodotScenes {
    "res://UIManager.tscn": _GDTreeNode<_UIManagerTscn_Tree>;
  }
  interface GodotResources {
    "res://UIManager.tscn": PackedScene<_GDTreeNode<_UIManagerTscn_Tree>>;
  }
}

export {}
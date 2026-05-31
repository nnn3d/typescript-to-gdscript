// AUTO-GENERATED — do not edit manually.


declare global {
  interface GodotScripts {}
  interface GodotSceneTrees {}
  interface GodotScenes {}
  interface GodotResources {}
  interface GodotGroups {}
  interface GodotConnections {}

  type GodotScriptName = keyof GodotScripts;
  type GodotSceneTreeName = keyof GodotSceneTrees;
  type GodotSceneName = keyof GodotScenes;
  type GodotResourceName = keyof GodotResources;
  type GodotGroupName = keyof GodotGroups;
  type GodotConnectionSceneName = keyof GodotConnections;
  // Autoload singletons from project.godot
  const GameManager: GodotScripts["res://GameManager.gd"];
  const UIManager: _GDTreeNode<GodotSceneTrees["res://UIManager.tscn"]>;
}

export {};
// Static fields and methods become `static var` and `static func`.
export class Spawner extends Node {
  static spawned: int = 0;
  static MAX_SPAWNED: int = 50;

  static can_spawn(): boolean {
    return Spawner.spawned < Spawner.MAX_SPAWNED;
  }

  spawn(scene: PackedScene) {
    if (!Spawner.can_spawn()) {
      return;
    }
    this.add_child(scene.instantiate());
    Spawner.spawned += 1;
  }
}

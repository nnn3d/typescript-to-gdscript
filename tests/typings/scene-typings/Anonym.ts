export class __CLASS__ extends Node {
  static PlayerScript: typeof Player = preload('res://Player.gd');

  static TEST_ENUM = gd.enum('TEST', 'TEST2');
  static Inventory = class extends RefCounted {
    capacity: int = 10;
  };

  do_from_anonym() {
    // get_node_or_null normally returns T | null, but scene overload returns Sprite2D directly
    let sprite: Sprite2D | null = this.get_node_or_null('Sprite2D');
    let node_or_null: Node | null = this.get_node_or_null('Unknown');
    // get_node also has typed overload
    let collision: CollisionShape2D = this.get_node('CollisionShape2D');
    // Unknown path for get_node returns Node | null
    let unknown: Node | null = this.get_node('Unknown');

    let parent = this.get_parent();

    let levels: Level = parent.get_parent();

    // Namespace enum type from generated .gd.d.ts (branded number for anonymous classes)
    let enumTyped: __CLASS__.TEST_ENUM = this.TEST_ENUM.TEST;
    // @ts-expect-error — branded type prevents plain number assignment
    let enumTypedError: __CLASS__.TEST_ENUM = 42;
    let enumParam = (e: __CLASS__.TEST_ENUM) => e;

    let enumPlayerTyped: Player.TEST_ENUM = Player.TEST_ENUM.TEST;
    let classPlayerTyped = (e: Player.Inventory): number => e.capacity;
    let classPlayerStatic: string = this.PlayerScript.NAME;

    // Namespace inner class type from generated .gd.d.ts
    let inventory: __CLASS__.Inventory = new this.Inventory();
    let cap: int = inventory.capacity;
  }
}

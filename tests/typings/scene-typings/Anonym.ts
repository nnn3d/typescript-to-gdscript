import {
  TEST_ENUM as PlayerTestEnum,
  Inventory as PlayerInventory,
} from './Player.ts';

export enum TEST_ENUM { TEST, TEST2 }

export class Inventory extends RefCounted {
  capacity: int = 10;
}

export class __CLASS__ extends Node {
  static PlayerScript: typeof Player = preload('res://Player.gd');

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

    // File-scope enum: bare reference inside the script's own file.
    // (`this.X` works only with the plugin loaded.)
    let enumTyped: TEST_ENUM = TEST_ENUM.TEST;
    let enumParam = (e: TEST_ENUM) => e;

    // Cross-file file-scope enum / class: imported under aliases above.
    let enumPlayerTyped: PlayerTestEnum = PlayerTestEnum.TEST;
    let classPlayerTyped = (e: PlayerInventory): number => e.capacity;
    let classPlayerStatic: string = this.PlayerScript.NAME;

    // File-scope inner class: bare name inside the script's own file.
    let inventory: Inventory = new Inventory();
    let cap: int = inventory.capacity;
  }
}

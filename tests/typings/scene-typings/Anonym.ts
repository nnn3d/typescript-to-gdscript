import type { Player } from './Player.ts';

export class __CLASS__ extends Node {
  PlayerScript: typeof Player = preload('res://Player.gd');

  do_from_anonym() {
    // get_node_or_null normally returns T | null, but scene overload returns Sprite2D directly
    let sprite: Sprite2D | null = this.get_node_or_null('Sprite2D');
    let node_or_null: Node | null = this.get_node_or_null('Unknown');
    // get_node also has typed overload
    let collision: CollisionShape2D = this.get_node('CollisionShape2D');
    // Unknown path for get_node returns Node
    let unknown: Node = this.get_node('Unknown');
  }
}

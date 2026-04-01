import type {__CLASS__ as Enemy} from './Enemy.js'

export class ALevel extends Node2D {
  _ready() {
    // get_node for instanced scene root → script class with get_parent() intersection
    let player: Player = this.get_node('Player');

    // get_node for another instanced scene
    let enemy: Enemy = this.get_node('Enemy');

    // get_node for another instanced scene
    let label: Label = this.get_node('ExtraNode');
  }
}

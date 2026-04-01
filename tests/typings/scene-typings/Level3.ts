import type {__CLASS__ as Enemy} from './Enemy.js'

export class Level3 extends Node2D {
  _ready() {
    // Direct child of Level3
    let ownChild: Sprite2D = this.get_node('OwnChild');

    // Instanced extended scene root (ALevel extends Level)
    let alevel: ALevel = this.get_node('ALevel');

    // ALevel's OWN child (defined in ALevel.tscn, not in base Level.tscn)
    let extraNode: Label = this.get_node('ALevel/ExtraNode');

    // Deep path through __node_extends: ALevel → base Level.tscn → "Player"
    let player: Player = this.get_node('ALevel/Player');

    // Deep path through __node_extends: ALevel → base Level.tscn → "Enemy"
    let enemy: Enemy = this.get_node('ALevel/Enemy');

    // Deep path through __node_extends: ALevel → base Level.tscn → "Background"
    let bg: Sprite2D = this.get_node('ALevel/Background');

    // Deep path through __node_extends into nested nodes: ALevel → Level → "UI/ScoreLabel"
    let scoreLabel: Label = this.get_node('ALevel/UI/ScoreLabel');

    // Even deeper: ALevel → Level → UI → ScoreLabel → ScoreSprite
    let scoreSprite: Sprite2D = this.get_node('ALevel/UI/ScoreLabel/ScoreSprite');

    // Deep through extended scene → instanced scene → instanced scene's child:
    // ALevel → Level → Player (instanced, has __node_root) → HealthBar
    let healthBar: ProgressBar = this.get_node('ALevel/Player/HealthBar');

    let levelLabel: Label = this.get_node('ALevel/Level3Label');

    // get_parent on a node resolved through __node_extends returns the BASE scene's root type
    // (Player's [__node_parent] points to _LevelTscn_Tree, which is Level, not ALevel)
    let playerParent: Level = player.get_parent();
  }
}

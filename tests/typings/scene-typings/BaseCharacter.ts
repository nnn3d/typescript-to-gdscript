export class BaseCharacter extends CharacterBody2D {

  _ready() {
    // BaseCharacter has no tree typing (base class without own scene).
    // Subclasses (Player, Enemy) get typed trees from their own scenes.
    let sprite = this.get_node('Sprite2D');
    let _s: Node | null = sprite;

    let collision = this.get_node('CollisionShape2D');
    let _c: Node | null = collision;
  }
}

export class BaseCharacter extends CharacterBody2D {

  _ready() {
    // Sprite2D is in both Player and Enemy → typed, no null
    let sprite = this.get_node('Sprite2D');
    let _s: Sprite2D = sprite;

    // CollisionShape2D is only in Player → nullable
    let collision = this.get_node('CollisionShape2D');
    const _check: IsExact<typeof collision, CollisionShape2D | Node> = true;
  }
}

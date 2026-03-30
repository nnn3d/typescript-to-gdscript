export class __CLASS__ extends BaseCharacter {
  _ready() {
    // get_node for direct children
    let sprite = this.get_node('Sprite2D');
    let _s: Sprite2D = sprite;

    // get_node for nested path
    let anim = this.get_node('Sprite2D/AnimationPlayer');
    let _a: AnimationPlayer = anim;

    // get_parent() on a child node resolves to the script class
    let parent = sprite.get_parent();
    // parent should be Enemy (via [__parent] in Tree generic)
  }
}

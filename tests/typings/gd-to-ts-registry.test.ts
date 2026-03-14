import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { convertGdToTs } from '../../src/converter/gd-to-ts/index.js';
import { GodotClassRegistry, parseAllClassXmls, generateRegistryData } from '../../src/typings/godot-registry.js';

const GODOT_DOCS_DIR = join(__dirname, '../../vendor/godot/doc/classes');

function createRealRegistry(): GodotClassRegistry {
  const classes = parseAllClassXmls(GODOT_DOCS_DIR);
  const data = generateRegistryData(classes);
  return new GodotClassRegistry(data);
}

describe('GD-to-TS with Godot Registry', () => {
  it('should resolve inherited Node methods with this. prefix', () => {
    const registry = createRealRegistry();
    const source = `extends Node2D
class_name Player

var speed: float = 100.0

func _ready():
    add_child(Node.new())
    get_node("Sprite")
    print("ready")
`;

    const result = convertGdToTs({ source, filePath: 'Player.gd', registry });
    const lines = result.code.split('\n');

    // add_child is inherited from Node — should get this.
    expect(lines.some(l => l.includes('this.add_child('))).toBe(true);
    // get_node is inherited from Node — should get this.
    expect(lines.some(l => l.includes('this.get_node('))).toBe(true);
    // print is a global function — should NOT get this.
    expect(lines.some(l => l.includes('print("ready")'))).toBe(true);
    expect(lines.some(l => l.includes('this.print('))).toBe(false);
  });

  it('should resolve inherited properties as this. in identifiers', () => {
    const registry = createRealRegistry();
    const source = `extends Sprite2D
class_name MySprite

func update_pos():
    position = Vector2(10, 20)
    visible = true
    print(position)
`;

    const result = convertGdToTs({ source, filePath: 'MySprite.gd', registry });
    const lines = result.code.split('\n');

    // position is inherited from Node2D
    expect(lines.some(l => l.includes('this.position = Vector2(10, 20)'))).toBe(true);
    // visible is inherited from CanvasItem
    expect(lines.some(l => l.includes('this.visible = true'))).toBe(true);
  });

  it('should not add this. to global functions even when registry is provided', () => {
    const registry = createRealRegistry();
    const source = `extends Node
class_name Test

func run():
    print("hello")
    floori(1.5)
    abs(-1)
    var v = Vector2(1, 2)
    var c = Color(1, 0, 0)
    range(10)
`;

    const result = convertGdToTs({ source, filePath: 'Test.gd', registry });
    const code = result.code;

    expect(code).toContain('print("hello")');
    expect(code).toContain('floori(1.5)');
    expect(code).toContain('abs(-1)');
    expect(code).toContain('Vector2(1, 2)');
    expect(code).toContain('Color(1, 0, 0)');
    expect(code).toContain('range(10)');

    // None of these should have this.
    expect(code).not.toContain('this.print');
    expect(code).not.toContain('this.floori');
    expect(code).not.toContain('this.abs');
    expect(code).not.toContain('this.Vector2');
    expect(code).not.toContain('this.Color');
    expect(code).not.toContain('this.range');
  });

  it('should handle inner class with its own extends and inherited members', () => {
    const registry = createRealRegistry();
    const source = `extends Node
class_name Outer

func do_stuff():
    add_child(Node.new())

class Inner extends Sprite2D:
    func setup():
        position = Vector2.ZERO
        get_node("Child")
`;

    const result = convertGdToTs({ source, filePath: 'Outer.gd', registry });
    const lines = result.code.split('\n');

    // Outer: add_child from Node
    expect(lines.some(l => l.includes('this.add_child('))).toBe(true);
    // Inner: position from Node2D (via Sprite2D)
    expect(lines.some(l => l.includes('this.position = Vector2.ZERO'))).toBe(true);
    // Inner: get_node from Node
    expect(lines.some(l => l.includes('this.get_node("Child")'))).toBe(true);
  });

  it('should resolve class-specific members vs unknown bare calls', () => {
    const registry = createRealRegistry();
    const source = `extends Node
class_name ResolutionTest

func run():
    add_child(Node.new())
    some_unknown_func()
`;

    const result = convertGdToTs({ source, filePath: 'ResolutionTest.gd', registry });
    const code = result.code;

    // add_child is inherited from Node — should get this.
    expect(code).toContain('this.add_child(');
    // some_unknown_func is not a class member or global — should NOT get this.
    expect(code).not.toContain('this.some_unknown_func');
    expect(code).toContain('some_unknown_func()');
  });
});

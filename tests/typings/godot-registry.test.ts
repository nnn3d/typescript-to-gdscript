import { describe, it, expect } from 'vitest';
import { join } from 'path';
import {
  parseClassXml,
  parseAllClassXmls,
  generateRegistryData,
  GodotClassRegistry,
  parseGodotVersion,
} from '../../src/typings/godot-registry.js';

const GODOT_DOCS_DIR = join(__dirname, '../../vendor/godot/doc/classes');
const GODOT_VERSION_PY = join(__dirname, '../../vendor/godot/version.py');

describe('Godot Registry: XML Parsing', () => {
  it('should parse a class XML with methods, properties, signals', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<class name="TestClass" inherits="Node">
  <methods>
    <method name="do_stuff" qualifiers="virtual">
      <return type="void" />
      <param index="0" name="delta" type="float" />
    </method>
    <method name="get_value" qualifiers="const">
      <return type="int" />
    </method>
    <method name="create" qualifiers="static">
      <return type="TestClass" />
    </method>
  </methods>
  <members>
    <member name="speed" type="float" setter="set_speed" getter="get_speed" />
    <member name="name" type="String" />
  </members>
  <signals>
    <signal name="health_changed">
      <param index="0" name="new_health" type="int" />
    </signal>
    <signal name="died" />
  </signals>
  <constants>
    <constant name="MAX_SPEED" value="100" />
    <constant name="MODE_IDLE" value="0" enum="Mode" />
    <constant name="MODE_RUN" value="1" enum="Mode" />
  </constants>
</class>`;

    const cls = parseClassXml(xml);
    expect(cls).not.toBeNull();
    expect(cls!.name).toBe('TestClass');
    expect(cls!.inherits).toBe('Node');

    // Methods
    expect(cls!.methods).toHaveLength(3);
    expect(cls!.methods[0]!.name).toBe('do_stuff');
    expect(cls!.methods[0]!.isVirtual).toBe(true);
    expect(cls!.methods[0]!.parameters).toHaveLength(1);
    expect(cls!.methods[0]!.parameters[0]!.name).toBe('delta');
    expect(cls!.methods[0]!.parameters[0]!.type).toBe('float');
    expect(cls!.methods[1]!.name).toBe('get_value');
    expect(cls!.methods[1]!.isConst).toBe(true);
    expect(cls!.methods[2]!.isStatic).toBe(true);

    // Properties
    expect(cls!.properties).toHaveLength(2);
    expect(cls!.properties[0]!.name).toBe('speed');
    expect(cls!.properties[0]!.setter).toBe('set_speed');

    // Signals
    expect(cls!.signals).toHaveLength(2);
    expect(cls!.signals[0]!.name).toBe('health_changed');
    expect(cls!.signals[0]!.parameters).toHaveLength(1);
    expect(cls!.signals[1]!.name).toBe('died');

    // Constants and enums
    expect(cls!.constants).toHaveLength(3);
    expect(cls!.enums).toHaveLength(1);
    expect(cls!.enums[0]!.name).toBe('Mode');
    expect(cls!.enums[0]!.values).toHaveLength(2);
  });

  it('should parse @GlobalScope as global functions', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<class name="@GlobalScope">
  <methods>
    <method name="abs">
      <return type="Variant" />
      <param index="0" name="x" type="Variant" />
    </method>
    <method name="print" qualifiers="vararg">
      <return type="void" />
    </method>
  </methods>
  <constants>
    <constant name="PI" value="3.14159" />
    <constant name="KEY_A" value="65" enum="Key" />
    <constant name="KEY_B" value="66" enum="Key" />
  </constants>
</class>`;

    const cls = parseClassXml(xml);
    expect(cls).not.toBeNull();
    expect(cls!.name).toBe('@GlobalScope');
    expect(cls!.methods).toHaveLength(2);
    expect(cls!.methods[1]!.isVararg).toBe(true);
    expect(cls!.constants).toHaveLength(3);
    expect(cls!.enums).toHaveLength(1);
    expect(cls!.enums[0]!.name).toBe('Key');
  });
});

describe('Godot Registry: Registry Generation', () => {
  it('should generate registry data from parsed classes', () => {
    const classes = new Map();
    classes.set(
      '@GlobalScope',
      parseClassXml(`
<class name="@GlobalScope">
  <methods>
    <method name="print"><return type="void" /></method>
    <method name="abs"><return type="Variant" /><param index="0" name="x" type="Variant" /></method>
  </methods>
  <constants>
    <constant name="PI" value="3.14" />
  </constants>
</class>`)!,
    );

    classes.set(
      'Object',
      parseClassXml(`
<class name="Object">
  <methods>
    <method name="free"><return type="void" /></method>
    <method name="get_class"><return type="String" /></method>
  </methods>
</class>`)!,
    );

    classes.set(
      'Node',
      parseClassXml(`
<class name="Node" inherits="Object">
  <methods>
    <method name="add_child"><return type="void" /><param index="0" name="node" type="Node" /></method>
    <method name="get_node"><return type="Node" /><param index="0" name="path" type="NodePath" /></method>
    <method name="_ready" qualifiers="virtual"><return type="void" /></method>
  </methods>
  <members>
    <member name="name" type="StringName" />
  </members>
  <signals>
    <signal name="ready" />
    <signal name="tree_entered" />
  </signals>
</class>`)!,
    );

    classes.set(
      'Node2D',
      parseClassXml(`
<class name="Node2D" inherits="Node">
  <methods>
    <method name="rotate"><return type="void" /><param index="0" name="radians" type="float" /></method>
  </methods>
  <members>
    <member name="position" type="Vector2" />
    <member name="rotation" type="float" />
  </members>
</class>`)!,
    );

    const data = generateRegistryData(classes);

    // Global functions from @GlobalScope
    expect(data.globalFunctions).toContain('print');
    expect(data.globalFunctions).toContain('abs');

    // Global constants
    expect(data.globalConstants).toContain('PI');

    // @GlobalScope should NOT be in classes
    expect(data.classes['@GlobalScope']).toBeUndefined();

    // Regular classes
    expect(data.classes['Object']).toBeDefined();
    expect(data.classes['Node']).toBeDefined();
    expect(data.classes['Node2D']).toBeDefined();

    // Node inherits Object
    expect(data.classes['Node']!.inherits).toBe('Object');
    expect(data.classes['Node']!.methods).toContain('add_child');
    expect(data.classes['Node']!.methods).toContain('get_node');
    expect(data.classes['Node']!.properties).toContain('name');
    expect(data.classes['Node']!.signals).toContain('ready');
  });
});

describe('Godot Registry: GodotClassRegistry', () => {
  function createTestRegistry(): GodotClassRegistry {
    return new GodotClassRegistry({
      version: 'test',
      classes: {
        Object: {
          name: 'Object',
          inherits: null,
          methods: ['free', 'get_class', 'set', 'get', 'notification'],
          properties: [],
          signals: [],
          constants: ['NOTIFICATION_POSTINITIALIZE'],
          enums: [],
        },
        Node: {
          name: 'Node',
          inherits: 'Object',
          methods: [
            'add_child',
            'remove_child',
            'get_node',
            '_ready',
            '_process',
          ],
          properties: ['name', 'owner'],
          signals: ['ready', 'tree_entered', 'tree_exited'],
          constants: [],
          enums: [
            {
              name: 'ProcessMode',
              values: [{ name: 'PROCESS_MODE_INHERIT', value: '0' }],
            },
          ],
        },
        CanvasItem: {
          name: 'CanvasItem',
          inherits: 'Node',
          methods: ['draw', 'update', 'get_global_transform'],
          properties: ['visible', 'modulate'],
          signals: ['visibility_changed'],
          constants: [],
          enums: [],
        },
        Node2D: {
          name: 'Node2D',
          inherits: 'CanvasItem',
          methods: ['rotate', 'translate', 'look_at'],
          properties: ['position', 'rotation', 'scale', 'global_position'],
          signals: [],
          constants: [],
          enums: [],
        },
      },
      globalFunctions: ['print', 'abs', 'floor', 'floori', 'str', 'randf'],
      globalConstants: ['PI', 'TAU', 'INF', 'NAN'],
      globalEnums: [
        {
          name: 'Error',
          values: [
            { name: 'OK', value: '0' },
            { name: 'FAILED', value: '1' },
          ],
        },
      ],
      constructors: ['Vector2', 'Vector3', 'Color'],
    });
  }

  it('should resolve inheritance chain', () => {
    const reg = createTestRegistry();
    expect(reg.getInheritanceChain('Node2D')).toEqual([
      'Node2D',
      'CanvasItem',
      'Node',
      'Object',
    ]);
    expect(reg.getInheritanceChain('Object')).toEqual(['Object']);
    expect(reg.getInheritanceChain('Unknown')).toEqual(['Unknown']);
  });

  it('should collect all members including inherited', () => {
    const reg = createTestRegistry();
    const members = reg.getAllMembers('Node2D');

    // Own members
    expect(members.has('position')).toBe(true);
    expect(members.has('rotation')).toBe(true);
    expect(members.has('rotate')).toBe(true);

    // From CanvasItem
    expect(members.has('visible')).toBe(true);
    expect(members.has('draw')).toBe(true);
    expect(members.has('visibility_changed')).toBe(true);

    // From Node
    expect(members.has('add_child')).toBe(true);
    expect(members.has('get_node')).toBe(true);
    expect(members.has('name')).toBe(true);
    expect(members.has('ready')).toBe(true);
    expect(members.has('_ready')).toBe(true);

    // From Object
    expect(members.has('free')).toBe(true);
    expect(members.has('get_class')).toBe(true);

    // Constants
    expect(members.has('NOTIFICATION_POSTINITIALIZE')).toBe(true);
  });

  it('should cache getAllMembers results', () => {
    const reg = createTestRegistry();
    const first = reg.getAllMembers('Node2D');
    const second = reg.getAllMembers('Node2D');
    expect(first).toBe(second); // Same reference = cached
  });

  it('should identify global functions', () => {
    const reg = createTestRegistry();
    expect(reg.isGlobalFunction('print')).toBe(true);
    expect(reg.isGlobalFunction('abs')).toBe(true);
    expect(reg.isGlobalFunction('add_child')).toBe(false);
    expect(reg.isGlobalFunction('position')).toBe(false);
  });

  it('should identify constructors', () => {
    const reg = createTestRegistry();
    expect(reg.isConstructor('Vector2')).toBe(true);
    expect(reg.isConstructor('Color')).toBe(true);
    expect(reg.isConstructor('Node2D')).toBe(false);
  });

  it('should identify globals (functions + constructors)', () => {
    const reg = createTestRegistry();
    expect(reg.isGlobal('print')).toBe(true);
    expect(reg.isGlobal('Vector2')).toBe(true);
    expect(reg.isGlobal('add_child')).toBe(false);
  });

  it('should check subclass relationships', () => {
    const reg = createTestRegistry();
    expect(reg.isSubclassOf('Node2D', 'Object')).toBe(true);
    expect(reg.isSubclassOf('Node2D', 'Node')).toBe(true);
    expect(reg.isSubclassOf('Node2D', 'CanvasItem')).toBe(true);
    expect(reg.isSubclassOf('Node2D', 'Node2D')).toBe(true);
    expect(reg.isSubclassOf('Node', 'Node2D')).toBe(false);
  });

  it('should serialize/deserialize via JSON', () => {
    const reg = createTestRegistry();
    const json = JSON.stringify(reg.getData());
    const reg2 = GodotClassRegistry.fromJson(json);
    expect(reg2.getAllMembers('Node2D').size).toBe(
      reg.getAllMembers('Node2D').size,
    );
    expect(reg2.isGlobalFunction('print')).toBe(true);
  });
});

describe('Godot Registry: Real Godot Docs', () => {
  it('should parse all real Godot class XMLs', () => {
    const classes = parseAllClassXmls(GODOT_DOCS_DIR);
    // Should have 900+ classes
    expect(classes.size).toBeGreaterThan(800);

    // Key classes should exist
    expect(classes.has('Object')).toBe(true);
    expect(classes.has('Node')).toBe(true);
    expect(classes.has('Node2D')).toBe(true);
    expect(classes.has('Sprite2D')).toBe(true);
    expect(classes.has('@GlobalScope')).toBe(true);
  });

  it('should generate a complete registry from real docs', () => {
    const classes = parseAllClassXmls(GODOT_DOCS_DIR);
    const data = generateRegistryData(classes);
    const reg = new GodotClassRegistry(data);

    // Global functions
    expect(reg.isGlobalFunction('print')).toBe(true);
    expect(reg.isGlobalFunction('abs')).toBe(true);
    expect(reg.isGlobalFunction('floori')).toBe(true);

    // Inheritance chain for Sprite2D
    const chain = reg.getInheritanceChain('Sprite2D');
    expect(chain).toContain('Sprite2D');
    expect(chain).toContain('Node2D');
    expect(chain).toContain('CanvasItem');
    expect(chain).toContain('Node');
    expect(chain).toContain('Object');

    // Sprite2D should have inherited members
    const members = reg.getAllMembers('Sprite2D');
    // Own
    expect(members.has('texture')).toBe(true);
    // From Node2D
    expect(members.has('position')).toBe(true);
    // From Node
    expect(members.has('get_node')).toBe(true);
    expect(members.has('add_child')).toBe(true);
    expect(members.has('name')).toBe(true);
    // From Object
    expect(members.has('free')).toBe(true);
  });

  it('should have Node.get_node as an inherited member for all Node subclasses', () => {
    const classes = parseAllClassXmls(GODOT_DOCS_DIR);
    const data = generateRegistryData(classes);
    const reg = new GodotClassRegistry(data);

    // All these should have get_node
    for (const cls of ['Control', 'Sprite2D', 'Camera2D', 'Area2D']) {
      const members = reg.getAllMembers(cls);
      expect(members.has('get_node')).toBe(true);
    }
  });
});

describe('Godot Registry: Version Detection', () => {
  it('should parse version.py from the Godot repo', () => {
    const ver = parseGodotVersion(GODOT_VERSION_PY);
    expect(ver.major).toBeGreaterThanOrEqual(4);
    expect(ver.minor).toBeGreaterThanOrEqual(0);
    expect(ver.short).toMatch(/^\d+\.\d+$/);
    expect(ver.full).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

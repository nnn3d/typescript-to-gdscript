// Tests for Dictionary type — default objects `{}` should have Dictionary methods

class DictionaryTest extends Node {
  test_dictionary_class() {
    // Dictionary as a class
    let dict = Dictionary();
    dict.has('key');
    dict.get('key');
    dict.set('key', 'value');
    dict.erase('key');
    dict.clear();
    let s: int = dict.size();
    let empty: boolean = dict.is_empty();
    let k: Array<unknown> = dict.keys();
    let v: Array<unknown> = dict.values();
    // @ts-expect-error — Dictionary is not GodotObject
    dict.get_class();
    dict.is_same_typed_key(Dictionary());
    dict.merge(Dictionary());
    let merged: Dictionary = dict.merged(Dictionary());
    let duped: Dictionary = dict.duplicate();
    dict.sort();
  }

  test_dictionary_literal() {
    // With noLib, {} literals inherit Object interface = Dictionary methods
    let dict = {};
    dict.has('key');
    dict.get('key');
    dict.set('key', 'value');
    dict.erase('key');
    dict.clear();
    let s: int = dict.size();
    let empty: boolean = dict.is_empty();
    let k: Array<unknown> = dict.keys();
    let v: Array<unknown> = dict.values();
    dict.is_same_typed_key(Dictionary());
    dict.merge(Dictionary());
    let merged: Dictionary = dict.merged(Dictionary());
    let duped: Dictionary = dict.duplicate();
    dict.sort();
  }

  test_godot_object_via_global() {
    // Global let Object = typeof GodotObject
    let obj = new Object();
    obj.get_class();
    obj.has_method('test');
    obj.get_instance_id();
    obj._get_property_list();
    // @ts-expect-error — keys() is Dictionary-only, overridden with never on GodotObject
    obj.keys();
  }

  test_godot_object_vie_extends() {
    class Test extends Object {}

    let obj = new Test();
    obj.get_class();
    obj.has_method('test');
    obj.get_instance_id();
    obj._get_property_list();
    // @ts-expect-error — values() is Dictionary-only, overridden with never on GodotObject
    obj.values();
  }

  test_dictionary_type_assignment() {
    let dict: Dictionary = Dictionary();

    // @ts-expect-error — Node is not Dictionary (structurally incompatible)
    let bad: Dictionary = new Node();
  }
}

// ─── GodotObject / RefCounted methods ───────────────────────

class GodotObjectMethodsTest extends RefCounted {
  test_refcounted_has_godot_object_methods() {
    // RefCounted extends GodotObject — has GodotObject methods
    let cls: string = this.get_class();
    let has: boolean = this.has_method('test');
    let has_sig: boolean = this.has_signal('my_signal');
    this.set('property', 42);
    let val: unknown = this.get('property');
    this.connect('signal_name', Callable());
    this.disconnect('signal_name', Callable());
    let id: int = this.get_instance_id();
    this.set_meta('key', 'value');
    let meta: unknown = this.get_meta('key');
    this.notification(0);
    let script: unknown = this.get_script();
    let str: string = this.to_string();

    // RefCounted-specific methods
    let count: int = this.get_reference_count();
    this.reference();
    this.unreference();
  }

  test_dictionary_only_methods_blocked() {
    // Dictionary-only methods are overridden with never on GodotObject
    // @ts-expect-error — keys() is never
    this.keys();

    // @ts-expect-error — values() is never
    this.values();

    // @ts-expect-error — has_all() is never
    this.has_all([]);

    // @ts-expect-error — merged() is never
    this.merged(Dictionary());

    // @ts-expect-error — find_key() is never
    this.find_key('value');
  }

  test_node_specific_methods_not_on_refcounted() {
    // RefCounted does NOT have Node-specific methods
    // @ts-expect-error — no add_child
    this.add_child(new Node());

    // @ts-expect-error — no get_node
    this.get_node('path');

    // @ts-expect-error — no _ready
    this._ready();

    // @ts-expect-error — no _process
    this._process(0.016);
  }
}

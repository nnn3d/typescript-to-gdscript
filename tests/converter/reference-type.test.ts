import { describe, it, expect } from 'vitest';
import { resolveRegistry } from '../../src/config/index.ts';
import { isReferenceType } from '../../src/converter/common/index.ts';

const registry = resolveRegistry();

describe('isReferenceType', () => {
  describe('returns false for non-reference types', () => {
    it('primitives', () => {
      expect(isReferenceType('int', registry)).toBe(false);
      expect(isReferenceType('float', registry)).toBe(false);
      expect(isReferenceType('bool', registry)).toBe(false);
      expect(isReferenceType('String', registry)).toBe(false);
    });

    it('value-API types (StringName, NodePath, Signal, Callable)', () => {
      expect(isReferenceType('StringName', registry)).toBe(false);
      expect(isReferenceType('NodePath', registry)).toBe(false);
      expect(isReferenceType('Signal', registry)).toBe(false);
      expect(isReferenceType('Callable', registry)).toBe(false);
    });

    it('variant value types (Vector2, Color, Rect2, Transform2D, ...)', () => {
      expect(isReferenceType('Vector2', registry)).toBe(false);
      expect(isReferenceType('Vector3', registry)).toBe(false);
      expect(isReferenceType('Color', registry)).toBe(false);
      expect(isReferenceType('Rect2', registry)).toBe(false);
      expect(isReferenceType('Transform2D', registry)).toBe(false);
      expect(isReferenceType('Basis', registry)).toBe(false);
      expect(isReferenceType('AABB', registry)).toBe(false);
    });

    it('packed array types', () => {
      expect(isReferenceType('PackedByteArray', registry)).toBe(false);
      expect(isReferenceType('PackedInt32Array', registry)).toBe(false);
      expect(isReferenceType('PackedStringArray', registry)).toBe(false);
      expect(isReferenceType('PackedVector2Array', registry)).toBe(false);
      expect(isReferenceType('PackedColorArray', registry)).toBe(false);
    });

    it('container types (Array, Dictionary)', () => {
      expect(isReferenceType('Array', registry)).toBe(false);
      expect(isReferenceType('Dictionary', registry)).toBe(false);
    });

    it('empty / void / Nil / Variant', () => {
      expect(isReferenceType('', registry)).toBe(false);
      expect(isReferenceType('void', registry)).toBe(false);
      expect(isReferenceType('Nil', registry)).toBe(false);
      expect(isReferenceType('Variant', registry)).toBe(false);
    });

    it('any / unknown', () => {
      expect(isReferenceType('any', registry)).toBe(false);
      expect(isReferenceType('unknown', registry)).toBe(false);
    });

    it('typed array / dictionary syntax', () => {
      expect(isReferenceType('Node[]', registry)).toBe(false);
      expect(isReferenceType('Array[Node]', registry)).toBe(false);
      expect(isReferenceType('Dictionary[String, Node]', registry)).toBe(false);
    });

    it('enum references (dotted type names)', () => {
      expect(isReferenceType('Node.ProcessMode', registry)).toBe(false);
      expect(isReferenceType('Tween.TransitionType', registry)).toBe(false);
    });
  });

  describe('returns true for reference types', () => {
    it('known Godot class names', () => {
      expect(isReferenceType('Node', registry)).toBe(true);
      expect(isReferenceType('Node2D', registry)).toBe(true);
      expect(isReferenceType('Resource', registry)).toBe(true);
      expect(isReferenceType('Material', registry)).toBe(true);
      expect(isReferenceType('Texture2D', registry)).toBe(true);
      expect(isReferenceType('SceneTree', registry)).toBe(true);
      expect(isReferenceType('PackedScene', registry)).toBe(true);
    });

    it('user class names (not in registry)', () => {
      // Any non-special, non-registry name is treated as a user class
      expect(isReferenceType('MyPlayer', registry)).toBe(true);
      expect(isReferenceType('_Anon', registry)).toBe(true);
      expect(isReferenceType('G_Foo', registry)).toBe(true);
    });
  });

  describe('input normalization', () => {
    it('trims whitespace', () => {
      expect(isReferenceType('  Node  ', registry)).toBe(true);
      expect(isReferenceType('\tint\t', registry)).toBe(false);
    });
  });
});

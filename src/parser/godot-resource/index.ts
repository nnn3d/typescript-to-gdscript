import TreeSitter from 'tree-sitter';
import type { SyntaxNode } from './types.ts';
import GodotResource from 'tree-sitter-godot-resource';

export class GodotResourceParser {
  private parser: TreeSitter;

  constructor() {
    this.parser = new TreeSitter();
    this.parser.setLanguage(GodotResource as any);
  }

  parse(source: string): SyntaxNode {
    const tree = this.parser.parse(source);
    return tree.rootNode as unknown as SyntaxNode;
  }
}

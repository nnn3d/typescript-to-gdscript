import Parser from 'tree-sitter';
import GDScript from 'tree-sitter-gdscript';
import type { GDNode } from './types.js';

export class GDScriptParser {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
    this.parser.setLanguage(GDScript as unknown as Parser.Language);
  }

  parse(source: string): GDNode {
    const tree = this.parser.parse(source);
    return tree.rootNode as unknown as GDNode;
  }

  parseFile(source: string, previousTree?: Parser.Tree): Parser.Tree {
    return this.parser.parse(source, previousTree);
  }
}

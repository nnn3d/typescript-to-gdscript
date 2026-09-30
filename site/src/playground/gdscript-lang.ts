import type * as Monaco from 'monaco-editor';

/** Highlighting only: keywords, annotations, strings, comments, numbers. */
export function registerGdscript(monaco: typeof Monaco) {
  monaco.languages.register({ id: 'gdscript' });
  monaco.languages.setLanguageConfiguration('gdscript', {
    comments: { lineComment: '#' },
    brackets: [
      ['(', ')'],
      ['[', ']'],
      ['{', '}'],
    ],
  });
  monaco.languages.setMonarchTokensProvider('gdscript', {
    // prettier-ignore
    keywords: [
      'if', 'elif', 'else', 'for', 'while', 'match', 'when', 'break', 'continue',
      'pass', 'return', 'class', 'class_name', 'extends', 'is', 'in', 'as', 'self',
      'super', 'signal', 'func', 'static', 'const', 'enum', 'var', 'await',
      'preload', 'breakpoint', 'true', 'false', 'null', 'and', 'or', 'not', 'void',
    ],
    // Hardcoded on purpose (an approved exception to AGENTS.md rule 7): it only
    // colours text, and the registry arrives with the typings bundle, after
    // the grammar is registered. GDScript editors colour these few builtin
    // types, not every engine class.
    // prettier-ignore
    typeKeywords: [
      'int', 'float', 'bool', 'String', 'StringName', 'NodePath', 'Array',
      'Dictionary', 'Variant', 'Callable', 'Signal',
    ],
    tokenizer: {
      root: [
        [/#.*$/, 'comment'],
        [/@[a-zA-Z_]\w*/, 'tag'],
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              '@keywords': 'keyword',
              '@typeKeywords': 'type',
              '@default': 'identifier',
            },
          },
        ],
        [
          /0x[0-9a-fA-F_]+|0b[01_]+|\d[\d_]*(\.[\d_]+)?([eE][+-]?\d+)?/,
          'number',
        ],
        [/[&^]?"""/, 'string', '@tripleDouble'],
        [/[&^]?'''/, 'string', '@tripleSingle'],
        [/[&^]?"/, 'string', '@double'],
        [/[&^]?'/, 'string', '@single'],
      ],
      double: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop'],
      ],
      single: [
        [/[^\\']+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string', '@pop'],
      ],
      tripleDouble: [
        [/"""/, 'string', '@pop'],
        [/[^"\\]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string'],
      ],
      tripleSingle: [
        [/'''/, 'string', '@pop'],
        [/[^'\\]+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string'],
      ],
    },
  });
}

import basic from './examples/basic.ts?raw';
import signals from './examples/signals.ts?raw';
import annotations from './examples/annotations.ts?raw';
import enums from './examples/enums.ts?raw';
import match from './examples/match.ts?raw';
import accessors from './examples/accessors.ts?raw';
import lambdas from './examples/lambdas.ts?raw';
import awaitExample from './examples/await.ts?raw';
import collections from './examples/collections.ts?raw';
import casting from './examples/casting.ts?raw';
import statics from './examples/statics.ts?raw';
import innerClasses from './examples/inner-classes.ts?raw';
import gdMatch from './examples/gd-match.ts?raw';
import tool from './examples/tool.ts?raw';
import platformerPlayer from './examples/platformer-player.ts?raw';
import inventory from './examples/inventory.ts?raw';
import enemyAi from './examples/enemy-ai.ts?raw';

export interface Example {
  id: string;
  label: string;
  source: string;
}

export interface ExampleGroup {
  label: string;
  examples: Example[];
}

export const EXAMPLE_GROUPS: ExampleGroup[] = [
  {
    label: 'Basics',
    examples: [
      { id: 'basic', label: 'Basic node script', source: basic },
      { id: 'signals', label: 'Signals', source: signals },
      {
        id: 'annotations',
        label: 'Exports and annotations',
        source: annotations,
      },
      { id: 'enums', label: 'Enums and constants', source: enums },
      { id: 'match', label: 'Switch to match', source: match },
    ],
  },
  {
    label: 'Language features',
    examples: [
      { id: 'accessors', label: 'Getters and setters', source: accessors },
      { id: 'lambdas', label: 'Lambdas and callables', source: lambdas },
      { id: 'await', label: 'Async and await', source: awaitExample },
      {
        id: 'collections',
        label: 'Arrays and dictionaries',
        source: collections,
      },
      { id: 'casting', label: 'Casting and type checks', source: casting },
      { id: 'statics', label: 'Static members', source: statics },
      { id: 'inner-classes', label: 'Inner classes', source: innerClasses },
      { id: 'gd-match', label: 'Pattern matching (gd.match)', source: gdMatch },
      { id: 'tool', label: 'Tool script', source: tool },
    ],
  },
  {
    label: 'Real code',
    examples: [
      {
        id: 'platformer-player',
        label: 'Platformer player',
        source: platformerPlayer,
      },
      { id: 'inventory', label: 'Inventory', source: inventory },
      { id: 'enemy-ai', label: 'Enemy AI', source: enemyAi },
    ],
  },
];

export const EXAMPLES: Example[] = EXAMPLE_GROUPS.flatMap((g) => g.examples);

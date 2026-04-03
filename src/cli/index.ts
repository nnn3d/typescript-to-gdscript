#!/usr/bin/env node

import { Command } from 'commander';
import { setDebugEnabled } from './helpers.ts';
import { registerConvertCommand } from './convert.ts';
import { registerConvertGdCommand } from './convert-gd.ts';
import { registerValidateGdCommand } from './validate-gd.ts';
import { registerWatchCommand } from './watch.ts';
import { registerGenerateGdscriptGlobalTypingsCommand } from './generate-gdscript-global-typings.ts';
import { registerSetLatestCommand } from './set-latest.ts';
import { registerGenerateTypingsCommand } from './generate-typings.ts';
import { registerLintCommand } from './lint.ts';
import { registerInitCommand } from './init.ts';

const program = new Command();

program
  .name('ts2gd')
  .description('Convert TypeScript to GDScript and back')
  .version('0.1.0')
  .option('--debug', 'Show debug/info messages', false)
  .hook('preAction', () => {
    setDebugEnabled(program.opts().debug);
  });

// Register all commands
registerConvertCommand(program);
registerConvertGdCommand(program);
registerValidateGdCommand(program);
registerWatchCommand(program);
registerGenerateGdscriptGlobalTypingsCommand(program);
registerSetLatestCommand(program);
registerGenerateTypingsCommand(program);
registerLintCommand(program);
registerInitCommand(program);

program.parse();

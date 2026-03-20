import convertRule from './rules/convert.ts';

const plugin = {
  meta: {
    name: 'eslint-plugin-ts2gd',
    version: '0.1.0',
  },
  rules: {
    convert: convertRule,
  },
};

export default plugin;

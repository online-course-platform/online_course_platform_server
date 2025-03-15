import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'off',
      'no-unused-vars': 'error',
      'no-console': 'warn',
    },
  },
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.git',
      '**/.next',
      '**/out',
      '**/.cache',
    ],
  },
];

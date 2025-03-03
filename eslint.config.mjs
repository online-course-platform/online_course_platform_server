import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier,
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

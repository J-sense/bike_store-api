import globals from 'globals';
import pluginJs from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin'; // Import TypeScript ESLint plugin
import tsParser from '@typescript-eslint/parser'; // TypeScript parser

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Match JavaScript and TypeScript files
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      globals: {
        ...globals.node, // Add Node.js globals
        process: 'readonly', // Add specific globals
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.ts'], // Target TypeScript files specifically
    languageOptions: {
      parser: tsParser, // Set TypeScript parser
    },
    plugins: {
      '@typescript-eslint': ts, // Add TypeScript ESLint plugin
    },
    rules: {
      ...ts.configs.recommended.rules, // Use recommended rules for TypeScript
    },
  },
  {
    ignores: ['node_modules', 'dist'], // Ignore specified directories
  },
];

const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    browser: true // React is primarily browser-based
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: [
    '.*.js', // Ignore dotfiles
    'node_modules/',
    'dist/'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project
      }
    }
  ]
};

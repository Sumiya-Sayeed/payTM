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
    node: true // For Node.js environments
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
      files: ['*.ts', '*.tsx'], // Only apply to TypeScript files
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' }
        ]
      }
    }
  ]
};

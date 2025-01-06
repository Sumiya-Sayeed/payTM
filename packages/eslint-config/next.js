const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/next'), // Next.js-specific rules
    'eslint-config-turbo'
  ],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    node: true, // Node.js for SSR
    browser: true // Browser for client-side code
  },
  plugins: ['only-warn'],
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
  ],
  typescript: {
    ignoreBuildErrors: true
  }
};

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true, // Ensures this is the root configuration
  ignorePatterns: ['apps/**', 'packages/**', 'node_modules/**', 'dist/**'], // Ignore common folders
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    tsconfigRootDir: __dirname, // Ensures tsconfig.json is resolved correctly
    project: ['./tsconfig.json'] // Add other tsconfig paths if necessary
  },
  extends: [
    '@repo/eslint-config/library.js' // Default shared config for library code
  ],
  eslint: {
    ignoreDuringBuilds: true
  }
};

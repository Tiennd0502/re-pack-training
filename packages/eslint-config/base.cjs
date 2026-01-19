/**
 * Base ESLint configuration for ESLint 8 (legacy format)
 * Compatible with TypeScript packages
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    node: true,
    es2020: true,
  },
  ignorePatterns: [
    '*.config.js',
    '*.config.mjs',
    '*.config.cjs',
    '*.config.ts',
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
  },
};

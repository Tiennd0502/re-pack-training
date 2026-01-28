module.exports = {
  root: true,
  extends: ['@react-native'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: [
    'index.js',
    '*.config.js',
    '*.config.mjs',
    '*.config.cjs',
    'babel.config.*',
    'metro.config.*',
    'jest.config.*',
    'tailwind.config.*',
    'rspack.config.*',
    'react-native.config.*',
    'node_modules/',
    'android/',
    'ios/',
    'build/',
    'dist/',
  ],
};

module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
		"react-native-worklets/plugin",
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@/hooks': './src/hooks',
          '@/stores': './src/stores',
          '@/providers': './src/providers',
          '@/themes': './src/themes',
          '@repo/constants': '../../packages/constants/src',
          '@repo/hooks': '../../packages/hooks/src',
          '@repo/interfaces': '../../packages/interfaces/src',
          '@repo/providers': '../../packages/providers/src',
          '@repo/services': '../../packages/services/src',
          '@repo/ui': '../../packages/ui/src',
          '@repo/ui/components/': '../../packages/ui/src/components/',
          '@repo/utils': '../../packages/utils/src',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
    ]
  ],
};

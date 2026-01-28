import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { NativeWindPlugin } from '@callstack/repack-plugin-nativewind';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';
import { IgnorePlugin } from '@rspack/core';

import { withZephyr } from 'zephyr-repack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = envConfig => {
  const { mode = 'development', context = __dirname, platform } = envConfig;

  return Repack.defineRspackConfig({
    mode,
    context: __dirname,
    entry: './index.js',

    resolve: {
      ...Repack.getResolveOptions(),
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '@repo/constants': path.resolve(
          __dirname,
          '../../packages/constants/src',
        ),
        '@repo/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
        '@repo/types': path.resolve(__dirname, '../../packages/types/src'),
        '@repo/providers': path.resolve(
          __dirname,
          '../../packages/providers/src',
        ),
        '@repo/stores': path.resolve(__dirname, '../../packages/stores/src'),
        '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
        '@repo/utils': path.resolve(__dirname, '../../packages/utils/src'),
      },
    },

    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['react-native-svg-transformer'],
        },
        {
          test: /\.[cm]?[jt]sx?$/,
          type: 'javascript/auto',
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {
              root: __dirname,
              configFile: path.resolve(__dirname, 'babel.config.js'),
            },
          },
        },
        ...Repack.getAssetTransformRules(),
      ],
    },

    plugins: [
      new NativeWindPlugin(),
      new ReanimatedPlugin({
        unstable_disableTransform: true,
      }),
      new Repack.RepackPlugin({
        platform,
      }),
      new IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'ProductRemote',
        filename: 'ProductRemote.container.js.bundle',

        exposes: {
          './Product': './src/module/Product/index.tsx',
        },

        dts: false,

        runtimePlugins: [
          '@callstack/repack/mf/core-plugin',
          '@callstack/repack/mf/resolver-plugin',
          '@callstack/repack/mf/prefetch-plugin',
        ],

        shared: {
          react: {
            singleton: true,
            eager: true,
          },
          'react-native': {
            singleton: true,
            eager: true,
          },
          'react/jsx-runtime': {
            singleton: true,
            eager: true,
          },
          'react-native-svg': {
            singleton: true,
            eager: true,
          },
          tailwindcss: {
            singleton: true,
            eager: true,
          },
          nativewind: {
            singleton: true,
            eager: true,
          },
          'react-native-css-interop/': {
            singleton: true,
            eager: false,
            requiredVersion: '*',
          },
          ...(mode === 'development'
            ? {
                'react/jsx-dev-runtime': {
                  singleton: true,
                  eager: true,
                },
              }
            : {}),
        },
      }),
    ],
  });
};

export default withZephyr({
  applicationUid: 'productremote.re-pack-training.tiennd0502',
})(config);

// export default config;

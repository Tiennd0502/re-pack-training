import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
// import {withZephyr} from 'zephyr-repack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env, _argv) => {
	const { mode = 'development', context = __dirname } = env;

	return Repack.defineRspackConfig({
		mode,
    context: __dirname,
		entry: './index.js',
		resolve: {
			...Repack.getResolveOptions(),
		},
		module: {
			rules: [
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'react-native-svg-transformer',
						},
					],
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
			new Repack.RepackPlugin(),
			new Repack.plugins.ModuleFederationPluginV2({
				name: 'ProfileRemote',
				filename: 'ProfileRemote.container.js.bundle',
				exposes: {
					'./Profile': './src/module/Profile/index.tsx',
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
						requiredVersion: false,
						strictVersion: false,
					},
					'react-native': {
						singleton: true,
						eager: true,
						requiredVersion: false,
						strictVersion: false,
					},
					'react/jsx-runtime': {
						singleton: true,
						eager: true,
						requiredVersion: false,
						strictVersion: false,
					},
					'react/jsx-dev-runtime': {
						singleton: true,
						eager: true,
						requiredVersion: false,
						strictVersion: false,
					},
				},
			}),
		],
	})
}

export default config;

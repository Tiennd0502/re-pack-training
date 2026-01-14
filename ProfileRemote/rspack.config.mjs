import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env, _argv) => {
	const { mode = 'development', context = __dirname } = env;

	return Repack.defineRspackConfig({
		mode,
    context: __dirname,
		entry: './index.js',
		devServer: {
			port: 9002,
			host: '0.0.0.0',
			static: {
				directory: path.resolve(__dirname, 'build/output/android'),
			},
			devMiddleware: {
				writeToDisk: true,
			},
    },
		output: {
			publicPath: 'http://10.0.2.2:9002/',
			filename: '[name].bundle',
			chunkFilename: '[name].chunk.bundle',
		},
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
				filename: 'ProfileRemote.bundle',
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

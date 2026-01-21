import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import * as Repack from '@callstack/repack';

import { NativeWindPlugin } from '@callstack/repack-plugin-nativewind';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';

import { IgnorePlugin, DefinePlugin } from '@rspack/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

// Read .env file
const loadEnv = () => {
	const envPath = path.resolve(__dirname, '.env');
	try {
		const envFile = readFileSync(envPath, 'utf-8');
		const env = {};
		envFile.split('\n').forEach(line => {
			const trimmedLine = line.trim();
			if (trimmedLine && !trimmedLine.startsWith('#')) {
				const [key, ...valueParts] = trimmedLine.split('=');
				if (key && valueParts.length > 0) {
					env[key.trim()] = valueParts.join('=').trim();
				}
			}
		});
		return env;
	} catch (error) {
		return {};
	}
};

const env = loadEnv();

// Merge .env file values with process.env (process.env takes precedence)
const mergedEnv = { ...env, ...process.env };

const config = (envConfig, _argv) => {
	const { mode = 'development', context = __dirname, platform } = envConfig;

	return Repack.defineRspackConfig({
		mode,
		context: __dirname,
		entry: './index.js',
		cache: false,
		resolve: {
			...Repack.getResolveOptions(),
			alias: {
				'@': path.resolve(process.cwd(), 'src'),
				'@repo/constants': path.resolve(__dirname, '../../packages/constants/src'),
				'@repo/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
				'@repo/interfaces': path.resolve(__dirname, '../../packages/interfaces/src'),
				'@repo/providers': path.resolve(__dirname, '../../packages/providers/src'),
				'@repo/services': path.resolve(__dirname, '../../packages/services/src'),
				'@repo/stores': path.resolve(__dirname, '../../packages/stores/src'),
				'@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
				'@repo/utils': path.resolve(__dirname, '../../packages/utils/src'),
			}
		},
		optimization: {
      minimize: mode === 'production',
      chunkIds: 'named',
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
							configFile: path.resolve(__dirname, 'babel.config.cjs'),
						},
					},
				},
				...Repack.getAssetTransformRules(),
			],
		},
		ignoreWarnings: [
			{
				module: /react-native-worklets/,
			},
		],
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
			new DefinePlugin({
				'process.env.API_URL': JSON.stringify(mergedEnv.API_URL || ''),
				'process.env.PROFILE_REMOTE_URL': JSON.stringify(mergedEnv.PROFILE_REMOTE_URL || ''),
			}),
			new Repack.plugins.ModuleFederationPluginV2({
				name: 'RepackApp',
				filename: 'RepackApp.container.js.bundle',
				dts: false,
				remotes: {
					// ProfileRemote: `ProfileRemote@${mergedEnv.PROFILE_REMOTE_URL}ProfileRemote.container.js.bundle`,
					// ProfileRemote: `ProfileRemote@https://t-android-feat-flux-store-nguy-n-danh-ti-n-profilerem-976e5f-ze.zephyrcloud.app/ProfileRemote.container.js.bundle`,
					ProfileRemote: `ProfileRemote@https://t-android-feat-update-readme-file-nguy-n-danh-ti-n-pr-2f3b78-ze.zephyrcloud.app/ProfileRemote.container.js.bundle`,
					// ProfileRemote: `ProfileRemote@http://localhost:9002/${platform}/ProfileRemote.container.js.bundle`

				},
				runtimePlugins: [
					'@callstack/repack/mf/core-plugin',
					'@callstack/repack/mf/resolver-plugin',
					'@callstack/repack/mf/prefetch-plugin',
				],
				shared: {
					react: { singleton: true, eager: true },
					'react-native': { singleton: true, eager: true },
					'react/jsx-runtime': { singleton: true, eager: true },
					'react-native-svg': { singleton: true, eager: true },
					'nativewind': { singleton: true, eager: true },
					'react-native-css-interop/': {
						singleton: true,
						eager: true,
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
	})
}

export default config;

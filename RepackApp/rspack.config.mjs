import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import * as Repack from '@callstack/repack';
import { NativeWindPlugin } from '@callstack/repack-plugin-nativewind';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';
import { DefinePlugin } from '@rspack/core';

// import { withZephyr } from 'zephyr-repack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
		console.warn('No .env file found, using process.env');
		return {};
	}
};

const env = loadEnv();

const config = (envConfig, _argv) => {
	const { mode = 'development', context = __dirname, platform } = envConfig;

	const remotes =
	mode === 'development'
		? {
			ProfileRemote: `ProfileRemote@http://localhost:9002/${platform}/ProfileRemote.container.js.bundle`,
		} : {
			  // ProfileRemote: 'ProfileRemote@file:///android_asset/profile/ProfileRemote.container.js.bundle',
			  ProfileRemote: 'ProfileRemote@https://nguy-n-danh-ti-n-2-profileremote-re-pack-training-7c5b2ceda-ze.zephyrcloud.app/ProfileRemote.container.js.bundle',
			};

	return Repack.defineRspackConfig({
		mode,
		context: __dirname,
		entry: './index.js',
		cache: false,
		resolve: {
			...Repack.getResolveOptions(),
			alias: {
				'@': path.resolve(process.cwd(), 'src'),
				'@/components': path.resolve(process.cwd(), 'src/components'),
				'@/hooks': path.resolve(process.cwd(), 'src/hooks'),
				'@/stores': path.resolve(process.cwd(), 'src/stores'),
				'@/providers': path.resolve(process.cwd(), 'src/providers'),
				'@/themes': path.resolve(process.cwd(), 'src/themes'),
			},
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
			new DefinePlugin({
				'process.env.API_URL': JSON.stringify(env.API_URL || process.env.API_URL || ''),
			}),
			new NativeWindPlugin(),
			new ReanimatedPlugin({
				unstable_disableTransform: true,
			}),
			new Repack.RepackPlugin(),
			new Repack.plugins.ModuleFederationPluginV2({
				name: 'RepackApp',
				dts: false,
				remotes,
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
          'react-native-safe-area-context': {
            singleton: true,
            eager: true,
            requiredVersion: false,
            strictVersion: false,
          }
        },
			}),
		],
	})
}

// export default withZephyr(config);
export default config;

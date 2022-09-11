/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ObsoleteWebpackPlugin = require("obsolete-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

const jsLoaders = () => {
	const loaders = [
		{
			loader: "babel-loader"
		}
	];

	return loaders;
};

const plugins = (devMode) => {
	const mainPlugins = [
		new MiniCssExtractPlugin({
			filename: devMode ? "[name].css" : "[name].[contenthash].css",
			chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			template: "./src/pages/homePage/index.html",
			filename: devMode ? "index.html" : "index.[contenthash].html",
		}),
		new HtmlWebpackPlugin({
			template: "./src/pages/newsPage/news.html",
			filename: devMode ? "news.html" : "news.[contenthash].html",
		}),
		new ProgressPlugin(),
		new CleanWebpackPlugin(), // it cleans output folder before extracting files
		new TerserPlugin(),
		new CaseSensitivePathsPlugin(), // it fixes bugs between OS in caseSensitivePaths (since Windows isn't CaseSensitive but Linux is)
		new FriendlyErrorsWebpackPlugin(), // it provides user-friendly errors from webpack (since the last has ugly useless bug-report)
		new ObsoleteWebpackPlugin({
			// optional: browser: provides popup via alert-script if browser unsupported (according to .browserlistrc)
			name: "obsolete",
			promptOnNonTargetBrowser: true // show popup if browser is not listed in .browserlistrc
			// optional: browser: [template: 'html string here']
		}),
		new ESLintPlugin()
	];

	return mainPlugins;
};

const cssLoaders = (mode, loader) => {
	const loaders = [
		{ loader: "css-loader" },
		{ loader: "postcss-loader" },
		{ loader: "sass-loader" }
	];

	if (mode === "development") {
		loaders.unshift("style-loader");
	} else {
		loaders.unshift(MiniCssExtractPlugin.loader);
	}

	if (loader) loaders.push(...loader);

	return loaders;
};

const optimization = () => {
	const config = {
		// config is taken from vue-cli
		splitChunks: {
			// for avoiding duplicated dependencies across modules
			minChunks: 1, // Minimum number of chunks that must share a module before splitting.
			cacheGroups: {
			  defaultVendors: {
				name: "chunk-vendors", // move js-files from node_modules into splitted file [chunk-vendors].js
				test: /[\\/]node_modules[\\/]/, // filtering files that should be included
				priority: -10, // a module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
				chunks: "initial", // type of optimization: [initial | async | all]
			  },
			  common: {
				name: "chunk-common", // move reusable nested js-files into splitted file [chunk-common].js
				minChunks: 2, // minimum number of chunks that must share a module before splitting
				priority: -20,
				chunks: "initial",
				reuseExistingChunk: true, // If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can impact the resulting file name of the chunk
			  },
			},
		},
		minimize: true,
		minimizer: [
			new HtmlMinimizerPlugin({
				minimizerOptions: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeComments: true
				}
			}),
			new CssMinimizerPlugin({
				minify: CssMinimizerPlugin.cleanCssMinify,
				minimizerOptions: {
					level: 2
				}
			})
		]
	};

	return config;
};

module.exports = function(env, argv) {
	const isDevServer = env.WEBPACK_SERVE;
	const mode = argv.mode || (isDevServer ? "development" : "production");
	const isDevMode = mode !== "production";

	console.log(`Webpack mode: ${mode.toUpperCase()}`);

	process.env.NODE_ENV = mode;

	const config = {
		entry: {
			main: ["./src/ts/main.ts"]
		},
		resolve: {
			extensions: [".ts", ".js"]
		},
		output: {
			filename: "[name].[contenthash].js",
			path: path.resolve(__dirname, "dist")
		},
		plugins: plugins(isDevMode),
		module: {
			rules: [
				{
					test: /\.html$/i,
					loader: "html-loader"
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: cssLoaders(mode)
				},
				{
					test: /\.(png|jpg|jpeg|gif|webp)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/images/[name][ext]"
					}
				},
				{
					test: /\.(svg)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/icons/[name][ext]"
					}
				},
				{
					test: /\.(ico)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/images/[name][ext]"
					}
				},
				{
					test: /\.(mp4)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/static/[name][ext]"
					}
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/fonts/[hash][ext][query]"
					}
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: jsLoaders()
				},
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/
				}
			]
		},
		devtool: mode === "development" ? "source-map" : false,
		optimization: optimization(),
		target: "browserslist",
		devServer: {
			port: 2020,
			open: true,
			hot: mode === "development"
		},
		// stats: {
		// 	preset: mode === "development" ? "normal" : "errors-warnings"
		// },
		stats: "none",
		performance: {
			maxEntrypointSize: 1000000,
			maxAssetSize: 1000000,
			// hints: "warning"
		}
	}

	return config;
}
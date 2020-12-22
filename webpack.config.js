/*global require, __dirname, module*/
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const glob = require('glob');
const globArray = require('glob-array');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Name of the dist folder
 * @type {string}
 */
const DIST_NAME = 'public/client';
/**
 * Path generated to all resources png/jpg .... from css files
 * @type {string}
 */
const CLIENT_RESOURCES_PATH = 'resources/[path][contenthash].[ext]';
/**
 * Path generated to the bundle file
 * @type {string}
 */
const CLIENT_BUNDLE_PATH = '[name]/[name].[chunkhash].bundle.js';
/**
 * Path generated to the css files
 * @type {string}
 */
const CLIENT_CSS_PATH = '[name]/[name].[chunkhash].bundle.css';

/**
 * List of bundles genereated
 * @type {{}}
 */
const entryBundles = {
    // Main Bundle
    main: globArray.sync([
        './src/**/*.js',
        './src/**/*.ts',
        './src/**/*.tsx',
    ], {
        ignore: []
    })
};

// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
    return path.join(__dirname, '.', subdir);
}

/**
 * Webpack config
 */
const webpackConfig = {
    mode: 'production',
    entry: entryBundles,
    resolve: {
        // Used to not add .ts, .tsx, .js on the import statement
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            ReactProject: srcPath('src'),
            Dependencies: srcPath('dependencies')
        }
    },
    output: {
        path: path.join(__dirname, DIST_NAME),
        filename: CLIENT_BUNDLE_PATH,
        chunkFilename: '[name].chunk.bundle.js',
        publicPath: `./${DIST_NAME}/`
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: CLIENT_CSS_PATH,
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        // This plugin is used to clean dist folder each times webpack is launched
        new CleanWebpackPlugin(),
        // Generate a manifest json file containing each js bundle path
        new ManifestPlugin({
            publicPath: `${DIST_NAME}/`,
            // only store js and css bundle inside manifest and not module required by a module
            // eslint-disable-next-line strict
            filter: ({ name, isModuleAsset }) =>
                (!name.endsWith('.js') || !name.endsWith('.css')) && !isModuleAsset,
        }),
    ],
    optimization: {
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|svg|gif|eot|otf|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: CLIENT_RESOURCES_PATH,
                            publicPath: '../../', // relative path to src /!\ Bundle must always get 1 folder (dist/folder-bundle)
                        },
                    },
                ],
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.ts(x?)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            // Display jquery on window by $ and jQuery
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            // resolve Modernizr load
            // TODO: move to foundation loader.ts
            {
                test: /modernizr/,
                loader: 'imports-loader?this=>window!exports-loader?window.Modernizr'
            }
        ]
    }
};

module.exports = webpackConfig;

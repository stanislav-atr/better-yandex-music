const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { APP_BUNDLE_NAME } = require('./config');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        app: {
            import: './Extension/src/app/betterLyrics.jsx',
            filename: APP_BUNDLE_NAME,
        },
        background: {
            import: './Extension/src/background/background.js',
        },
        'content-script': {
            import: './Extension/src/content-script.js',
        },
    },
    output: {
        path: path.resolve(__dirname, './build'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['Extension', 'src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './Extension/manifest.json', to: './' },
                { from: './Extension/assets', to: './assets' },
            ],
        }),
    ],
};

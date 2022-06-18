const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devtool: 'inline-cheap-source-map',
    mode: 'development',
    entry: './src/betterLyrics.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'better-lyrics.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules'],
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
                { from: './Extension/background.js', to: './' },
                { from: './Extension/content-script.js', to: './' },
            ],
        }),
    ],
};

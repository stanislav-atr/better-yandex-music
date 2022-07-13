const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devtool: 'inline-cheap-source-map',
    mode: 'development',
    entry: {
        // app: {
        //     import: './src/betterLyrics.jsx',
        //     filename: './better-lyrics-bundle.js',
        // },
        background: {
            import: './Extension/background/background.js',
        },
        'content-script': {
            import: './Extension/content-script.js',
        },
    },
    output: {
        path: path.resolve(__dirname, './build'),
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
                { from: './Extension/assets', to: './assets' },
            ],
        }),
    ],
};

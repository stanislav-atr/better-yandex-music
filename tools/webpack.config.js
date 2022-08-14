import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve, dirname } from 'path';
import { APP_BUNDLE_NAME } from '../app-config.js';

export const webpackConfiguration = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        app: {
            import: './Extension/src/app/index.jsx',
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
        path: resolve(dirname('./Extension'), 'build'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['Extension', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                resolve: {
                    fullySpecified: false,
                },
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/i,
                exclude: /(node_modules)/,
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

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const config = {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/better-music.js',
            format: 'cjs'
        }
    ],
    plugins: [
        resolve({
            browser: true
        }),
        commonjs({
            include: /node_modules/,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
          }),
        babel({
            exclude: "node_modules/**",
            presets: ["@babel/preset-react"],
          }),
    ]
};

export default config;

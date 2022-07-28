/* eslint-disable no-console */
import webpack from 'webpack';
import { webpackConfiguration } from './webpack.config.js';

const watch = process.argv[2] === '--watch';

const bundlingCallback = (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    if (stats.hasErrors()) {
        console.log(stats.toString({
            colors: true,
            all: false,
            errors: true,
            moduleTrace: true,
            logging: 'error',
        }));
        return;
    }

    console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,    // Shows colors in the console
    }));
};

const bundleRunner = (config, watch = false) => {
    const compiler = webpack(config);
    if (watch) {
        compiler.watch({ aggregateTimeout: 1000 }, bundlingCallback);
    } else {
        compiler.run(bundlingCallback);
    }
};

bundleRunner(webpackConfiguration, watch);

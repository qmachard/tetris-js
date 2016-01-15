var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './app/main.js')
    },
    output: {
        path: path.join(__dirname, './public/js'),
        filename: '[name].js',
        publicPath: path.join(__dirname, './public')
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'app'),
                query: {
                  presets: 'es2015'
                }
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};

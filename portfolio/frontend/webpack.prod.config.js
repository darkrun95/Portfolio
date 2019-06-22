const path = require("path")
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = require('./webpack.base.config.js')
config.mode = "production"

config.output.path = path.resolve('../static/frontend/bundles/prod/')

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'BASE_API_URL': JSON.stringify('http://www.arunpottekat.me/'),
        }
    }),

    new webpack.optimize.OccurrenceOrderPlugin()
])

config.module.rules.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
    }
)

config.optimization = {
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            },
            sourceMap: true
        })
    ]
}

module.exports = config

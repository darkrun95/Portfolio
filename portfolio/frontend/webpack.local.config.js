var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.base.config.js')

var ip = 'localhost'

config.devtool = "#eval-source-map"

config.entry = {
    inintoku: [
        'webpack-dev-server/client?http://' + ip + ':3000/',
        'webpack/hot/only-dev-server',
        './src/index.js',
    ],
    vendors: ['react'],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/static/frontend/bundles/'

config.mode = "development"

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats-local.json'}),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            'BASE_API_URL': JSON.stringify('http://'+ ip +':8000/'),
        }
    }),
])

config.module.rules.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
    }
)

module.exports = config

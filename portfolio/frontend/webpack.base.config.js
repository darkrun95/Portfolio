var path = require("path")
var webpack = require('webpack')

module.exports = {
    context: __dirname,

    entry: {
        inintoku: './src/index.js',
        vendors: ['react'],
    },

    output: {
        path: path.resolve('../static/frontend/bundles/local/'),
        filename: "[name]-[hash].js"
    },

    externals: [
    ],

    devServer: {
        hot: true,
        contentBase: './src',
    },

    plugins: [
    ],

    module: {
        rules: []
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
}

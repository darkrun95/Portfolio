var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.local.config.js')
var ip = ""

if (config.mode == "development") {
    ip = "localhost"
}

new WebpackDevServer(webpack(config), {
    headers: { "Access-Control-Allow-Origin": "*" }﻿,
    publicPath: config.output.publicPath,
    hot: true,
    inline: false,
    historyApiFallback: true,
}).listen(3000, ip, function (err, result) {
    if (err) {
        console.log(err)
    }

    console.log('Listening at ' + ip + ':3000')
})

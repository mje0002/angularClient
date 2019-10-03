'use strict'

const webPackMerge = require('webpack-merge')
const commonWebpack = require('./webpack.config.common')
const helpers = require('./helper')

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    optimization: {
        noEmitOnErrors: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'babel_loader',
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ]
    }
}

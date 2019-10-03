'use strict'

const CleanWebpackPlugin   = require('clean-webpack-plugin')
const HtmlWebpackPlugin    = require('html-webpack-plugin')
const TSLintPlugin         = require('tslint-webpack-plugin')

const helpers              = require('./helper');
const isDev                = process.env.NODE_ENV !== 'production'

module.exports = []

const clientConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
		//contentBase: './dist',
		host: 'localhost',
		port: 9000,
		open: true,
		historyApiFallback: true
	},
    entry: {
        main: './src/client/main.ts'
    },
    output: {
        path: helpers.root('dist/public'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    optimization: {
        noEmitOnErrors: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.ts?$/,
                loaders: [
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
    },
    plugins: [
		new TSLintPlugin({
            files: ['./src/**/*.ts']
        }),
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            title: 'Node Angular App'    
        })
    ]
}

const serverConfig = {
	cache: true,
	context: __dirname,
	mode: 'production',
	target: 'node',
	devtool: 'source-map',
	entry: {
		server: './src/server/server.ts'
	},
	module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
				test: /\.tsx?$/, 
				loader: "awesome-typescript-loader", 
				options:{ configFileName: 'tsconfig.json'} 
			},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname + '/dist'),
		publicPath: '/'  //Hot reloading won’t work as expected for nested routes without it
	},
	plugins: [
		new TSLintPlugin({
            files: ['./src/**/*.ts']
		})
	],
	resolve: {
			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: [".ts", ".tsx", ".js", ".json"]
	}
}

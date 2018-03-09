const config = require('../config').config;
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: path.resolve(__dirname, '../../project/'+config.project+'/script/index.js'),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, '../../project/'+config.project+'/js')
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"es2015", "react"
						]
					}
				},
				exclude: /node_modules/
			}
		]
	}
};

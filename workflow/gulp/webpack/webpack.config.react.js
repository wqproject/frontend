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
	// module: {
	// 	loaders: [
	// 		{
	// 			test: /\.js$/,
	// 			exclude: /(node_modules|bower_components)/,
	// 			loader: 'babel-loader',
	// 			query: {
	// 				presets: ['es2015']
	// 			}
	// 		}
	// 	]
	// }
};

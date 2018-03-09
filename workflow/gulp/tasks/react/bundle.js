const webpack = require('webpack');
const gulp = require('gulp'); //gulp插件
const config = require('../../config').config;
const webpackConfig = require('../../webpack/webpack.config.react.dev');
console.log(webpackConfig);

gulp.task('react:dev',(callback) => {
	webpack(webpackConfig, function(err, stats) {
		console.log(stats.compilation.errors);
		callback();
	});
});

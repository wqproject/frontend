const gulp = require('gulp'); //gulp插件
const inlineSource = require('gulp-inline-source');
const config = require('../../config').config;
/**
 * https://github.com/fmal/gulp-inline-source
 *
 * Inline all <script>, <link> and <img> tags that contain the inline attribute with inline-source.
 */

gulp.task('inline', function () {
	let options = {
		attribute: 'inline',//attribute used to parse sources (default 'inline')
		compress: false //是否压缩成一行
	};
	return gulp.src(config.source+'/**/*.html')
		.pipe(inlineSource(options))
		.pipe(gulp.dest(config.dist+'/inline'));
});
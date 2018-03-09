const gulp = require('gulp'); //gulp插件
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const config = require('../../config').config;



/**
 *js 语法检测
 */
gulp.task('lint', () => {
	return lint(config.source+'/script/**/*.js')
		.pipe(gulp.dest(config.source+'/js'));
});

function lint(files) {
	return gulp.src(files)
		.pipe(eslint({ fix: true }))
		.pipe(reload({stream: true, once: true}))
		.pipe(eslint.format())
		.pipe(gulpIf(!browserSync.active, eslint.failAfterError()));
}

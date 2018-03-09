const gulp = require('gulp'); //gulp插件
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const sourceMaps = require('gulp-sourcemaps');
const reload = require('../normal-task').reload;
const config = require('../../config').config;


/**
 * babel 转换任务
 */
gulp.task('scripts', () => {
	return gulp.src(config.source+'/script/**/*.js')
		.pipe(changed(config.source))
		.pipe(plumber())
		.pipe(gulpIf(config.dev, sourceMaps.init()))
		.pipe(babel())
		.pipe(gulpIf(config.dev, sourceMaps.write('.')))
		.pipe(gulp.dest(config.source+'/js'))
		.pipe(reload({stream: true}));
});
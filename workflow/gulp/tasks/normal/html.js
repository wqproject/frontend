const gulp = require('gulp'); //gulp插件
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');

const config = require('../../config').config;

gulp.task('html', ['scss', 'scripts'], () => {
	return gulp.src([config.source+'/**/*.html',config.source+'/**/*.css','!'+config.source+'/**/script/**/*',config.source+'/**/*.js'])
		.pipe(useref({searchPath: [config.source, '.']}))
		.pipe(plumber())
		.pipe(gulpIf(/\.js$/, uglify({compress: {drop_console: false}})))
		.pipe(plumber())
		.pipe(gulpIf(/\.css$/, cssnano({safe: true, autoprefixer: false})))
		.pipe(plumber())
		.pipe(gulpIf(/\.html$/, htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: {compress: {drop_console: true}},
			processConditionalComments: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		})))
		.pipe(gulp.dest(config.dist));
});


/**
 * 字体
 */
gulp.task('fonts', () => {
	return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
		.concat(config.source+'/fonts/**/*'))
		.pipe(gulp.dest(config.dist+'/fonts'));
});


/**
 * 图片压缩任务
 */
gulp.task('images', () => {
	return gulp.src(config.source+'/**/*.{png,jpg}')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest(config.dist));
});

gulp.task('extras', () => {
	return gulp.src([
		config.source+'/*',
		'!'+config.source+'/*.html'
	], {
		dot: true
	}).pipe(gulp.dest(config.dist));
});
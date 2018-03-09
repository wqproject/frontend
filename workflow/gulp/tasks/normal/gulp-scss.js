const gulp = require('gulp'); //gulp插件
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const sourceMaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const reload = require('../normal-task').reload;
const config = require('../../config').config;


/**
 * https://github.com/dlmanning/gulp-sass
 * scss任务配置
 */
gulp.task('scss', () => {
	return gulp.src(config.source+'/scss/**/*.scss')
		.pipe(changed(config.source))
		.pipe(plumber())//打印错误
		.pipe(gulpIf(config.dev, sourceMaps.init()))
		.pipe(sass.sync({
			outputStyle: 'compact',//nested, expanded, compact, compressed,默认nested
			precision: 10,
			includePaths: ['.']
		}).on('error', sass.logError))
		.pipe(autoPrefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))//自动添加浏览器样式前缀
		.pipe(gulpIf(config.dev, sourceMaps.write()))
		.pipe(gulp.dest(config.source+'/css'))
		.pipe(reload({stream: true}));//重载浏览器css
});
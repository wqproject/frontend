const gulp = require('gulp'); //gulp插件
const runSequence = require('run-sequence');
const size = require('gulp-size');
const config = require('../../config').config;
gulp.task('build', (cb) => {
	runSequence('clean','lint', 'html', 'images', 'fonts', 'extras','clean:dir');
	return gulp.src(config.dist+'/**/*').pipe(size({title: 'build', gzip: true}));
});
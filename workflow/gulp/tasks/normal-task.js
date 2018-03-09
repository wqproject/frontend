const gulp = require('gulp'); //gulp插件
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const config = require('../config').config;





/**
 * 本地服务器配置
 */
gulp.task('serve', () => {
	runSequence(['clean'], ['scss', 'scripts', 'fonts'], () => {
		browserSync.init({
			notify: false,
			port: 9100,
			server: {
				baseDir: [config.source],
				directory: true
			}
		});

		gulp.watch([
			config.source+'/**/*.html',
			config.source+'/images/**/*',
			config.source+'/fonts/**/*',
			config.source+'/component/**/*'
		]).on('change', reload);

		gulp.watch(config.source+'/scss/**/*.scss', ['scss']);
		gulp.watch(config.source+'/script/**/*.js', ['scripts']);
		gulp.watch(config.source+'/fonts/**/*', ['fonts']);
	});
});


gulp.task('serve:dist', () => {
	runSequence(['clean'],['build'],() => {
		browserSync.init({
			notify: false,
			port: 9101,
			server: {
				baseDir: [config.dist],
				directory: false
			}
		});
	});
});


exports.reload = reload;
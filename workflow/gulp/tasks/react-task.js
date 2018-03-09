const gulp = require('gulp'); //gulp插件
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const config = require('../config').config;
/**
 * 本地服务器配置
 */
gulp.task('react_serve', () => {
	runSequence(['clean'], ['scss', 'react:dev', 'fonts'], () => {
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
		gulp.watch(config.source+'/script/**/*.js', ['react:dev']);
		gulp.watch(config.source+'/fonts/**/*', ['fonts']);
	});
});
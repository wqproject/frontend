const gulp = require('gulp'); //gulp插件
const del = require('del');
const config = require('../../config').config;

/**
 * 清除目录
 */
gulp.task('clean', del.bind(null, ['build']));

gulp.task('clean:dir', del.bind(null, [config.dist+'/script',config.dist+'/scss']));
const gulp = require('gulp'); //gulp插件
const requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });//合并tasks
const runSequence = require('run-sequence');



gulp.task('default', () => {
  return new Promise(resolve => {
    runSequence(['clean'], 'build', resolve);
  });
});

gulp.task('help',function () {
  console.log('	gulp scss			编译scss文件为css');
  console.log('	gulp scripts	    编译es6代码');
  console.log('	gulp build			编译打包');
  console.log('	gulp serve			以开发目录开启服务');
  console.log('	gulp serve:dist		以打包后的目录开启服务');
  console.log('	gulp inline		    打包为inline版本的html');
});


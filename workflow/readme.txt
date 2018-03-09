web-workflow
基于nodejs的采用gulp搭建的一套适用与前端的工作流，目前配置的功能有：
1、实时预览
2、scss实时编译
3、代码压缩
4、e6语法支持
5、css 前缀自动补齐
6、图片压缩
文件目录地址：xiaolu\dev\web-workflow\

web-workflow 项目目录
	|-node_modules	依赖库
	|-lib   公共库文件
	|-project	源目录（开发目录）
		|-子项目名1
			|-script	js源代码源代码存放目录，支持es6特性
			|-js	编译后的es5js文件
			|-scss	存放scss源代码的目录
			|-css	存放编译后的css
			|-images	图片资源存放目录
			|-fonts		字体资源存放目录
			|-html		html源文件
		|-子项目名2
			....
	|-build		最终生成目录
		|-子项目名1
			|-inline	gulp inline打包命令后的文件存放目录
			|-js	压缩过后的js
			|-css	压缩过后的css
			|-images	压缩过后的图片
			|-fonts		压缩过后字体资源
			|-html		压缩过后的html源文件
		|-子项目名2
			....
	gulp.js		工作流配置文件
	package.js		依赖库描述文件

使用介绍：

1、安装依赖：
npm install

2、常用工作流命令（项目目录下使用）

gulp serve --path projectName
开发中主要用到该命令，以指定子项目目录开启服务器(如果不指定参数，将指定默认目录（hello）)！
scss，html，js的更改预览都将同步刷新到所有已打开的链接中。

更多命令请运行 gulp help  或者直接查看gulp.js配置文件

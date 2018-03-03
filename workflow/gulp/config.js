const minimist = require('minimist');

let knownOptions = {
	string: ['path','type'],
	default: { path: 'index',type: 'normal' }
};

let args = minimist(process.argv.slice(2), knownOptions);

let config={
	project: args.path,//项目名
	projectType:args.type,
	source:'project/'+args.path, //开发路径
	dist:'build/'+args.path, //开发路径
	dev:false //开发模式
};

exports.config = config;